import { Outlet } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  const isAlreadyCalled = useRef(false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
        isAlreadyCalled.current = false;
      }
    };

    if (!auth?.accessToken && persist) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, [auth?.accessToken, persist, refresh]);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <p>Loading...</p>;
  } else {
    content = <Outlet />;
  }

  return <>{content}</>;

};

export default PersistLogin;
