import React, { useState,useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { Input } from "semantic-ui-react";
import axios from 'axios';
import {
  Grid,
  Segment,
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Sidebar,
  Visibility,
  Checkbox
} from "semantic-ui-react";
function Navbar() {
  const [sidebar, setSidebar] = useState(true);
  const [categoryData,setCategoryData] = useState([])
  const showSidebar = () => setSidebar(sidebar);
  const [sidebarName, setSidebarName] = useState("");
  const [flag,setFlag]=useState('')
  const [nveg,setNveg]= useState('')
  const [query,setQuery]= useState('')
  const [loading,setLoading] = useState('')
  useEffect(() => {
    axios.get('http://127.0.0.1:5000').then((res)=>{
      let cat =(res.data[0])
      cat =(cat[0])
      let data = cat.sort((a,b)=>b.cat_id-a.cat_id)
      console.log(data)
      setCategoryData(data)
      localStorage.removeItem('param')
    })
    
  },[])
  useEffect(()=>{
    console.log(flag,localStorage.getItem('flag'))
    if(localStorage.getItem('flag')==="true"){
      setFlag(localStorage.getItem('flag'))
    }
    },[flag])
    useEffect(()=>{
      console.log(flag,localStorage.getItem('nveg'))
      if(localStorage.getItem('nveg')==="true"){
        setNveg(localStorage.getItem('nveg'))
      }
      },[nveg])

  const handleClick =(title)=>{
   console.log('sidebar data',SidebarData)
   setSidebarName(title)
   window.location.reload()
  }
  useEffect(() => {
    console.log('qury is changing')
    if(localStorage.getItem('param')){
      setQuery(localStorage.getItem('param'))
    }
  }, [query])
  
  const onChangeCheckbox = (evt, data) => {
    let checked = data.checked
    console.log(checked)
    localStorage.setItem('flag', checked)
    setFlag(checked)
    window.location.reload()
  }
  const onChangeNonCheckbox = (evt, data) => {
    let vchecked = data.checked
    console.log(vchecked)
    localStorage.setItem('nveg', vchecked)
    setNveg(vchecked)
    window.location.reload()
  }
  const handleChange=(e)=>{
    setLoading(true)
    console.log(e.target.value)
    setQuery(e.target.value)
    localStorage.setItem('param',e.target.value)
    // window.location.reload()
  }
  const hadleSubmit=()=>{
    window.location.reload()
  }
  console.log(...categoryData,'render')
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          
            <span className="sideName" style={{ marginLeft: "500px" }}>{sidebarName}</span>
          
          <span  className="sideName">--VEG--</span>
          <div> <Checkbox toggle checked={flag} onClick={(evt, data)=>onChangeCheckbox(evt, data)} /></div>
          <span  className="sideName">--NON-VEG--</span>
          <div> <Checkbox toggle  checked={nveg} onClick={(evt, data)=>onChangeNonCheckbox(evt, data)} /></div>
          <div></div>
        
        </div>
        
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                categories
              </Link>
              <Link><Input
            size="small"
            style={{ marginLeft: "900px" }}
            onChange={handleChange}
            loading={loading}
            placeholder="Item Search..."
          /></Link>
            <li><Button primary onClick={hadleSubmit}>Search</Button></li>
            </li>
            {categoryData.map((item, index) => {
              return (
                <li
                  key={index}
                  className='nav-text'
                  onClick={()=>{handleClick(item.category_name.toUpperCase())}}
                >
                  <Link to={`/${item.category_name}/${item.cat_id}`}>
                    {item.icon}
                    <span>{item.category_name.toUpperCase()}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
