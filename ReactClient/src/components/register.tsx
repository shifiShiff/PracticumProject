// import axios from 'axios';
// import React, { useState } from 'react';

// const Register: React.FC = () => {
//     const [id, setId] = useState('');
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         // Handle form submission logic here
//         const response = await axios.post("http://localhost:5131/api/User/register",
//         {UserId:id ,Name:name, Email:email, PasswordHash: password });
//         localStorage.setItem("token", response.data.token);
//         console.log("register successfully", response.data);
//         console.log({ id, name, email, password });


//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="id">ID:</label>
//                 <input
//                     type="text"
//                     id="id"
//                     value={id}
//                     onChange={(e) => setId(e.target.value)}
//                     required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="name">Name:</label>
//                 <input
//                     type="text"
//                     id="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="email">Email:</label>
//                 <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="password">Password:</label>
//                 <input
//                     type="password"
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//             </div>
//             <button type="submit">Register</button>
//         </form>
//     );
// };

// export default Register;



import axios from 'axios';
import React, { use, useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import userStore from '../store/userStore';

const Register: React.FC = () => {
  const [registerError, setRegisterError] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setRegisterError('');
    console.log(data);

    try {
      const response = await axios.post("http://localhost:5131/api/User/register", {
        UserId: data.id,
        Name: data.name,
        Email: data.email,
        PasswordHash: data.password
      });
      localStorage.setItem("token", response.data.token);
      userStore.register({email: data.email, password: data.password});
      localStorage.setItem("userId", response.data.userId);
      console.log("register successfully", response.data);
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
          boxShadow: 3,
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
                helperText={errors.id?.message || ""}
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
                helperText={errors.name?.message || ""}
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
                helperText={errors.email?.message || ""}
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
                helperText={errors.password?.message || ""}
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
            sx={{ marginTop: 2 }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;