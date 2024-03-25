import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import { AuthProvider } from 'src/context/AuthProvider';

import RequireAuth from 'src/components/auth/RequireAuth';
import PersistLogin from 'src/components/auth/PersistLogin';


export const IndexPage = lazy(() => import('src/pages/app'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// Target pages
export const AllTargetsPage = lazy(() => import('src/pages/targets/all-targets'));

// Content pages
export const AllContentsPage = lazy(() => import('src/pages/contents/all-contents'));

// Scene pages
export const AllScenesPage = lazy(() => import('src/pages/scenes/all-scenes'));
export const NewScenePage = lazy(() => import('src/pages/scenes/new-scene'));

// Test pages
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const ProductsPage = lazy(() => import('src/pages/products'));

// ----------------------------------------------------------------------

const ROLES = {
  Admin: "Admin",
  Staff: "Staff",
  RegisteredUser: "RegisteredUser",
  Public: "Public",
};

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <AuthProvider>
          <PersistLogin>
            <Suspense>
              <Outlet />
            </Suspense>
          </PersistLogin>
        </AuthProvider>
      ),
      children: [
        {
          element:
            <DashboardLayout>
              <RequireAuth allowedRoles={[ROLES.RegisteredUser]} />
            </DashboardLayout>
          , children: [
            { path: '/', element: <IndexPage /> },
            { path: 'user', element: <UserPage /> },
            { path: 'targets', element: <AllTargetsPage /> },
            { path: 'contents', element: <AllContentsPage /> },
            // { path: 'scenes', element: <AllScenesPage /> },
            // { path: 'scenes/new', element: <NewScenePage /> },
            {
              path: 'scenes', children: [
                { element: <AllScenesPage />, index: true},
                { path: 'new', element: <NewScenePage /> },
              ]
            },
            { path: 'products', element: <ProductsPage /> },
            { path: 'blog', element: <BlogPage /> },
          ]
        },
        { path: 'login', element: <LoginPage /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
  ]);

  return routes;
}
