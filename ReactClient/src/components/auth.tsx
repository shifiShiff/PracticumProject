import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Auth: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Stack spacing={2} direction="row">
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        color: 'rgb(255, 0, 98)', 
                        backgroundColor: 'rgb(255, 255, 255)',
                        width: '200px',
                        height: '100px',
                        boxShadow: '0 2px 7px rgb(255, 0, 98)', 
                        '&:hover': { 
                            backgroundColor: 'rgb(255, 0, 98)', 
                            color: 'rgb(255, 255, 255)'
                        }
                    }}
                    onClick={() => navigate('/login')}
                >
                    Login
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        color: 'rgb(255, 0, 98)', 
                        backgroundColor: 'rgb(255, 255, 255)',
                        width: '200px',
                        height: '100px',
                        boxShadow: '0 2px 7px rgb(255, 0, 98)',
                        '&:hover': { 
                            backgroundColor: 'rgb(255, 0, 98)', 
                            color: 'rgb(255, 255, 255)'
                        }
                    }}
                    onClick={() => navigate('/register')}
                >
                    Register
                </Button>
            </Stack>
        </div>
    );
};

export default Auth;