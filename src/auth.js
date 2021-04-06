import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { Person } from '@stacks/profile';

const appConfig = new AppConfig(['store_write', 'publish_data']);

export const userSession = new UserSession({ appConfig });

export function authenticate() {
  showConnect({
    appDetails: {
      name: 'Todos',
      icon: window.location.origin + '/logo.png',
    },
    redirectTo: '/',
    authOrigin: 'https://pr-1103.app.stacks.engineering/',
    finished: () => {
      window.location.reload();
    },
    userSession: userSession,
    registerSubdomain: true,
  });
}

export function getUserData() {
  return userSession.loadUserData();
}

export function getPerson() {
  return new Person(getUserData().profile);
}
