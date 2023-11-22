import { onValue, push, ref, set } from 'firebase/database';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../../firebase/FirebaseConfig';
import  sedeconnecter  from '../../imgs/se-deconnecter.png';
import './style.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Friends from '../Freinds/Friends';
import Conversation from '../Conversation/Conversation';
import ConversationList from '../ConversationList/ConversationList';
import logo from '../../imgs/logo.png'
import Navbar from '../Navbar/Navbar';

function Home(props) {


      const [userid,setuserid]=useState("");
      const [usernom,setusernom]=useState("");
      const [userprenom,setuserprenom]=useState("");
      const [photo,setphoto]=useState("");
      const [invit,setinvit]=useState("");
      const [ivitcount,setivitcount]=useState("");
      const [userdata,setuserdata]=useState([]);
      const [users,setusers]=useState([]);
      const [usersclean,setusersclan]=useState([]);
      const [allusers,setallusers]=useState([]);
      const [listinvit,setlistinvit]=useState([]);
      const initialized = useRef(false);
      const [isVisible,setvisible]=useState(true)
      const [chkon,setchkon]=useState(1)
      const [amiss,setamiss]=useState([]);
      const [chatavecnom , setchatavecnom]=useState([])
      const [chatavecprenom , setchatavecprenom]=useState([])
      const [idwith,setidwith]=useState();
      const [imagewith,setimagewith]=useState();

      const navigate = useNavigate();

 






const getdata=async()=>{

  const user = localStorage.getItem('userid');

if(user!=null){
   

  setuserid(user)
  const query = ref(db, `users`);


  var arrayi=[]





  return await onValue(query, (snapshot) => {
   
  
 arrayi=[]
    const data = snapshot.val();
  
 var tabinvit=[]
 var tabamis=[]




  Object.values(data).map((x)=>{

    arrayi.push(x)
   
    if(x.id==user){

         setusernom(x.nom)
         setphoto(x.photo)
         setuserprenom(x.prenom)
         setinvit(x.invitation)
         setamiss(x.amis)
         var count=0;
               

          
         Object.values(x.invitation).map((y)=>{ 
            
                 if(y.id != "robotid" && ( y.status=="waiting" )){
                                 count=count+1
                               //  console.log("y hia:"+y)
                                tabinvit.push(y)
console.log(tabinvit)

                                       }
                                        
                                          })
               

         setivitcount(count)
        


        setamiss(x=>{return x})       

      }    })




   var userclean=[]
   var anasaft=[]

   arrayi.map((x)=>{
 
     x.invitation.map((y)=>{

           if(y.id==user){
              userclean.push(x.id)
             
              }
         
            })

          })

          arrayi.map((x)=>{
            if(x.id==user){ 
            x.invitation.map((y)=>{
                   if(y.id!="robotid"){
                   
                     anasaft.push(y.id)
                    
                  }
                     
                
                   })
       
                 }})
                


//console.log("length of :"+userclean.length)

setusersclan(userclean)

var amisclean=[]


if(userclean.length==0){

  amisclean=arrayi;
}  

else{
var exist=true;
var i=0;





  }



  const filteredArray = arrayi.filter(element => !userclean.includes(element.id) && !anasaft.includes(element.id));








setusers(filteredArray)







setusers(x=>{return x})




//console.log(filteredArray)
setallusers(arrayi)


setlistinvit(listinvit=>tabinvit)

setlistinvit(x=>{return x})













                                          });

                                        }

else{
  navigate("/")

}







                                }












    useEffect(()=>{
    
      if (!initialized.current) {
              initialized.current = true
              getdata()
              

        }


    },[])



    const display=()=>{
      setvisible(!isVisible)
    
    
    }

 const supprimeyy=(object)=>{
  const supprimerhada = allusers.


map((itemy) => {
    
    if (itemy.id == userid) {
          return { ...itemy, invitation:itemy.invitation.map((z)=>{
                    if(z.id==object.id){
                      return {...z,status:"refusé"}

                    }
                    
                     return z;
                     
          })};
    }            

        return itemy; 
                
      });
      const dataReyo = ref(db, 'users'); 
    
      set(dataReyo, supprimerhada);
      /************************* */
 const supprimerphoto = supprimerhada.map((itemo) => {
    
    if (itemo.id == userid) {
         listinvit.splice(object)
    }            

      return itemo  
      });
      const dataRey = ref(db, 'users'); 
    
      set(dataRey, supprimerphoto);

 }

  const deconnecter=()=>{
    localStorage.removeItem('userid')
    navigate("/")
  }
  
  

    
   const  confirm=(obj)=>{
    
    const confirmlidt = allusers.map((itemy) => {
    
      if (itemy.id == userid) {
            return { ...itemy, invitation:itemy.invitation.map((z)=>{
                      if(z.id==obj.id){
                        return {...z,status:"accepte"}
                      }
                      
                       return z;
                       
            })};
      }            

          return itemy; 
                  
        });


        const dataRef = ref(db, 'users'); 
    
        set(dataRef,confirmlidt);
        
/*************************** */






var confirmamis =confirmlidt.map((itemy) => {
    
  if (itemy.id == userid ) {
   

      return { ...itemy, amis:[...itemy.amis,{id:obj.id,nom:obj.nom,prenom:obj.prenom,photo:obj.photo}]};
                     }

              

      return itemy; 
              
    });


    const dataRefamis = ref(db, 'users'); 

    set(dataRefamis,confirmamis);
    




/****************** */
const amisbzoj =confirmamis.map((hadaw) => {
    
  if (hadaw.id ==obj.id) {

    return { ...hadaw, amis:[...hadaw.amis,{id:userid,nom:usernom,prenom:userprenom,photo:photo}]};

  }

  return hadaw; 

});

const databzojs = ref(db, 'users'); 

set(databzojs,amisbzoj);









   
        }
     


























const sendrequest=(id)=>{


const updatedItems = allusers.map((item) => {
        if (item.id == id) {

              return { ...item, invitation:[...item.invitation,{id:userid,nom:usernom,prenom:userprenom,photo:photo,status:"waiting"}]};
                             }
  
            return item; 
                    
          });



const dataRef = ref(db, 'users'); 
    
set(dataRef,updatedItems);




}

 const ignorer=(id)=>{
 const ignore= users.filter((u)=>{
    if(u.id!=id)
       return u
  })
  setusers(ignore)
 
 }

 const bdlchkon=(lamda)=>{
  setchkon(lamda)
 }

const nomchat=(alpha)=>{
  setchatavecnom(alpha)
}
const prenomchat=(sigma)=>{
  setchatavecprenom(sigma)
}


const idchat=(alpha)=>{
  setidwith(alpha)
}
const imagechat=(sigma)=>{
  setimagewith(sigma)
}




  return (
    <>
<Navbar photo={photo} nom={usernom} prenom={userprenom}   chkoun1={()=>{setchkon(1)}}  chkoun3={()=>{setchkon(3)}}  displays={display} 
deconnecte={()=>{deconnecter()}}
/>

  



<div className='d-flex  cont'  >

<div id='nass1'>
 {chkon==1 &&
  <Friends amis={amiss}  kolchi={allusers} nom={usernom} prenom={userprenom} photo={photo}  idchat={idchat} imagechat={imagechat} chkonhada={bdlchkon} conquien={nomchat} conquienpre={prenomchat} />}
  {chkon==2 &&
   <Conversation  kolchi={allusers} nom={usernom} prenom={userprenom} photo={photo}  idchat={idchat} imagechat={imagechat} chkonhada={bdlchkon} conquien={nomchat} conquienpre={prenomchat}  image={imagewith} id={idwith}  quinom={chatavecnom}  quipre={chatavecprenom}/>}
   {chkon==3 &&
<ConversationList amis={amiss}  kolchi={allusers} nom={usernom} prenom={userprenom} photo={photo}  idchat={idchat} imagechat={imagechat} chkonhada={bdlchkon} conquien={nomchat} conquienpre={prenomchat}/>}
</div>





<div id='nass2'>
<h2>Suggestion</h2>

{users.length>0 && users.map((x)=>{

 if(x.id!==userid){
  //usersclean.map((u)=>{
  
   
 return(
  
  <div className='random d-flex'>

  <img src={x.photo} />
 
 
  <div className='w-100'>
  <h2 className='w-100 suggestionnom'>  {x.nom} {x.prenom} </h2>
    
  <button type="button"  class="btn btn-primary" onClick={()=>{sendrequest(x.id)}}>Ajouter</button>
  <button type="button"  class="btn btn-light" onClick={()=>{ignorer(x.id)}}>ignorer</button>
</div>


  </div>

  ) // })

}



})

}


</div>



</div>





 <div className='invitationlist'   style={{display:isVisible? 'none' :'block'}}>

 {listinvit.length>0 && listinvit.map((f)=>{
  return (
 <div className='random d-flex ' style={{borderBottomWidth:1,borderBlockColor:'#E8E8E8',borderBottomStyle:'solid'}}>

<img src={f.photo} />
<div className='w-100'>
  <h2 className='w-100'>{f.nom} {f.prenom} </h2>


  
<button type="button"  class="btn btn-primary mt-3" onClick={()=>{confirm(f)}}>confirmer</button>
<button type="button"  class="btn btn-light mt-3" onClick={()=>{supprimeyy(f)}} >supprimer</button>
</div>
</div>
 )})}
 </div>








    </>
  )
}

export default Home



































