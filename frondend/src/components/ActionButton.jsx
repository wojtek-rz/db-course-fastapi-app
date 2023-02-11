import { useState } from 'react';
import { useToast, Button, FormErrorMessage } from '@chakra-ui/react';
import { useDeleteRequest, useGetRequest, usePostRequest } from '../hooks/useRequest';
import { useNavigate, redirect } from 'react-router-dom';

export default function ActionButton({asyncButtonAction, colorScheme, children, size, successMessage, navigateTo}) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const sendRequest = (url) => {
        if (method === "get") {
            return useGetRequest(url);
        }
        if (method === "post") {
            return usePostRequest(url);
        }
        if (method === "delete") {
            return useDeleteRequest(url);
        }
    }
    const handleAction = () => {
        setIsLoading(true);
        asyncButtonAction()
            .then(() => {
                setIsLoading(false);
                toast({
                    title: 'Success',
                    description: successMessage,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                if (navigateTo !== undefined){
                    navigate(navigateTo)
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)

                toast({
                    title: 'Error',
                    description: err.response ? JSON.stringify(err.response.data.detail) : err.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            })
    }

    return (
        <Button isLoading={isLoading} colorScheme={colorScheme} size={size} onClick={handleAction}>{children}</Button>
    )
}