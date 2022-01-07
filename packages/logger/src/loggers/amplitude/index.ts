import { AmplitudeClient, Config } from 'amplitude-js';

export interface AmplitudeConfig {
  apiKey: string;
  userId?: string;
  options?: Config;
}

let amplitudeClient: AmplitudeClient | null = null;
let initialized = false;

export const initializeAmplitude = ({
  apiKey,
  userId = 'unknown',
  options = {},
}: AmplitudeConfig): Promise<AmplitudeClient | null> => {
  return new Promise(async (resolve) => {
    if (initialized) {
      resolve(amplitudeClient);

      return;
    }

    const amplitudeModule = await import('amplitude-js');
    amplitudeModule.default
      .getInstance()
      .init(apiKey, userId, options, async (client: AmplitudeClient) => {
        initialized = true;
        amplitudeClient = client;
        resolve(client);
      });
  });
};
