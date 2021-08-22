import { AgentInfo } from './types';

export function parseUserAgentData(): AgentInfo {
  const userAgentData = navigator.userAgentData;
  const [brandInfo] = [...(userAgentData.brands ?? userAgentData.uaList)];
  const isMobile = userAgentData.mobile;
  const isDesktop = !userAgentData.mobile;
  const browser = { name: brandInfo.brand, version: brandInfo.version };

  return {
    isMobile,
    isDesktop,
    browser,
  };
}
