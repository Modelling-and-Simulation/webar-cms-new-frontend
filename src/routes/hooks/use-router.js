import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { ASSETS_URL } from 'src/constants';

// ----------------------------------------------------------------------

export function useRouter() {
  const navigate = useNavigate();

  const router = useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(1),
      reload: () => window.location.reload(),
      push: (href) => navigate(`${ASSETS_URL}${href}`),
      replace: (href) => navigate(`${ASSETS_URL}${href}`, { replace: true }),
    }),
    [navigate]
  );

  return router;
}
