---
title: iOS 签名体系详解
created: 2026-07-16
tags:
  - ios
  - mobile
  - guide
  - app
  - workflow
summary: 完整解析 iOS 签名体系中 Certificates、Profiles 等核心概念与关联
cover: /assets/default-cover.jpg
updated: 2026-08-10
lazynote_generated: true
lazynote_id: 7a73095f-91f2-41d6-84b7-4b757c9172e6
date: 2026-11-10
source: ios-signing-system-guide.md
---

<!-- lazynote:body -->
---
title: iOS 签名体系详解
created: '2026-07-16'
tags:
  - ios
  - mobile
  - guide
  - app
  - workflow
summary: 完整解析 iOS 签名体系中 Certificates、Profiles 等核心概念与关联
cover: /assets/default-cover.jpg
updated: '2026-08-10'
---

# iOS 签名体系详解：Certificates、Identifiers、Devices、Profiles、Keys 到底是什么？

> 很多第一次接触 iOS 发布流程的开发者，打开 Apple Developer 后台都会看到这一堆概念：

- Certificates
- Identifiers
- Devices
- Profiles
- Keys
- Services

然后产生疑问：

> 为什么 iOS 打包需要这么多东西？
> 一个证书不能直接打包吗？
> mobileprovision 是干什么的？
> p12 文件为什么还需要密码？
> App 为什么必须绑定 Bundle ID？

本文将从原理出发，完整解释 Apple Developer 后台这几个模块的作用，以及它们之间的关系。

---

# 一、为什么 iOS 需要签名？

在 Android 世界里，一个 APK 通常可以直接安装。

但是 iOS 不一样。

苹果希望保证：

1. App 来自可信开发者
2. App 没有被第三方篡改
3. App 只能使用授权的系统能力
4. App 只能安装在允许的设备上

因此 iOS 引入了：

> **代码签名（Code Signing）机制**

简单理解：

一个 iOS App 从代码到用户手机，需要经历：

```
源代码
   |
   |
编译
   |
   |
签名
   |
   |
IPA
   |
   |
iPhone验证
   |
   |
允许运行
```

其中签名过程需要：

- Certificate（证书）
- Private Key（私钥）
- Provisioning Profile（描述文件）

---

# 二、Apple Developer 后台整体关系

先看整体结构：

```
                 Apple Developer

                       |
        --------------------------------
        |              |              |
   Identifier     Certificate       Device

        \              |              /

             Provisioning Profile

                       |

                    IPA 文件

                       |

                  用户设备运行
```

简单解释：

| 对象        | 作用                  |
| ----------- | --------------------- |
| Identifier  | 定义 App 是谁         |
| Certificate | 证明开发者身份        |
| Device      | 定义哪些设备可以安装  |
| Profile     | 组合授权规则          |
| Keys        | 服务器访问 Apple 服务 |
| Services    | 开启 Apple 能力       |

---

# 三、Identifiers：App 的身份证

## 1. 什么是 Identifier？

Identifier 是 App 在 Apple 系统中的唯一标识。

通常就是：

```
Bundle ID
```

例如：

```
com.company.crm
```

它类似于：

- 网站域名
- 手机号码
- 身份证号码

全球唯一。

---

## 2. 为什么需要 Bundle ID？

假设两个开发者：

开发者 A：

```
com.test.app
```

开发者 B：

```
com.test.app
```

Apple 无法判断：

```
这个 App 到底属于谁？
```

所以 Apple 要求：

每个 App 必须拥有唯一 Bundle ID。

通常格式：

```
com.公司名.产品名
```

例如：

```
com.alibaba.taobao

com.tencent.wechat
```

---

# 3. Identifier 还能控制 App 能力

Identifier 不只是名字。

它还管理 App 能使用哪些 Apple 服务。

例如：

## 推送通知

开启：

```
Push Notifications
```

代表：

这个 App 允许使用 APNs 推送。

流程：

```
业务服务器

    |

Apple APNs

    |

用户手机
```

---

## Associated Domains

用于：

Universal Link。

例如：

用户点击：

```
https://company.com/order/123
```

系统可以直接打开 App。

---

## Sign in with Apple

用于：

苹果账号登录。

---

所以：

Identifier =

```
App是谁

+

App允许使用什么能力
```

---

# 四、Certificates：证明你是谁

## 1. 什么是 Certificate？

Certificate：

中文：

> 签名证书

作用：

告诉 Apple：

> 这个 App 是哪个开发者签名的。

类似现实中的：

身份证。

例如：

```
张三开发者证书
```

代表：

```
这个 App 是张三账号生成的
```

---

# 2. Certificate 包含什么？

证书本身：

```
Certificate
+
Public Key
```

但是签名还需要：

```
Private Key
```

完整关系：

```
Certificate

      +

Private Key

      |

      ↓

代码签名能力
```

---

所以导出时：

不是导出 `.cer`

而是：

```
.p12
```

因为：

p12 包含：

```
证书

+

私钥
```

---

# 3. Certificate 类型

## Apple Development

用途：

开发测试。

例如：

```
Xcode

    |

安装到自己的 iPhone

```

---

## Apple Distribution

用途：

发布。

包括：

### App Store

上传：

```
IPA

↓

App Store Connect

↓

审核发布
```

### Ad Hoc

企业内部测试：

```
IPA

↓

员工手机
```

---

简单记：

| 证书         | 用途      |
| ------------ | --------- |
| Development  | 开发测试  |
| Distribution | 发布/分发 |

---

