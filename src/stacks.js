import { AppConfig, UserSession } from '@stacks/auth';
import { showBlockstackConnect } from '@stacks/connect';
import { Person } from '@stacks/profile';
import { Storage } from '@stacks/storage';

const appConfig = new AppConfig(['store_write', 'publish_data']);

export const userSession = new UserSession({ appConfig });
export const storage = new Storage({ userSession });

export function authenticate(sendToSignIn) {
  showBlockstackConnect({
    appDetails: {
      name: 'Todos',
      icon: window.location.origin + '/logo.svg',
    },
    redirectTo: '/',
    sendToSignIn: sendToSignIn,
    finished: () => {
      window.location.reload();
    },
  });
}

export function getUserData() {
  return userSession.loadUserData();
}

export function getPerson() {
  return new Person(getUserData().profile);
}
