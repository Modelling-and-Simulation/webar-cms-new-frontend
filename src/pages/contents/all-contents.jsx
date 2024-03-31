import { Helmet } from 'react-helmet-async';

import { ContentsView } from 'src/sections/contents/view';

// ----------------------------------------------------------------------

export default function AllContentsPage() {
  return (
    <>
      <Helmet>
        <title> All Contents </title>
      </Helmet>

      <ContentsView />
    </>
  );
}
