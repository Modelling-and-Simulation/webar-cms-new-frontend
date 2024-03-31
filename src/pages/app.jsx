import { Helmet } from 'react-helmet-async';

import useAuth from 'src/hooks/useAuth';

import { USER_ROLES } from 'src/constants';

import { AdminDashboard, StaffDashboard, RegisteredUserDashboard } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  const auth = useAuth();
  const userRole = auth?.auth?.roleName;

  const renderDashboard = () => {
    if (userRole === USER_ROLES.Admin) {
      return <AdminDashboard />;
    }
    if (userRole === USER_ROLES.Staff) {
      return <StaffDashboard />;
    }
    return <RegisteredUserDashboard />;

  }

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      {renderDashboard()}
    </>
  );
}
