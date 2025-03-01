"@react-native-google-signin/google-signin": "^13.1.0",

Sau khi prebuild android

- Thêm file local.properties
- Thêm vào app/build.gradle
  defaultConfig {
  ...
  manifestPlaceholders = [appAuthRedirectScheme: 'com.kingchen711.fptlibrarymobile']
  }

EBOOK (pdf): npx expo install expo-file-system react-native-webview
