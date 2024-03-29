import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { ASSETS_URL } from 'src/constants';
import DashboardLayout from 'src/layouts/dashboard';
import { AuthProvider } from 'src/context/AuthProvider';

import RequireAuth from 'src/components/auth/RequireAuth';
import PersistLogin from 'src/components/auth/PersistLogin';


export const IndexPage = lazy(() => import('src/pages/app'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Page403 = lazy(() => import('src/pages/unauthorized'));

// Target pages
export const AllTargetsPage = lazy(() => import('src/pages/targets/all-targets'));
export const NewTargetPage = lazy(() => import('src/pages/targets/new-target'));

// Content pages
export const AllContentsPage = lazy(() => import('src/pages/contents/all-contents'));
export const NewContentPage = lazy(() => import('src/pages/contents/new-content'));

// Scene pages
export const AllScenesPage = lazy(() => import('src/pages/scenes/all-scenes'));
export const NewScenePage = lazy(() => import('src/pages/scenes/new-scene'));
export const PublicScenePage = lazy(() => import('src/pages/scenes/public-scene'));

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
      path: `${ASSETS_URL}`,
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
            { element: <IndexPage />, index: true },
            { path: 'user', element: <UserPage /> },
            {
              path: 'contents', children: [
                { element: <AllContentsPage />, index: true },
                { path: 'new', element: <NewContentPage /> },
              ]
            },
            {
              path: 'targets', children: [
                { element: <AllTargetsPage />, index: true },
                { path: 'new', element: <NewTargetPage /> },
              ]
            },
            {
              path: 'scenes', children: [
                { element: <AllScenesPage />, index: true },
                { path: 'new', element: <NewScenePage /> },
              ]
            },
            { path: 'products', element: <ProductsPage /> },
            { path: 'blog', element: <BlogPage /> },
          ]
        },
        // path with username and scene id
        { path: ':authorName/:sceneName', element: <PublicScenePage /> },
        { path: 'login', element: <LoginPage /> },
        { path: '404', element: <Page404 /> },
        { path: 'unauthorized', element: <Page403 /> },
        { path: '*', element: <Navigate to={`${ASSETS_URL}/404`} replace /> },
      ],
    },
  ]);

  return routes;
}
