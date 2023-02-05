import {
    Container, Divider, Heading, LightMode, Text,
    List, Box, ListIcon, Flex, Tag, Link,
    ListItem, UnorderedList, VStack, HStack, Button, Spinner, useToast
} from "@chakra-ui/react";
import { useState } from 'react';
import { BiCircle, BiHeart, BiLinkExternal, BiTimer } from 'react-icons/bi';
import { MdFastfood } from 'react-icons/md';
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDeleteRequest, useGetRequest, usePostRequest } from "../../hooks/useRequest.jsx"
;
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
} from '@chakra-ui/react'
import ActionButton from "../../components/ActionButton.jsx";

export async function recipeLoader({ params }) {
    if (params.ingredient){
        console.log(params.ingredient)
    }
    const recipe = await useGetRequest(`/recipes/${params.recipe_id}`)
    return { recipe }
}


function Tags({ tags, marginTop }) {
    const navigate = useNavigate()
    return (
        <Flex marginTop={marginTop} flexWrap='wrap' gap={2}>
            {tags.map((tag) => {
                return (
                    <Tag size={'md'} variant="solid" colorScheme="orange" key={tag.id}>
                        <Link onClick={() => navigate(`/recipes?tags=${tag.replace(' ', '+')}`)}>
                            {tag.name}
                        </Link>
                    </Tag>
                );
            })}
        </Flex>
    )
}

export default function RecipePage(props) {
    const { recipe } = useLoaderData(props.id);

    return (
        <>
            <HStack spacing={4} justifyContent="space-between">
                <Box>
                    <Heading>{recipe.title}</Heading>
                </Box>
                <Box display={'flex'} gap={4}>
                    <ActionButton asyncButtonAction={() => usePostRequest(`/recipes/${recipe.id}/likes`)} navigateTo={0}
                    successMessage="Recipe liked" colorScheme={'blue'} size='lg' >
                        Like recipe
                    </ActionButton>
                    <ActionButton asyncButtonAction={() => useDeleteRequest(`/recipes/${recipe.id}`)} navigateTo={'/profile'}
                    successMessage="Recipe deleted" colorScheme={'red'} size='lg'>
                        Delete recipe
                    </ActionButton>
                </Box>
            </HStack>

            <Flex gap="4" mt="2" >

                <Tag size={'lg'}>
                    {recipe.date_added}
                </Tag>

                <Tag size={'lg'} colorScheme={'blue'}>
                    <BiHeart mr={1} />&nbsp;
                    {recipe.likes}
                </Tag>
            </Flex>
            <Tags tags={recipe.tags} marginTop={6} />
            <Divider mt={'7'} mb={'7'} />
            <Text>
                {recipe.description}
            </Text>

            <Box mt={5}>
                <Heading color="blackAlpha.800" size={'md'} display="flex" gap={2} alignItems={"center"}>
                    <BiTimer />
                    <Box>{recipe.minutes} minutes</Box>
                </Heading>

                <Heading mt={2} color="blackAlpha.800" size={'md'} display="flex" gap={2} alignItems={"center"}>

                    <MdFastfood></MdFastfood>
                    <Box><b> {recipe.calorie_level} calorie level </b></Box>
                </Heading>
            </Box>
            <Divider mt={'7'} mb={'7'} />
            <Heading as="h2" size={'lg'} mb={4}>Ingredients</Heading>
            <Box p={2} rounded={'md'}>
                <Table variant="simple" size="sm">
                    <Thead>
                        <Tr>
                            <Th>Quantity</Th>
                            <Th>Recipe name</Th>
                        </Tr>
                        {recipe.ingredients.map((ingredient) => (
                            <Tr key={ingredient.name}>
                                <Td>{ingredient.quantity}</Td>
                                <Td>{ingredient.name}</Td>
                            </Tr>
                        ))}
                    </Thead>
                </Table>

            </Box>
            <Divider mt={'7'} mb={'7'} />
            <Heading as="h2" size={'lg'} mb={4}>Instructions</Heading>
            <Box p={2} rounded={'md'}>
                {recipe.steps.map((step) => (
                    <Box key={step.step_number} p={2} display="flex" alignItems={'center'} gap="2">
                        <BiCircle /><Box>{step.step_content}</Box>
                    </Box>
                ))}
            </Box>
            <Divider mt={'7'} mb={'7'} />
            <Link to={'/users/' + recipe.contributor_id + "/"} >
                <Heading as="h2" size={'lg'} mb={4} display="flex" gap={'2'} alignItems='center'>
                    <Box>Find out more about the author
                    </Box>
                    <Box>
                        <BiLinkExternal />
                    </Box>
                </Heading>
            </Link>


        </>
    )
}