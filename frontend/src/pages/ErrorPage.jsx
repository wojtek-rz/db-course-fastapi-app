import React from 'react'
import { useRouteError } from 'react-router-dom';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export default function ErrorPage() {

    const error = useRouteError();
    return (
        <Box textAlign="center" py={10} px={6}>
            <Box display="inline-block">
                <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    bg={'red.500'}
                    rounded={'50px'}
                    w={'55px'}
                    h={'55px'}
                    textAlign="center">
                    <CloseIcon boxSize={'20px'} color={'white'} />
                </Flex>
            </Box>
            <Heading as="h2" size="xl" mt={6} mb={2}>
                Oops!
            </Heading>
            <Text color={'gray.500'}>
                Sorry, an unexpected error has occurred.
            </Text>
            <Text mt="10">
                { error.message || error.statusText}
            </Text>
        </Box>
    );
}