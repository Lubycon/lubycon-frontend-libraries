export interface UADataValues {
  platform: string;
  platformVersion: string;
  architecture: string;
  model: string;
  uaFullVersion: string;
}

export interface AgentBrowserInfo {
  name: string | null;
  version: string | null;
}
export interface AgentInfo {
  isMobile: boolean;
  isDesktop: boolean;
  browser: AgentBrowserInfo;
}

export interface NavigatorUABrandVersion {
  brand: string;
  version: string;
}

export interface PresetInfo {
  test: string;
  id: string;
}

export interface PresetResult {
  preset: PresetInfo | null;
  version: string | null;
}

export interface NavigatorUAData {
  brands: NavigatorUABrandVersion[];
  uaList?: NavigatorUABrandVersion[];
  mobile: boolean;
  getHighEntropyValues: <T extends keyof UADataValues>(
    hints: T[]
  ) => Promise<{ [key in T]: UADataValues[T] }>;
}
