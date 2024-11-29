import React from 'react';
import './ProductDetails.css';

const ProductDetails = ({ produto, supermercados, isLowestPrice }) => {
  const supermercadoNome = supermercados[produto.supermercado] || 'Supermercado Desconhecido';

  return (
    <div className={`product-card ${isLowestPrice ? 'highlight' : ''}`}> {/* Aplica highlight somente ao menor preço */}
      <img src={produto.imagem} alt={produto.nome} width="100" />
      <h3>{produto.nome}</h3>
      <p>Preço: R$ {produto.preco}</p>
      <p>Supermercado: {supermercadoNome}</p>
    </div>
  );
};

export default ProductDetails;
