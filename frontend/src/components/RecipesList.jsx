import { Box, Heading, VStack, StackDivider, Text, Tag } from '@chakra-ui/react'
import { BiTimer, BiHeart } from 'react-icons/bi'
import { MdFastfood, MdDeleteForever } from 'react-icons/md'
import { useDeleteRequest, useGetRequest, usePostRequest } from '../hooks/useRequest'
import ActionButton from './ActionButton'
import LimitedText from './LimitedText'
import { Link } from 'react-router-dom'

function Tags({ tags, mb }) {
    tags = tags.slice(0, 4)
    return (
        <Box display="flex" gap="2" mb={mb}>
            {tags.map((tag) => (
                <Tag size={'sm'} variant="solid" colorScheme="orange" key={tag.id}>
                    {tag.name}
                </Tag>
            ))}
        </Box>
    )
}

function RecipeCard({ recipe, unlikeButton }) {
    return (
        <Box px="4" py="8" width="100%" bg="whiteAlpha.900"
            _hover={{
                textDecoration: 'none', bgColor: "blackAlpha.200",
                transitionDuration: '0.2s',
                transitionTimingFunction: "ease-in-out"
            }}
            display={'flex'} flexDirection={{base: 'column', md: 'row'}} gap={{base: 6, md: 4}} alignItems={{base: 'start', md: 'center'}}>

            <Box minW={'48'} color="blackAlpha.800" size={'md'}
                display={'flex'} flexDirection={{base: 'row', md: 'column'}} gap={2} >
                <Box display="flex" gap={2} alignItems={"center"}>
                    <BiTimer />
                    <Box><b>{recipe.minutes} minutes </b></Box>
                </Box>

                <Box display="flex" gap={2} alignItems={"center"}>

                    <MdFastfood></MdFastfood>
                    <Box><b> {recipe.calorie_level} calorie level </b></Box>
                </Box>


                <Box display="flex" gap={2} alignItems={"center"}>
                    <BiHeart />
                    <Box><b>{recipe.likes} likes </b></Box>
                </Box>
            </Box>

            <Box flexBasis={'100%'} _hover={{ textDecoration: 'none' }}>
                <Link to={`/recipes/${recipe.id}`}>
                    <Heading size="md" mb="1">
                        <LimitedText text={recipe.title.toUpperCase()} length={60} />
                    </Heading>
                    <Tags tags={recipe.tags} mb={2} />
                    <LimitedText text={recipe.description} length={180} />

                </Link>
            </Box>

            {unlikeButton && (
                <Box>
                    <ActionButton asyncButtonAction={() => useDeleteRequest(`/recipes/${recipe.id}/likes`)}
                        colorScheme={'red'} successMessage="Removed from liked recipes" navigateTo={0}>
                        <MdDeleteForever size={'24'} />
                    </ActionButton>
                </Box>
            )}
        </Box>
    )
}

export default function RecipesList({ recipes, title, unlikeButton }) {

    return (
        <Box mb={5}>
            <Heading mb={4} size="lg">{title}</Heading>
            {recipes.length == 0 && <Text mt={4} color='blackAlpha.700'>No recipes found</Text>}
            <VStack spacing="2"
                divider={<StackDivider borderColor='gray.200' />}>
                {Array.isArray(recipes) && recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} unlikeButton={unlikeButton} />
                ))}
            </VStack>
        </Box>)
}