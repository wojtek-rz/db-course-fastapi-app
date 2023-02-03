import { useLoaderData, useNavigate } from "react-router-dom"
import { Button, Container, FormControl, Heading, Box } from "@chakra-ui/react"
import ProfileInfo from "../../components/ProfileInfo.jsx"
import {useGetRequest} from "../../hooks/useRequest.jsx"
import RecipesList from "../../components/RecipesList.jsx"
import UsersList from "../../components/UsersList.jsx"
import { FaPray } from "react-icons/fa"

export async function profileLoader(params) {
    const user = await useGetRequest("/users/me")
    return { user }
}


export default function ProfilePage() {
    const { user } = useLoaderData()
    const navigate = useNavigate()

    return (
        <>
            <ProfileInfo user={user}/>
            <Box display="flex" flexDirection={'column'} mb={8} >
                <Button variant={'outline'} colorScheme="red" size="md" onClick={() => {
                    window.localStorage.removeItem('token')
                    navigate('/')
                }}>
                    Logout
                </Button>
            </Box>
            <RecipesList title="Created recipes" recipes={user.recipes}/>
            <RecipesList title="Liked recipes" recipes={user.liked_recipes} unlikeButton/>
            <UsersList title="Observed users" users={user.observed_users}/>
        </>
    )
}