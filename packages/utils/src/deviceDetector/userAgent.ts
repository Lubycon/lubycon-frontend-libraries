import { AgentInfo } from './types';
import { findPreset, getIsMobile } from './utils';
import { BROWSER_PRESET } from './presets';

export function parseUserAgent(): AgentInfo {
  const agent = navigator.userAgent.toLowerCase();
  const isMobile = getIsMobile(agent);
  const browser = {
    name: 'unknown',
    version: '-1',
  };

  const { preset: browserPreset, version: browserVersion } = findPreset(BROWSER_PRESET, agent);

  if (browserPreset) {
    browser.name = browserPreset.id;
    browser.version = browserVersion;
  }

  return {
    isMobile,
    isDesktop: !isMobile,
    browser,
  };
}
