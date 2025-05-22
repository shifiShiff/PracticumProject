import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Auth = () => {
    const [showSignUp, setShowSignUp] = useState(false);
    const navigate = useNavigate(); 

    const handleSignIn = () => {
        navigate('/login');
    };

    const handleSignUp = () => {
        if (showSignUp) {
            navigate('/register');
        } else {
            setShowSignUp(true);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.title}> Welcome </h1>
                
                <p style={styles.subtitle}>
                    {showSignUp ? 'Create your new account' : 'Sign in to your account'}
                </p>

                <button
                    style={showSignUp ? styles.signUpBtn : styles.signInBtn}
                    onClick={showSignUp ? handleSignUp : handleSignIn}
                    className="auth-btn"
                >

                    {showSignUp ? 'Create Account' : 'Sign In'}
                </button>

                {!showSignUp && (
                    <div style={styles.toggle}>
                        <p style={styles.toggleText}>Don't have an account yet?</p>
                        <button
                            style={styles.toggleBtn}
                            onClick={handleSignUp}
                            className="toggle-btn"
                        >
                            Create one here →
                        </button>
                    </div>
                )}

                {showSignUp && (
                    <div style={styles.toggle}>
                        <p style={styles.toggleText}>Already have an account?</p>
                        <button
                            style={styles.toggleBtn}
                            onClick={() => setShowSignUp(false)}
                            className="toggle-btn"
                        >
                            ← Back to Sign In
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                .auth-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(244, 0, 106, 0.25);
                }
                
                .toggle-btn:hover {
                    transform: scale(1.02);
                }
            `}</style>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    content: {
        textAlign: 'center' as 'center',
        padding: '40px 24px'
    },
    title: {
        fontSize: '48px',
        fontWeight: 'bold',
        margin: '0 0 16px 0',
        background: 'linear-gradient(135deg, #333 0%, rgba(244, 0, 106, 1) 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    },
    subtitle: {
        color: '#666',
        fontSize: '18px',
        margin: '0 0 40px 0',
        fontWeight: '300'
    },
    signInBtn: {
        background: 'linear-gradient(135deg, rgba(244, 0, 106, 0.9) 0%, rgba(250, 83, 159, 0.9) 100%)',
        color: '#fff',
        width: '300px',
        height: '60px',
        fontSize: '18px',
        fontWeight: 'bold',
        borderRadius: '30px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        margin: '0 auto 30px auto',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 12px rgba(244, 0, 106, 0.2)'
    },
    signUpBtn: {
        background: 'linear-gradient(135deg, rgba(165, 10, 101, 0.9) 0%, rgba(253, 7, 151, 0.9) 100%)',
        color: '#fff',
        width: '300px',
        height: '60px',
        fontSize: '18px',
        fontWeight: 'bold',
        borderRadius: '30px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        margin: '0 auto 30px auto',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 12px rgba(165, 10, 101, 0.2)'
    },
    icon: {
        fontSize: '20px'
    },
    toggle: {
        marginTop: '20px'
    },
    toggleText: {
        color: '#888',
        fontSize: '20px',
        margin: '0 0 8px 0'
    },
    toggleBtn: {
        background: 'transparent',
        border: 'none',
        color: 'rgba(244, 0, 106, 1)',
        fontSize: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textDecoration: 'underline',
        padding: '4px'
    }
};

export default Auth;