import { db } from '../../firebase/FirebaseConfig';
import React, { useEffect, useRef } from 'react'
import './style.css'
import { onValue, push, ref, set } from 'firebase/database';
import { useState } from 'react';
function Conversation(props) {

    const [msgg,setmsg]=useState("");
    const [conversation,setconvertation]=useState([]);

    const initialized = React.useRef(false);
    const [users,setusers]=useState([]);











    const  addmsg=(id)=>{
    
        const user = localStorage.getItem('userid');
      
        var tabinvity=[]
        var tabinvityo=[]

        //console.log(users)


       var conversamis =users.map((itemy) => {
          
          
      if(itemy.id==user){
        var addmsg=itemy.discussion.map((t,key)=>{
   if(key>0  ){

         if(t.avecqui.id==id){ 

            

        return({...t,msg:[...t.msg,{contenu:msgg,parqui:user}]})
    
         }
         else{
          return t;
         }
      }  

return t;

          })
      


     return { ...itemy, discussion:addmsg};
      }     
        
                      
        
              return itemy; 
                      
            });
    


          //  console.log(conversamis)

            const dataRefamis = ref(db, 'users'); 

         //  set(dataRefamis,conversamis); 










            var conversamis2 =conversamis.map((itemy) => {
          
          
                if(itemy.id==id){
                  var addmsg=itemy.discussion.map((t,key)=>{
             if(key>0  ){
          
                   if(t.avecqui.id==user){ 
          
                  
          
                  return({...t,msg:[...t.msg,{contenu:msgg,parqui:user}]})
              
              }
                  else{
                     return t;
                  }
                   }
                
         return t;
          
          
                    })
                
          
          
               return { ...itemy, discussion:addmsg};
                }     
                  
                                
                  
                        return itemy; 
                                
                      });
              
          
          
                      
          
                      const dataRefamis2 = ref(db, 'users'); 
          
                     set(dataRefamis2,conversamis2); 
          




setmsg('')


console.log(conversamis2)










        
      }







      useEffect(()=>{
    
        if (!initialized.current) {
                initialized.current = true
                setusers(prev=>[])
                getdata()
              
  
          }
  
  
      },[])







      const getdata=async()=>{
console.log('test')
        const user = localStorage.getItem('userid');
          var tabamis=[]
      if(user!=null){
         
        const query = ref(db, `users`);
      
      
        var arrayi=[]
      
      
      
      var conver=[]
      

        return await onValue(query, (snapshot) => {
         setusers([])
        
           console.log("t3awd")
          const data = snapshot.val();
        
       var tabinvit=[]
   
      
      
      
      
        Object.values(data).map((x)=>{
 
         
   setusers(prev=>[...prev,x])

          if(x.id==user){
x.discussion.map((y,key)=>{
    if(key>0  ){
if(y.avecqui.id==props.id){

conver=y.msg;

}
    }
})
        
//console.log(conver)
setconvertation(conver);

}}

  
)}


     
      
)
   
      
   
        }      
         
      /*console.log(tabamis)*/}











  return (
    <div>
    
    <div className='header'>
      
<img src={props.image} />
  <h1>{props.quinom+' '+props.quipre}</h1>
    </div>


<div className='messages'>
{conversation.map((x)=>{
return(

<>
<div className={x.parqui==props.id?'il' :'moi'}>
<h1 >{x.contenu}</h1>
</div>


</>
)})}









</div>




<div className='send'>
<textarea value={msgg} rows={2} type="text" class="form-control" id="usr" onChange={(e)=>{setmsg(e.target.value)}} />
<button className='btn btn-primary' onClick={()=>{addmsg(props.id)}}>envoi</button>
</div>



     
     
     </div>
  )
}

export default Conversation