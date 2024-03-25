import { Helmet } from 'react-helmet-async';

import {ScenesView} from 'src/sections/scenes/view';

// ----------------------------------------------------------------------

export default function AllScenesPage() {
  return (
    <>
      <Helmet>
        <title> All Scenes </title>
      </Helmet>

      <ScenesView />
    </>
  );
}
