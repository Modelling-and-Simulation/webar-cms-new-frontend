const formatSceneUrl = (sceneName) =>
  sceneName
    .trim()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();

export default formatSceneUrl;
