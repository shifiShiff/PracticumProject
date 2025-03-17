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
                    onClick={() => navigate('/login')}
                >
                    Login
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate('/register')}
                >
                    Register
                </Button>
            </Stack>
        </div>
    );
};

export default Auth;