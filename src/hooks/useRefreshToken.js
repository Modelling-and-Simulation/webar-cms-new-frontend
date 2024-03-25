import useAuth from "./useAuth";
import axios from "../api/axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    console.log("refreshing token");
    const response = await axios.get("/auth/refresh_token", {
      withCredentials: true,
    });
    setAuth((prev) => ({
      ...prev,
      roleName: response?.data?.roleName,
      accessToken: response?.data?.accessToken,
      username: response?.data?.username,
    }));
    return response?.data?.accessToken;
  };
  return refresh;
};

export default useRefreshToken;