# 五、Devices：允许哪些手机安装

## 1. 什么是 Device？

Device 表示：

允许测试 App 的设备。

每台 iPhone 有唯一：

```
UDID
```

类似：

手机身份证。

例如：

```
iPhone 15

UDID:
00008110xxxxxxxx
```

---

# 2. 为什么需要 Device？

因为 iOS 不允许：

随便一个 IPA 安装到任何手机。

例如公司内部测试：

有：

```
10个测试人员
```

那么需要：

添加：

```
员工1 iPhone

员工2 iPhone

员工3 iPhone

...
```

然后生成测试描述文件。

---

# 3. Device 什么时候需要？

需要：

✅ Development 测试

✅ Ad Hoc 分发

不需要：

❌ App Store 发布

因为 App Store 用户数量无限。

---

# 六、Profiles：真正控制 App 安装的授权文件

这是最容易理解错的地方。

## 1. 什么是 Provisioning Profile？

中文：

> 描述文件

它是：

Apple 把多个信息组合后的授权文件。

包含：

```
Identifier

+

Certificate

+

Device

+

权限
```

---

例如：

你创建：

App:

```
com.company.crm
```

证书：

```
Apple Distribution
```

设备：

```
测试iPhone
```

Apple生成：

```
CRM.mobileprovision
```

里面写：

```
允许：

这个证书

签名这个App

安装到这些设备
```

---

# 2. Profile 类型

## Development Profile

开发：

```
代码

↓

Xcode

↓

测试手机
```

包含：

```
Development Certificate

+

Device
```

---

## Ad Hoc Profile

内部测试：

```
IPA

↓

指定设备
```

包含：

```
Distribution Certificate

+

Device列表
```

---

## App Store Profile

发布：

```
IPA

↓

App Store
```

没有设备限制。

---

# 七、Keys：服务器访问 Apple 的身份

Keys 和 Certificate 不一样。

Certificate：

用于：

```
App签名
```

Keys：

用于：

```
服务器调用 Apple API
```

---

例如：

## APNs 推送

以前：

使用：

```
Push Certificate
```

现在推荐：

```
APNs Auth Key
```

生成：

```
.p8文件
```

服务器保存：

```
AuthKey_xxxxx.p8
```

然后：

```
服务器

 |

Apple APNs

 |

用户手机
```

---

## App Store Connect API

例如自动化：

- 上传 IPA
- 管理 TestFlight
- 获取构建信息

CI/CD：

```
GitHub Actions

        |

        |

Apple API

```

需要 Key。

---

# 八、Services：Apple 能力开关

Services 用于管理 Apple 提供的功能。

常见：

| 服务               | 用途     |
| ------------------ | -------- |
| Push Notifications | 消息推送 |
| Apple Pay          | 支付     |
| Game Center        | 游戏服务 |
| Sign in with Apple | 苹果登录 |
| iCloud             | 云同步   |
| Maps               | 地图     |

---

开启服务后：

Identifier 才拥有对应能力。

例如：

没有开启：

```
Push Notifications
```

你的 App：

无法正常接收 APNs 推送。

---

# 九、一次完整 iOS 发布流程

假设开发一个企业 CRM App。

## 第一步：创建 Identifier

创建：

```
com.company.crm
```

开启：

```
Push Notifications
```

结果：

Apple知道：

```
CRM这个App存在
```

---

## 第二步：创建 Certificate

创建：

```
Apple Distribution Certificate
```

结果：

获得：

```
xxx.p12
```

用于签名。

---

## 第三步：创建 Profile

选择：

```
Identifier:

com.company.crm


Certificate:

Apple Distribution
```

生成：

```
CRM.mobileprovision
```

---

## 第四步：云编译或者 Xcode 打包

输入：

```
源码

+

p12

+

p12密码

+

mobileprovision
```

生成：

```
CRM.ipa
```

---

## 第五步：安装或发布

### App Store

流程：

```
IPA

↓

App Store Connect

↓

审核

↓

用户下载
```

---

### 企业测试

流程：

```
IPA

↓

Ad Hoc

↓

测试人员手机
```

---

# 十、YonBuilder 云编译需要哪些？

如果使用 YonBuilder 或其他云打包平台：

通常需要：

## 必需

### 1. Bundle ID

例如：

```
com.company.app
```

### 2. Distribution Certificate

导出：

```
.p12
```

### 3. Provisioning Profile

文件：

```
.mobileprovision
```

### 4. p12密码

---

## 根据需求

如果测试安装：

需要：

```
Device UDID

+

Ad Hoc Profile
```

如果推送：

需要：

```
APNs Key
```

或者：

```
推送证书
```

---

# 十一、最终理解图

```
                 Apple Developer


Identifier
(App是谁)

      |

      |

Certificate
(你是谁)

      |

      |

Device
(装在哪里)

      |

      |

Provisioning Profile
(授权组合)

      |

      |

       IPA

      |

      |

    iPhone运行
```

---

# 十二、一句话总结

如果把 iOS 发布比作开车：

| 概念        | 类似             |
| ----------- | ---------------- |
| Identifier  | 车辆登记号       |
| Certificate | 驾驶员身份证     |
| Private Key | 签名密码         |
| Device      | 允许进入的道路   |
| Profile     | 车辆通行证       |
| Keys        | 后台系统访问钥匙 |
| Services    | 车辆功能许可     |

理解这几个概念之后，iOS 签名、云编译、App Store 发布、企业测试都会变得非常清晰。

<!-- lazynote:end -->
