import { AppConfig, UserSession, showConnect } from '@stacks/auth';
import { Person } from '@stacks/profile';
import { Storage } from '@stacks/storage';

const appConfig = new AppConfig(['store_write', 'publish_data']);

export const userSession = new UserSession({ appConfig });
export const storage = new Storage({ userSession });

export function authenticate() {
  showConnect({
    appDetails: {
      name: 'Todos',
      icon: window.location.origin + '/logo.svg',
    },
    redirectTo: '/',
    finished: () => {
      window.location.reload();
    },
    userSession: userSession,
  });
}

export function getUserData() {
  return userSession.loadUserData();
}

export function getPerson() {
  return new Person(getUserData().profile);
}
