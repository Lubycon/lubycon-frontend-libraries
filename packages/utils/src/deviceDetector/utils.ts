import { PresetInfo, PresetResult } from './types';

export function execRegExp(pattern: string, text: string): RegExpExecArray | null {
  try {
    return new RegExp(pattern, 'g').exec(text);
  } catch (e) {
    return null;
  }
}

export function findPreset(presets: PresetInfo[], userAgent: string): PresetResult {
  let userPreset: PresetInfo | null = null;
  let version = null;

  presets.some((preset) => {
    const result = execRegExp(`(${preset.test})((?:\\/|\\s|:)([0-9|\\.|_]+))?`, userAgent);

    if (!result) {
      return false;
    }

    userPreset = preset;
    version = result[3] || null;

    return true;
  });

  return {
    preset: userPreset,
    version,
  };
}

export function isMobile(userAgent: string) {
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
  const regExp = new RegExp(device, 'i');

  return regExp.test(userAgent);
}

export function getIsClientSideCheck() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}
