import { Helmet } from 'react-helmet-async';

import { CreateNewSceneView } from 'src/sections/scenes/view';

// ----------------------------------------------------------------------

export default function NewScenePage() {
    return (
        <>
        <Helmet>
            <title> Create new scene </title>
        </Helmet>

        <CreateNewSceneView />
        </>
    );
}
