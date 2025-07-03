// Detect In-App Browser
export function isInAppBrowser() {
  const userAgent = navigator.userAgent || window.opera;
  // Exclude iOS Safari (not an in-app browser)
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isSafari =
    isIOS &&
    /Safari/i.test(userAgent) &&
    !/CriOS|FxiOS|OPiOS|EdgiOS|YaBrowser/i.test(userAgent);
  // Check for common in-app browser user agents like Facebook, Instagram, Twitter, TikTok, etc.
  return (
    /FBAN|FBAV|Instagram|Twitter|TikTok|Line|WeChat|QQBrowser/i.test(
      userAgent
    ) ||
    (userAgent.includes("Mobile") &&
      userAgent.includes("Safari") &&
      !userAgent.includes("Chrome") &&
      !(isIOS && isSafari))
  );
}
