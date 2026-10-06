"""Base UI Lovelace Minimalist class."""

from __future__ import annotations

import asyncio
from dataclasses import asdict, dataclass, field
import logging
from pathlib import Path
import shutil
from typing import TYPE_CHECKING, Any

from aiogithubapi import (
    GitHubAPI,
    GitHubAuthenticationException,
    GitHubContentsModel,
    GitHubException,
    GitHubNotModifiedException,
    GitHubRatelimitException,
)
from homeassistant.components.frontend import add_extra_js_url, async_remove_panel
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry, ConfigEntryState

if TYPE_CHECKING:
    from collections.abc import Awaitable, Callable

    from homeassistant.core import HomeAssistant
    from homeassistant.loader import Integration

from .const import (
    COMMUNITY_CARDS_FOLDER,
    DEFAULT_COMMUNITY_CARDS_ENABLED,
    DEFAULT_INCLUDE_OTHER_CARDS,
    DEFAULT_LANGUAGE,
    DEFAULT_SIDEPANEL_ENABLED,
    DEFAULT_SIDEPANEL_ICON,
    DEFAULT_SIDEPANEL_TITLE,
    DEFAULT_THEME,
    DEFAULT_THEME_PATH,
    DOMAIN,
    GITHUB_REPO,
    LANGUAGES,
    TV,
)
from .enums import ConfigurationType, UlmDisabledReason
from .utils.decode import decode_content

_LOGGER: logging.Logger = logging.getLogger(__name__)


class MinimalistException(Exception):
    """Base exception for UI Lovelace Minimalist."""


class InvalidConfigurationError(MinimalistException):
    """Raised when the configuration is not a dictionary."""


@dataclass
class UlmSystem:
    """ULM System info."""

    disabled_reason: UlmDisabledReason | None = None
    running: bool = False

    @property
    def disabled(self) -> bool:
        """Return if ULM is disabled."""
        return self.disabled_reason is not None


@dataclass
class UlmConfiguration:
    """UlmConfiguration class."""

    config: dict[str, Any] = field(default_factory=dict)
    config_entry: ConfigEntry | None = None
    config_type: ConfigurationType | None = None
    sidepanel_enabled: bool = DEFAULT_SIDEPANEL_ENABLED
    sidepanel_icon: str = DEFAULT_SIDEPANEL_ICON
    sidepanel_title: str = DEFAULT_SIDEPANEL_TITLE
    adaptive_ui_enabled: bool = DEFAULT_SIDEPANEL_ENABLED
    adaptive_ui_icon: str = DEFAULT_SIDEPANEL_ICON
    adaptive_ui_title: str = DEFAULT_SIDEPANEL_TITLE
    theme_path: str = DEFAULT_THEME_PATH
    theme: str = DEFAULT_THEME
    plugin_path: str = "www/community/"
    include_other_cards: bool = DEFAULT_INCLUDE_OTHER_CARDS
    language: str = DEFAULT_LANGUAGE
    community_cards_enabled = bool = DEFAULT_COMMUNITY_CARDS_ENABLED
    community_cards: list = field(default_factory=list)
    all_community_cards: list = field(default_factory=list)
    token: str = ""

    def to_dict(self) -> dict:
        """Return Dict."""
        return self.__dict__

    def to_json(self) -> str:
        """Return a json string."""
        return str(asdict(self))

    def update_from_dict(self, data: dict) -> None:
        """Set attributes from dicts."""
        if not isinstance(data, dict):
            raise InvalidConfigurationError("Configuration is not valid")

        for key, value in data.items():
            self.__setattr__(key, value)


