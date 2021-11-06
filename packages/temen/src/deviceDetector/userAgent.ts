import { AgentBrowserInfo, AgentInfo } from './types';
import { findPreset, isMobile } from './utils';
import { BROWSER_PRESET } from './presets';

export function parseUserAgent(): AgentInfo {
  const userAgent = navigator.userAgent.toLowerCase();
  const browser: AgentBrowserInfo = {
    name: null,
    version: null,
  };

  const { preset: browserPreset, version: browserVersion } = findPreset(BROWSER_PRESET, userAgent);

  if (browserPreset) {
    browser.name = browserPreset.id;
    browser.version = browserVersion;
  }

  return {
    isMobile: isMobile(userAgent),
    isDesktop: !isMobile(userAgent),
    browser,
  };
}
