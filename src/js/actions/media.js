import MobileDetect from 'mobile-detect';

export const IS_MOBILE = 'IS_MOBILE';
export const IS_TABLET = 'IS_TABLET';
export const IS_DESKTOP = 'IS_DESKTOP';

export function checkScreen() {
  return (dispatch, getState) => {
    const currentState = getState();
    if (window.matchMedia('(max-width: 760px)').matches) {
      document.documentElement.className = 'mobile';
    } else if (currentState.media.get('isTablet')) {
      if (window.matchMedia('(orientation:portrait)').matches) {
        document.documentElement.className = 'tablet-v';
      } else {
        document.documentElement.className = 'tablet-h';
      }
    } else if (window.matchMedia('(max-width: 1024px)').matches) {
      document.documentElement.className = 'tablet-v';
    } else {
      document.documentElement.className = 'desktop';
    }
  };
}

export function checkDevice() {
  const md = new MobileDetect(window.navigator.userAgent);
  if (md.phone()) {
    document.documentElement.className = 'mobile';
    return { type: IS_MOBILE };
  } else if (md.tablet()) {
    if (window.matchMedia('(orientation:portrait)').matches) {
      document.documentElement.className = 'tablet-v';
    } else {
      document.documentElement.className = 'tablet-h';
    }
    return { type: IS_TABLET };
  }
  if (window.matchMedia('(max-width: 760px)').matches) {
    document.documentElement.className = 'mobile';
  } else if (window.matchMedia('(max-width: 1024px)').matches) {
    document.documentElement.className = 'tablet-v';
  } else {
    document.documentElement.className = 'desktop';
  }
  return { type: IS_DESKTOP };
}

