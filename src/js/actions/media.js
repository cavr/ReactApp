export const IS_MOBILE = 'IS_MOBILE';
export const IS_DESKTOP = 'IS_DESKTOP';

export function checkDevice(isMobile) {
  if (isMobile) return { type: IS_MOBILE };
  return { type: IS_DESKTOP };
}

