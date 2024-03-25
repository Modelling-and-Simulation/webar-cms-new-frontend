import useApi from "./useApi";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();
  const { logoutApi } = useApi();

  const logout = async () => {
    setAuth({});
    try {
      await logoutApi();
    } catch (err) {
      console.error("Logout Failed", err);
    }
  };

  return logout;
};

export default useLogout;
