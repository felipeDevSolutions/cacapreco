import React, { useState, useEffect } from 'react';
import { getProdutos, getSupermercados } from '../../services/api';
import ProductList from '../../components/ProductList/ProductList';
import './Home.css';

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [produtosPorSupermercado, setProdutosPorSupermercado] = useState({});
  const [supermercados, setSupermercados] = useState({});
  const [executarBusca, setExecutarBusca] = useState(false);

  useEffect(() => {
    const fetchSupermercados = async () => {
      const data = await getSupermercados();
      setSupermercados(data);
    };
    fetchSupermercados();
  }, []);

  useEffect(() => {
    const fetchProdutos = async () => {
      const data = await getProdutos();
      setProdutos(data);
    };
    fetchProdutos();
  }, []);

  useEffect(() => {
    if (executarBusca) {
      const filtraProdutos = () => {
        if (termoBusca.trim() === '') {
          setProdutosPorSupermercado({});
          return;
        }

        const resultadoFiltro = produtos.filter((produto) =>
          produto.nome.toLowerCase().includes(termoBusca.toLowerCase())
        );

        const supermercadoProdutos = {};
        resultadoFiltro.forEach((produto) => {
          const supermercadoId = produto.supermercado;
          if (!supermercadoProdutos[supermercadoId]) {
            supermercadoProdutos[supermercadoId] = [];
          }
          supermercadoProdutos[supermercadoId].push(produto);
        });
        setProdutosPorSupermercado(supermercadoProdutos);
      };
      filtraProdutos();
      setExecutarBusca(false);
    }
  }, [executarBusca, termoBusca, produtos]);

  const handleBuscaChange = (event) => {
    setTermoBusca(event.target.value);
  };

  const handleBusca = () => {
    setExecutarBusca(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleBusca(); // Chama a função handleBusca()
    }
  };

  return (
    <div className="home-container">
      <div className="search-container">
        <h1>Busca de Produtos</h1>
        <div className="search-container-field">
          <input
            type="text"
            placeholder="Digite o nome do produto"
            value={termoBusca}
            onChange={handleBuscaChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleBusca}>Buscar</button> {/* Adiciona o onClick */}
        </div>
      </div>
      {Object.keys(produtosPorSupermercado).length > 0 ? (
        <ProductList
          produtosPorSupermercado={produtosPorSupermercado}
          supermercados={supermercados}
        />
      ) : (
        <div className="no-results">
          <p>Pesquise por um produto.</p>
        </div>
      )}
    </div>
  );
};

export default Home;