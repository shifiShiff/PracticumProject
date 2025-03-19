


// import React, { useState } from "react";
// import { TextField, Button, Container, Typography, Box } from "@mui/material";
// import { useForm, Controller } from "react-hook-form";

// const Login = () => {
//   // State for error message (if validation fails)
//   const [loginError, setLoginError] = useState("");

//   // useForm hook from react-hook-form
//   const { control, handleSubmit, formState: { errors } } = useForm();

//   // Function to handle form submission
//   const onSubmit = (data: any) => {
//     setLoginError("");
//     console.log(data);
//     // כאן תוכל לשלוח את הנתונים לשרת אם השדות תקינים
//   };

//   return (
//     <Container maxWidth="xs">
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: 3,
//           backgroundColor: "#f5f5f5",
//           borderRadius: 2,
//           boxShadow: 3,
//         }}
//       >
//         <Typography variant="h5" gutterBottom>
//           Login
//         </Typography>

//         <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
//           {/* Email field with validation */}
//           <Controller
//             name="email"
//             control={control}
//             defaultValue=""
//             rules={{
//               required: "Email is required",
//               pattern: {
//                 value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                 message: "Invalid email address"
//               }
//             }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Email"
//                 type="email"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.email}
//                 helperText={errors.email ? errors.email.message : ""}
//               />
//             )}
//           />

//           {/* Password field with validation */}
//           <Controller
//             name="password"
//             control={control}
//             defaultValue=""
//             rules={{
//               required: "Password is required",
//               minLength: {
//                 value: 6,
//                 message: "Password must be at least 6 characters"
//               }
//             }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Password"
//                 type="password"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.password}
//                 helperText={errors.password?.message || ""}
//                 // helperText={errors.password ? errors.password.message : ""}
//               />
//             )}
//           />

//           {/* Error message if login fails */}
//           {loginError && (
//             <Typography color="error" variant="body2" align="center" gutterBottom>
//               {loginError}
//             </Typography>
//           )}

//           {/* Submit button */}
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ marginTop: 2 }}
//           >
//             Login
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default Login;

import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import userStore from "../store/userStore";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginError, setLoginError] = useState("");

  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setLoginError("");
    console.log(data);
    try {
    const response = await axios.post("http://localhost:5131/api/User/login", { Email: data?.email, Password: data?.password });
    localStorage.setItem("token", response.data.token);
    // localStorage.setItem("userId", response.data.userId);
    userStore.login({ email: data.email, password: data.password });
    console.log("login successfully", response.data);
    navigate('/dashboard');
    window.dispatchEvent(new Event("storage"));
      } catch (error) {
        console.error("login failed", error);
      }
    // כאן תוכל לשלוח את הנתונים לשרת אם השדות תקינים
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
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          {/* Email field with validation */}
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

          {/* Password field with validation */}
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

          {/* Error message if login fails */}
          {loginError && (
            <Typography color="error" variant="body2" align="center" gutterBottom>
              {loginError}
            </Typography>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;