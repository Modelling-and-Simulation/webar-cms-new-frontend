import axios from '../api/axios';
import useAxiosPrivate from './useAxiosPrivate';

const useApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const loginApi = (data) => axios.post('/auth/login', data);
  const logoutApi = () => axiosPrivate.post('/auth/logout');

  // Targets
  const getAllTargets = () => axiosPrivate.get('/targets');
  
  // Contents
  const getAllContents = () => axiosPrivate.get('/contents');

  // Scenes
  const createScene = (data) => axiosPrivate.post('/scenes', data);
  const getAllScenes = () => axiosPrivate.get('/scenes');
  const getSceneByUrl = () => axiosPrivate.get('/scenes/sachintha/test-scene');

  return {
    loginApi,
    logoutApi,
    getAllTargets,
    getAllContents,
    createScene,
    getAllScenes,
    getSceneByUrl,
  };
};

export default useApi;
