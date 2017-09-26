FROM ubuntu:xenial

# Project directory
WORKDIR /src/blockstack-todos

# Update apt and install wget
RUN apt-get update && apt-get install -y wget curl apt-utils git

# Install node
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get update && apt-get install -y nodejs

# Install dependencies at specified branch
WORKDIR /src/blockstack-deps
RUN git clone https://github.com/blockstack/blockstack-storage-js.git -b develop-multiplayer-storage
RUN git clone https://github.com/blockstack/blockstack.js.git -b develop-keyfile
RUN cd blockstack-storage-js && npm i && npm run compile
RUN cd blockstack.js && npm install ../blockstack-storage-js/ && npm i && npm run compile

# Copy files into container
WORKDIR /src/blockstack-todos

COPY . .

RUN npm install ../blockstack-deps/blockstack-storage-js
RUN npm install ../blockstack-deps/blockstack.js

# Install dependencies
RUN npm install
