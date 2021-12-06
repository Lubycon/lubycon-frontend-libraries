import { NavigatorUAData } from './types';

declare global {
  interface Navigator {
    userAgentData: NavigatorUAData;
  }
}
