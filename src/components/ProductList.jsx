import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, onSelect, onEdit, onDelete }) => {
  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default ProductList;