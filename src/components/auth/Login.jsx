import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import './auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('https://cacapreco-backend.onrender.com/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const data = await response.json();
      const customToken = data.token;
      localStorage.setItem('token', customToken); // Store the token
      navigate('/'); // Redirect on success

    } catch (error) {
      console.error("Login Error:", error.message);
      setMessage(`Erro: ${error.message}`);
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redireciona para a página inicial ao cancelar
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <Container maxWidth="xs">
            <Box sx={{ my: 4 }}>
              <Typography variant="h4" component="h2" align="center" gutterBottom>
                Login
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Entrar
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Typography variant="body2" color="textSecondary" align="center">
                {message}
              </Typography>
            </Box>
          </Container>
        </form>
      </div>
    </div>
  );
};

export default Login;
