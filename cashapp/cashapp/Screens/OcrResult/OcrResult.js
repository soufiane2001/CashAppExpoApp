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








function OcrResult({navigation ,route}) {

    const [componentWidth, setComponentWidth] = React.useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectenum, setSelectenum] = useState(0);
    
   

    const fonctions =  [
    
    
    {key:1,label:"Education & scolarité",}, 
    {key:2,label:"Crédit immobilier",},
    {key:3,label:"Crédit consommation",},
    {key:4,label:"Produits alimentaires",},
    {key:5,label:"Restaurants et sorties",},
    {key:6,label:"Santé",},
    {key:7,label:"Shopping",},
    {key:8,label:"Soins et beauté",},
    {key:9,label:"Transport et voiture"},
    {key:10,label:"Voyages",},
    {key:11,label:"Epargne",},
    
  ]
      


  
  const [budgets, setBudget] = useState([{type:"Salaire",revenu:0,date:31},
  {type:"Pension retraite",revenu:0,date:31},
  {type:"Pension locatif",revenu:0,date:31},
  {type:"Revenu de placement",revenu:0,date:31},
  {type:"Dividendes",revenu:0,date:31},
  {type:"Freelance",revenu:0,date:31},
  {type:"Autres",revenu:0,date:31}

  ]);

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


     const prix= route.params.prix








 

     
  const fetchItemsFromFirebase =async () => {
     const values= await AsyncStorage.getItem("userid");
     const docRef = await query(collection(db, "users"),where("id","==",values));
    const querySnapshot=await getDocs(docRef)
    let todos=[]
    querySnapshot.forEach(async(doc) => {
      const itemData = doc.data();
      setBudget(itemData.budget)
 
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
setload('block')

    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    
    const updatedItems = depense.map((item,key) => {
      

    if ((key+1) == selectenum) {
     
        return { ...item, depense: [...item.depense,{montant:prix,date:dateString}] };
      }
    
      return item;
    });




    
setDepense(updatedItems)




const values= await AsyncStorage.getItem("userid");
const docRef = await query(collection(db, "users"),where("id","==",values));
const querySnapshot=await getDocs(docRef)
let todos=[]
querySnapshot.forEach(async(doc) => {
 const itemData = doc.data();
 setBudget(itemData.budget)
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
          console.error(`Error updating document with ID ${doc.id}:`, error);
        });
    });




































  }


















React.useEffect(()=>{
 
 fetchItemsFromFirebase()

},[])












const handleOptionChange2 = (option) => {
  setSelectedDate(option.label);
  setSelectenum(option.key)
};



const [loads, setload] = React.useState("none");



  return (
    <View onLayout={onLayout} style={{backgroundColor:'white',flex:1,paddingHorizontal:"4%",paddingVertical:'10%'}}>


<View style={{display:loads,backgroundColor:'black',opacity:0.65,position:'absolute',zIndex:1111,top:"0%",left:'0%',width:'109%',height:"113%"}}>
<View style={{
display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',height:'100%',width:"100%"
}}>
  
  <ActivityIndicator size="large" color="#007AFF" />
</View>
</View>


<TouchableOpacity style={{marginTop:"1%"}} onPress={()=>{navigation.navigate("Home")}}>
<Icon name="home" size={getResponsiveFontSize(29)} color="black" style={{marginLeft:'0%'}}/>

</TouchableOpacity>










      <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:'20%'}}>
      <Text style={{fontSize:getResponsiveFontSize(24),fontFamily:"PoppinsMedium",color:'black'}}>{prix.toFixed(2)}Dh  Validee ? </Text>        
       <TouchableOpacity onPress={()=>{navigation.navigate("Camera")}}>
        <Ionicons name="md-reload-circle" size={32} color="red" />
     </TouchableOpacity>
     
      </View>
   

       
       <Text style={{fontSize:17,fontFamily:"PoppinsRegular",color:'black',marginTop:'20%'}}>Categories :</Text>
     
       <ModalSelector
                 data={fonctions}
                 initValue="Select Genre"
                 onChange={handleOptionChange2}
                 style={{marginTop:'7%',backgroundColor:'#F3F3FC',width:'90%',paddingVertical:'2.4%',paddingLeft:'5%',marginTop:"5%",marginLeft:'5%',borderWidth:1,borderColor:'#F7F7F7',borderRadius:30}}
                >
       
                  <TouchableOpacity>
                    <Text style={{fontSize:getResponsiveFontSize(14),fontFamily:"PoppinsRegular",color:'#BCBCBC'}} >{selectedDate|| 'Fonction' }</Text>
                  </TouchableOpacity>
     
               </ModalSelector>

     

          <TouchableOpacity onPress={()=>{ updateData() }} style={{backgroundColor:'red',padding:8,width:'26%',borderRadius:25,
    marginTop:'75%',marginLeft:'75%'
        }}>
            <Text style={{color:'white',fontSize:17,textAlign:'center',fontFamily:"PoppinsRegular",marginTop:'4%'}}>Valider</Text>
          </TouchableOpacity>








    
</View>



)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      marginTop:'10%',
      borderStyle:'solid',
    },
    inputAndroid: {
        marginTop:'5%',
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1.5,
      borderStyle:'solid',
      borderColor: 'gray',
      borderRadius: 8,
      color: 'black',
    },
  });

export default OcrResult
