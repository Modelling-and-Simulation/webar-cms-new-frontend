import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import { ASSETS_URL, USER_ROLES } from 'src/constants';
import { AuthProvider } from 'src/context/AuthProvider';

import RequireAuth from 'src/components/auth/RequireAuth';
import PersistLogin from 'src/components/auth/PersistLogin';


export const IndexPage = lazy(() => import('src/pages/app'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Page403 = lazy(() => import('src/pages/unauthorized'));
export const TestPage = lazy(() => import('src/pages/test-page'));

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

// Staff pages
export const ChangeTranformationsPage = lazy(() => import('src/pages/staff/change-tranformations'));

// Test pages
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const ProductsPage = lazy(() => import('src/pages/products'));

// ----------------------------------------------------------------------

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
          // Dashboard layout with auth
          element:
            <DashboardLayout>
              <RequireAuth allowedRoles={[USER_ROLES.Admin, USER_ROLES.Staff, USER_ROLES.RegisteredUser]} />
            </DashboardLayout>
          , children: [
            { element: <IndexPage />, index: true },
          ]
        },
        {
          // Registered user with navigation
          element:
            <DashboardLayout>
              <RequireAuth allowedRoles={[USER_ROLES.RegisteredUser]} />
            </DashboardLayout>
          , children: [
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
          ]
        },
        {
          // Staff user with navigation
          element:
            <DashboardLayout>
              <RequireAuth allowedRoles={[USER_ROLES.Staff]} />
            </DashboardLayout>
          , children: []
        },
        {
          // Staff user without navigation
          element: <RequireAuth allowedRoles={[USER_ROLES.Staff]} />,
          children: [{ path: 'transformations/edit', element: <ChangeTranformationsPage /> }]
        },
        // path with username and scene id
        { path: ':authorName/:sceneName', element: <PublicScenePage /> },
        { path: 'login', element: <LoginPage /> },
        { path: '404', element: <Page404 /> },
        { path: 'unauthorized', element: <Page403 /> },
        { path: 'test', element: <TestPage /> },
        { path: '*', element: <Navigate to={`${ASSETS_URL}/404`} replace /> },
      ],
    },
  ]);

  return routes;
}
