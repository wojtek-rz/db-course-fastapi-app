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
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { ImProfile } from 'react-icons/im';
import { IoPersonCircle } from 'react-icons/io5';

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


const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Recipes', href: '/recipes' },
    { label: 'Ingredients', href: '/ingredients' },
    { label: 'Tags', href: '/tags' },
    { label: 'Top Users', href: '/top-users' },
]

export default function Navbar() {
    const { token } = useAuth()

    return (
        <Flex px={4} as={'nav'} bg={'brand.600'}  color="white"
            py={3} alignItems={'center'}  mb={4}
            fontWeight={'bold'} fontSize={'md'} justifyContent="space-between">
            <Box display={{ md: 'none' }}  >
                <Menu >
                    <MenuButton >
                        <HamburgerIcon width={10} />
                    </MenuButton>
                    <MenuList color="blackAlpha.800">
                        {menuItems.map((item) => (
                            <MenuItem key={item.label} as={Link} to={item.href}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            </Box>

            <Flex gap={8} alignItems={'center'}  >
                <Box py={2} px={4} mx={4} fontSize={'xl'}>
                    <Link to="/"> Best recipes
                    </Link>
                </Box>
                <HStack color='whiteAlpha.900'
                    as={'nav'} gap={2} display={{ base: 'none', md: 'flex' }}>
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.label}
                                type='secondary'
                                href={item.href}>
                                {item.label}
                            </NavLink>
                        ))}
                </HStack>
            </Flex>
            <Flex alignItems={'center'} gap={'4'}  display={{ base: 'none', md: 'flex' }}>
                <NavLink href="/recipe-form">Create recipe</NavLink>
                { token ?
                    <NavLink type='primary' href="/profile">Profile</NavLink>
                    :
                    <NavLink type='primary' href="/login">Login</NavLink>
                }
            </Flex>

            <Box display={{ md: 'none' }}  >
                <Menu >
                    <MenuButton >
                        <IoPersonCircle width={10} />
                    </MenuButton>
                    <MenuList color="blackAlpha.800">
                        <MenuItem as={Link} to={"/recipe-form"}>
                            Create recipe
                        </MenuItem>
                        { token ?
                            <MenuItem as={Link} to={"/profile"}>
                                Profile
                            </MenuItem>
                            :
                            <MenuItem as={Link} to={"/login"}>
                                Login
                            </MenuItem>
                        }
                    </MenuList>
                </Menu>
            </Box>
        </Flex>
    );
}