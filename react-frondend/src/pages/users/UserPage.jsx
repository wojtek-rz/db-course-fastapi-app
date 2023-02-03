import { useLoaderData } from 'react-router-dom';
import {useGetRequest, usePostRequest} from '../../hooks/useRequest.jsx';
import { useState } from 'react';
import { Button, Box, useToast } from '@chakra-ui/react';
import RecipeList from '../../components/RecipesList.jsx';
import ProfileInfo from '../../components/ProfileInfo.jsx';
import ActionButton from '../../components/ActionButton.jsx';

export async function userLoader({params}) {
    const user = await useGetRequest('/users/' + params.user_id);
    return { user };
}

export default function UserPage() {
    const { user } = useLoaderData();

    console.log(user)
    return (
        <>
            <ProfileInfo user={user} />
            <Box display="flex" justifyContent={'center'} mb='10'>
                <ActionButton asyncButtonAction={() => usePostRequest('/users/' + user.id + '/observe')}
                colorScheme='blue' size='lg' successMessage='New observed user'>
                    Observe this user
                </ActionButton>
            </Box>
            <RecipeList recipes={user.recipes} title='Recipes' />
        </>
    );
}