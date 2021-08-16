import { AgentInfo } from './types';

export function parseUserAgentData(): AgentInfo {
  const agent = navigator.userAgentData;
  const brands = [...(agent.brands || agent.uaList)];
  const isMobile = agent.mobile;
  const isDesktop = !agent.mobile;
  const browser = { name: brands[0].brand, version: brands[0].version };

  return {
    isMobile,
    isDesktop,
    browser,
  };
}
