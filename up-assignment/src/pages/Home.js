import React, { useEffect, useState } from 'react';
import ProductList from './ProductLits'
import data from '../static/Product.json'
import axios from 'axios'
import { Container, Header } from 'semantic-ui-react'
function Home(props) {
  const [data,setData] = useState([])
  const [value,setValue]=useState()
  
  let catId =(props.match.params.id)
  useEffect(()=>{
    axios.get(`http://127.0.0.1:5000/burger/${catId}`).then((res)=>
    setData(res.data)
    )
  },[])

  useEffect(()=>{
    if(localStorage.getItem('flag')==='true' && localStorage.getItem('nveg')==='true' ){
      axios.get('http://127.0.0.1:5000/both').then((res)=>{
        console.log(res.data)
        setData(res.data)
      })
    }
   
    else if(localStorage.getItem('flag')==='true'){
      console.log('veg are true')
      axios.get(`http://127.0.0.1:5000/veg/${catId}`).then((res)=>setData(res.data))
    }
    else if(localStorage.getItem('nveg')==='true'){
      console.log('non are true')
      axios.get(`http://127.0.0.1:5000/nveg/${catId}`).then((res)=>setData(res.data))
    }else{
      setData([])
    }
    // 
  },[])
  useEffect(() => {
    console.log('for search',localStorage.getItem('param'))
      if(localStorage.getItem('param')&& localStorage.getItem('param').length>0){
    
      axios.get(`http://127.0.0.1:5000/search/${catId}`,{
      headers:{
        param:localStorage.getItem('param')
      }
    }).then((res)=>setData(res.data))
  }
  })
  console.log(data)
  return (
    <div style={{marginTop:'15px'}} >

  <Container text>{data.length>0?<ProductList  products ={data} />:<div>Nothing is here</div>}</Container>
       {/*  */}
       
    </div>
  );
}

export default Home;
