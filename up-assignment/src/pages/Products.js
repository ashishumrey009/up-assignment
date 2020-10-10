
import React from 'react';
import ProductList from './ProductLits'
import data from '../static/Product.json'
import { Container, Header } from 'semantic-ui-react'
function Products() {
  return (
    <div >
      <h1>Products</h1>
      <div style={{marginTop:'15px'}} >
      <Container text><ProductList  products ={data} /></Container>
       {/*  */}
       
    </div>
    </div>
  );
}

export default Products;
