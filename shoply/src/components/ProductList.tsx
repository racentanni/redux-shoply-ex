import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Product from './Product';

const ProductList = () => {
  const products = useSelector((state: any) => state.root.products);

  if (!Array.isArray(products) || products.length === 0) {
    return <div className="alert alert-warning">No products available</div>;
  }

  return (
    <div className="container">
      <div className="row">
        {products.map((product: any) => (
          <div key={product.id} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <Link to={`/products/${product.id}`}>
                  <h5 className="card-title">{product.name}</h5>
                </Link>
                <Product product={product} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/cart" className="btn btn-primary mt-4">Go to Cart</Link>
    </div>
  );
};

export default ProductList;