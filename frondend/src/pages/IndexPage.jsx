import React from 'react';
import {
    Box,
    Heading,
    Image,
    Text,
    Divider,
    HStack,
    Tag,
    Wrap,
    WrapItem,
    useColorModeValue,
    Container,
    VStack,
} from '@chakra-ui/react';
import { useLoaderData } from 'react-router-dom';
import {useGetRequest} from '../hooks/useRequest.jsx'
;
import LimitedText from '../components/LimitedText';
import {Link} from 'react-router-dom';


export async function indexLoader() {
    const recipes = await useGetRequest('/recipes/?skip=0&limit=3&sorted_by_latest=true');
    return { recipes };
}

const BlogTags = ({tags, marginTop}) => {
    // limit tags number to 2
    if (tags.length > 2) {
        tags = tags.slice(0, 2);
    }
    return (
        <HStack spacing={2} marginTop={marginTop}>
            {tags.map((tag) => {
                return (
                    <Tag size={'md'} variant="solid" colorScheme="orange" key={tag.id}>
                        {tag.name}
                    </Tag>
                );
            })}
        </HStack>
    );
};

const RecipeCard = ({recipe}) => (
    <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
        <Link to={'/recipes/' + recipe.id}>
            <Box w="100%" rounded='md' p={2}
            textDecoration="none" _hover={{ textDecoration: 'none', bgColor: "blackAlpha.200"  }} >
                <BlogTags tags={recipe.tags} marginTop="3" />
                <Heading fontSize="xl" marginTop="2">
                        <LimitedText text={recipe.title} length={40} />
                </Heading>
                <Text as="p" fontSize="md" marginTop="2">
                    <LimitedText length={150} text={recipe.description} />
                </Text>
            </Box>
        </Link>
        
    </WrapItem>
)


export default function IndexPage() {
    const {recipes} = useLoaderData();
    console.log(recipes)
    return (
        <Container maxW={'7xl'} p="12">
            <Heading as="h1">Discover thousands of delicious recipes with our new website!</Heading>
            <Box
                marginTop={{ base: '1', sm: '5' }}
                display="flex"
                flexDirection={{ base: 'column', md: 'row' }}
                justifyContent="space-between">
                <Box display="flex" flex="1" marginRight="3" position="relative" alignItems="center">
                    <Box width={{ base: '100%', sm: '85%' }} zIndex="2" ml={{ base: '0', sm: '5%' }} mt="5%">
                        <Link textDecoration="none" _hover={{ textDecoration: 'none' }}
                            to="/">
                            <Image
                                borderRadius="lg"
                                src={
                                    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                                }
                                alt="some good alt text"
                                objectFit="contain"
                            />
                        </Link>
                    </Box>
                    <Box zIndex="1" width="100%" position="absolute" height="100%">
                        <Box
                            bgGradient={useColorModeValue(
                                'radial(orange.600 1px, transparent 1px)',
                                'radial(orange.300 1px, transparent 1px)'
                            )}
                            backgroundSize="20px 20px" opacity="0.4" height="100%"
                        />
                    </Box>
                </Box>
                <Box display="flex" flex="1" flexDirection="column" justifyContent="center"
                    marginTop={{ base: '5', md: '0' }}>
                    <Text mt="2" as="p"
                        color={useColorModeValue('gray.700', 'gray.200')}
                        fontSize="lg">

                        Our easy-to-use platform allows you to search and discover new recipes
                        based on ingredients, tags, and dietary preferences. With convenient
                        tools for organizing and planning your meals, you'll never have to settle
                        for a boring dinner again.
                    </Text>

                    <Heading fontSize={"3xl"} fontWeight={"bold"} mt="5"  _hover={{ textDecoration: 'underline' }} 
                            py={2}>
                        <Link
                            to="/recipes" >
                            Search for recipes!
                        </Link>
                    </Heading>
                </Box>
            </Box>

            <Heading as="h2" marginTop="10">
                Latest recipes
            </Heading>
            <Divider marginTop="4" />
            <Wrap spacing="10px" marginTop="4">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </Wrap>

            <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
                <Heading as="h2">Overview</Heading>
                <Text as="p" fontSize="lg">
                    This website is a project for the course "Databases" at the
                    University of Warsaw. It is a simple recipe website that allows
                    users to search for recipes based on ingredients, tags, and dietary
                    preferences. Users can also create their own recipes and share them
                    with the community.

                </Text>
                <Text as="p" fontSize="lg">

                Data is stored in a PostgreSQL database and the backend is written
                    in Python using the FastApi framework. The frontend is written in
                    JavaScript using React and Chakra UI.
                </Text>
            
            </VStack>
        </Container>
    );
};

 IndexPage;