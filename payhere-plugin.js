const { withProjectBuildGradle } = require("@expo/config-plugins");

/**
 * Expo Config Plugin for PayHere SDK.
 * This plugin adds the JitPack repository to the project's build.gradle,
 * which is required for the PayHere Android SDK.
 */
module.exports = (config) => {
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === "groovy") {
      config.modResults.contents = addJitpack(config.modResults.contents);
    }
    return config;
  });
};

function addJitpack(src) {
  if (src.includes("jitpack.io")) {
    return src;
  }
  
  // Find the repositories block in buildscript or allprojects and add jitpack
  // This is a common requirement for the PayHere SDK on Android.
  return src.replace(
    /repositories\s*{/,
    `repositories {
        maven { url 'https://jitpack.io' }`
  );
}
