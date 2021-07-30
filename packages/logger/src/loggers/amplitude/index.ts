import { AmplitudeClient } from 'amplitude-js';

let amplitudeClient: AmplitudeClient | null = null;
let initialized = false;

export const initializeAmplitude = (apiKey: string): Promise<AmplitudeClient | null> => {
  return new Promise(async (resolve) => {
    if (initialized) {
      resolve(amplitudeClient);

      return;
    }

    const amplitudeModule = await import('amplitude-js');
    amplitudeModule.default
      .getInstance()
      .init(apiKey, 'unknown', {}, async (client: AmplitudeClient) => {
        initialized = true;
        amplitudeClient = client;
        resolve(client);
      });
  });
};
