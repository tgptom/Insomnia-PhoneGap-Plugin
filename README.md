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

## Compatibility and validation status

This repository now validates plugin install + native compile in CI using a generated fixture Cordova app that installs this plugin from the local checkout and invokes both `keepAwake` and `allowSleepAgain` in app JavaScript.

| Platform | Version | CI status type |
| --- | --- | --- |
| cordova-android | 14.0.0 | Fixture app install + `cordova build android` on Ubuntu with API 35 / Build Tools 35.0.0 |
| cordova-android | 15.0.0 | Fixture app install + `cordova build android` on Ubuntu with API 36 / Build Tools 36.0.0 |
| cordova-ios | 7.1.1 | Fixture app install + `cordova build ios --emulator` on GitHub `macos-latest` |
| cordova-ios | 8.0.0 | Fixture app install + `cordova build ios --emulator` on GitHub `macos-latest` |
| JavaScript bridge | `www/Insomnia.js` | Node syntax check + bridge contract test (`keepAwake` / `allowSleepAgain`) |

### Important runtime caveat

A successful emulator/simulator/native build proves packaging and compilation only. It does **not** prove real screen-awake behavior. Final behavioral verification must be done on physical Android and iOS devices.

## Maintained plugin metadata scope

- Plugin id remains stable: `cordova-plugin-insomnia`.
- Cordova engine metadata now targets currently maintained mobile platforms:
  - `cordova-android >= 14.0.0`
  - `cordova-ios >= 7.0.0`
- Obsolete `wp8` and `firefoxos` platform declarations were removed from install metadata.
- `browser` metadata is retained.

## Hosted runner/toolchain notes

- Android CI jobs run on `ubuntu-24.04` and explicitly install matrix-specific Android SDK platform/build-tools packages.
- iOS CI jobs run on GitHub `macos-latest` and use the image’s default Xcode. If GitHub image/Xcode changes cause incompatibilities for a specific `cordova-ios` version, reproduce and pin toolchains locally with the commands below.

## Reproducible local validation commands

Run from repository root:

```bash
npm test
npm install -g cordova@12
```

### Android 14 (API 35)

```bash
TMP_DIR=/tmp/cordova-smoke-android-14
rm -rf "$TMP_DIR"
cordova create "$TMP_DIR/app" com.example.insomniafixture InsomniaFixture --no-telemetry
node /home/runner/work/Insomnia-PhoneGap-Plugin/Insomnia-PhoneGap-Plugin/scripts/write-fixture-index.js "$TMP_DIR/app/www/js/index.js"
cd "$TMP_DIR/app"
cordova plugin add /home/runner/work/Insomnia-PhoneGap-Plugin/Insomnia-PhoneGap-Plugin --no-telemetry
cordova platform add android@14.0.0 --no-telemetry
cordova build android --debug --no-telemetry
```

### Android 15 (API 36)

```bash
TMP_DIR=/tmp/cordova-smoke-android-15
rm -rf "$TMP_DIR"
cordova create "$TMP_DIR/app" com.example.insomniafixture InsomniaFixture --no-telemetry
node /home/runner/work/Insomnia-PhoneGap-Plugin/Insomnia-PhoneGap-Plugin/scripts/write-fixture-index.js "$TMP_DIR/app/www/js/index.js"
cd "$TMP_DIR/app"
cordova plugin add /home/runner/work/Insomnia-PhoneGap-Plugin/Insomnia-PhoneGap-Plugin --no-telemetry
cordova platform add android@15.0.0 --no-telemetry
cordova build android --debug --no-telemetry
```

### iOS 7

```bash
TMP_DIR=/tmp/cordova-smoke-ios-7
rm -rf "$TMP_DIR"
cordova create "$TMP_DIR/app" com.example.insomniafixture InsomniaFixture --no-telemetry
node /home/runner/work/Insomnia-PhoneGap-Plugin/Insomnia-PhoneGap-Plugin/scripts/write-fixture-index.js "$TMP_DIR/app/www/js/index.js"
cd "$TMP_DIR/app"
cordova plugin add /home/runner/work/Insomnia-PhoneGap-Plugin/Insomnia-PhoneGap-Plugin --no-telemetry
cordova platform add ios@7.1.1 --no-telemetry
cordova build ios --debug --emulator --no-telemetry
```

### iOS 8

```bash
TMP_DIR=/tmp/cordova-smoke-ios-8
rm -rf "$TMP_DIR"
cordova create "$TMP_DIR/app" com.example.insomniafixture InsomniaFixture --no-telemetry
node /home/runner/work/Insomnia-PhoneGap-Plugin/Insomnia-PhoneGap-Plugin/scripts/write-fixture-index.js "$TMP_DIR/app/www/js/index.js"
cd "$TMP_DIR/app"
cordova plugin add /home/runner/work/Insomnia-PhoneGap-Plugin/Insomnia-PhoneGap-Plugin --no-telemetry
cordova platform add ios@8.0.0 --no-telemetry
cordova build ios --debug --emulator --no-telemetry
```

## License

MIT
