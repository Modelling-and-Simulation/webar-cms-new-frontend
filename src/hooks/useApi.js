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
  const getSceneById = (id) => axiosPrivate.get(`/scenes/${id}`);
  const getSceneByUrl = (url) => axiosPublic.get(`/public/${url}`);

  const updateSceneTransformations = (id, data) =>
    axiosPrivate.put(`/scenes/transformation/${id}`, data);

  return {
    loginApi,
    logoutApi,
    getAllTargets,
    createTarget,
    getAllContents,
    createContent,
    createScene,
    getAllScenes,
    getSceneById,
    getSceneByUrl,
    updateSceneTransformations,
  };
};

export default useApi;
