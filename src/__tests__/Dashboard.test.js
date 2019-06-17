// https://www.sitepoint.com/test-react-components-jest/ tutorial
// was used to inform testing. This test suite uses Jest and Enzyme.

import Dashboard from '../Dashboard.js'
import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UserSession, AppConfig, InstanceDataStore } from 'blockstack';

configure({ adapter: new Adapter() });


// Directly instantiating UserSession using sample dummy blockstack ID
// Reference here: https://forum.blockstack.org/t/creating-a-usersession-using-app-private-key/8096/6

const appConfig = new AppConfig(
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
const userSession = new UserSession({
  appConfig: appConfig,
  sessionStore: dataStore
})


// React component testing
test('renders to-do list text', () => {
  const wrapper = shallow(<Dashboard />);
  wrapper.setProps({userSession: userSession})
  wrapper.setState({tasks: [['Create a Blockstack ID', false]]});
  const text = wrapper.find('.input-group-text');
  expect(text.text()).toBe('Create a Blockstack ID');
});

// Interactive functionality (clicking to add, remove, check) testing


