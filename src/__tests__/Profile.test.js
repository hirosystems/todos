// Example testing of componetns in React 
// https://www.sitepoint.com/test-react-components-jest/ tutorial
// was used to inform testing. This test suite uses Jest and Enzyme.
import * as blockstack from 'blockstack'

// InstanceDataStore not exported from blockstack.ja by default; 
// must import using full path
import { InstanceDataStore } from 'blockstack/lib/auth/sessionStore'
import Profile from '../components/Profile.js'
import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Reference here: https://forum.blockstack.org/t/creating-a-usersession-using-app-private-key/8096/6

const appConfig = new blockstack.AppConfig(
  ['store_write'], 
  'http://127.0.0.1' /* your app origin */ 
)

const dataStore = new InstanceDataStore({ 
  userData: {
    appPrivateKey: 'cf95f438797e36db269646597e7f91cc0b7ad2404a5db554f403e27f0a899e86', /* A user's app private key */
    hubUrl: 'https://hub.blockstack.org' /* A user's gaia hub server */
    /* The rest of the properties can be null */
  }
})

const userSession = new blockstack.UserSession({
  appConfig: appConfig,
  sessionStore: dataStore
})

// Testing that to-do items are rendered
test('renders to-do list text', () => {
  const userData = userSession.loadUserData();
  const wrapper = shallow(<Profile userData={userData} />);
  wrapper.setState({tasks: [['Create a Blockstack ID', false]]});
  const text = wrapper.find('.task');
  expect(text.text()).toBe('Create a Blockstack ID');
});




