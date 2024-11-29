import React from 'react';
import ProductDetails from './ProductDetails';

const ProductList = ({ produtosPorSupermercado, supermercados }) => {
  // Junta todos os produtos em um único array
  const todosOsProdutos = Object.values(produtosPorSupermercado).flat();

  // Identifica o produto com o menor preço entre todos os produtos
  const produtoComMenorPreco = todosOsProdutos.reduce((menor, produto) =>
    produto.preco < menor.preco ? produto : menor
  );

  return (
    <div className="product-list-container">
      {Object.entries(produtosPorSupermercado).map(([produtosId, produtos]) => (
        <div key={produtosId} className="supermercado-section">
          {produtos.map(produto => (
            <ProductDetails
              key={produto.id}
              produto={produto}
              supermercados={supermercados}
              isLowestPrice={produto.id === produtoComMenorPreco.id} // Destaca apenas o menor preço global
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
