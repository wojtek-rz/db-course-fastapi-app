import {
    Container,
    Heading,
    Text,
    Button,
    FormControl,
    FormLabel,
    Input,
    Alert,
    AlertIcon,
    useToast,
    Box
} from '@chakra-ui/react';
import { useState } from "react";
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
    const { login } = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        login({ username: email, password }).then(e => {
            setLoading(false);
            navigate('/profile')
        }).catch(err => {
            setLoading(false);
            toast({
                title: "An error occurred.",
                description: JSON.stringify(err.response.data.detail),
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
            <form onSubmit={handleSubmit} id="userForm">
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl id="password" mt={2}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
                <Box mt={4} display="flex" justifyContent={'space-between'}>
                    <Button colorScheme="blue" type="submit" isLoading={loading}>
                        Log In
                    </Button>
                    <Button type="button" onClick={() => {
                        setEmail("demo@demo.mail.com");
                        setPassword("demo123password456");
                    }}>
                        Demo login
                    </Button>
                </Box>
            </form>
            <Text mt={4}>
                Need an account? <Link to="/register">Sign Up</Link>
            </Text>
        </Container>
    )
}