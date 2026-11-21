---
title: "GitHub - RSamaium/RPG-JS: Framework to create an RPG or MMORPG (with the
  same code) in the browser with Typescript"
lazynote_generated: true
lazynote_id: e630b0cb-5d38-4caa-ae2d-fdd5dbd29014
tags:
  - RPGJS
  - MMORPG
  - 游戏开发
  - TypeScript
  - 客户端预测
date: 2026-11-11
source: links.md
url: https://github.com/RSamaium/RPG-JS
resource_type: article
description: Framework to create an RPG or MMORPG (with the same code) in the
  browser with Typescript - RSamaium/RPG-JS
site_name: GitHub
author: null
resolved_url: https://github.com/RSamaium/RPG-JS
metadata_status: saved
metadata_error: null
collection_status: saved
collection_error: null
tag_status: tagged
tag_error: null
---

<!-- lazynote:body -->
[RPGJS](https://github.com/RSamaium/RPG-JS/blob/v5/header.png)

**Build the RPG you always wanted to make — then put it online as an MMORPG, with the same code.**

[npm version](https://www.npmjs.com/package/@rpgjs/server) [Downloads](https://www.npmjs.com/package/@rpgjs/server) [MIT License](https://github.com/RSamaium/RPG-JS/blob/v5/LICENSE) [GitHub stars](https://github.com/RSamaium/RPG-JS/stargazers) [Discord](https://discord.com/invite/W38yDyGfwC) [Follow on X](https://x.com/rpgjs_dev)

[**Quick start**](https://v5.rpgjs.dev/guide/quick-start) · [Documentation](https://v5.rpgjs.dev/) · [Watch the intro](https://youtu.be/JYzx0JG_cts) · [Discord](https://discord.com/invite/W38yDyGfwC)

[Real-time action combat running in RPGJS](https://github.com/RSamaium/RPG-JS/blob/v5/docs/assets/readme/action-battle.gif)

RPGJS is a TypeScript framework for 2D RPGs and MMORPGs in the browser. Maps, events, dialogs, inventory, skills, combat, save/load, GUI and multiplayer synchronization are already there — you write the game, not the engine.

## 🎬 See it in action

|  |  |  |
| --- | --- | --- |
| [Build an RPG Once, Run It as an MMORPG \| RPGJS Explained](https://youtu.be/JYzx0JG_cts) | [From Empty Folder to Multiplayer RPG in 5 Steps \| RPGJS Tutorial](https://youtu.be/FxKeLzf4yLM) | [Spritesheets & Maps in RPGJS: Tiled or Your Own Map System](https://youtu.be/5U81jlK-ZV8) |
| **RPGJS explained** Build an RPG once, run it as an MMORPG | **Getting started tutorial** From an empty folder to a multiplayer RPG in 5 steps | **Spritesheets & maps tutorial** Tiled or your own map system |

## 🚀 Your first game in 30 seconds

```shell
npx degit rpgjs/starter#v5 my-rpg-game
cd my-rpg-game
npm install
npm run dev
```

```adblock
  VITE v8.0.16  ready in 654 ms

  ➜  Local:   http://localhost:5173/

  RPGJS v5.0.0  RPG

  ➜  Game:    ./src/standalone.ts
  ➜  Server:  runs in the browser (standalone)
```

Open the link: your hero is already walking around a map. Prefer to follow along? Watch the [5-step getting started tutorial](https://youtu.be/FxKeLzf4yLM).

## 🌐 One codebase, two games

The gameplay you write runs on a server-owned model from day one. Switching from a single-player RPG to an MMORPG is a runtime choice, not a rewrite.

| Standalone RPG | MMORPG |
| --- | --- |
| ```ts startGame({ ...config, providers: [provideRpg(startServer)], }); ``` ```shell npm run dev ``` | ```ts startGame({ ...config, providers: [provideMmorpg({})], }); ``` ```shell RPG_TYPE=mmorpg npm run dev ``` |

In MMORPG mode the server stays authoritative, each map becomes a synchronized room, and the client predicts movement so the game still feels instant.

## ✨ Gameplay reads like a script

```ts
import { type EventDefinition, type RpgPlayer } from "@rpgjs/server";

export function Merchant(): EventDefinition {
  return {
    name: "Merchant",
    onInit() {
      this.setGraphic("merchant");
    },
    async onAction(player: RpgPlayer) {
      const choice = await player.showChoices("Need something for the road?", [
        { text: "A potion (20 gold)", value: "potion" },
        { text: "Just looking", value: "no" },
      ]);

      if (choice?.value === "potion" && player.gold >= 20) {
        player.gold -= 20;
        player.addItem("potion");
        await player.showText("Safe travels!");
      }
    },
  };
}
```

Want enemies that fight back? Give an event a battle AI:

```ts
new BattleAi(this, { enemyType: EnemyType.Aggressive });
```

## 🎨 Beautiful by default

|  |  |
| --- | --- |
| [A map made with RPGJS Studio](https://github.com/RSamaium/RPG-JS/blob/v5/docs/assets/readme/studio-map.jpg) | [The prebuilt character selection screen](https://github.com/RSamaium/RPG-JS/blob/v5/docs/assets/readme/character-select.jpg) |
| Maps painted in [RPGJS Studio](https://v5.rpgjs.dev/studio/index) or [Tiled](https://v5.rpgjs.dev/tiled/) | Prebuilt, themeable game screens |

## 🧰 What's in the box

|  |  |
| --- | --- |
| 🗺️ **World** | Maps, world maps, Tiled support, events, shared and per-player scenarios, weather, lighting, day/night |
| ⚔️ **Gameplay** | Items, skills, states, classes, real-time [action battle](https://v5.rpgjs.dev/guide/battle-ai), projectiles, hotbar, save/load |
| 🌐 **Multiplayer** | Authoritative server, map rooms, client prediction and reconciliation, live map updates, [accounts](https://v5.rpgjs.dev/gui/account), [chat](https://v5.rpgjs.dev/gui/chat) |
| 🖼️ **Interface** | Title screen, dialogs, menus, shop, HUD, character select, [themes](https://v5.rpgjs.dev/gui/theming), mobile controls, gamepad, Vue overlays |
| 🌍 **i18n** | One translation catalog for server dialogs, client menus and modules |
| 🛠️ **Tooling** | TypeScript first, Vite, Vitest testing helpers, dependency injection, modules and plugins |
| ☁️ **Deploy** | [Node or Cloudflare Workers](https://v5.rpgjs.dev/guide/deploy-mmorpg), with no lock-in to a database or host |

## 🤖 Build it with your AI assistant

Teach your coding assistant how RPGJS v5 works:

```shell
npx skills add https://github.com/RSamaium/RPG-JS#v5
```

## 📚 Learn

1.  [Quick start](https://v5.rpgjs.dev/guide/quick-start) and [project structure](https://v5.rpgjs.dev/guide/structure)
2.  [Create your first map](https://v5.rpgjs.dev/guide/create-your-first-map) and [an event](https://v5.rpgjs.dev/guide/create-event)
3.  [Design your GUI](https://v5.rpgjs.dev/gui/)
4.  [Save and load](https://v5.rpgjs.dev/guide/save-load), [translate your game](https://v5.rpgjs.dev/guide/i18n)
5.  [Put your MMORPG online](https://v5.rpgjs.dev/guide/deploy-mmorpg)

Want the ideas behind the architecture? Read the [RPGJS philosophy](https://github.com/RSamaium/RPG-JS/blob/v5/docs/philosophy.md).

**Coming from RPGJS v4?** `compatibilityV4Plugin()` from `@rpgjs/vite` runs a v4 project layout on the v5 runtime. See the [migration guide](https://v5.rpgjs.dev/guide/v4-compatibility).

## 💬 Community

-   Questions, ideas and showcases: [Discord](https://discord.com/invite/W38yDyGfwC)
-   News and updates: [@rpgjs\_dev on X](https://x.com/rpgjs_dev)
-   Bugs: [GitHub Issues](https://github.com/RSamaium/RPG-JS/issues)
-   Want to contribute? Start with [CONTRIBUTING.md](https://github.com/RSamaium/RPG-JS/blob/v5/CONTRIBUTING.md)

If RPGJS helps you build your game, a ⭐ on GitHub helps others find it.

## License

MIT — free for commercial use.
<!-- lazynote:end -->
