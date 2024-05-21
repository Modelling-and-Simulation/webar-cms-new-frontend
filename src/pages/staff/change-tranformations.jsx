import { Helmet } from 'react-helmet-async';

import { ChangeTranformationsView } from 'src/sections/transform_corrector/view';

// ----------------------------------------------------------------------

export default function AllContentsPage() {
  return (
    <>
      <Helmet>
        <title> Change Transformations </title>
      </Helmet>

      <ChangeTranformationsView />
    </>
  );
}
