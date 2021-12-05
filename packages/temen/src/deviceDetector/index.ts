import { AgentInfo } from './types';
import { parseUserAgent } from './userAgent';
import { parseUserAgentData } from './userAgentData';
import { findPreset, getIsClientSideCheck } from './utils';

/**
 * @deprecated browser-toolkit을 사용해주세요.
 */
export function agent(): AgentInfo {
  if (navigator.userAgentData === undefined) {
    return parseUserAgent();
  }

  return parseUserAgentData();
}

export const isMobile = agent().isMobile;
export const isDesktop = agent().isDesktop;
export const browser = agent().browser;
export const isClient = getIsClientSideCheck();
export const isServer = !getIsClientSideCheck();

export { findPreset };
