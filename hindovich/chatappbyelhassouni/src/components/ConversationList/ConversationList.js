import { db } from '../../firebase/FirebaseConfig';
import React, { useEffect, useRef } from 'react'
import './style.css'
import { onValue, push, ref, set } from 'firebase/database';
import { useState } from 'react';

function ConversationList(props) {


  const [conversation,setconvertation]=useState([]);

  const [users,setusers]=useState([]);

  const initialized = React.useRef(false);





  useEffect(()=>{
    
    if (!initialized.current) {
            initialized.current = true
            getdata()
          

      }


  },[])







  const getdata=async()=>{
console.log("start")

    const user = localStorage.getItem('userid');
  var conver=[]
  if(user!=null){
     
    const query = ref(db, `users`);
  
  
    var arrayi=[]
  
  
  
  
  
    return await onValue(query, (snapshot) => {
     
    
  
      const data = snapshot.val();
    
   var tabinvit=[]
   var tabamis=[]
  
  
  
  
    Object.values(data).map((x)=>{
  
setusers([...users,x])

        
      if(x.id==user){
x.discussion.map((y,key)=>{
if(key>0  ){
conver.push(y);
setconvertation([...conversation,y])
//
}
})

console.log(conver);

}}

)})
    
    }}





const ouvreconversation=(obj)=>{
  props.conquien(obj.nom)
  props.imagechat(obj.photo)
  props.idchat(obj.id)
  props.conquienpre(obj.prenom)


  props.chkonhada(2)

}













  return (
    <div>
     <h1>les conversation</h1>
      {conversation.map((x)=>{
       return(
       <div className='header' onClick={()=>{ouvreconversation(x.avecqui)}}>
      
      <img src={x.avecqui.photo} />
      <div className='user'>
        <h1>{x.avecqui.nom+' '+x.avecqui.prenom}</h1>
        <h2>{x.msg[x.msg.length-1].contenu}</h2>
         </div>
         
          </div>

      )})

      }
    </div>
  )
}

export default ConversationList