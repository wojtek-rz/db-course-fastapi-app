import { Box, Flex, Container, Spinner } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigation } from "react-router-dom";
import PageFooter from "../components/Footer";

export default function RootLayout(props) {
    const navigation = useNavigation();
    return (
        <Flex direction="column" height="100vh">
            <Navbar />
            {
                navigation.state === 'loading' && <Spinner mx={'auto'}/>
            }
            <Container width={{lg: '5xl'}} bgColor={'white'} maxW={'7xl'} mx={'auto'} shadow={'md'}
                rounded={'md'} p={'5'} color={'blackAlpha.800'} flex="1 0 auto">
                <Outlet />
            </Container>
            <Box flexShrink="0">
                <PageFooter />
            </Box>
        </Flex>
    )

}