import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProdutoById } from '../../services/api';
import ProductDetails from '../../components/ProductList/ProductDetails';

const Product = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const data = await getProdutoById(id);
        setProduto(data);
      } catch (error) {
        setError("Erro ao buscar produto. Verifique o ID.");
        console.error("Erro ao buscar produto:", error);
      }
    };

    if (id) { // So buscar se o ID existir
        fetchProduto();
    }
  }, [id]);

  if (error) {
    return <div>Erro: {error}</div>; // Exibir mensagem de erro
  }

  if (!produto) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <ProductDetails produto={produto} />
    </div>
  );
};

export default Product;