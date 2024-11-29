import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getProdutos, getSupermercados, getCategorias } from '../../services/api';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  Avatar,
  Tabs,
  Tab,
  Snackbar,
  Alert,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ListaCompras = () => {
  const [produtos, setProdutos] = useState([]);
  const [supermercados, setSupermercados] = useState({});
  const [selectedProdutos, setSelectedProdutos] = useState({});
  const [totaisPorSupermercado, setTotaisPorSupermercado] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  // navigate não é mais usado, então removido
  const usuarioId = localStorage.getItem('uid') || 'guest';


  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [produtosData, supermercadosData, categoriasData] = await Promise.all([
          getProdutos(),
          getSupermercados(),
          getCategorias(),
        ]);

        const produtosOrganizados = produtosData.map(produto => ({
          ...produto,
          supermercadoNome: supermercadosData[produto.supermercado],
        }));

        setProdutos(produtosOrganizados);
        setSupermercados(supermercadosData);
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        handleSnackbarOpen('error', 'Erro ao carregar dados. Tente novamente mais tarde.');
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    calcularTotais();
  }, [selectedProdutos, produtos]);

  const handleAddProduct = (produtoId, productName) => {
    setSelectedProdutos((prevSelected) => ({
      ...prevSelected,
      [`${produtoId}-${productName}`]: (prevSelected[`${produtoId}-${productName}`] || 0) + 1,
    }));
  };

  const handleRemoveProduct = (produtoId, productName) => {
    setSelectedProdutos((prevSelected) => ({
      ...prevSelected,
      [`${produtoId}-${productName}`]: Math.max(0, (prevSelected[`${produtoId}-${productName}`] || 0) - 1),
    }));
  };

  const calcularTotais = () => {
    const novosTotais = {};
    Object.values(supermercados).forEach(nome => novosTotais[nome] = 0);

    for (const [produtoKey, quantidade] of Object.entries(selectedProdutos)) {
      const [produtoId, productName] = produtoKey.split('-');
      const produto = produtos.find(p => p.id === produtoId && p.nome === productName);

      if (produto && quantidade > 0) {
        const supermercadoNome = produto.supermercadoNome;
        novosTotais[supermercadoNome] = (novosTotais[supermercadoNome] || 0) + produto.preco * quantidade;
      }
    }
    setTotaisPorSupermercado(novosTotais);
  };

  const handleCriarLista = async () => {
    const itens = Object.entries(selectedProdutos).map(([produtoKey, quantidade]) => {
      const [produtoId, productName] = produtoKey.split('-');
      return { produtoId, quantidade };
    });

    try {
      const response = await fetch('/listasCompras/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioId, itens }),
      });

      if (!response.ok) {
        console.error('Erro ao criar lista de compras:', response);
        handleSnackbarOpen('error', 'Erro ao criar a lista!');
      } else {
        const data = await response.json();
        handleSnackbarOpen('success', 'Lista de compras criada com sucesso!');
        console.log('Lista de compras criada com sucesso:', data);
      }
    } catch (error) {
      console.error('Erro:', error);
      handleSnackbarOpen('error', 'Erro ao criar a lista, tente novamente!');
    }
  };

  const columns = [
    {
      field: 'imagem',
      headerName: 'Imagem',
      width: 100,
      renderCell: (params) => <Avatar alt={params.row.nome} src={params.row.imagem} />,
    },
    { field: 'nome', headerName: 'Produto', width: 200 },
    {
      field: 'quantidade',
      headerName: 'Quantidade',
      width: 180,
      editable: true,
      type: 'number',
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleRemoveProduct(params.row.id, params.row.nome)}
          >
            -
          </Button>
          <Typography variant="body1">{params.value}</Typography>
          <Button
            size="small"
            variant="outlined"
            color="success"
            onClick={() => handleAddProduct(params.row.id, params.row.nome)}
          >
            +
          </Button>
        </Box>
      ),
    },
  ];

  const filteredRows = selectedCategory
    ? produtos.filter((produto) => produto.categoria === selectedCategory).map((produto) => ({
      id: produto.id,
      nome: produto.nome,
      imagem: produto.imagem,
      quantidade: selectedProdutos[`${produto.id}-${produto.nome}`] || 0,
    }))
    : produtos.map((produto) => ({
      id: produto.id,
      nome: produto.nome,
      imagem: produto.imagem,
      quantidade: selectedProdutos[`${produto.id}-${produto.nome}`] || 0,
    }));

  const handleChange = (event, newValue) => {
    setSelectedCategory(newValue === 0 ? '' : categorias[newValue - 1]);
  };

  const handleSnackbarOpen = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <h1>
        Lista de Compras
        <Box sx={{ marginTop: 2 }}>
          <Tabs
            value={selectedCategory ? categorias.findIndex((cat) => cat === selectedCategory) + 1 : 0}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Todas" value={0} />
            {categorias.map((categoria, index) => (
              <Tab key={index} label={categoria} value={index + 1} />
            ))}
          </Tabs>
        </Box>
      </h1>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={-1}
            disableSelectionOnClick
            sx={{ border: 0, height: 400 }}
            onCellEditCommit={(params) => {
              setSelectedProdutos((prev) => ({
                ...prev,
                [`${params.id}-${params.row.nome}`]: parseInt(params.value, 10),
              }));
            }}
            components={{ Toolbar: GridToolbar }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          {Object.entries(totaisPorSupermercado).map(([supermercadoNome, total]) => (
            <Card key={supermercadoNome} variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="h6">{supermercadoNome}</Typography>
                    <Typography variant="body1">Total: R$ {total.toFixed(2)}</Typography>
                  </Grid>
                  <Grid item>
                    <ShoppingCartIcon />
                    {/*Contagem total de itens do supermercado*/}
                    {Object.values(selectedProdutos).reduce((acc, curr) => acc + curr, 0)}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
          <Box mt={2}>
            <Button
              variant="contained"
              onClick={handleCriarLista}
              fullWidth
              disabled={Object.keys(selectedProdutos).length === 0}
            >
              Finalizar
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ListaCompras;