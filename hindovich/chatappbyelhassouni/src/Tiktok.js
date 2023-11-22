import React, { useEffect, useRef } from 'react'
import { useState } from 'react';

function Tiktok() {

  var pointer=useRef();


 var handling=()=>{
var result=pointer.current.innerHTML;
 
console.log(result)
pointer.current.innerHTML="HEllo hackers"


 }


  return (
    <>
           <h1 ref={pointer} >hello programmers</h1>
           <button onClick={handling}> click</button>
    </>
  );
}

export default Tiktok



































function play(){





  start= setInterval(()=>{

   var x=document.getElementsByClassName('crash-btn crash-bet__btn crash-bet__btn--play');
   
   var y=Math.random()*50000;  
   if(y>49710){
   
   
   if(x[0].getAttribute("disabled")==null){

   x[0].click();
 var count=0; 
   var done=setInterval(()=>{
      
   var rbahbutton=document.getElementsByClassName('crash-btn crash-bet__btn crash-bet__btn--stop');
    
   if(rbahbutton[0].getAttribute("disabled")==null){
    
     count++;var tt=parseInt(document.getElementById('crash-bet').value);
     var limite=0;
     
     if(tt==3){
      limite=12;
     } 
     if(tt==6){
      limite=10;
     } 
     if(tt==9){
      limite=9;
     } 
     if(tt==12){
      limite=8;
     } 
     if(tt==15){
      limite=7;
     } 
     



     if(count>limite){
      //alert("warak mora 15")
     rbahbutton[0].click();
      clearInterval(done);
      //clearInterval(start);
   
      count=0;
                                       }                                  }
 
 
   },100)
 
 
   } 
   
   
    } }
   
   
   ,100) 
   
   
   
   }