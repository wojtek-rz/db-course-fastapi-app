import React from 'react';
import { Outlet } from "react-router-dom";
import {
    Box,
    Flex,
    HStack,
    Icon,
    Menu, MenuButton, MenuItem, MenuList, Button,
    useDisclosure,
    useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useAuth } from '../auth/useAuth';
import { Link } from 'react-router-dom';

const NavLink = ({ children, type, href }) => {
    console.log(type);
    let font_color = 'white'
    if (type == 'primary') font_color = 'white';
    if (type == 'secondary') font_color = 'whiteAlpha.900';

    return (
        <Link
            px={4}
            py={2}
            rounded={'lg'}
            _hover={{
                textDecoration: 'none',
            }}
            to={href}>
            {children}
        </Link>
    );
}



export default function Navbar() {
    const { token } = useAuth()

    return (
        <Flex px={4} as={'nav'} bg={'brand.600'} color="white"
            py={3} alignItems={'center'}  mb={4}
            fontWeight={'bold'} fontSize={'md'} justifyContent="space-between">
            <Box display={{ md: 'none' }} >
                <Menu >
                    <MenuButton >
                        <HamburgerIcon width={10} />
                    </MenuButton>
                    <MenuList scheme={'brand'}>
                        <MenuItem>Download</MenuItem>
                        <MenuItem>Create a Copy</MenuItem>
                        <MenuItem>Mark as Draft</MenuItem>
                        <MenuItem>Delete</MenuItem>
                        <MenuItem>Attend a Workshop</MenuItem>
                    </MenuList>
                </Menu>
            </Box>

            <Flex gap={8} alignItems={'center'} >
                <Box py={2} px={4} mx={4} fontSize={'xl'}>
                    <Link to="/"> Logo here
                    </Link>
                </Box>
                <HStack color='whiteAlpha.900'
                    as={'nav'} gap={2} display={{ base: 'none', md: 'flex' }}>
                    <NavLink type='secondary' href="/recipes">Recipes</NavLink>
                    <NavLink type='secondary' href="/ingredients">Ingredients</NavLink>
                    <NavLink type='secondary' href="/tags">Tags</NavLink>
                    <NavLink type='secondary' href="/top-users">Top users</NavLink>
                </HStack>
            </Flex>
            <Flex alignItems={'center'} gap={'4'}>
                <NavLink href="/recipe-form">Create recipe</NavLink>
                { token ?
                    <NavLink type='primary' href="/profile">Profile</NavLink>
                    :
                    <NavLink type='primary' href="/login">Login</NavLink>
                }
            </Flex>
        </Flex>
    );
}