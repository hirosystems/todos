import { UserSession, AppConfig } from 'blockstack';

const appConfig = new AppConfig(['store_write', 'publish_data'])
const userSession = new UserSession({ appConfig })

export default userSession;
