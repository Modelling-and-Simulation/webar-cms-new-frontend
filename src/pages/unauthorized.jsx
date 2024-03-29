import { Helmet } from 'react-helmet-async';

import { UnauthorizedView } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function UnauthorizedPage() {
  return (
    <>
      <Helmet>
        <title> Unauthorized </title>
      </Helmet>

      <UnauthorizedView />
    </>
  );
}
