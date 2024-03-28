import { Helmet } from 'react-helmet-async';

import { NewContentView } from 'src/sections/contents/view';

// ----------------------------------------------------------------------

export default function NewContentPage() {
    return (
        <>
        <Helmet>
            <title> Create new Content </title>
        </Helmet>

        <NewContentView />
        </>
    );
}
