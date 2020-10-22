import React from 'react';
import { Box, Text, Button } from '@blockstack/ui';
import { useConnect } from '@stacks/auth';

export const Signin = () => {
  const { doOpenAuth } = useConnect();

  return (
    <Box width="100%" textAlign="center">
      <Box maxWidth="800px" mx="auto" mt={[6, '100px']}>
        <Text fontWeight="700" fontSize={['36px', '60px']} lineHeight={1} display="block">
          A to-do list that's guaranteed to stay private.
        </Text>
        <Box mt={[5, '60px']}>
          <Button onClick={() => doOpenAuth()}>Get Started</Button>
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
                doOpenAuth(true);
              }}
            >
              sign in
            </Text>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
