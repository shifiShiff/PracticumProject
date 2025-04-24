
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import userStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import apiClient from './interceptor';

const Register: React.FC = () => {
  const [registerError, setRegisterError] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setRegisterError('');
    console.log(data);

    try {
      const response = await apiClient.post("/User/register", {
        UserId: data.id,
        Name: data.name,
        Email: data.email,
        PasswordHash: data.password
      });
      localStorage.setItem("token", response.data.token);
      userStore.register({email: data.email, password: data.password});
      // localStorage.setItem("userId", response.data.userId);
      console.log("register successfully", response.data);
      navigate('/dashboard');
      window.dispatchEvent(new Event("storage"));

    } catch (error) {
      console.error("register failed", error);
      setRegisterError("Registration failed. Please try again.");
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
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          marginTop:'200px',
          boxShadow: '0 8px 10px rgb(255, 0, 98)'

        }}
      >
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Controller
            name="id"
            control={control}
            defaultValue=""
            rules={{ required: "ID is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="ID"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.id}
                helperText={errors.id?.message as string || ""}
              />
            )}
          />

          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message as string || ""}
              />
            )}
          />

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
                helperText={errors.email?.message as string || ""}
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
                message: "Password must be at least 3 characters"
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

          {registerError && (
            <Typography color="error" variant="body2" align="center" gutterBottom>
              {registerError}
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
          }}          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;