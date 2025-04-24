

import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import userStore from "../store/userStore";
import { useNavigate } from 'react-router-dom';
import apiClient from "./interceptor";

const Login = () => {
  const [loginError, setLoginError] = useState("");

  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setLoginError("");
    console.log(data);
    try {
    const response = await apiClient.post("/User/login", { Email: data?.email, Password: data?.password });
    localStorage.setItem("token", response.data.token);
    userStore.login({ email: data.email, password: data.password });
    console.log("login successfully", response.data);
    navigate('/dashboard');
    window.dispatchEvent(new Event("storage"));
      } catch (error) {
        console.error("login failed", error);
        alert("Error: No such user")
      }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 3,
          backgroundColor: "rgb(252, 252, 252)",
          borderRadius: 2,
          boxShadow: '0 8px 10px rgb(255, 0, 98)',
          marginTop:'200px'
          
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>

          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address"
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email ? (errors.email.message as string) || "" : ""}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: {
                value: 3,
                message: "Password must be at least 6 characters"
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message as string || ""}

              />
            )}
          />

          {loginError && (
            <Typography color="error" variant="body2" align="center" gutterBottom>
              {loginError}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: 2,
              backgroundColor: 'rgb(255, 0, 98)', 
              color: 'rgb(255, 255, 255)',
              '&:hover': {
                color: 'rgb(255, 0, 98)', 
                backgroundColor: 'rgb(255, 255, 255)'
              }
          }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;