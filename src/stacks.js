import { showBlockstackConnect } from '@stacks/connect';
import { AppConfig, UserSession } from '@stacks/auth';

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

function authenticate(sendToSignIn) {
  showBlockstackConnect({
    redirectTo: '/',
    finished: ({ userSession }) => {
      window.location.reload();
    },
    appDetails: {
      name: 'Todos',
      icon: window.location.origin + '/logo.svg'
    },
    sendToSignIn: sendToSignIn
  })
}

export { authenticate, userSession }