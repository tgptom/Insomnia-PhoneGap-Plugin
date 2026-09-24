# cordova-plugin-insomnia

Prevent the screen of the mobile device from falling asleep.

## Installation

```bash
cordova plugin add cordova-plugin-insomnia
```

## Usage

```js
window.plugins.insomnia.keepAwake(successCallback, errorCallback);
window.plugins.insomnia.allowSleepAgain(successCallback, errorCallback);
```

## Compatibility verification status

This repository includes CI that generates a minimal Cordova fixture app, installs this plugin from the local checkout, and compiles native projects.

### Matrix configured in CI

| Platform | Version | Runner/toolchain |
| --- | --- | --- |
| cordova-android | 14.0.0 | `ubuntu-24.04`, Java 17, Android API 35 + Build Tools 35.0.0 |
| cordova-android | 15.0.0 | `ubuntu-24.04`, Java 17, Android API 36 + Build Tools 36.0.0 |
| cordova-ios | 7.1.1 | `macos-latest` (image Xcode shown in workflow logs) |
| cordova-ios | 8.0.0 | `macos-latest` (image Xcode shown in workflow logs) |
| JavaScript bridge | `www/Insomnia.js` | Node-based contract checks for `keepAwake` and `allowSleepAgain` |

### Latest evidence

- PR #2 (`copilot/modernize-cordova-plugin`) failed due workflow issues (fixture parent directory creation and Android setup action requesting legacy `tools`).
- This branch keeps the same matrix, fixes those workflow issues, and builds iOS with Xcode's generic iOS Simulator destination (`-destination=generic/platform=iOS Simulator`) to avoid hard-coding a simulator model that may be unavailable on `macos-latest`.
- Treat the matrix entries as **configured for validation**, not confirmed green, until the latest workflow run completes successfully.

## Important runtime caveat

A successful install/build proves packaging and compilation only. It does **not** prove physical-device screen-awake behavior. Validate `keepAwake` / `allowSleepAgain` on real Android and iOS devices.

## Local reproduction commands

Run from repository root:

```bash
REPO_ROOT="$(pwd)"
npm test
npm install -g cordova@12
```

### Android 14

```bash
TMP_DIR=/tmp/cordova-smoke-android-14
rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"
cordova create "$TMP_DIR/app" com.example.insomniafixture InsomniaFixture --no-telemetry
node "$REPO_ROOT/scripts/write-fixture-index.js" "$TMP_DIR/app/www/js/index.js"
cd "$TMP_DIR/app"
cordova plugin add "$REPO_ROOT" --no-telemetry
cordova platform add android@14.0.0 --no-telemetry
cordova build android --debug --no-telemetry
```

### Android 15

```bash
TMP_DIR=/tmp/cordova-smoke-android-15
rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"
cordova create "$TMP_DIR/app" com.example.insomniafixture InsomniaFixture --no-telemetry
node "$REPO_ROOT/scripts/write-fixture-index.js" "$TMP_DIR/app/www/js/index.js"
cd "$TMP_DIR/app"
cordova plugin add "$REPO_ROOT" --no-telemetry
cordova platform add android@15.0.0 --no-telemetry
cordova build android --debug --no-telemetry
```

### iOS 7

```bash
TMP_DIR=/tmp/cordova-smoke-ios-7
rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"
cordova create "$TMP_DIR/app" com.example.insomniafixture InsomniaFixture --no-telemetry
node "$REPO_ROOT/scripts/write-fixture-index.js" "$TMP_DIR/app/www/js/index.js"
cd "$TMP_DIR/app"
cordova plugin add "$REPO_ROOT" --no-telemetry
cordova platform add ios@7.1.1 --no-telemetry
cordova build ios --debug --no-telemetry --buildFlag="-destination=generic/platform=iOS Simulator"
```

### iOS 8

```bash
TMP_DIR=/tmp/cordova-smoke-ios-8
rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"
cordova create "$TMP_DIR/app" com.example.insomniafixture InsomniaFixture --no-telemetry
node "$REPO_ROOT/scripts/write-fixture-index.js" "$TMP_DIR/app/www/js/index.js"
cd "$TMP_DIR/app"
cordova plugin add "$REPO_ROOT" --no-telemetry
cordova platform add ios@8.0.0 --no-telemetry
cordova build ios --debug --no-telemetry --buildFlag="-destination=generic/platform=iOS Simulator"
```

## License

MIT
