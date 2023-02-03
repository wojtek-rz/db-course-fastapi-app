import { Heading, Divider, Box, Table, Tr, Td, TableContainer, Tbody } from "@chakra-ui/react"
import { ImProfile } from "react-icons/im"

export default function ProfileInfo({ user }) {
    return (
        <Box mb={10}>
            <Box fontSize={'lg'} color="blackAlpha.700" mb="14"
                display="flex" gap={2} alignItems={'center'}>
                <ImProfile />
                <Box>
                    PROFILE PAGE
                </Box>
            </Box>
            <Heading textAlign={'center'}>{user.username}</Heading>
            <Divider mt="2" mb="6" />
            <Heading size="lg" mb="4">Details:</Heading>
            <TableContainer>
                <Table variant="simple">
                    <Tbody>  
                        <Tr>
                            <Td><b>id:</b></Td>
                            <Td>{user.id}</Td>
                        </Tr>
                        <Tr>
                            <Td><b>email:</b></Td>
                            <Td>{user.email}</Td>
                        </Tr>
                        <Tr>
                            <Td><b>last login:</b></Td>
                            <Td>{user.last_login}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}