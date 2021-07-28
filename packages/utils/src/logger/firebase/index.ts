import { FirebaseConfig } from './models';

let initialized = false;
let client: any | null = null;

export function initializeFirebase(config: FirebaseConfig): Promise<any | null> {
  return new Promise(async (resolve) => {
    if (initialized === true) {
      resolve(client);
      return;
    }

    const firebaseModule = await import('firebase/app');
    await import('firebase/analytics');

    const firebaseClient = firebaseModule.default;
    firebaseClient.initializeApp(config);
    firebaseClient.analytics();
    initialized = true;
    client = firebaseClient;

    resolve(client);
  });
}
