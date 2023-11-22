import { db } from '../../firebase/FirebaseConfig';
import { onValue, push, ref, set } from 'firebase/database';
import './style.css'
import React,  { useState } from 'react'
import { click } from '@testing-library/user-event/dist/click';
import Conversation from '../Conversation/Conversation';

function Friends(props) {
 
  const  conversation=(obj)=>{
    props.conquien(obj.nom)
    props.imagechat(obj.photo)
    props.idchat(obj.id)
    props.conquienpre(obj.prenom)
  const user = localStorage.getItem('userid');
 
  var tabinvity=[]
  var tabinvityo=[]
  var exist=false;
  var conversamis =props.kolchi.map((itemy) => {
    
    
  var conversamisss =itemy.discussion.map((itemyy,key) => {
    if(key>0){
    if( itemy.id==user && itemyy.avecqui.id ==obj.id    ){
     exist=true
    }
  }
  })


  if (itemy.id == user && exist==false ) {
        return { ...itemy, discussion:[...itemy.discussion,{avecqui:obj,msg:[{contenu:'',parqui:user}]}]};
                       }
  
                
  
        return itemy; 
                
      });



    const dataRefamis = ref(db, 'users'); 

    set(dataRefamis,conversamis); 

var exist2=false;

    var conversamisso =conversamis.map((itemo) => {
      var conversamisssos =itemo.discussion.map((itemyy,key) => {
        if(key>0){
        if( itemo.id==obj.id && itemyy.avecqui.id ==user   ){
         exist2=true;
          
        }
      }
      })
      

    
      if (itemo.id == obj.id && exist2==false ) {
       
    
          return { ...itemo, discussion:[...itemo.discussion,{avecqui:{id:user,nom:props.nom,prenom:props.prenom,photo:props.photo},msg:[{contenu:"",parqui:user}]}]};
                         }
    
                  
    
          return itemo; 
                  
        });
      
        
      const dataRefamiss = ref(db, 'users'); 
  
      set(dataRefamiss,conversamisso); 
      props.chkonhada(2)

    
  }
 
  return (
  
    <>
    
 <h2>amis</h2>     
     
    {props.amis.length>0 && props.amis.map((x,key)=>{
      

 //usersclean.map((u)=>{
 if(key>0){
 
 return(
 
 <div className='w-100 d-flex amis'>

 <img src={x.photo} />


 <div className='w-100'>
 <h2 className='w-100'>  {x.nom} {x.prenom} </h2>
  
 <button type="button"  class="btn btn-primary "   onClick={()=>{    conversation(x)}}>Lancez  une conversation</button>
 
</div>


 </div>

 ) // })
}



   
})

}
 

</>
  )
}

export default Friends