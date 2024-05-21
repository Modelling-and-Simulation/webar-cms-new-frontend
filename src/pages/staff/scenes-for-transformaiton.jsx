import { Helmet } from 'react-helmet-async';

import { ScenesForTransformationView } from 'src/sections/transform_corrector/view';

// ----------------------------------------------------------------------

export default function AllContentsPage() {
    return (
        <>
            <Helmet>
                <title> Scenes for Transformations </title>
            </Helmet>

            <ScenesForTransformationView />
        </>
    );
}
