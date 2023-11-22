import React, { useState } from 'react'
import './style.css'
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBRow,
    MDBCol,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';


function Login() {


 const navigate = useNavigate();
  const [Email,setEmail]=useState("");
  const [Password,setPassword]=useState("");

  const show=async()=>{
    try {
      const response=await signInWithEmailAndPassword(auth,Email, Password);
      localStorage.setItem("userid",response.user.uid);
      navigate("/Home")
    }

    catch(e){
      console.log(e)
    }


  }





  return (
    <MDBContainer fluid className='my-5 container'>

    <MDBRow className='g-0 align-items-center'>
      <MDBCol col='6'>

        <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
          <MDBCardBody className='p-5 shadow-5 text-center'>

            <h2 className="fw-bold mb-5">Login</h2>

           

            <MDBInput wrapperClass='mb-4' onChange={(e)=>{setEmail(e.target.value)}} label='Email' id='form3' type='email'/>
            <MDBInput wrapperClass='mb-4' onChange={(e)=>{setPassword(e.target.value)}}  label='Password' id='form4' type='password'/>

           

            <MDBBtn className='w-100 mb-4'  onClick={()=>show()}>sign up</MDBBtn>

           

          </MDBCardBody>
        </MDBCard>
      </MDBCol>

      <MDBCol col='6'>
        <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" class="w-100 rounded-4 shadow-4"
          alt="" fluid/>
      </MDBCol>

    </MDBRow>

  </MDBContainer>
  )
}

export default Login