class UlmBase:
    """Base UI Lovelace Minimalist."""

    integration: Integration | None = None
    configuration = UlmConfiguration()
    hass: HomeAssistant | None = None
    log: logging.Logger = _LOGGER
    githubapi: GitHubAPI | None = None
    system = UlmSystem()
    version: str | None = None

    @property
    def integration_dir(self) -> Path:
        """Return the ULM integration dir."""
        return self.integration.file_path

    @property
    def templates_dir(self) -> Path:
        """Return the Button Cards Template dir."""
        return Path(f"{self.integration_dir}/__ui_minimalist__/ulm_templates")

    @property
    def community_cards_dir(self) -> Path:
        """Return the Comminty cards dir inside Template dir."""
        return Path(f"{self.templates_dir}/community_cards")

    def disable_ulm(self, reason: UlmDisabledReason) -> None:
        """Disable Ulm."""
        if self.system.disabled_reason == reason:
            return

        self.system.disabled_reason = reason
        if reason == UlmDisabledReason.INVALID_TOKEN:
            self.configuration.config_entry.state = ConfigEntryState.SETUP_ERROR
            self.configuration.config_entry.reason = "Authentiation Failed"
            self.hass.add_job(
                self.configuration.config_entry.async_start_reauth, self.hass
            )

    def enable_ulm(self) -> None:
        """Enable Ulm."""
        if self.system.disabled_reason is not None:
            self.system.disabled_reason = None
            self.log.info("ULM is enabled")

    async def async_save_file(self, file_path: str, content: Any) -> bool:
        """Save a file."""
        self.log.debug("Saving file: %s", file_path)

        def _write_file() -> bool:
            path = Path(file_path)
            try:
                path.parent.mkdir(parents=True, exist_ok=True)
                if isinstance(content, str):
                    path.write_text(content, encoding="utf-8", errors="ignore")
                else:
                    path.write_bytes(content)
                return path.exists()

            except OSError:
                self.log.exception("Could not write data to %s", file_path)
                return False

        return await self.hass.async_add_executor_job(_write_file)

    async def async_github_get_file(self, filename: str) -> str:
        """Get the content of a file."""
        self.log.debug("Fetching github file: %s", filename)
        response = await self.async_github_api_method(
            method=self.githubapi.repos.contents.get,
            repository=GITHUB_REPO,
            path=filename,
        )
        if response and hasattr(response, "data"):
            if isinstance(response.data, GitHubContentsModel) and response.data.content:
                return decode_content(response.data.content)
        return ""

    async def async_github_get_tree(self, path: str) -> list[GitHubContentsModel]:
        """Get the content of a directory."""
        self.log.debug("Fetching github tree: %s", path)
        response = await self.async_github_api_method(
            method=self.githubapi.repos.contents.get, repository=GITHUB_REPO, path=path
        )
        if response and hasattr(response, "data"):
            if isinstance(response.data, list) and response.data:
                return response.data
        return []

    async def async_github_api_method(
        self,
        method: Callable[[], Awaitable[TV]],
        *args,
        raise_exception: bool = True,
        **kwargs,
    ) -> TV | None:
        """Call a GitHub API method."""
        _exception = None

        try:
            return await method(*args, **kwargs)
        except GitHubAuthenticationException as exception:
            self.disable_ulm(UlmDisabledReason.INVALID_TOKEN)
            _exception = exception
        except GitHubRatelimitException as exception:
            _exception = exception
        except GitHubNotModifiedException:
            raise
        except GitHubException as exception:
            _exception = exception
        except MinimalistException as exception:
            _exception = exception

        if raise_exception and _exception is not None:
            raise MinimalistException(_exception)
        return None

    def list_dirs(self) -> list[Path]:
        """Return a list of directory Path objects."""
        self.log.debug("Listing directories in %s", self.community_cards_dir)

        if not self.community_cards_dir.is_dir():
            return []

        return [path for path in self.community_cards_dir.iterdir() if path.is_dir()]

    async def fetch_cards(self) -> None:
        """Fetch list of cards."""
        response = await self.async_github_api_method(
            method=self.githubapi.repos.contents.get,
            repository=GITHUB_REPO,
            path=COMMUNITY_CARDS_FOLDER,
        )
        if response and hasattr(response, "data"):
            if isinstance(response.data, list) and response.data:
                self.configuration.all_community_cards = [
                    c.name for c in response.data if c.type == "dir"
                ]

    async def download_and_save(self, github_path, local_path):
        """Download and save selected community cards."""
        content = await self.async_github_get_file(filename=github_path)
        await self.async_save_file(file_path=str(local_path), content=content)

    async def configure_community_cards(self) -> None:
        """Configure selected community cards."""
        self.log.info("Configuring selected community cards")

        # Handle full cleanup if disabled or no cards selected
        if (
            not self.configuration.community_cards_enabled
            or self.configuration.community_cards == []
        ):
            if self.community_cards_dir.exists():
                await self.hass.async_add_executor_job(
                    shutil.rmtree, str(self.community_cards_dir), True
                )
            return

        # Ensure base directory exists for next steps
        self.community_cards_dir.mkdir(parents=True, exist_ok=True)
        language = LANGUAGES[self.configuration.language]

        # Identify folders to delete (Unselected or missing from GitHub)
        existing_dirs = await self.hass.async_add_executor_job(self.list_dirs)
        all_github_cards = self.configuration.all_community_cards

        delete_tasks = []
        for path_str in existing_dirs:
            path = Path(path_str)
            card_name = path.name

            if card_name not in self.configuration.community_cards:
                self.log.debug(
                    "Deleting community card folder %s, not selected anymore",
                    card_name,
                )
                delete_tasks.append(path)
            elif card_name not in all_github_cards:
                self.log.debug(
                    "Deleting community card folder %s, that is not existing anymore on Github",
                    card_name,
                )
                delete_tasks.append(path)

        # Batch delete unneeded folders to minimize executor overhead
        if delete_tasks:

            def _batch_delete(paths):
                for p in paths:
                    shutil.rmtree(str(p), ignore_errors=True)

            await self.hass.async_add_executor_job(_batch_delete, delete_tasks)

        # Download selected cards
        if self.configuration.community_cards_enabled:
            for card in self.configuration.community_cards:
                if card not in self.configuration.all_community_cards:
                    self.configuration.community_cards.remove(card)
                else:
                    card_files = await self.async_github_get_tree(
                        path=f"{COMMUNITY_CARDS_FOLDER}/{card}"
                    )
                    download_tasks = []
                    for f in card_files:
                        if f.type == "file":
                            target_path: Path = self.community_cards_dir / card / f.name

                            # Pathlib check for existence and size
                            if (
                                not target_path.exists()
                                or target_path.stat().st_size != f.size
                            ):
                                download_tasks.append(
                                    self.download_and_save(f.path, target_path)
                                )

                        elif f.type == "dir" and f.name == "languages":
                            language_files = await self.async_github_get_tree(
                                path=f.path
                            )

                            for lang in language_files:
                                # Only download if the stem matches the target language
                                if Path(lang.name).stem == language:
                                    target_path: Path = (
                                        self.community_cards_dir
                                        / card
                                        / "languages"
                                        / lang.name
                                    )
                                    if (
                                        not target_path.exists()
                                        or target_path.stat().st_size != lang.size
                                    ):
                                        download_tasks.append(
                                            self.download_and_save(
                                                lang.path, target_path
                                            )
                                        )

                    # Execute all downloads concurrently
                    if download_tasks:
                        await asyncio.gather(*download_tasks)

    async def configure_plugins(self) -> bool:
        """Register leftover static assets (theme helpers). Cards are Lit modules."""
        self.log.info("Setup ULM Plugins (themes helpers only)")

        try:
            await self.hass.http.async_register_static_paths(
                [
                    StaticPathConfig(
                        "/ui_lovelace_minimalist/cards",
                        self.hass.config.path(f"{self.integration_dir}/cards"),
                        True,
                    )
                ]
            )

            # Home Assistant 2026+ tapbar compatibility for minimalist-mobile-tapbar.
            add_extra_js_url(
                self.hass,
                "/ui_lovelace_minimalist/cards/hermes-mobile-tapbar-fix/hermes-mobile-tapbar-fix.js",
            )

        except MinimalistException as exception:
            self.log.error(exception)
            self.disable_ulm(UlmDisabledReason.LOAD_ULM)
            return False

        return True

    async def configure_dashboard(self) -> bool:
        """Legacy YAML dashboards removed — use Lit cards on a UI-mode dashboard."""
        self.log.info(
            "ULM YAML dashboards are disabled; add editable-cards via Lovelace resources"
        )

        try:
            # Remove stale panels from older installs
            for url in ("ui-lovelace-minimalist", "adaptive-dash"):
                if url in self.hass.data.get("lovelace", {}).dashboards:
                    async_remove_panel(self.hass, url)
        except Exception:  # noqa: BLE001 — best-effort cleanup
            self.log.debug("Could not remove legacy ULM sidebar panels", exc_info=True)

        return True

    async def configure_ulm(self) -> bool:
        """Install themes; Lit cards are loaded via Lovelace resources."""
        self.log.info("Setup ULM Configuration (themes)")

        base_dir = Path(self.hass.config.path(DOMAIN))
        integration_lovelace = Path(self.integration_dir) / "lovelace"

        def _sync_file_operations():
            for folder in ["configs", "addons", "dashboard", "custom_cards"]:
                shutil.rmtree(base_dir / folder, ignore_errors=True)

            theme_target = Path(self.hass.config.path(self.configuration.theme_path))
            shutil.copytree(
                integration_lovelace / "themefiles",
                theme_target,
                dirs_exist_ok=True,
            )

        try:
            await self.hass.async_add_executor_job(_sync_file_operations)
            self.hass.bus.async_fire("ui_lovelace_minimalist_reload")

            async def handle_reload(_call):
                self.log.debug("Reload UI Lovelace Minimalist Configuration")
                await self.reload_configuration()

            self.hass.services.async_register(DOMAIN, "reload", handle_reload)

        except MinimalistException as exception:
            self.log.error(exception)
            self.disable_ulm(UlmDisabledReason.LOAD_ULM)
            return False

        return True

    async def reload_configuration(self):
        """Reload themes into the configured theme path."""
        self.log.info("Reloading ULM themes")

        integration_lovelace = Path(self.integration_dir) / "lovelace"

        def _sync_themes():
            theme_target = Path(self.hass.config.path(self.configuration.theme_path))
            shutil.copytree(
                integration_lovelace / "themefiles",
                theme_target,
                dirs_exist_ok=True,
            )

        await self.hass.async_add_executor_job(_sync_themes)
        self.hass.bus.async_fire("ui_lovelace_minimalist_reload")
