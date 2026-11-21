---
title: Uniapp 多端统一适配方案
created: 2026-06-18
tags:
  - uniapp
  - frontend
  - mobile
  - vue3
  - guide
summary: 统一封装安全区、导航栏与键盘避让的 Uniapp 多端适配生产级方案
cover: /assets/default-cover.jpg
updated: 2026-08-10
lazynote_generated: true
lazynote_id: 99641ae6-957e-4264-bf56-8b51b4c5bf78
date: 2026-11-10
source: uniapp-cross-platform-layout.md
---

<!-- lazynote:body -->
---
title: Uniapp 多端统一适配方案
created: '2026-06-18'
tags:
  - uniapp
  - frontend
  - mobile
  - vue3
  - guide
summary: 统一封装安全区、导航栏与键盘避让的 Uniapp 多端适配生产级方案
cover: /assets/default-cover.jpg
updated: '2026-08-10'
---

可以。下面这套就是我建议你放进真实项目里的 **生产级稳定版本**。

它的设计原则是：

```text
安全区统一封装
顶部导航统一封装
底部安全区统一封装
键盘避让统一封装
微信小程序胶囊按钮自动避让
H5 / 小程序 / APP 都有 fallback
页面只写业务代码
```

生产项目里建议统一使用 `rpx`，不要继续大量写 `upx`。官方文档里也提到早期 uni-app 提供 `upx`，现在更推荐统一使用 `rpx`；另外 `uni.upx2px` 已标注废弃，建议用 `uni.rpx2px`。([uniapp.dcloud.net.cn][1])

---

# 一、最终目录结构

```text
src/
├─ hooks/
│  ├─ usePageLayout.js
│  └─ useKeyboard.js
│
├─ components/
│  └─ ProPage/
│     └─ ProPage.vue
│
├─ pages/
│  └─ index/
│     └─ index.vue
│
├─ pages.json
└─ manifest.json
```

这套方案主要依赖 `uni.getWindowInfo()` 获取 `statusBarHeight`、`safeArea`、`safeAreaInsets`、`windowWidth`、`windowHeight` 等窗口信息；其中安全区更建议使用 `safeAreaInsets`，因为 `safeArea` 本身理解和使用更容易出错。([uniapp.dcloud.net.cn][2])

---

# 二、`pages.json`

自定义导航栏时，页面要设置：

```json
"navigationStyle": "custom"
```

`pages.json` 本身就是用来配置页面路径、窗口样式、原生导航栏、tabBar 等内容的；官方文档也说明导航栏高度是 44px，不包含状态栏。([uniapp.dcloud.net.cn][3])

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationStyle": "custom",
        "navigationBarTitleText": "首页",
        "backgroundColor": "#f5f5f5"
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "项目名称",
    "navigationBarBackgroundColor": "#ffffff",
    "backgroundColor": "#f5f5f5"
  }
}
```

---

# 三、`manifest.json`

APP 端建议加上 `app-plus.safearea`，用于 iOS 底部安全区和安全区外背景适配。官方文档示例也是在 `manifest.json` 的 `"app-plus"` 节点下添加 `"safearea"`。([uniapp.dcloud.net.cn][4])

```json
{
  "name": "multi-adapt-demo",
  "appid": "__UNI__XXXXXXX",
  "description": "Uniapp 多端适配生产级示例",
  "versionName": "1.0.0",
  "versionCode": "100",
  "transformPx": false,

  "h5": {
    "title": "项目名称",
    "router": {
      "mode": "hash"
    }
  },

  "app-plus": {
    "usingComponents": true,
    "safearea": {
      "background": "#f5f5f5",
      "backgroundDark": "#111111",
      "bottom": {
        "offset": "none"
      }
    }
  },

  "mp-weixin": {
    "appid": "你的微信小程序appid",
    "setting": {
      "es6": true,
      "postcss": true,
      "minified": true
    },
    "usingComponents": true
  },

  "mp-alipay": {
    "appid": "你的支付宝小程序appid",
    "defaultTitle": "项目名称"
  }
}
```

注意这里是：

```json
"safearea"
```

不是：

```json
"safeArea"
```

---

# 四、Hook：`hooks/usePageLayout.js`

这个 Hook 负责：

```text
状态栏高度
安全区
窗口尺寸
平台信息
微信小程序胶囊按钮
横竖屏 / 窗口变化刷新
```

微信小程序、支付宝小程序等隐藏原生导航栏后，右上角仍可能有胶囊按钮，可以通过 `uni.getMenuButtonBoundingClientRect()` 获取位置，布局时要避开它。([uniapp.dcloud.net.cn][5])

```js
// hooks/usePageLayout.js

