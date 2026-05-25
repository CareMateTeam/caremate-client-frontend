import liff from "@line/liff";

let liffReady: Promise<void> | null = null;

export function initLiff() {
  if (!liffReady) {
    liffReady = liff.init({
      liffId: process.env.NEXT_PUBLIC_LIFF_ID!,
    });
  }
  console.log("LIFF ID:", process.env.NEXT_PUBLIC_LIFF_ID);

  return liffReady;
}

export function isLiffLoggedIn() {
  return liff.isLoggedIn();
}

export function loginWithLiff() {
  liff.login({
    redirectUri: `${window.location.origin}/login`,
  });
}

export function getLiffIdToken() {
  return liff.getIDToken();
}

export function getLiffProfile() {
  return liff.getProfile();
}
