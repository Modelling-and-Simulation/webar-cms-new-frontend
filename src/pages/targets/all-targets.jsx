import { Helmet } from 'react-helmet-async';

import TargetsView from 'src/sections/targets/view/targets-view';

// ----------------------------------------------------------------------

export default function AllTargetsPage() {
  return (
    <>
      <Helmet>
        <title> All Targets </title>
      </Helmet>

      <TargetsView />
    </>
  );
}
