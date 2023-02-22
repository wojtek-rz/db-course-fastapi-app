import { Flex, FormControl, FormLabel, Heading, Input, Textarea, Select, Box, Tag, Link, TableCaption, TableContainer, Thead, Tbody, Tr, Td, Th, Table, Button, useToast, Divider } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostRequest } from "../../hooks/useRequest";

function TagsForm({ tags, setTags, colorScheme }) {

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setTags([...tags, event.target.value]);

            event.target.value = "";
        }
    };

    const handleDelete = (e) => {
        setTags(tags.filter((el) => el !== e.target.textContent));
    };

    return (
        <Flex flexWrap="wrap" gap={2}>
            {tags.map((tag) => {
                return (
                    <Link onClick={handleDelete} key={tag}>
                        <Tag size={"lg"} variant="solid" colorScheme={colorScheme}>
                            {tag}
                        </Tag>
                    </Link>
                );
            })}
            <Box>
                <Tag size={"lg"} variant="solid" colorScheme={colorScheme}>

                    <Input variant="unstyled" id="whitePlaceholder" size={"sm"} placeholder="Type name..." onKeyDown={handleKeyDown} />
                </Tag>
            </Box>
        </Flex>
    );
}

function IngredientsForm({ ingredients, setIngredients, toast }) {
    const [quantity, setQuantity] = useState("");
    const [name, setName] = useState("");

    const handleNewIngredient = (e) => {
        e.preventDefault()
        if (name === "") {
            toast({
                title: "Name is required.",
                status: "error",
            })
            return
        }
        setQuantity("");
        setName("");
        setIngredients([...ingredients, { name, quantity }])
    }

    return (
        <form onSubmit={handleNewIngredient}>

            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Quantity</Th>
                            <Th>Ingredient</Th>
                            <Th>Action</Th>
                        </Tr>

                    </Thead>
                    <Tbody>
                        {ingredients.map((ingredient) => (
                            <Tr key={ingredient.name}>
                                <Td>
                                    {ingredient.quantity}
                                </Td>
                                <Td>
                                    {ingredient.name}
                                </Td>
                                <Td>
                                    <Button colorScheme='blue' variant='outline'
                                        onClick={() => setIngredients(ingredients.filter(i => i.name != ingredient.name))}>Delete</Button>
                                </Td>
                            </Tr>
                        ))}
                        <Tr>
                            <Td>
                                <Input variant="flushed" size={"sm"} placeholder="Type name..."
                                    onChange={e => setQuantity(e.target.value)} value={quantity} />
                            </Td>
                            <Td>
                                <Input variant="flushed" size={"sm"} placeholder="Type quantity..."
                                    onChange={e => setName(e.target.value)} value={name} />
                            </Td>
                            <Td>
                                <Button colorScheme='blue' variant='outline'
                                    type='submit'>Add</Button>
                            </Td>

                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </form>
    )
}


function StepsForm({ steps, setSteps, toast }) {
    const [step, setStep] = useState("");

    const handleNewStep = (e) => {
        e.preventDefault()
        if (step === "") {
            toast({
                title: "Step is required.",
                status: "error",
            })
            return
        }
        setStep("");
        setSteps([...steps, step])
    }

    return (
        <form onSubmit={handleNewStep} autoComplete="off">

            <TableContainer>
                <Table >
                    <Thead>
                        <Tr>
                            <Th>Number</Th>
                            <Th>Step</Th>
                            <Th>Action</Th>
                        </Tr>

                    </Thead>
                    <Tbody>
                        {steps.map((step, index) => (
                            <Tr key={index}>
                                <Td>
                                    {index + 1}
                                </Td>
                                <Td>
                                    {step}
                                </Td>
                                <Td>
                                    <Button colorScheme='blue' variant='outline'
                                        onClick={() => setSteps(steps.filter(s => s != step))}>Delete</Button>
                                </Td>
                            </Tr>
                        ))}
                        <Tr>
                            <Td>
                                {steps.length + 1}
                            </Td>
                            <Td>
                                <Input variant="flushed" size={"sm"} placeholder="Type step..."
                                    onChange={e => setStep(e.target.value)} value={step} />
                            </Td>
                            <Td>
                                <Button colorScheme='blue' variant='outline'
                                    type='submit'>Add</Button>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </form>
    )
}


export default function RecipeForm() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        calorie_level: 0,
        minutes: 0,
        ingredients: [],
        steps: [],
        tags: [],
    })
    const toast = useToast()
    const navigate = useNavigate();
    console.log(formData)


    const handleCreate = (e) => {
        e.preventDefault()
        console.log("hello")
        usePostRequest('/recipes/', formData).then((recipe) => {
            navigate("/recipes/" + recipe.id)
        }).catch((error) => {
            toast({
                title: "An error occurred.",
                description: JSON.stringify(error.response.data.detail),
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        })
    }


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    return (
        <Flex flexDir={'column'}>
            <FormLabel htmlFor="title" mt={4}><Heading> Create recipe</Heading></FormLabel>
            <FormLabel htmlFor="title" mt={4}>Title</FormLabel>
            <Input name="title" placeholder="Title" onChange={handleChange} value={formData.title} />
            <FormLabel htmlFor="description" mt={4} >Description</FormLabel>
            <Textarea name="description" placeholder="Description" onChange={handleChange} value={formData.description} />

            <FormLabel mt={4}>Calorie level</FormLabel>
            <Select name='calorie_level' placeholder='Select calorie level' onChange={handleChange} value={formData.calorie_level}>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
            </Select>


            <FormLabel mt={4}>Time in minutes</FormLabel>
            <Input name="minutes" placeholder="Minutes" type='number' onChange={handleChange} value={formData.minutes} />

            <FormLabel htmlFor="ingredients" mt={4}><b>Ingredients</b></FormLabel>
            <IngredientsForm ingredients={formData.ingredients} toast={toast}
                setIngredients={(newIngredients) => setFormData({ ...formData, ingredients: newIngredients })} />


            <FormLabel htmlFor="steps" mt={4}><b>Steps</b></FormLabel>
            <StepsForm steps={formData.steps} toast={toast}
                setSteps={(newSteps) => setFormData({ ...formData, steps: newSteps })} />

            <FormLabel htmlFor="tags" mt={4}>Tags</FormLabel>
            <TagsForm colorScheme='orange' tags={formData.tags} setTags={(newTags) => setFormData({ ...formData, tags: newTags })} />

            <Divider my={6} />

            <Button colorScheme='orange' bgColor="brand.600" size='lg' mt={4}
                onClick={handleCreate}
            >Create</Button>
        </Flex>
    )
}