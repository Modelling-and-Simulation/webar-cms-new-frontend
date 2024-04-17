import { Helmet } from 'react-helmet-async';

import { EditSceneView } from 'src/sections/scenes/view';

// ----------------------------------------------------------------------

export default function EditScenePage() {
    return (
        <>
        <Helmet>
            <title> Edit scene </title>
        </Helmet>
        <EditSceneView />
        </>
    );
}
