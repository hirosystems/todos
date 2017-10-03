# Blockstack Todo App

> A simple Vue.js Todo app built for the decentralized web.

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


### Running with the Blockstack Test Environment

The Todo App can be easiest to develop against the Regtest bitcoin environment. The easiest way to get that setup is through the `docker-compose.yaml` file bundled in this repo. To use it first [install Docker](https://docs.docker.com/engine/installation/) and stop any running Blockstack applications (`blockstack-browser` or `blockstack api`) then:

```bash
$ docker-compose up -d
```

This brings up a `blockstack api` node that is backed by a `bitcoind` instance running `regtest` and a `blockstack-core` node built from the test chain. It also brings up a `blockstack-browser` and `cors-proxy` to enable the UI. The easiest way to work with this setup is in Incognito mode in your browser. Once the images have been pulled down and the containers are started you can open `http://localhost:8888`. Choose the `Advanced Mode` setup and enter the API Password as `blockstack_integration_test_api_password`. Then you can create a name.

After that, start your `blockstack-todo` application with the dev instructions above and open `http://locahost:8080`. Click the `Login` button. If you do not have the protocol handler installed it will redirect you to `https://blockstack.org/auth?authRequest=ey...`. Replace `https://blockstack.org` with `locahost:8888` to complete the Sign In flow.

Now you have a full test environment ready to build Blockstack Apps!
