import { Box, Heading, VStack, StackDivider, Text } from '@chakra-ui/react'
import { FaUserCircle } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { useDeleteRequest } from '../hooks/useRequest'
import ActionButton from './ActionButton'
import { Link } from 'react-router-dom'


function UserRow({ user }) {
    return (
        <Box p="2" width="100%" bg="whiteAlpha.900"
            _hover={{
                textDecoration: 'none', bgColor: "blackAlpha.200",
                transitionDuration: '0.2s',
                transitionTimingFunction: "ease-in-out"
            }}
            display={'flex'} gap={6} alignItems={'center'}>
            <Box color="blackAlpha.800" size={'md'} px={6}>
                <FaUserCircle />
            </Box>
            <Box flexBasis={'100%'} textAlign='center' >
                <Heading size="md" mb="1" >

                    <Link to={`/users/${user.id}`}>{user.username}</Link>
                </Heading>
            </Box>
            <Box width={'52'} px={6}>
                Recipes: {user.recipes_number}
            </Box>
            <ActionButton asyncButtonAction={() => useDeleteRequest(`/users/${user.id}/observe`)} navigateTo={0}
                colorScheme={'red'} successMessage="Removed from observed users">
                <MdDeleteForever size={'30'} />
            </ActionButton>
        </Box>
    )
}

export default function UsersList({ users, title }) {

    return (
        <Box mb={10}>
            <Heading mb={4} size="lg">{title}</Heading>
            {users.length == 0 && <Text mt={4} color='blackAlpha.700'>No users found</Text>}
            <VStack spacing="2"
                divider={<StackDivider borderColor='gray.200' />}>
                {users.map((user) => (
                    <UserRow key={user.id} user={user} />
                ))}
            </VStack>
        </Box>)
}