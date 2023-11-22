import React from 'react'
import './style.css'
import logo from '../../imgs/logo.png'


function Navbar(props) {
  return (
    <nav class="navbar navbar-expand-lg bg-primary navbar-dark">
  
    <a class="navbar-brand" href="#">
    <img src={logo} />

    </a>
  
   
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
  

    <div class="collapse navbar-collapse" id="collapsibleNavbar">
    
    
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" onClick={()=>{props.chkoun1()}} href="#">
            Amis
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" onClick={()=>{props.chkoun3()}}>conversations</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" onClick={()=>{props.displays()}}>invitation</a>
        </li>
      </ul>


       
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">
          <img src={props.photo} />
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
          Bonjour {props.prenom} 
          </a>
        </li>
        <li class="nav-item">
        <i class="fa fa-sign-out" style={{fontSize:55.01,color:'white'}} onClick={()=>{props.deconnecte()}} ></i>
        </li>
      </ul>






    </div>
  </nav>
  )
}

export default Navbar