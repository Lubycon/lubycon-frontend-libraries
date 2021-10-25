import { FirebaseConfig } from './firebase';
import { LubyconLoggerConfig } from './lubyconLogger';

export interface SupportedServices {
  firebase?: FirebaseConfig;
  amplitude?: string;
  lubyconLogger?: LubyconLoggerConfig;
}

export type LoggerEnvMode = 'production' | 'development';
export interface LoggerInitializeConfig {
  services: SupportedServices;
  mode: LoggerEnvMode;
}

export type LoggerEventParams = {
  [key: string]: string | boolean | number | undefined;
};

export interface LoggerParams {
  view: string;
  action: string;
  params?: LoggerEventParams;
}