import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

function toNumber(value, fallback = 0) {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

function getBuildPlatform() {
  let platform = 'unknown'

  // #ifdef H5
  platform = 'h5'
  // #endif

  // #ifdef MP-WEIXIN
  platform = 'mp-weixin'
  // #endif

  // #ifdef MP-ALIPAY
  platform = 'mp-alipay'
  // #endif

  // #ifdef MP-TOUTIAO
  platform = 'mp-toutiao'
  // #endif

  // #ifdef MP-QQ
  platform = 'mp-qq'
  // #endif

  // #ifdef APP-PLUS
  platform = 'app-plus'
  // #endif

  return platform
}

function getWindowInfoSafe() {
  try {
    if (typeof uni.getWindowInfo === 'function') {
      return uni.getWindowInfo()
    }

    if (typeof uni.getSystemInfoSync === 'function') {
      return uni.getSystemInfoSync()
    }

    return {}
  } catch (error) {
    return {}
  }
}

function getDeviceInfoSafe() {
  try {
    if (typeof uni.getDeviceInfo === 'function') {
      return uni.getDeviceInfo()
    }

    return {}
  } catch (error) {
    return {}
  }
}

function getMenuButtonInfoSafe() {
  try {
    if (typeof uni.getMenuButtonBoundingClientRect === 'function') {
      return uni.getMenuButtonBoundingClientRect()
    }

    return null
  } catch (error) {
    return null
  }
}

export function usePageLayout(options = {}) {
  const defaultNavBarHeight = toNumber(options.navBarHeight, 44)
  const useCapsule = options.useCapsule !== false

  const buildPlatform = ref(getBuildPlatform())
  const devicePlatform = ref('')

  const statusBarHeight = ref(0)
  const navBarHeight = ref(defaultNavBarHeight)

  const screenWidth = ref(0)
  const screenHeight = ref(0)
  const windowWidth = ref(0)
  const windowHeight = ref(0)
  const windowTop = ref(0)
  const windowBottom = ref(0)
  const pixelRatio = ref(1)

  const safeAreaInsets = reactive({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  })

  const menuButton = reactive({
    visible: false,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  })

  const headerHeight = computed(() => {
    return statusBarHeight.value + navBarHeight.value
  })

  const capsuleRightSafeWidth = computed(() => {
    if (!menuButton.visible) return 0
    if (!windowWidth.value) return 0

    return Math.max(windowWidth.value - menuButton.left + 8, 0)
  })

  const cssVars = computed(() => {
    return {
      '--status-bar-height': `${statusBarHeight.value}px`,
      '--nav-bar-height': `${navBarHeight.value}px`,
      '--header-height': `${headerHeight.value}px`,
      '--safe-area-top': `${safeAreaInsets.top}px`,
      '--safe-area-right': `${safeAreaInsets.right}px`,
      '--safe-area-bottom': `${safeAreaInsets.bottom}px`,
      '--safe-area-left': `${safeAreaInsets.left}px`
    }
  })

  function updateSafeArea(windowInfo) {
    const statusFallback = toNumber(options.statusBarFallback, 0)
    statusBarHeight.value = toNumber(windowInfo.statusBarHeight, statusFallback)

    const sw = toNumber(windowInfo.screenWidth, 0)
    const sh = toNumber(windowInfo.screenHeight, 0)

    if (windowInfo.safeAreaInsets) {
      safeAreaInsets.top = toNumber(windowInfo.safeAreaInsets.top, 0)
      safeAreaInsets.right = toNumber(windowInfo.safeAreaInsets.right, 0)
      safeAreaInsets.bottom = toNumber(windowInfo.safeAreaInsets.bottom, 0)
      safeAreaInsets.left = toNumber(windowInfo.safeAreaInsets.left, 0)
      return
    }

    if (windowInfo.safeArea) {
      safeAreaInsets.top = toNumber(
        windowInfo.safeArea.top,
        statusBarHeight.value
      )

      safeAreaInsets.right = Math.max(
        sw - toNumber(windowInfo.safeArea.right, sw),
        0
      )

      safeAreaInsets.bottom = Math.max(
        sh - toNumber(windowInfo.safeArea.bottom, sh),
        0
      )

      safeAreaInsets.left = toNumber(windowInfo.safeArea.left, 0)
      return
    }

    safeAreaInsets.top = statusBarHeight.value
    safeAreaInsets.right = 0
    safeAreaInsets.bottom = 0
    safeAreaInsets.left = 0
  }

  function updateMenuButton() {
    if (!useCapsule) {
      menuButton.visible = false
      return
    }

    const info = getMenuButtonInfoSafe()

    if (!info || !info.width || !info.height) {
      menuButton.visible = false
      return
    }

    menuButton.visible = true
    menuButton.width = toNumber(info.width, 0)
    menuButton.height = toNumber(info.height, 0)
    menuButton.top = toNumber(info.top, 0)
    menuButton.right = toNumber(info.right, 0)
    menuButton.bottom = toNumber(info.bottom, 0)
    menuButton.left = toNumber(info.left, 0)

    const topGap = Math.max(menuButton.top - statusBarHeight.value, 0)
    const capsuleNavHeight = topGap * 2 + menuButton.height

    if (capsuleNavHeight > 0) {
      navBarHeight.value = Math.max(
        defaultNavBarHeight,
        Math.ceil(capsuleNavHeight)
      )
    }
  }

  function updateLayout() {
    const windowInfo = getWindowInfoSafe()
    const deviceInfo = getDeviceInfoSafe()

    buildPlatform.value = getBuildPlatform()
    devicePlatform.value = deviceInfo.platform || windowInfo.platform || ''

    pixelRatio.value = toNumber(windowInfo.pixelRatio, 1)

    screenWidth.value = toNumber(windowInfo.screenWidth, 0)
    screenHeight.value = toNumber(windowInfo.screenHeight, 0)
    windowWidth.value = toNumber(windowInfo.windowWidth, screenWidth.value)
    windowHeight.value = toNumber(windowInfo.windowHeight, screenHeight.value)
    windowTop.value = toNumber(windowInfo.windowTop, 0)
    windowBottom.value = toNumber(windowInfo.windowBottom, 0)

    navBarHeight.value = defaultNavBarHeight

    updateSafeArea(windowInfo)
    updateMenuButton()
  }

  let resizeListener = null

  onMounted(() => {
    updateLayout()

    if (typeof uni.onWindowResize === 'function') {
      resizeListener = function () {
        updateLayout()
      }

      uni.onWindowResize(resizeListener)
    }
  })

  onUnmounted(() => {
    if (
      resizeListener &&
      typeof uni.offWindowResize === 'function'
    ) {
      uni.offWindowResize(resizeListener)
    }
  })

  return {
    buildPlatform,
    devicePlatform,

    statusBarHeight,
    navBarHeight,
    headerHeight,

    screenWidth,
    screenHeight,
    windowWidth,
    windowHeight,
    windowTop,
    windowBottom,
    pixelRatio,

    safeAreaInsets,

    menuButton,
    capsuleRightSafeWidth,

    cssVars,

    updateLayout
  }
}
```

---

# 五、Hook：`hooks/useKeyboard.js`

这个 Hook 负责键盘高度监听。注意：`uni.onKeyboardHeightChange` 和 `uni.offKeyboardHeightChange` 在不同平台支持情况不完全一致，H5 端就不是完整支持，所以这里必须做 API 判断。([uniapp.dcloud.net.cn][6])

```js
// hooks/useKeyboard.js

import { ref, computed, onMounted, onUnmounted } from 'vue'

function toNumber(value, fallback = 0) {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

export function useKeyboard() {
  const keyboardHeight = ref(0)
  const supportKeyboardListener = ref(false)

  const isKeyboardShow = computed(() => {
    return keyboardHeight.value > 0
  })

  let listener = null

  onMounted(() => {
    if (typeof uni.onKeyboardHeightChange !== 'function') {
      supportKeyboardListener.value = false
      return
    }

    supportKeyboardListener.value = true

    listener = function (res) {
      keyboardHeight.value = toNumber(res && res.height, 0)
    }

    uni.onKeyboardHeightChange(listener)
  })

  onUnmounted(() => {
    if (!listener) return

    if (typeof uni.offKeyboardHeightChange === 'function') {
      uni.offKeyboardHeightChange(listener)
    }
  })

  return {
    keyboardHeight,
    isKeyboardShow,
    supportKeyboardListener
  }
}
```

---

# 六、生产级组件：`components/ProPage/ProPage.vue`

这个组件负责：

```text
顶部导航栏
状态栏占位
小程序胶囊避让
滚动区域
底部固定操作区
底部安全区
键盘避让
透明导航
沉浸式页面
全屏页面
```

```vue
<!-- components/ProPage/ProPage.vue -->

<template>
  <view class="pro-page" :style="pageStyle">
    <!-- 顶部导航栏 -->
    <view
      v-if="navbarVisible"
      class="pro-page__navbar"
      :class="{
        'pro-page__navbar--fixed': fixedNavbar,
        'pro-page__navbar--border': showNavbarBorder,
        'pro-page__navbar--transparent': isTransparentNavbar
      }"
      :style="navbarStyle"
    >
      <view
        class="pro-page__navbar-inner"
        :style="{ height: navBarHeight + 'px' }"
      >
        <view class="pro-page__navbar-left" @click="handleBack">
          <slot name="navbar-left">
            <text v-if="showBack" class="pro-page__back">‹</text>
          </slot>
        </view>

        <view class="pro-page__navbar-title">
          <slot name="title">
            <text class="pro-page__title-text">
              {{ title }}
            </text>
          </slot>
        </view>

        <view
          class="pro-page__navbar-right"
          :style="navbarRightStyle"
        >
          <slot name="navbar-right"></slot>
        </view>
      </view>
    </view>

    <!-- scroll-view 内容区 -->
    <scroll-view
      v-if="scroll"
      class="pro-page__content"
      scroll-y
      :style="contentStyle"
      :enable-back-to-top="enableBackToTop"
      :lower-threshold="lowerThreshold"
      :refresher-enabled="refresherEnabled"
      :refresher-triggered="refresherTriggered"
      @scroll="$emit('scroll', $event)"
      @scrolltolower="$emit('scrolltolower')"
      @refresherrefresh="$emit('refresherrefresh')"
    >
      <slot></slot>
    </scroll-view>

    <!-- 普通 view 内容区 -->
    <view
      v-else
      class="pro-page__content"
      :style="contentStyle"
    >
      <slot></slot>
    </view>

    <!-- 底部固定区域 -->
    <view
      v-if="hasFooter"
      class="pro-page__footer"
      :class="{ 'pro-page__footer--fixed': fixedFooter }"
      :style="footerStyle"
    >
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script setup>
import { computed, useSlots } from 'vue'
import { usePageLayout } from '@/hooks/usePageLayout.js'
import { useKeyboard } from '@/hooks/useKeyboard.js'

const props = defineProps({
  /**
   * 页面模式：
   * normal：普通页面
   * transparent：透明导航
   * immersive：沉浸式导航
   * fullscreen：全屏，不显示导航
   */
  mode: {
    type: String,
    default: 'normal'
  },

  title: {
    type: String,
    default: ''
  },

  showNavbar: {
    type: Boolean,
    default: true
  },

  showBack: {
    type: Boolean,
    default: false
  },

  autoBack: {
    type: Boolean,
    default: true
  },

  homeUrl: {
    type: String,
    default: ''
  },

  fixedNavbar: {
    type: Boolean,
    default: true
  },

  navBarHeight: {
    type: Number,
    default: 44
  },

  navBackground: {
    type: String,
    default: '#ffffff'
  },

  navColor: {
    type: String,
    default: '#111111'
  },

  navBorder: {
    type: Boolean,
    default: true
  },

  reserveCapsule: {
    type: Boolean,
    default: true
  },

  scroll: {
    type: Boolean,
    default: true
  },

  background: {
    type: String,
    default: '#f5f5f5'
  },

  contentPadding: {
    type: String,
    default: '24rpx'
  },

  contentTopExtra: {
    type: Number,
    default: 0
  },

  contentBottomExtra: {
    type: Number,
    default: 0
  },

  safeTop: {
    type: Boolean,
    default: true
  },

  safeBottom: {
    type: Boolean,
    default: true
  },

  topSafeFallback: {
    type: Number,
    default: 0
  },

  bottomSafeFallback: {
    type: Number,
    default: 0
  },

  footerHeight: {
    type: Number,
    default: 120
  },

  fixedFooter: {
    type: Boolean,
    default: true
  },

  avoidKeyboard: {
    type: Boolean,
    default: false
  },

  keyboardOffset: {
    type: Number,
    default: 0
  },

  enableBackToTop: {
    type: Boolean,
    default: true
  },

  lowerThreshold: {
    type: Number,
    default: 80
  },

  refresherEnabled: {
    type: Boolean,
    default: false
  },

  refresherTriggered: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'back',
  'scroll',
  'scrolltolower',
  'refresherrefresh'
])

const slots = useSlots()

const {
  statusBarHeight,
  navBarHeight,
  headerHeight,
  windowWidth,
  windowHeight,
  safeAreaInsets,
  capsuleRightSafeWidth,
  cssVars,
  updateLayout
} = usePageLayout({
  navBarHeight: props.navBarHeight,
  useCapsule: props.reserveCapsule
})

const {
  keyboardHeight,
  isKeyboardShow
} = useKeyboard()

const hasFooter = computed(() => {
  return Boolean(slots.footer)
})

const navbarVisible = computed(() => {
  if (props.mode === 'fullscreen') return false
  return props.showNavbar
})

const isTransparentNavbar = computed(() => {
  return props.mode === 'transparent' || props.mode === 'immersive'
})

const showNavbarBorder = computed(() => {
  if (!props.navBorder) return false
  if (isTransparentNavbar.value) return false
  return true
})

function rpx2px(value) {
  try {
    if (typeof uni.rpx2px === 'function') {
      return uni.rpx2px(value)
    }
  } catch (error) {}

  if (!windowWidth.value) return value

  return windowWidth.value / 750 * value
}

const contentTopExtraPx = computed(() => {
  return rpx2px(props.contentTopExtra)
})

const contentBottomExtraPx = computed(() => {
  return rpx2px(props.contentBottomExtra)
})

const footerHeightPx = computed(() => {
  return rpx2px(props.footerHeight)
})

const realSafeTop = computed(() => {
  if (!props.safeTop) return 0

  return Math.max(
    safeAreaInsets.top || statusBarHeight.value || 0,
    props.topSafeFallback
  )
})

const realSafeBottom = computed(() => {
  if (!props.safeBottom) return 0

  return Math.max(
    safeAreaInsets.bottom || 0,
    props.bottomSafeFallback
  )
})

const pageStyle = computed(() => {
  return {
    ...cssVars.value,
    minHeight: windowHeight.value ? `${windowHeight.value}px` : '100vh',
    backgroundColor: props.background,
    color: props.navColor
  }
})

const navbarStyle = computed(() => {
  return {
    height: `${headerHeight.value}px`,
    paddingTop: `${statusBarHeight.value}px`,
    backgroundColor: isTransparentNavbar.value
      ? 'transparent'
      : props.navBackground,
    color: props.navColor
  }
})

const navbarRightStyle = computed(() => {
  if (!props.reserveCapsule) {
    return {
      right: '0px'
    }
  }

  return {
    right: `${capsuleRightSafeWidth.value}px`
  }
})

const contentPaddingTopPx = computed(() => {
  if (props.mode === 'fullscreen') {
    return realSafeTop.value + contentTopExtraPx.value
  }

  if (!navbarVisible.value) {
    return realSafeTop.value + contentTopExtraPx.value
  }

  if (props.fixedNavbar) {
    return headerHeight.value + contentTopExtraPx.value
  }

  return contentTopExtraPx.value
})

const footerBottomPx = computed(() => {
  if (!props.avoidKeyboard) return 0

  return Math.max(
    keyboardHeight.value + props.keyboardOffset,
    0
  )
})

const footerPaddingBottomPx = computed(() => {
  if (!props.safeBottom) return 0

  // 键盘弹起时不要再叠加底部安全区，避免底部区域过高
  if (isKeyboardShow.value) return 0

  return realSafeBottom.value
})

const contentPaddingBottomPx = computed(() => {
  let bottom = contentBottomExtraPx.value

  if (hasFooter.value && props.fixedFooter) {
    bottom += footerHeightPx.value
    bottom += realSafeBottom.value
  } else {
    bottom += realSafeBottom.value
  }

  return bottom
})

const contentStyle = computed(() => {
  return {
    height: windowHeight.value ? `${windowHeight.value}px` : '100vh',
    paddingTop: `${contentPaddingTopPx.value}px`,
    paddingBottom: `${contentPaddingBottomPx.value}px`,
    paddingLeft: props.contentPadding,
    paddingRight: props.contentPadding,
    backgroundColor: props.background
  }
})

const footerStyle = computed(() => {
  return {
    minHeight: `${footerHeightPx.value}px`,
    paddingBottom: `${footerPaddingBottomPx.value}px`,
    bottom: `${footerBottomPx.value}px`,
    backgroundColor: '#ffffff'
  }
})

function handleBack() {
  emit('back')

  if (!props.autoBack) return
  if (!props.showBack) return

  const pages = getCurrentPages()

  if (pages.length > 1) {
    uni.navigateBack()
    return
  }

  if (props.homeUrl) {
    uni.reLaunch({
      url: props.homeUrl
    })
  }
}

defineExpose({
  updateLayout
})
</script>

<style scoped>
.pro-page {
  position: relative;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

.pro-page__navbar {
  width: 100%;
  z-index: 999;
  box-sizing: border-box;
}

.pro-page__navbar--fixed {
  position: fixed;
  top: 0;
  left: 0;
}

.pro-page__navbar--border {
  border-bottom: 1px solid #eeeeee;
}

.pro-page__navbar--transparent {
  border-bottom: none;
}

.pro-page__navbar-inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.pro-page__navbar-left,
.pro-page__navbar-right {
  position: absolute;
  top: 0;
  height: 100%;
  min-width: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.pro-page__navbar-left {
  left: 0;
}

.pro-page__navbar-right {
  right: 0;
}

.pro-page__back {
  font-size: 56rpx;
  line-height: 1;
  color: inherit;
}

.pro-page__navbar-title {
  max-width: 480rpx;
  text-align: center;
  overflow: hidden;
}

.pro-page__title-text {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.pro-page__content {
  width: 100%;
  box-sizing: border-box;
}

.pro-page__footer {
  width: 100%;
  padding: 20rpx 24rpx;
  box-sizing: border-box;
  z-index: 1000;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.04);
}

.pro-page__footer--fixed {
  position: fixed;
  left: 0;
}

/* H5 端防横向溢出 */
/* #ifdef H5 */
.pro-page,
.pro-page__content {
  overflow-x: hidden;
}
/* #endif */
</style>
```

---

# 七、页面使用示例：`pages/index/index.vue`

页面里现在只写业务，不再管安全区。

```vue
<template>
  <ProPage
    ref="pageRef"
    title="首页"
    mode="normal"
    :show-back="false"
    :scroll="true"
    background="#f5f5f5"
    nav-background="#ffffff"
    nav-color="#111111"
    content-padding="24rpx"
    :footer-height="120"
    :bottom-safe-fallback="0"
    safe-bottom
    avoid-keyboard
    @scrolltolower="loadMore"
  >
    <template #navbar-right>
      <text class="nav-action" @click="goSetting">
        设置
      </text>
    </template>

    <view class="card">
      <text class="title">Uniapp 多端适配</text>
      <text class="desc">
        H5 / 小程序 / APP 一套生产级组件适配
      </text>
    </view>

    <view class="card">
      <input
        class="input"
        placeholder="请输入内容"
        adjust-position
        :cursor-spacing="100"
      />
    </view>

    <!-- #ifdef H5 -->
    <view class="card">
      <text>当前是 H5 端</text>
    </view>
    <!-- #endif -->

    <!-- #ifdef MP-WEIXIN -->
    <view class="card">
      <text>当前是微信小程序端</text>
    </view>
    <!-- #endif -->

    <!-- #ifdef APP-PLUS -->
    <view class="card">
      <text>当前是 APP 端</text>
    </view>
    <!-- #endif -->

    <template #footer>
      <button class="submit-btn" @click="handleSubmit">
        提交
      </button>
    </template>
  </ProPage>
</template>

<script setup>
import { ref } from 'vue'
import ProPage from '@/components/ProPage/ProPage.vue'

const pageRef = ref(null)

function handleSubmit() {
  uni.showToast({
    title: '提交成功',
    icon: 'success'
  })
}

function goSetting() {
  uni.showToast({
    title: '点击设置',
    icon: 'none'
  })
}

function loadMore() {
  console.log('触底加载更多')
}
</script>

<style scoped>
.card {
  margin-bottom: 24rpx;
  padding: 32rpx;
  border-radius: 24rpx;
  background-color: #ffffff;
}

.title {
  display: block;
  font-size: 36rpx;
  font-weight: 700;
  color: #111111;
}

.desc {
  display: block;
  margin-top: 16rpx;
  font-size: 26rpx;
  color: #666666;
}

.input {
  width: 100%;
  height: 88rpx;
  padding: 0 24rpx;
  border-radius: 16rpx;
  background-color: #f5f5f5;
  font-size: 28rpx;
  box-sizing: border-box;
}

.submit-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 44rpx;
  background-color: #007aff;
  color: #ffffff;
  font-size: 30rpx;
}

.submit-btn::after {
  border: none;
}

.nav-action {
  font-size: 28rpx;
  color: #007aff;
}
</style>
```

---

# 八、常用扩展方式

## 1. 透明导航详情页

```vue
<ProPage
  title="详情"
  mode="transparent"
  nav-color="#ffffff"
  background="#000000"
>
  页面内容
</ProPage>
```

---

## 2. 沉浸式活动页

```vue
<ProPage
  mode="immersive"
  title=""
  nav-color="#ffffff"
  background="#111111"
  :nav-border="false"
>
  活动页内容
</ProPage>
```

---

## 3. 全屏地图 / 视频页

这类页面不要强行套普通导航，因为 `map`、`video`、`camera`、`web-view` 等原生组件可能存在层级问题，普通 `view` 导航栏不一定能盖住它们。

```vue
<ProPage
  mode="fullscreen"
  :scroll="false"
  :safe-top="false"
  :safe-bottom="false"
  content-padding="0"
>
  <map class="map" />
</ProPage>
```

---

## 4. 有原生 tabBar 的页面

如果页面底部已经有原生 tabBar，就不要再额外加底部安全区：

```vue
<ProPage
  title="我的"
  :safe-bottom="false"
>
  页面内容
</ProPage>
```

---

## 5. 表单页键盘避让

组件层面：

```vue
<ProPage avoid-keyboard>
  表单内容
</ProPage>
```

input 层面仍建议保留：

```vue
<input
  adjust-position
  :cursor-spacing="100"
/>
```

这样比只靠键盘监听更稳。

---

# 九、这套为什么更稳定？

这套组件做了 7 个生产级加固：

```text
1. 优先使用 uni.getWindowInfo()
2. fallback 到 uni.getSystemInfoSync()
3. 优先使用 safeAreaInsets.bottom，而不是 safeArea.bottom
4. 支持小程序胶囊按钮自动避让
5. H5 不依赖纯 100vh，优先使用 windowHeight
6. 键盘监听做 API 存在性判断
7. APP 端配合 manifest.json 的 app-plus.safearea
```

最终你项目里就形成一个规范：

```text
页面统一用 ProPage
尺寸统一用 rpx
顶部统一交给组件
底部统一交给组件
安全区统一走 usePageLayout
键盘统一走 useKeyboard
特殊页面单独通过 mode 控制
```

这套已经比“每个页面自己写安全区”稳定很多，可以作为 Uniapp 多端项目的基础布局组件使用。

[1]: https://uniapp.dcloud.net.cn/tutorial/syntax-css.html?utm_source=chatgpt.com "页面样式与布局| uni-app官网"
[2]: https://uniapp.dcloud.net.cn/api/system/getWindowInfo.html?utm_source=chatgpt.com "uni.getWindowInfo() | uni-app官网"
[3]: https://uniapp.dcloud.net.cn/collocation/pages.html?utm_source=chatgpt.com "pages.json 页面路由| uni-app官网"
[4]: https://uniapp.dcloud.net.cn/tutorial/darkmode.html?utm_source=chatgpt.com "DarkMode 适配指南 - uni-app官网"
[5]: https://uniapp.dcloud.net.cn/api/ui/menuButton?utm_source=chatgpt.com "getMenuButtonBoundingClientR..."
[6]: https://uniapp.dcloud.net.cn/api/key?utm_source=chatgpt.com "uni.hideKeyboard() - uni-app官网"

<!-- lazynote:end -->
