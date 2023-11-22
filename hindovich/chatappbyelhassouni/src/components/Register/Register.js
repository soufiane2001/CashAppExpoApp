import React from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCheckbox,
  MDBListGroup, MDBListGroupItem 
}
from 'mdb-react-ui-kit';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseConfig';
import { db } from '../../firebase/FirebaseConfig';
import { onValue, push, ref, set, update } from "firebase/database";



import { useState } from 'react';
function Register() {
  const sexgender = [ 'Homme', 'Femme',"Autre"];
   
  const [nom,setNom]=useState("");
  const [Prenom,setPrenom]=useState("");
  const [Email,setEmail]=useState("");
  const [Password,setPassword]=useState("");
  const [age,setAge]=useState(0);
  const [sex,setSex]=useState("Homme");
  const [file,setFile]=useState("");
  const [photolink,setphotolink]=useState("");






  

const show=async()=>{
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(Email) && nom.length>2 && Prenom.length>2 && age > 17 && Password.length >6  ) {

    try {
      const respone= await createUserWithEmailAndPassword(auth,Email,Password);
      
      if(respone){
  

       alert("utilisateur créé"+respone.user.uid)
       
       const newItemRef = push(ref(db, 'users'));
       set(newItemRef, {
        
        age:age,prenom:Prenom,nom:nom,id:respone.user.uid,photo:photolink,sex:sex,amis:[{id:'robotid'}],invitation:[{id:"robotid"}],
        
        discussion:[{ id :"robotid" }]




       }
       
       
       
       
       );









      }
     } catch (error) {
  alert("error")   
   };











  }
  



 
}

const handleFileChange = async(e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'soufiane');

 await fetch('https://api.cloudinary.com/v1_1/dzkx1z6lo/image/upload', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => setphotolink(data.secure_url))
    .catch(error => console.error(error));

};






  return (
    <MDBContainer fluid className='my-5 container'>

    <MDBRow className='g-0 align-items-center'>
      <MDBCol col='6'>

        <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
          <MDBCardBody className='p-5 shadow-5 text-center'>

            <h2 className="fw-bold mb-5">Register</h2>

           

            <MDBInput wrapperClass='mb-4' onChange={(e)=>{setNom(e.target.value)}} label='Nom' id='form3' type='text'/>
            <MDBInput wrapperClass='mb-4' onChange={(e)=>{setPrenom(e.target.value)}} label='Prenom' id='form4' type='text'/>
            <MDBInput wrapperClass='mb-4' onChange={(e)=>{setEmail(e.target.value)}} label='Email' id='form4' type='email'/>
            <MDBInput wrapperClass='mb-4' onChange={(e)=>{setPassword(e.target.value)}} label='Password' id='form4' type='password'/>
            <MDBInput wrapperClass='mb-4' onChange={(e)=>{setAge(e.target.value)}} label='age' id='form4' type='number'/>
            
            <select class="form-select" value={sex} onChange={(e)=>{setSex(e.target.value)}}>
            
                     <option value="Homme">Homme</option>
                     <option value="femme">Femme</option>
            
            </select>
            
            <input  type='file'  class="form-control mt-5"  onChange={handleFileChange}/>




            <MDBBtn className='w-100 mb-2 mt-5' size='md' onClick={()=>show()}>Create Account</MDBBtn>

            <MDBBtn className='w-100 mb-2 mt-5' size='md' onClick={()=>update()}>update</MDBBtn>
           

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

export default Register