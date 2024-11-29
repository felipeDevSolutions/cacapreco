import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Snackbar, Alert, Modal  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Snackbar severity
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setOpenSnackbar(false); // Close any open snackbar

    try {
      const response = await fetch('http://localhost:5000/usuarios/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, nome }),
      });

      if (!response.ok) {
        let errorMessage = `Erro no cadastro (código ${response.status})`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (jsonError) {
          console.error('Erro ao analisar JSON:', jsonError);
          if (response.status === 404) {
            errorMessage = "Rota não encontrada no servidor.";
          } else if (response.status === 409) {
            errorMessage = "Este email já está em uso.";
          } else if (response.status === 500) {
            errorMessage = "Erro interno no servidor.";
          }
        }
        setSnackbarSeverity('error'); // Set severity to error
        setMessage(errorMessage);
        setOpenSnackbar(true); // Open snackbar
      } else {
        const data = await response.json();
        setMessage(data.message);
        setSnackbarSeverity('success'); // Set severity to success
        setOpenSnackbar(true); // Open snackbar
        setTimeout(() => { // Redireciona após um pequeno delay para mostrar o Snackbar
          navigate('/login');
        }, 1500); 
      }
    } catch (error) {
      setSnackbarSeverity('error'); // Set severity to error
      setMessage(`Erro: ${error.message}`);
      setOpenSnackbar(true); // Open snackbar
      console.error("Erro:", error);
    }
  };


  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleCancel = () => {
    navigate('/login');
  };

  

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="auth-modal-overlay"> {/* Adiciona o overlay */}
        <div className="auth-form-container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <Container maxWidth="xs">
              <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                  Cadastro
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="nome"
                  label="Nome"
                  name="nome"
                  autoComplete="nome"
                  autoFocus
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Cadastrar
                </Button>
                <Button fullWidth variant="outlined" sx={{ mt: 1 }} onClick={handleClose}>
                  Cancelar
                </Button>
                <Typography variant="body2" color="textSecondary" align="center">
                  {message}
                </Typography>
              </Box>
            </Container>
          </form>
          <Snackbar open={openSnackbar} autoHideDuration={3000} onClick={handleClose}>
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </Modal>
  );
  
};

export default Cadastro;