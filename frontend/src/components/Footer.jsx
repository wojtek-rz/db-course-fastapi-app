
import React from 'react';
import {
    Box,
    chakra,
    Container,
    Flex,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

export default function PageFooter() {
    return (
        <Box backgroundColor={'brand.50'}
            width={'100%'}
            mt="20">

            <Box
                maxWidth={'5xl'} mx={'auto'}
                as={Flex}
                py={4}
                px={6}
                flexDirection={{ base: 'column', md: 'row' }}
                justifyItems={{ base: 'center', md: 'center' }}
                align={{ base: 'center', md: 'center' }}
                gap={'6'}
                >
                    
                <Box >
                    <Text>© 2023 Recipe app for database course MIMUW</Text>
                </Box>


                <Box display={'flex'} gap={'2'} 
                as={Link} href={'https://github.com/wojtek-rz'} alignItems='center'>

                        <Box> About author</Box>
                        <FaGithub />
                </Box>

                <Box as={Link} href={'https://chakra-ui.com/'}>
                    <Text>Styled with Chakra UI</Text>
                </Box>
            </Box>

        </Box>
    );
}