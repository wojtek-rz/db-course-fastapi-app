import { Box, Flex, Container, Spinner } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import PageFooter from "../components/Footer";
import React, { useEffect } from "react";

export default function RootLayout(props) {
    const navigation = useNavigation();

    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    let opacity = navigation.state === 'loading' ? 0.5 : 1;

    return (
        <Flex direction="column" height="100vh">
            <Navbar />
            <Container opacity={opacity} maxWidth={'5xl'} bgColor={'white'} maxW={'5xl'} mx={'auto'} shadow={'md'}
                rounded={'md'} p={'5'} color={'blackAlpha.800'} flex="1 0 auto">
                <Outlet />
            </Container>
            <Box flexShrink="0">
                <PageFooter />
            </Box>
        </Flex>
    )

}