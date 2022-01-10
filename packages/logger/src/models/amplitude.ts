import { Config } from 'amplitude-js';

export interface AmplitudeConfig {
  apiKey: string;
  userId?: string;
  options?: Config;
}
