import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList, SafeAreaView, Image, TouchableOpacity, ScrollView ,ActivityIndicator} from 'react-native';
import {auth,db} from "../../Firebase/FirebaseConfig"
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithCredential } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Dimensions } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';
import { collection,addDoc, where, getDocs, query, updateDoc } from 'firebase/firestore';
import ModalSelector from 'react-native-modal-selector';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';


function AddDepense({navigation,route }) {
  
    const [componentWidth, setComponentWidth] = React.useState(0);
   
    const [prix, setPrix] = useState("0");
    
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [nom, setNom] = React.useState('');
  const [prenom, setPrenom] = React.useState('');
  const [ville, setVille] = React.useState('');
  const [fonction, setFonction] = React.useState('');
  const [depense, setDepense] = React.useState([]);
  const [secteur, setSecteur] = React.useState('');
  const [budgetinitial, setbudgetinitial] = useState(0);
  const [dateinscription, setdateinscription] = useState("");


   

    


  
  









 
    const getResponsiveFontSize = (size) => {
      const standardScreenWidth = 375; 
      const scaleFactor = componentWidth / standardScreenWidth;
      const newSize = size * scaleFactor;
      return newSize;
    };
  
  







    const onLayout = event => {
        const { width } = event.nativeEvent.layout;
        setComponentWidth(width);
      };



 

     
      const fetchItemsFromFirebase =async () => {
        const values= await AsyncStorage.getItem("userid");
        const docRef = await query(collection(db, "users"),where("id","==",values));
       const querySnapshot=await getDocs(docRef)
       let todos=[]
       querySnapshot.forEach(async(doc) => {
         const itemData = doc.data();
       
         const item = {
           id: itemData.id,
           nom: itemData.nom,
           prenom: itemData.prenom, 
           secteur: itemData.secteur, 
           ville: itemData.ville,
           budget: itemData.budget,  
           depense: itemData.depense, 
           fonction: itemData.fonction, 
           Datenaissance:itemData.Datenaissance,
           dateinscription:itemData.dateinscription
       
       };
         todos.push(item)
     
       });
   
      
   
   
       setDepense(todos[0].depense)
   
     
   
     depense.map((x)=>{
       console.log(x)
   
      })
   
   
   
   
     };
   
   





   

      const updateData =async () => {
        if(/\d/.test(prix)){
        
        
        

        setload('block')
        
            const today = new Date();
            const year = today.getFullYear().toString();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            const dateString = `${year}-${month}-${day}`;
          
            
            const updatedItems = depense.map((item,key) => {
              // Check if the current item's id matches the id to update
      
            if (key == route.params.num) {
              //  alert(key)
               // Update the name property of the matched item
                return { ...item, depense: [...item.depense,{montant:prix,date:dateString}] };
              }
              // If the id doesn't match, return the original item
              return item;
            });
        
        
        
        
            
        setDepense(updatedItems)
        
        
        
        
        const values= await AsyncStorage.getItem("userid");
        const docRef = await query(collection(db, "users"),where("id","==",values));
        const querySnapshot=await getDocs(docRef)
        let todos=[]
        querySnapshot.forEach(async(doc) => {
         const itemData = doc.data();
  
         const item = {
           id: itemData.id,
           nom: itemData.nom,
           prenom: itemData.prenom, 
           secteur: itemData.secteur, 
           ville: itemData.ville,
           budget: itemData.budget,  
           budgetinitial: itemData.budgetinitial,  
           depense: itemData.depense, 
           fonction: itemData.fonction, 
           Datenaissance:itemData.Datenaissance,
           dateinscription:itemData.dateinscription
        
        };
         todos.push(item)
        
        });
        
        
        
        
        
        
        
        const q = query(collection(db, "users"), where("id", '==',values));
        const querySnapshots=await getDocs(q);
       
            querySnapshots.forEach((doc) => {
            
              const docRef = doc.ref;
              updateDoc(docRef, { 
                id: values,
                nom: todos[0].nom,
                prenom: todos[0].prenom, 
                secteur: todos[0].secteur, 
                ville: todos[0].ville,
                budget: todos[0].budget,  
                depense: updatedItems, 
                fonction:  todos[0].fonction, 
                Datenaissance: todos[0].Datenaissance,
                dateinscription:todos[0].dateinscription,
                budgetinitial: todos[0].budgetinitial
              }
                
                )
                .then(() => {
             
                  setload('none')
                  navigation.navigate('Home')
                 
                })
                .catch((error) => {
                  setload("none")
                  
                });
            });
        
        
          }

          else {
            alert("Entrez un vrai montant")
          }
        













          }
        









          React.useEffect(()=>{
            
            fetchItemsFromFirebase()
           
           },[])
           



           const [loads, setload] = React.useState("none");





  return (
    <View onLayout={onLayout} style={{backgroundColor:'white',flex:1,paddingHorizontal:"0%",paddingVertical:'0%'}}>




<View style={{display:loads,backgroundColor:'black',opacity:0.65,position:'absolute',zIndex:1111,top:"0%",left:'0%',width:'100%',height:"100%"}}>
<View style={{
display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',height:'100%',width:"100%"
}}>
  
  <ActivityIndicator size="large" color="#007AFF" />
</View>
</View>



<LinearGradient  style={{backgroundColor:'white',paddingHorizontal:"5%",display:'flex',justifyContent:'center',height:'20%',paddingVertical:"1.5%"}}
      colors={['#FF5733', '#F28A21', '#FFAA00']}
    
    >



<View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>

   <TouchableOpacity style={{marginTop:"10%"}} onPress={()=>{navigation.navigate("Home")}}>
    <Icon name="home" size={getResponsiveFontSize(29)} color="white" style={{marginLeft:'0%'}}/>
  </TouchableOpacity>
  
  <Text style={{fontSize:getResponsiveFontSize(17),marginTop:'7.5%',fontFamily:'PoppinsSemiBold',color:'#E1DFDC'}}>{route.params.type}{route.params.num}</Text>


</View>
</LinearGradient>




<Text style={{fontSize:getResponsiveFontSize(20),marginTop:'15.5%',marginLeft:'5%',fontFamily:'PoppinsSemiBold',color:'black'}} >Entrez Le montant</Text>
  






<TextInput 
     onChangeText={setPrix}
     value={prix}
     style={{marginLeft:'7.5%',width:'85%',padding:"0%", borderColor:'#F0F0F0',paddingVertical:'2.95%',paddingLeft:'5%',borderRadius:10,marginTop:'10%',backgroundColor:'#F3F3FC',fontSize:getResponsiveFontSize(14),fontFamily:"PoppinsRegular",color:'black',}}
     placeholder="montant"
     keyboardType="numeric"
     placeholderTextColor="#BCBCBC"
/>







          <TouchableOpacity onPress={()=>{ updateData() }} style={{backgroundColor:'red',
 
          paddingVertical:getResponsiveFontSize(5)
          ,borderRadius:25,
    marginTop:'10%',width:'22%',marginLeft:'65%'
        }}>
            <Text style={{color:'white',fontSize:getResponsiveFontSize(14),textAlign:'center',fontFamily:"PoppinsRegular",marginTop:'4%'}}>Valider</Text>
          </TouchableOpacity>








    
</View>



  )
}

export default AddDepense