import React from 'react';
import {Card}  from 'semantic-ui-react'
function ProductList({products}) {

  function mapProductsToItems(products){
   
    return products.map(product=>({
      header:product.item_name,
      description:'Amy is a violinist with 2 years experience in the wedding industry.She enjoys the outdoors and currently resides in upstate New York.',
      meta:`₹${product.price}`,
      color:'teal',
      fluid:true,
      childkey:product._id,
      extra:(
        <div>
        <div>{product.type}</div>
        <div>{product.partner}</div>
        <div>{product.status}</div>
        </div>
      ),
      href:`/product?_id=${product._id}`
    }))
  
}

  return <Card.Group  fluid itemsPerRow ="2" centered items ={mapProductsToItems(products)}/>
}

export default ProductList;