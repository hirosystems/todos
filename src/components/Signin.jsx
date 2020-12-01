import React from 'react';
import { Box, Text, Button } from '@blockstack/ui';
import { authenticate } from '../stacks';

export const Signin = () => {
  return (
    <Box width="100%" textAlign="center">
      <Box maxWidth="800px" mx="auto" mt={[6, '100px']}>
        <Text fontWeight="700" fontSize={['36px', '50px']} lineHeight={1} display="block">
          Todos secured by Stacks
        </Text>
        <Box mt={[5, '60px']}>
          <Button onClick={() => authenticate()}>Get Started</Button>
        </Box>
        <Box mt={[3, '30px']}>
          <Text fontSize={1}>
            or{' '}
            <Text
              color="blue"
              cursor="pointer"
              fontSize={1}
              fontWeight="500"
              onClick={() => {
                authenticate(true);
              }}
            >
              Sign In
            </Text>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
