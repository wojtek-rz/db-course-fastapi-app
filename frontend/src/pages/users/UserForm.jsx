import { Alert, AlertIcon, Box, Button, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../components/ActionButton";
import { usePostRequest } from "../../hooks/useRequest";

export default function UserForm() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    return (
        <form autoComplete="off">
            <FormControl >
                <Heading >Register</Heading>
                <Alert status="warning" mt={10}>
                    <AlertIcon />
                    This is a demo app. Please do not use real credentials.
                </Alert>

                <FormLabel mt={10}>Username</FormLabel>
                <Input variant="flushed" size={"sm"} placeholder="Username"
                    onChange={e => setUser({ ...user, username: e.target.value })} value={user.username} />

                <FormLabel mt={10}>Email</FormLabel>
                <Input variant="flushed" size={"sm"} placeholder="Email"
                    onChange={e => setUser({ ...user, email: e.target.value })} value={user.email} />

                <FormLabel mt={10}>Password</FormLabel>
                <Input variant="flushed" size={"sm"} placeholder="Password" type="password"
                    onChange={e => setUser({ ...user, password: e.target.value })} value={user.password} />
                <Box display={'flex'} flexDir='column' mt={10}>

                    <ActionButton asyncButtonAction={() => usePostRequest('/users/', user)} navigateTo={'/login/'}
                        colorScheme='blue' size='lg'>Submit</ActionButton>
                </Box>
            </FormControl>
        </form>
    )
}