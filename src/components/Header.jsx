import React from 'react';
import { Flex, Box, Text } from '@blockstack/ui';
import { useConnect } from '@stacks/auth';
import { Logo } from './icons/logo';
import { Person } from '@stacks/profile';

const Auth = () => {
  const { authOptions } = useConnect();
  const { userSession } = authOptions;

  if (!userSession.isUserSignedIn()) {
    return null;
  }

  const userData = userSession.loadUserData();

  const Avatar = () => {
    const person = new Person(userData.profile);
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
      <Text fontWeight="500">{userData.username}</Text>
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

export const Header = () => {
  return (
    <Flex width="100%" justifyContent="space-between" px={4} py={3}>
      <Box alignItems onClick={() => (document.location = '/')} cursor="pointer">
        <Logo style={{ position: 'relative', top: '-1px' }} />
        <Text ml={2} display="inline-block" fontWeight="600">
          To-do
        </Text>
      </Box>
      <Auth />
    </Flex>
  );
};
