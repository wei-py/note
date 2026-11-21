---
title: "GitHub - hajisensai/Fushi: Immersion language-learning suite: EPUB
  reader, video subtitle lookup, audiobook sync, and one-tap Anki mining.
  Android / Windows / macOS / iOS."
lazynote_generated: true
lazynote_id: 8440c092-dcda-491f-a273-b8d28eb86b01
tags:
  - 沉浸式语言学习
  - Flutter
  - Anki
  - 词典查询
date: 2026-11-11
source: links.md
url: https://github.com/hajisensai/fushi
resource_type: article
description: "Immersion language-learning suite: EPUB reader, video subtitle
  lookup, audiobook sync, and one-tap Anki mining. Android / Windows / macOS /
  iOS. - hajisensai/Fushi"
site_name: GitHub
author: null
resolved_url: https://github.com/hajisensai/fushi
metadata_status: saved
metadata_error: null
collection_status: saved
collection_error: null
tag_status: tagged
tag_error: null
---

<!-- lazynote:body -->
# Fushi

[Fushi logo](https://github.com/hajisensai/Fushi/blob/main/docs/static-assets/fushi-logo.png)

[Platform](https://camo.githubusercontent.com/e0643694783461b1ac083455b76231b5fbdd40294a07e57aac409fd9079bc739/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f706c6174666f726d2d416e64726f696425323025374325323057696e646f77732532302537432532306d61634f53253230253743253230694f532532302537432532304c696e75782d6c6967687467726579) [License](https://camo.githubusercontent.com/53640fb3f3383f0792fb73ce8f5e6e6b0ce896201473ec0bf4be3f64345b92b7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d47504c76332d626c7565) [Flutter](https://camo.githubusercontent.com/55a23da48cc8dc0df264b19320e118c06323a31a5ac0b05fbb10fee474fe1063/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f466c75747465722d332e34372e362d3032353639423f6c6f676f3d666c7574746572266c6f676f436f6c6f723d7768697465)

**English** | [简体中文](https://github.com/hajisensai/Fushi/blob/main/README.zh-CN.md) | [繁體中文](https://github.com/hajisensai/Fushi/blob/main/docs/readme/README.zh-Hant.md) | [日本語](https://github.com/hajisensai/Fushi/blob/main/docs/readme/README.ja.md) | [한국어](https://github.com/hajisensai/Fushi/blob/main/docs/readme/README.ko.md) | [Español](https://github.com/hajisensai/Fushi/blob/main/docs/readme/README.es.md) | [Français](https://github.com/hajisensai/Fushi/blob/main/docs/readme/README.fr.md) | [Deutsch](https://github.com/hajisensai/Fushi/blob/main/docs/readme/README.de.md) | [Português](https://github.com/hajisensai/Fushi/blob/main/docs/readme/README.pt-BR.md) | [Русский](https://github.com/hajisensai/Fushi/blob/main/docs/readme/README.ru.md) | [Tiếng Việt](https://github.com/hajisensai/Fushi/blob/main/docs/readme/README.vi.md) | [ภาษาไทย](https://github.com/hajisensai/Fushi/blob/main/docs/readme/README.th.md) | [Bahasa Indonesia](https://github.com/hajisensai/Fushi/blob/main/docs/readme/README.id.md) | [Italiano](https://github.com/hajisensai/Fushi/blob/main/docs/readme/README.it.md) | [Nederlands](https://github.com/hajisensai/Fushi/blob/main/docs/readme/README.nl.md) | [Türkçe](https://github.com/hajisensai/Fushi/blob/main/docs/readme/README.tr.md) | [العربية](https://github.com/hajisensai/Fushi/blob/main/docs/readme/README.ar.md)

[fushi.moe](https://fushi.moe/)

[Download Latest](https://fushi.moe/) [Join our Discord](https://discord.gg/WhjwyGmm7f) [Sponsor on GitHub](https://github.com/sponsors/hajisensai) [Support on Ko-fi](https://ko-fi.com/hajisensai)

## Platform Support

| Platform | Status | Notes |
| --- | --- | --- |
| Android | ✅ | Android 7.0 (API 24) or later |
| Windows | ✅ | Galgame text and voice hooking is Windows-only |
| macOS | ✅ | Apple Silicon only; Intel Macs are not supported |
| iOS | ✅ ([TestFlight](https://testflight.apple.com/join/j88d69jx)) | No discovery, online sources, or download center (App Store guidelines) |
| Linux | 🔧 Build from source | No prebuilt release yet; the EPUB reader needs WPE WebKit |
| Fushi Server | 🧪 Beta ([fushi-server](https://github.com/hajisensai/fushi-server/releases)) | Headless host for Linux / Windows / macOS with a web UI — see [packages/fushi\_server](https://github.com/hajisensai/Fushi/blob/main/packages/fushi_server/README.md) |

**Design system** — every platform defaults to **Material 3 Expressive**; a **Cupertino** (Apple-style) design system can be selected in _Settings › Appearance › Design system_; with Cupertino, the window background uses Mica on Windows 11 and vibrancy on macOS (unless the system's reduce-transparency or high-contrast setting is on).

> The languages available for dictionary lookup are determined by the imported dictionaries and Yomitan transformation tables, independently of the interface language. iOS updates arrive through TestFlight a few days later than on the other platforms.

### Interface Languages (17)

English · 简体中文 · 繁體中文 · 日本語 · 한국어 · Español · Français · Deutsch · Português (Brasil) · Русский · Tiếng Việt · ภาษาไทย · Bahasa Indonesia · Italiano · Nederlands · Türkçe · العربية

## Installation

Download the latest release from the [Fushi website](https://fushi.moe/) — Android APK, Windows installer, and macOS builds (Apple Silicon only; Intel Macs are not supported) are available; iOS is installed through [TestFlight](https://testflight.apple.com/join/j88d69jx). Linux has no prebuilt app release yet; build it from source. The headless Fushi Server is released separately on [hajisensai/fushi-server](https://github.com/hajisensai/fushi-server/releases).

> Requires Android 7.0 (API 24) or higher.

## Building

One-command prep (`flutter pub get` + apply patches), then build:

```shell
# From the repository root
bash tool/bootstrap.sh          # Windows PowerShell: .\tool\bootstrap.ps1

cd fushi
# Android
flutter build apk --release --target-platform android-arm64 --split-per-abi
# Desktop
flutter build windows --release
flutter build macos --release
flutter build linux --release
# iOS
flutter build ipa --release

# Headless server (from packages/fushi_server; use `dart build cli`, not `dart compile exe`)
dart build cli
```

`tool/bootstrap.sh` / `tool/bootstrap.ps1` collapse `flutter pub get` and `ci/apply-patches.sh` into a single command. This project is locked to Flutter 3.47.6 (Dart SDK `>=3.8.0 <4.0.0`); earlier Flutter versions cannot build it because Material and Cupertino are consumed as the `material_ui` / `cupertino_ui` packages. Some upstream dependencies are vendored under `third_party/` or patched by `ci/apply-patches.sh` — see [docs/agent/build.md](https://github.com/hajisensai/Fushi/blob/main/docs/agent/build.md) for details, including the Linux desktop build dependencies.

**Tech Stack**

| Layer | Technology |
| --- | --- |
| Framework | Flutter 3.47.6 (Dart SDK `>=3.8.0 <4.0.0`), Riverpod |
| Platforms | Android / Windows / macOS / iOS / Linux, plus a headless server |
| UI | `material_ui` (Material 3 Expressive) / `cupertino_ui` (Cupertino) |
| Reader | WebView paging engine (derived from the Hoshi Reader family) |
| Video | media\_kit (libmpv core) + libplacebo |
| Storage | Drift (SQLite, WAL) + fushidicts (C++ FFI dictionary engine) |
| NLP | Yomitan transformation tables (multilingual lemmatization) + kana\_kit (kana conversion); tokenization via fushidicts FFI |
| On-device AI | ONNX Runtime for speech recognition (subtitle generation) and manga OCR; algorithms live in [fushi-subtitles](https://github.com/hajisensai/fushi-subtitles) |
| Downloads | libtorrent 2.x via a C-ABI FFI bridge (external qBittorrent as fallback) |
| Sync | Cloud backends + Fushi Interconnect (LAN, remote addresses, and an iroh P2P tunnel) |
| Shared engine | `fushi_engine` — pure-Dart core shared by the app and Fushi Server |
| Card Creation | AnkiDroid API + AnkiConnect |
| i18n | Slang (17 languages) |

**Project Structure**

```
Fushi/                      # Repository root (Melos workspace: fushi_workspace)
├── fushi/                  # Flutter app main directory
│   ├── lib/
│   │   ├── i18n/            # Internationalization (17 languages, Slang)
│   │   ├── src/
│   │   │   ├── pages/       # Pages (library pages, reader, video player, settings, etc.)
│   │   │   ├── reader/      # Reader WebView JS/CSS scripts
│   │   │   ├── media/       # Books, manga, video, audiobooks, online sources
│   │   │   ├── lookup/      # Dictionary lookup popups and overlays
│   │   │   ├── mining/      # Card creation (incl. galgame mining)
│   │   │   ├── sync/        # Cloud sync, Interconnect, media servers
│   │   │   └── models/      # Data models and state management (AppModel)
│   │   └── main.dart
│   └── android/             # Android project
├── packages/                # Dart packages
│   ├── fushi_core/          #   Database schema, preferences
│   ├── fushi_engine/        #   Pure-Dart engine shared with the server
│   ├── fushi_server/        #   Headless server CLI + web UI
│   ├── fushi_cli/           #   Desktop command-line client
│   ├── fushi_dictionary/    #   Dictionary engine bindings and importers
│   ├── fushi_anki/ · fushi_audio/ · fushi_platform/ · fushi_srs/
│   ├── fushi_torrent/ · fushi_p2p/   # libtorrent / iroh FFI bindings
│   └── …                    #   Vendored forks (inappwebview Windows/Linux, gamepads)
├── native/                  # Native sources: fushidicts, fushi_torrent, fushi_p2p (Rust), galgame_hook, …
├── services/                # Log collector and leaderboard backends (deployed separately)
├── tools/browser-extension/ # Browser lookup extension
├── third_party/             # Vendored patched packages (dependency_overrides)
├── ci/                      # Build patches and CI scripts
├── tool/                    # bootstrap / setup_worktree / bug tracker scripts
└── docs/                    # Development documentation (incl. docs/agent/ operations manual)
```

Video import supports grouping by work or folder. See the [video workflow](https://github.com/hajisensai/Fushi/blob/main/docs/specs/2026-09-07-video-library-workflow.md) and [MAL/TMDB metadata with AniDB file hashing](https://github.com/hajisensai/Fushi/blob/main/docs/specs/2026-09-07-mal-tmdb-anidb-hash.md) for matching and background tasks.

[Optional online service setup](https://github.com/hajisensai/Fushi/blob/main/docs/specs/2026-09-07-online-services-setup.md) explains bundled application identities, personal credentials, and the dismissible video setup reminder.

## Privacy & Data

Fushi stores imported books, dictionaries, fonts, audiobook data, videos, reading progress, highlights, statistics, and settings in the app's local storage.

-   **Sync** — Google Drive / OneDrive / Dropbox use OAuth sign-in; WebDAV / FTP / SFTP / Fushi Server use the server address and credentials you provide. Fushi Interconnect connects paired devices directly (LAN, IPv6, overlay networks, or public addresses), falling back to an end-to-end iroh P2P tunnel when no direct route works; pairing links always ask for confirmation.
-   **Anki** — card creation talks to AnkiDroid or the AnkiConnect address you configure.
-   **Usage statistics** — once a day, desktop and Android builds send an install ID (a one-way hash of the system machine ID, unchanged after reinstalling; the machine ID itself is never sent), the app version, platform, and update channel to fushi.moe to count active users; no account, library, or reading data is included and IP addresses are not stored. Turn it off with _Share usage statistics_ in the update settings. iOS builds do not send it.
-   **Only when you ask** — log upload (after a one-time consent prompt), in-app feedback, and the leaderboard (off by default; uploads your library titles and progress only after you opt in).
-   **Manga OCR** — the default engine is the on-device CTC model, so page images stay local (download it once in settings); Google Lens is opt-in and sends the page image to Google.
-   **AI features** — requests go only to the LLM provider you configure and assign to a feature; with no provider assigned, nothing is sent.
-   **Third-party services** — metadata, subtitle, and online-source features contact the services listed under [Content sources and integrations](https://github.com/hajisensai/fushi#content-sources-and-integrations) only when you use them.

## Development Activity

[Development Activity](https://github.com/hajisensai/Fushi/commits/develop)

Day-to-day work lands on `develop`; `main` only receives release merges. The chart is displayed here on `main` but is generated from `develop`, so it reflects actual development rather than merge traffic.

The three lanes are the update channels the app itself offers, and each is scaled to its own peak — debug builds outnumber stable releases by two orders of magnitude, so a shared scale would flatten the other two lanes to nothing.

| Lane | What it counts | How you get it |
| --- | --- | --- |
| **Debug (rolling)** | Successful push builds of [release.yml](https://github.com/hajisensai/Fushi/blob/main/.github/workflows/release.yml) | Rolling prerelease, republished on every push |
| **Beta** | `v<version>-beta.<seq>` prereleases | Manually dispatched test build |
| **Stable** | `v<version>` releases | Latest release |

> The chart above is generated inside this repository (no third-party service) and refreshed daily by the [Update Dev Activity Chart](https://github.com/hajisensai/Fushi/blob/main/.github/workflows/dev-activity.yml) workflow.

## Star History

[GitHub stars](https://github.com/hajisensai/Fushi/stargazers)

[Star History](https://github.com/hajisensai/Fushi/stargazers)

> The chart above is generated inside this repository (no third-party service) and refreshed daily by the [Update Star History](https://github.com/hajisensai/Fushi/blob/main/.github/workflows/star-history.yml) workflow.

## Acknowledgments

Fushi builds on the following projects and ecosystem:

### Learning tools and prior art

| Project | Description |
| --- | --- |
| [jidoujisho](https://github.com/arianneorpilla/jidoujisho) | Japanese immersive learning tool |
| [Hoshi Reader](https://github.com/Manhhao/Hoshi-Reader) | iOS Japanese reader; reader paging engine reference |
| [Hoshi Reader Android](https://github.com/HuangAntimony/Hoshi-Reader-Android) | Android native Japanese reader |
| [hoshidicts](https://github.com/Manhhao/hoshidicts) | C++ dictionary engine |
| [Sasayaki](https://github.com/Manhhao/Hoshi-Reader/blob/develop/SASAYAKI.md) | Audiobook sync solution |
| [Tsubasa](https://github.com/SonicSandbox/Tsubasa-sync) | Subtitle-to-reference timing alignment algorithm (GPL-3.0); basis for auto-aligning downloaded subtitles to embedded tracks |
| [Yomitan](https://github.com/yomidevs/yomitan) | Dictionary format, transformation tables, and lookup experience reference |
| [Lapis](https://github.com/donkuri/lapis) | Anki note type |
| [AnkiDroid](https://github.com/ankidroid/Anki-Android) | Android card creation integration |
| [Ankiconnect Android](https://github.com/KamWithK/AnkiconnectAndroid) | Local audio and AnkiDroid interaction reference |
| [ッツ Ebook Reader](https://github.com/ttu-ttu/ebook-reader) | Reader, statistics, and sync compatibility reference |
| [media\_kit](https://github.com/media-kit/media-kit) | Flutter video playback framework (libmpv core) |
| [Niratan](https://github.com/W1ght/Niratan) | Immersion language learning suite for macOS |

### Engines and native components

| Project | Description |
| --- | --- |
| [LunaHook](https://github.com/HIllya51/LunaTranslator) | Galgame text hooking engine (vendored DLLs loaded by the injector) |
| [MinHook](https://github.com/TsudaKageyu/minhook) | Inline hooking library used by the galgame injector |
| [libtorrent](https://github.com/arvidn/libtorrent) | Built-in torrent download engine |
| [mpv](https://github.com/mpv-player/mpv) | libmpv playback core behind media\_kit |
| [FFmpeg](https://ffmpeg.org/) | Media probing, clipping, and audio extraction |
| [libplacebo](https://github.com/haasn/libplacebo) | GPU video shaders and HDR tone mapping |
| [flutter\_inappwebview](https://github.com/pichillilorenzo/flutter_inappwebview) | WebView engine that renders the EPUB reader |
| [ONNX Runtime](https://github.com/microsoft/onnxruntime) | On-device inference for speech recognition and OCR |
| [iroh](https://github.com/n0-computer/iroh) | P2P tunnel for remote Fushi Interconnect connections |
| [zstd](https://github.com/facebook/zstd) · [xxHash](https://github.com/Cyan4973/xxHash) · [libdeflate](https://github.com/ebiggers/libdeflate) · [glaze](https://github.com/stephenberry/glaze) · [unordered\_dense](https://github.com/martinus/unordered_dense) · [utf8proc](https://github.com/JuliaStrings/utf8proc) · [utfcpp](https://github.com/nemtrif/utfcpp) | Dictionary engine dependencies |

### On-device models

| Project | Description |
| --- | --- |
| [sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx) | Zipformer speech recognition model packages and VAD builds |
| [ReazonSpeech k2-v2](https://huggingface.co/reazon-research/reazonspeech-k2-v2) | Japanese speech recognition model |
| [Parakeet TDT-CTC 0.6B ja](https://huggingface.co/nvidia/parakeet-tdt_ctc-0.6b-ja) | Japanese speech recognition model |
| [Kitsune](https://huggingface.co/subthx/kitsune-onnx) | Japanese speech recognition model (CC BY-NC 4.0, downloaded from its Hugging Face repository) |
| [Omnilingual ASR](https://github.com/facebookresearch/omnilingual-asr) | Multilingual CTC speech recognition model |
| [Silero VAD](https://github.com/snakers4/silero-vad) | Voice activity detection model |
| [comic-text-and-bubble-detector](https://huggingface.co/ogkalu/comic-text-and-bubble-detector) | Manga text and speech bubble detection model |
| [manga-panel-detector-yolo26n](https://huggingface.co/leoxs22/manga-panel-detector-yolo26n) | Manga panel detection model, trained on [Manga109-s](http://www.manga109.org/en/download_s.html) |
| [PP-OCRv6](https://github.com/PaddlePaddle/PaddleOCR) small det / rec · [PP-OCRv6\_manga](https://huggingface.co/Kellenok/PP-OCRv6_manga) | Text line detection and recognition; the manga-tuned rec (trained with [Manga109-s](http://www.manga109.org/en/download_s.html) and [AnimeText](https://huggingface.co/datasets/deepghs/AnimeText)) powers the per-column CTC local OCR model |

> The manga panel detection model and PP-OCRv6\_manga are trained with the Manga109-s dataset (Matsui et al. 2017; Aizawa et al. 2020), whose terms require this use of the dataset to be clearly indicated. PP-OCRv6\_manga (Apache-2.0) is additionally trained with the AnimeText dataset, which is licensed CC BY-NC-SA 4.0; the app downloads that model from its Hugging Face repository and does not redistribute it.

### Content sources and integrations

| Project | Description |
| --- | --- |
| [Mihon](https://github.com/mihonapp/mihon) | Manga source extension ecosystem |
| [Aniyomi](https://github.com/aniyomiorg/aniyomi) | Anime source extension ecosystem (extensions-lib 14–16 hosted by the same runtime) |
| [M-Extension-Server](https://github.com/kodjodevf/M-Extension-Server) | Manga extension runtime for desktop (vendored, MPL-2.0) |
| [Mangayomi](https://github.com/kodjodevf/mangayomi) | Mihon / Aniyomi extension adaptation reference |
| [LNReader](https://github.com/LNReader/lnreader-plugins) | Light novel source plugin ecosystem |
| [Jellyfin](https://jellyfin.org/) · [Emby](https://emby.media/) · [Plex](https://www.plex.tv/) | Media servers browsable from the video library |
| [asbplayer](https://github.com/asbplayer/asbplayer) | Streaming subtitle bridge reference for the browser extension |
| [Shoko Server](https://github.com/ShokoAnime/ShokoServer) | Anime identification and scraping architecture reference |
| [ReinaManager](https://github.com/huoshen80/ReinaManager) | Galgame library information architecture reference |
| [AniDB](https://anidb.net/) | Anime, episode, and file identity |
| [MyAnimeList](https://myanimelist.net/) (via [Jikan](https://jikan.moe/)) | Anime metadata |
| [TMDB](https://www.themoviedb.org/) | Supplementary metadata and artwork |
| [VNDB](https://vndb.org/) | Visual novel metadata |
| [Jimaku](https://jimaku.cc/) | Japanese subtitle source |
| [OpenSubtitles](https://www.opensubtitles.com/) | Subtitle source |

> This application uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.

## License

Distributed under the GNU General Public License v3.0. See [LICENSE](https://github.com/hajisensai/Fushi/blob/main/LICENSE) for details.

## Maintainer

Fushi is maintained by [hajisensai](https://github.com/hajisensai). Website: [fushi.moe](https://fushi.moe/). Contact: [contact@fushi.moe](mailto:contact@fushi.moe). If Fushi helps you, you can support development, distribution and maintenance through [GitHub Sponsors](https://github.com/sponsors/hajisensai) or [Ko-fi](https://ko-fi.com/hajisensai).
<!-- lazynote:end -->
