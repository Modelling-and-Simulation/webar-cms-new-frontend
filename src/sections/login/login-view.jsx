import { useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import useApi from 'src/hooks/useApi';
import useAuth from 'src/hooks/useAuth';

import { bgGradient } from 'src/theme/css';
import { ASSETS_URL } from 'src/constants';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const { setAuth, persist, setPersist } = useAuth();
  const { loginApi } = useApi();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleClick = async () => {
    try {
      const response = await loginApi({ username, password });

      const accessToken = response?.data?.accessToken;
      const roleName = response?.data?.roleName;
      setAuth({ username, roleName, accessToken });
      setUsername("");
      setPassword("");

      router.replace(from);
    } catch (err) {
      const resErr = err?.response?.data?.message;
      if (resErr) {
        setErrMsg(resErr);
      } else if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    console.log("togglePersist", persist);
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const renderForm = (
    <>
      {errMsg && <Typography variant="subtitle2" sx={{ color: 'error.main', mb: 2 }}>{errMsg}</Typography>}
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={(e) => setUsername(e.target.value)} value={username} />

        <TextField
          ref={userRef}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* toggle input to check trusted device */}
      <Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{ my: 3 }}>
        <Checkbox checked={persist} onChange={togglePersist} />
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Trust This Device
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: `${ASSETS_URL}/assets/background/overlay_4.jpg`,
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to CMS</Typography>

          {/* <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider> */}
          <Divider sx={{ my: 3 }} />

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
