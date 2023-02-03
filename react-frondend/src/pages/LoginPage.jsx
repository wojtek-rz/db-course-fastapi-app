import {
    Container,
    Heading,
    Text,
    Link,
    Button,
    FormControl,
    FormLabel,
    Input,
    Alert,
    AlertIcon,
    useToast
} from '@chakra-ui/react';
import { useState } from "react";
import { useAuth } from '../auth/useAuth';
import {useNavigate} from "react-router-dom";

export default function LoginPage(){
    const { login } = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        login({username: email, password}).then(e => {
            setLoading(false);
            navigate('/profile')
        }).catch(err => {
            setLoading(false);
            toast({
                title: "An error occurred.",
                description: JSON.stringify(error.response.data.detail),
                status: "error",
            })
        })
    }

    return (
        <Container
            maxW={'container.xl'}
            centerContent
            mt={10}
        >
            <Heading mb={5}>Log In</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl id="password" mt={2}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
                <Button mt={4} colorScheme="blue" type="submit" isLoading={loading}>
                    Log In
                </Button>
            </form>
            <Text mt={2}>
                Need an account? <Link href="/register">Sign Up</Link>
            </Text>
        </Container>
    )
}