import { axiosPublic } from '../api/axios';
import useAxiosPrivate from './useAxiosPrivate';

const useApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const loginApi = (data) => axiosPublic.post('/auth/login', data);
  const logoutApi = () => axiosPrivate.post('/auth/logout');

  // Targets
  const getAllTargets = () => axiosPrivate.get('/targets');
  const createTarget = (data) => axiosPrivate.post('/targets', data);

  // Contents
  const getAllContents = () => axiosPrivate.get('/contents');
  const createContent = (data) => axiosPrivate.post('/contents', data);

  // Scenes
  const createScene = (data) => axiosPrivate.post('/scenes', data);
  const getAllScenes = () => axiosPrivate.get('/scenes');
  const getSceneByUrl = (url) => axiosPublic.get(`/public/${url}`);

  return {
    loginApi,
    logoutApi,
    getAllTargets,
    createTarget,
    getAllContents,
    createContent,
    createScene,
    getAllScenes,
    getSceneByUrl,
  };
};

export default useApi;
