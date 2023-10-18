import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Header } from '@/components'
import { Loader } from '@/components/ui/loader/loader'
import { ForgotPasswordPage, SignInPage } from '@/pages/auth'
import { CheckEmailPages } from '@/pages/auth/check-email-pages/check-email-pages'
import { PersonalInfoPage } from '@/pages/auth/personal-information-page'
import { SignUpPage } from '@/pages/auth/sign-up'
import { CardsPage } from '@/pages/cards'
import { LearnCardPage } from '@/pages/cards/learn-card'
import { Decks } from '@/pages/decks/decks'
import { useGetMeQuery } from '@/services'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: '/login',
  },
  {
    element: <SignUpPage />,
    path: '/signUp',
  },
  {
    element: <ForgotPasswordPage />,
    path: '/forgot_password',
  },
  {
    element: <CheckEmailPages />,
    path: '/check-email',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Decks />,
    path: '/',
  },
  {
    element: <PersonalInfoPage />,
    path: '/profile',
  },
  {
    element: <CardsPage />,
    path: '/cards/:id',
  },
  {
    element: <LearnCardPage />,
    path: '/learn/:id',
  },
]

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

export const Router = () => {
  const { isLoading: isMeLoading } = useGetMeQuery()

  if (isMeLoading) {
    return <Loader />
  }

  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { data: me, isLoading: isMeLoading } = useGetMeQuery()
  const isAuthenticated = me && me.success !== false

  // userNick = me.name;
  // userEmail = me.email;
  if (isMeLoading) {
    return <Loader />
  }

  return (
    <>
      <Header isAuthenticated={isAuthenticated}></Header>
      {isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />}
    </>
  )
}
