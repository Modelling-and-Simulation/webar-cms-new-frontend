import { Helmet } from 'react-helmet-async';

import { NewTargetView } from 'src/sections/targets/view';

// ----------------------------------------------------------------------

export default function NewTargetPage() {
    return (
        <>
        <Helmet>
            <title> Create new Target </title>
        </Helmet>

        <NewTargetView />
        </>
    );
}
