import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import RootLayout from './pages/RootLayout.jsx'
import Index, { indexLoader } from './pages/IndexPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx'
import RecipesPage from './pages/recipe/RecipesPage.jsx';
import RecipePage, { recipeLoader } from './pages/recipe/RecipePage.jsx';
import TopUsersPage, { topUsersLoader } from './pages/users/TopUsersPage.jsx';
import UserPage, { userLoader } from './pages/users/UserPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { AuthProvider } from './hooks/useAuth';
import ProfilePage, { profileLoader } from './pages/users/ProfilePage.jsx';
import IngredientsPage from './pages/IngredientsPage.jsx';
import TagsPage from './pages/TagsPage.jsx';
import RecipeForm from './pages/recipe/RecipeForm.jsx';
import './styles.css'
import UserForm from './pages/users/UserForm.jsx';


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthProvider><RootLayout /></AuthProvider>),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Index />,
                loader: indexLoader,
            },
            {
                path: "recipes/",
                element: <RecipesPage />
            },
            {
                path: "recipe-form/",
                element: <RecipeForm />
            },
            {
                path: "recipes/:recipe_id",
                element: <RecipePage />,
                loader: recipeLoader,
            },
            {
                path: "top-users/",
                element: <TopUsersPage />,
                loader: topUsersLoader,
            },
            {
                path: "users/:user_id",
                element: <UserPage />,
                loader: userLoader,
            },
            {
                path: "ingredients",
                element: <IngredientsPage />,
            },
            {
                path: "tags",
                element: <TagsPage />,
            },
            {
                path: "login/",
                element: <LoginPage />
            },
            {
                path: "register/",
                element: <UserForm />
            },
            {
                path: "profile/",
                element: <ProfilePage />,
                loader: profileLoader,
            },
        ],
    }
]);


const theme = extendTheme({
    colors: {
        brand:
        {
            50: '#fdfaf7',
            100: '#fdd7b2',
            200: '#fac185',
            300: '#f6ad55',
            400: '#f38927',
            500: '#da610f',
            600: '#aa4109',
            700: '#792604',
            800: '#4a1000',
            900: '#1d0100',
        }
    },
    styles: {
        global: {
            // styles for the `body`
            body: {
                bg: 'brand.50',
                color: 'black.800',
            },
            h1: {
                fontSize: 'lg',
            }
        },
    }
})


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>,
)
