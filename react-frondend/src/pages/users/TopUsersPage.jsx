import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Heading,
    Box,
    Container
  } from '@chakra-ui/react'
import {BiTrophy} from 'react-icons/bi'
import { useLoaderData } from 'react-router-dom';
import {useGetRequest} from '../../hooks/useRequest.jsx';
import {Link} from 'react-router-dom';

export async function topUsersLoader() {
    const usersLikes = await useGetRequest('/users/top-users');
    return { usersLikes };
}


export default function TopUsersPage() {
    const { usersLikes } = useLoaderData();
    console.log(usersLikes)
    return (
        <Container maxW={'7xl'} p={4}>
            <Heading mb={4}>
        
                <Box p={2} display="flex" alignItems={'center'} gap="2">
                <BiTrophy />
                <Box>Top Users </Box>
                    </Box>
            </Heading>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Username</Th>
                            <Th>Number of likes</Th>
                            <Th>Number of recipes</Th>
                        </Tr>

                    </Thead>
                    <Tbody>
                        {usersLikes.map(([user, likes, recipesN]) => {
                            return (
                                <Tr key={user.id}>
                                    <Td _hover={{textDecoration: 'underline'}}><Link to={"/users/" + user.id}>{user.username}</Link></Td>
                                    <Td>{likes}</Td>
                                    <Td>{recipesN}</Td>
                                </Tr>
                            );
                        })}
                    </Tbody>

                </Table>
            </TableContainer>
        </Container>
    );
}