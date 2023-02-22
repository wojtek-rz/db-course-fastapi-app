import { Input, Heading, Tag, FormControl, FormLabel, Divider, Flex, Button, Circle, Spinner } from '@chakra-ui/react'
import { useState } from 'react';
import { useGetRequest } from '../hooks/useRequest';
import { useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function IngredientsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [searchText, setSearchText] = useState('');
    const toast = useToast();

    const handleSubmit = (e) => {
    
        e.preventDefault();
        setIngredients([])
        setIsLoading(true)
        useGetRequest('/ingredients/', {params: {contains: searchText, limit: 300}}).then((ingredients) => {
            setIngredients(ingredients);
            setIsLoading(false)
        }).catch((err) => {
            toast({
                title: 'Error',
                description: err.response.data.detail,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            setIsLoading(false)
        })
    }

    const handleLoadMore = (e) => {
        setIsLoading(true)
        console.log(ingredients.length)
        useGetRequest('/ingredients/', {params: {contains: searchText, limit: 300, skip: ingredients.length}}).then((newIngredients) => {
            setIngredients([...ingredients, ...newIngredients]);
            setIsLoading(false)
        }).catch((err) => {
            toast({
                title: 'Error',
                description: err.response.data.detail,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            setIsLoading(false)
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <FormLabel><Heading as="h1" size="xl" mb={4}>Find ingredients:</Heading></FormLabel>
                <Input onChange={(e) => {setSearchText(e.target.value)}} placeholder='Type ingredient name' />
                <Button mt="5" type="submit">Search</Button>
            </form>
            <Divider my={6} />
            <Heading as="h2" size="lg" my={4}>Results:</Heading>
            <Flex flexWrap={'wrap'} gap='2'>
                {ingredients.length === 0 && <p>No results</p>}
                {ingredients && ingredients.map((ingredient) => (
                        <Tag key={ingredient.id} size="lg" colorScheme="green" _hover={{textDecoration: 'underline'}} >
                            <Link to={`/recipes?ingredients=${ingredient.name.replace(' ', '+')}`}>{ingredient.name}</Link>
                        </Tag>
                    
                ))}
            </Flex>
            <Button isDisabled={ingredients.length % 300} mt="5" onClick={handleLoadMore}>
                Load more
            </Button>
            {isLoading && <Spinner />}
        </>
    );
}