import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Container, Header } from 'semantic-ui-react'
import ProductList from './ProductLits'
function All() {
  const [data,setData] = useState([])
  const [value,setValue]=useState()
  useEffect(() => {
    axios.get('http://127.0.0.1:5000').then((res)=>{
      let cat =(res.data[1])
      cat =cat[0]
      
      console.log(cat)
      setData(cat)
      
    })
    
  },[])
    return (
        <div>
         <div style={{marginTop:'15px'}} >

<Container text>{data.length>0?<ProductList  products ={data} />:<div>Nothing is here</div>}</Container>
    
     
  </div>
        </div>
    )
}

export default All
