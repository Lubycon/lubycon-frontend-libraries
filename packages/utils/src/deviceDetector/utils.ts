import { PresetInfo, PresetResult } from './types';

export function some<T, U>(arr: T[], callback: (value: T, index: number) => U): boolean {
  const length = arr.length;

  for (let i = 0; i < length; ++i) {
    if (callback(arr[i], i)) {
      return true;
    }
  }

  return false;
}

export function execRegExp(pattern: string, text: string): RegExpExecArray | null {
  try {
    return new RegExp(pattern, 'g').exec(text);
  } catch (e) {
    return null;
  }
}

export function findPreset(presets: PresetInfo[], userAgent: string): PresetResult {
  let userPreset: PresetInfo | null = null;
  let version = '-1';

  some(presets, (preset) => {
    const result = execRegExp(`(${preset.test})((?:\\/|\\s|:)([0-9|\\.|_]+))?`, userAgent);

    if (!result) {
      return false;
    }

    userPreset = preset;
    version = result[3] || '-1';

    return true;
  });

  return {
    preset: userPreset,
    version,
  };
}

export function getIsMobile(userAgent: string) {
  const device = [
    'iPhone',
    'iPod',
    'Android',
    'Windows CE',
    'BlackBerry',
    'Symbian',
    'Windows Phone',
    'webOS',
    'Opera Mini',
    'Opera Mobi',
    'POLARIS',
    'IEMobile',
    'lgtelecom',
    'nokia',
    'SonyEricsson',
    'LG',
    'SAMSUNG',
  ].join('|');
  const regExp = new RegExp(device, 'i').test(userAgent);
  return regExp;
}

export function getIsClientSideCheck() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}
