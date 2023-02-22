import { VStack, HStack, Tag, Heading, Box, Link, Text, Container, FormControl, FormLabel, Button, Flex, Spinner, ButtonGroup, IconButton, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { Switch, Input, Select } from '@chakra-ui/react'
import { useState } from 'react'
import RecipeList from '../../components/RecipesList.jsx'
import { useGetRequest } from '../../hooks/useRequest.jsx'
import { AddIcon } from '@chakra-ui/icons'
import { useQuery } from '../../hooks/useQuery.jsx'
import { useEffect } from 'react'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

function DynamicElements({ elements, colorScheme, handleNewElements }) {

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleNewElements([...elements, event.target.value])

            event.target.value = ''
        }
    }

    const handleDelete = (element) => {
        console.log(element.target.textContent)
        handleNewElements(elements.filter((el) => el !== element.target.textContent))
    }


    return (
        <Flex flexWrap='wrap' gap={2}>
            {elements.map((element) => {
                return (
                    <Link onClick={handleDelete} key={element}>
                        <Tag size={'lg'} variant="solid" colorScheme={colorScheme} >
                            {element}
                        </Tag>
                    </Link>
                );
            })}
            <Box>
                <Tag size={'lg'} variant="solid" colorScheme={colorScheme} >
                    <Input variant="unstyled" id="whitePlaceholder"
                        size={'sm'} placeholder='Type name...' onKeyDown={handleKeyDown} />
                </Tag>

            </Box>
        </Flex>
    )
}

function CustomForm({ setRecipes, formData, setFormData, isLoading, setLoading, loadRecipes }) {
    console.log(formData)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loadRecipes(formData);
    }


    useEffect(() => {
        setLoading(true)
        useGetRequest('/recipes/', { params: formData }).then(recipes => {
            setRecipes(recipes)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }, [])

    return (
            <form onSubmit={handleSubmit} autoComplete="off">
                <FormControl display={'flex'} flexDirection='column' gap='4' my={5}>
                    <Box>
                        <FormLabel>Name of the recipe</FormLabel>
                        <Input name="name" value={formData.title} onChange={handleChange} />
                    </Box>

                    <Box>
                        <FormLabel>Calorie level</FormLabel>
                        <Select name='calorie_level' placeholder='Select calorie level' onChange={handleChange}>
                            <option value='0'>0</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                        </Select>

                    </Box>
                    <Flex mb={4} gap={2}>
                        <Box flex={1}>
                            <FormLabel>Ingredients</FormLabel>
                            <DynamicElements elements={formData.ingredients} colorScheme='green'
                                handleNewElements={(newElements) => setFormData({ ...formData, ingredients: newElements })} />
                        </Box>

                        <Box flex={1}>
                            <FormLabel>Tags</FormLabel>
                            <DynamicElements elements={formData.tags} colorScheme='orange'
                                handleNewElements={(newElements) => setFormData({ ...formData, tags: newElements })} />
                        </Box>
                    </Flex>

                    <Box>
                        <FormLabel>Display on page</FormLabel>
                        <NumberInput min={1} max={100} defaultValue={20} maxW={"32"}>
                            <NumberInputField name="limit" value={formData.limit} onChange={handleChange} />

                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput> </Box>

                    <Box display={'flex'} gap='10' alignItems={'center'}>
                        <Flex>
                            <FormLabel>Newest</FormLabel>
                            <Switch colorScheme="blue" name='newest' onChange={() => setFormData({ ...formData, sorted_by_latest: !formData.sorted_by_latest })} />
                        </Flex>
                        <Flex>
                            <FormLabel>Most liked</FormLabel>
                            <Switch colorScheme="blue" name='most_liked' onChange={() => setFormData({ ...formData, sorted_by_likes: !formData.sorted_by_likes })} />
                        </Flex>

                    </Box>

                    <Button isLoading={isLoading} type='submit' colorScheme={'blue'} >Search</Button>

                </FormControl>
            </form>
    )
}


function PageCounter({formData, setFormData, loadRecipes, recipes}) {
    return (
        <Box display={'flex'} justifyContent={'center'}>
                    <ButtonGroup size='md' isAttached variant='outline' >
                        <IconButton aria-label='Add to friends' icon={<BiLeftArrow />} isDisabled={formData.skip - formData.limit < 0}
                            onClick={() => {
                                setFormData({ ...formData, skip: formData.skip - formData.limit });
                                loadRecipes(formData);
                                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                            }} />
                        <IconButton icon={<Box>{formData.skip / formData.limit + 1}</Box>} />
                        <IconButton aria-label='Add to friends' icon={<BiRightArrow />} isDisabled={!recipes || recipes.length < formData.limit}
                            onClick={() => {
                                setFormData({ ...formData, skip: formData.skip + formData.limit });
                                loadRecipes(formData);
                                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                            }} />
                    </ButtonGroup>
        </Box>
    )

}

export default function RecipesPage() {
    let query = useQuery()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        skip: query.get('skip') ? Number(query.get('skip')) : 0,
        limit: query.get('limit') ? Number(query.get('limit')) : 20,
        ingredients: query.get('ingredients') ? [query.get('ingredients')] : [],
        tags: query.get('tags') ? [query.get('tags')] : [],
        sorted_by_latest: false,
        sorted_by_likes: false,
    })
    const [recipes, setRecipes] = useState([])
    const [isLoading, setLoading] = useState(false)

    let loadRecipes = (formData) => {
        setRecipes([])
        setLoading(true)
        useGetRequest('/recipes/', { params: formData }).then(recipes => {
            console.log(recipes)
            setRecipes(recipes)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    return (
        <>  
            <Heading mb={4}>Recipes</Heading>

            <CustomForm setRecipes={setRecipes} formData={formData} setFormData={setFormData}
                setLoading={setLoading} isLoading={isLoading} loadRecipes={loadRecipes} />

            <Heading mb={4}>Results:</Heading>
            <RecipeList recipes={recipes} />
            {recipes && recipes.length > 0 && <PageCounter formData={formData} setFormData={setFormData} recipes={recipes} 
            loadRecipes={loadRecipes}/>}
        </>
    )
}