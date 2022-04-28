import React from 'react';
import { Flex, Box, Text } from '@blockstack/ui';
import { getPerson, userSession } from '../auth';
import { Logo } from './icons/logo';
import { truncateMiddle } from '@stacks/ui-utils';

const Auth = ({ username, address }) => {
  if (!userSession.isUserSignedIn()) {
    return null;
  }

  const Username = ({ username, address }) => {
    return <Text fontWeight="500">{username || (address && truncateMiddle(address)) || ''}</Text>;
  };

  const Avatar = () => {
    const person = getPerson();

    if (person.avatarUrl()) {
      return (
        <Box
          borderRadius="50%"
          width="24px"
          height="24px"
          display="inline-block"
          overflow="hidden"
          mr={2}
          style={{ position: 'relative', top: '6px' }}
        >
          <Box as="img" src={person.avatarUrl()} maxWidth="100%" minHeight="24px" minWidth="24px" />
        </Box>
      );
    }
    return null;
  };

  return (
    <Box>
      <Avatar />
      <Username username={username} address={address} />
      <Text
        fontWeight="300"
        display="inline-block"
        ml={5}
        color="ink.400"
        cursor="pointer"
        onClick={() => {
          userSession.signUserOut();
          window.location = '/';
        }}
      >
        Sign out
      </Text>
    </Box>
  );
};

export const Header = ({ username, address }) => {
  return (
    <Flex width="100%" justifyContent="space-between" px={4} py={3}>
      <Box alignItems onClick={() => (document.location = '/')} cursor="pointer">
        <Logo style={{ position: 'relative', top: '-1px' }} />
        <Text ml={2} display="inline-block" fontWeight="600">
          Todos
        </Text>
      </Box>
      <Auth username={username} address={address} />
    </Flex>
  );
};
