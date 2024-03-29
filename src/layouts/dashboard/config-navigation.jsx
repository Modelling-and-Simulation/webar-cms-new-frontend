import { ASSETS_URL } from 'src/constants';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`${ASSETS_URL}/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'scenes',
    path: '/scenes',
    icon: icon('ic_scene'),
  },
  {
    title: 'targets',
    path: '/targets',
    icon: icon('ic_target'),
  },
  {
    title: 'contents',
    path: '/contents',
    icon: icon('ic_content'),
  },
];

export default navConfig;
