import { Helmet } from 'react-helmet-async';

import {PublicSceneView} from 'src/sections/scenes/view';

// ----------------------------------------------------------------------

export default function PublicScenePage() {
  return (
    <>
      <Helmet>
        <title> All Scenes </title>
      </Helmet>

      <PublicSceneView />
    </>
  );
}
