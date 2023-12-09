import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList, SafeAreaView, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {db} from "../../Firebase/FirebaseConfig"
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';

import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import ModalSelector from 'react-native-modal-selector';
import Modal from 'react-native-modal';
import { collection,addDoc, where, getDocs, query, updateDoc } from 'firebase/firestore';




function Statistique({navigation,route }) {



    

    const [depenses, setDepenses] = React.useState(
        [{key: 1, type:"Education & scolarité",montant:2000,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/167/167707.png"},
      {key: 2, type:"Crédit immobilier",montant:800,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/3190/3190635.png"},
      {key: 3, type:"Crédit consommation",montant:300,depense:[],photo:"https://static.vecteezy.com/ti/vecteur-libre/p1/4666647-credit-renouvelable-color-icon-consumer-lines-of-credit-achetant-marchandises-avec-emprunt-argent-commerce-retail-marketing-industrie-banque-business-budget-economy-isolated-vector-illustration-vectoriel.jpg"},
      {key: 4, type:"Produits alimentaires",montant:500,depense:[],photo:'https://sms.hypotheses.org/files/2021/10/nourriture-saine4.png'},
      {key: 5, type:"Restaurants et sorties",montant:300,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/1996/1996068.png"},
      {key: 6, type:"Santé",montant:200,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/1040/1040238.png"},
      {key: 7,type:"Telephone",montant:0,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/13/13936.png'},
      {key: 8, type:"Shopping",montant:400,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/3225/3225194.png"},
      {key: 9, type:"Soins et beauté",montant:200,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/1005/1005769.png"},
      {key: 10,type:"Transport et voiture",montant:400,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/5771/5771799.png"},
      {key: 11,type:"Voyages",montant:200,depense:[],photo:"https://cdn-icons-png.flaticon.com/512/3125/3125848.png"},
      {key: 12,type:"Epargne",montant:300,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/2721/2721091.png'},
      {key: 13,type:"Eau",montant:0,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/850/850785.png'},
      {key: 14,type:"Electricite",montant:0,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/2807/2807571.png'},
      {key: 15,type:"vignette",montant:0,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/744/744465.png'},
      {key: 16,type:"Salle du sport",montant:0,depense:[],photo:'https://cdn-icons-png.flaticon.com/512/2216/2216769.png'},
    
    
    ]);

     

    const [filtertype, setFiltertype] = React.useState("");  
    const [filterdepensetype, setFilterdepensetype] = React.useState("");  
    const [filterdepensenum, setFilterdepensenum] = React.useState("");  
    const [sommedepense, setSommedepense] = React.useState(0);  
    const [sommedepense2, setSommedepense2] = React.useState(0);  
    const [sommedepense3, setSommedepense3] = React.useState(0);  
    const [statistique, setstatistique] = React.useState([]);  
    const [statistique2, setstatistique2] = React.useState([]);  
    const [statistique3, setstatistique3] = React.useState([]);  
    



    const filterdate = [
      { key: 1, label: 'Semaines' },
      { key: 2, label: 'mois' },
      { key: 3, label: 'annees' },

    ];



    const filterdepense = [
      {key: 1, label:"Education & scolarité"},
      {key: 2, label:"Crédit immobilier"},
      {key: 3, label:"Crédit consommation"},
      {key: 4, label:"Produits alimentaires"},
      {key: 5, label:"Restaurants et sorties"},
      {key: 6, label:"Santé"},
      {key: 7, label:"Telephone"},
      {key: 8, label:"Shopping"},
      {key: 9, label:"Soins et beauté"},
      {key: 10,label:"Transport et voiture"},
      {key: 11,label:"Voyages"},
      {key: 12,label:"Epargne"},
      {key: 13,label:"Eau"},
      {key: 14,label:"Electricite"},
      {key: 15,label:"vignette"},
      {key: 16,label:"Salle du sport"},
    

    ];













 


    

  








  const parseStringToDate=(dateString)=> {
    const [year, month, day] = dateString.split("-");

    const date = new Date(
      year < 100 ? year + 2000 : year,
      month - 1,
      day
    );
    
     return (date)
    }


      
    function isDateBetweenTwoDates(givenDate, startDate, endDate) {
      return givenDate.compareTo(startDate) === 1 && givenDate.compareTo(endDate) === -1;
    }
   





      const fetchItemsFromFirebase =async () => {

        
          const values= await AsyncStorage.getItem("userid");
        const docRef = await query(collection(db, "users"),where("id","==",values));
        const querySnapshot=await getDocs(docRef)
        let todos=[]
        querySnapshot.forEach(async(doc) => {
            setload("none")
            const itemData = doc.data();
            todos.push(itemData)
      
        })



     
        setDepenses(todos)
    




      };





  

    




const onLayout = event => {
    const { width } = event.nativeEvent.layout;
    setComponentWidth(width);
  };
 
  const getResponsiveFontSize = (size) => {
    const standardScreenWidth = 375; 
    const scaleFactor = componentWidth / standardScreenWidth;
    const newSize = size * scaleFactor;
    return newSize;
  };
  





useFocusEffect(
  React.useCallback(() => {

    fetchItemsFromFirebase()     
    
  }, [])
);












var help=[];

const monthFilter=async()=>{




 setload('block')
  let stock=[]
  const values= await AsyncStorage.getItem("userid");
const docRef = await query(collection(db, "users"),where("id","==",values));
const querySnapshot=await getDocs(docRef)
let todos=[]
querySnapshot.forEach(async(doc) => {
   
    const itemData = doc.data();
    todos.push(itemData)

        







  var datemois=[]
  var datm=new Date (itemData.dateinscription)
  datemois.push(new Date (itemData.dateinscription))
  
  do{
         
   // console.log(datm)
    datemois.push(new Date(datm.setDate(datm.getDate()+30)))
    }while(datm<new Date())
  






var mnt=0;

for(var i=0;i<datemois.length;i++){
mnt=0;


    itemData.depense.map((x)=>{
          if(x.type==filterdepensetype){
                x.depense.map((y)=>{
                    if(new Date(y.date) >= new Date(datemois[i]) && new Date(y.date)<=new Date(datemois[i+1])   ) {
                                          mnt+=parseInt(y.montant)
                                       
                                       
                                                                   }
                })
          
                setSommedepense2(x=>x+mnt)
              }

    })

    if(i+1<datemois.length){
   
    stock.push({mois:datemois[i],moisf:new Date(datemois[i+1]),montant:mnt})
  
    }


  }




   
  




})


setload("none")
setstatistique2(stock)



/*



setstatistique2(x=>{console.log(x)
return x})
*/




}







































const weekFilter=async()=>{


setload("block")


  const values= await AsyncStorage.getItem("userid");
const docRef = await query(collection(db, "users"),where("id","==",values));
const querySnapshot=await getDocs(docRef)
let todos=[]
let stock=[]
querySnapshot.forEach(async(doc) => {
    setload("none")
    const itemData = doc.data();
  
    var dated=new Date (itemData.dateinscription)
       
    var   datrarray=[]
    
  
    datrarray.push(new Date (itemData.dateinscription))
   do{
         
  
      datrarray.push(new Date(dated.setDate(dated.getDate()+7)))
      }while(dated<new Date())

         

var mnt=0;

for(var i=0;i<datrarray.length;i++){
mnt=0;


    itemData.depense.map((x)=>{
          if(x.type==filterdepensetype){
                x.depense.map((y)=>{
                    if(new Date(y.date) >= new Date(datrarray[i]) && new Date(y.date)<=new Date(datrarray[i+1])   ) {
                                          mnt+=parseFloat(y.montant)
                                          setSommedepense(x=>x+mnt)
                                                                   }
                })
          }

    })


   // console.log(datrarray[i]+" "+datrarray[i+1]+"  : "+mnt)



    
       
     stock.push({date:datrarray[i],datef:datrarray[i+1],montant:mnt})
     
    


  }







 



})

setload("none")
setstatistique(stock)










  
}
































const yearFilter=async()=>{

  setload("block")
  
  const values= await AsyncStorage.getItem("userid");
const docRef = await query(collection(db, "users"),where("id","==",values));
const querySnapshot=await getDocs(docRef)
let todos=[]
querySnapshot.forEach(async(doc) => {
    setload("none")
    const itemData = doc.data();
    todos.push(itemData)
  

   
   var dateyeer=[]
  var daty=new Date (itemData.dateinscription)
  dateyeer.push(new Date (itemData.dateinscription))
  
  while(daty.getFullYear()<new Date().getFullYear()){
         

    dateyeer.push(new Date(daty.setDate(daty.getDate()+365)))
    }
  





  
var mnt=0;

for(var i=0;i<dateyeer.length;i++){
mnt=0;


    itemData.depense.map((x)=>{
          if(x.type==filterdepensetype){
                x.depense.map((y)=>{
                    if(new Date(y.date).getFullYear() == new Date(dateyeer[i]).getFullYear()  ) {
                                          mnt+=parseInt(y.montant)
                                          
                                                                   }
                })
          }

    })

    setSommedepense3(x=>x+mnt)
    setstatistique3([...statistique3,{date:dateyeer[i].getFullYear(),montant:mnt}])


  }



})






  












setload("none")










}




























  

  
  
  
  
  
  
const handleOptionChange = (option) => {
if(filterdepensetype.length>1){

  setFiltertype(option.label);
  
  if(option.key==1){
    setstatistique2([])
    setstatistique3([])
    weekFilter()
  }
  if(option.key==2){
    setstatistique([])
    setstatistique3([])
  monthFilter()
   
     }

     if(option.key==3){
      setstatistique([])
      setstatistique2([])
    yearFilter()
     
       }
      }
else{
  alert("Choisi un categorie")
}






    };




    const handleOptionChange2 = (option) => {
      setFilterdepensetype(option.label);
      
      setFilterdepensenum(option.key)
    
    
        };








































  
  
  
const formatDate=(inputDate)=> {
  const parts = inputDate.split('/'); // Split the date string by '/'
  
  // Ensure there are three parts (day, month, and year)
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0'); // Ensure two digits for day
    const month = parts[1].padStart(2, '0'); // Ensure two digits for month
    const year = parts[2];
    
    return `${day}-${month}-${year}`;
  } else {
    return 'Invalid date format';
  }
}








  const [loads, setload] = React.useState("none");
  const [componentWidth, setComponentWidth] = React.useState(0);
      





  return (






   <View onLayout={onLayout} style={{backgroundColor:'white',flex:1,paddingHorizontal:"0%",paddingVertical:'0%'}}>
     <View style={{display:loads,backgroundColor:'black',opacity:0.65,position:'absolute',zIndex:1111,top:"0%",left:'0%',width:'100%',height:"100%"}}>
<View style={{
display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',height:'100%',width:"100%"
}}>
  
  <ActivityIndicator size="large" color="#007AFF" />
</View>
</View>

<LinearGradient  style={{display:'flex',justifyContent:'space-between',backgroundColor:'white',paddingHorizontal:"5%",height:'26%'}}
      colors={['#FF5733', '#F28A21', '#FFAA00']}
    
    >



<View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>

   <TouchableOpacity style={{marginTop:"10%"}} onPress={()=>{navigation.navigate("Home")}}>
    <Icon name="home" size={getResponsiveFontSize(29)} color="white" style={{marginLeft:'0%'}}/>
  </TouchableOpacity>
  
 
</View>




<View style={{display:'flex',justifyContent:'flex-end',flexDirection:'row',alignItems:'center'}}>




<Text style={{fontSize:getResponsiveFontSize(12),fontFamily:'PoppinsSemiBold',color:'#F1EFEB'}}>Selectionner categories </Text>




                <ModalSelector
                    data={filterdepense}
                    initValue="Select Type"
                    onChange={handleOptionChange2}
                    style={{backgroundColor:'#0532A3',marginLeft:'2.5%',borderRadius:30,
                    width:'42%',paddingVertical:'1.15%',
                    display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'
                  }}
                 >
        
        
         
         
                   <TouchableOpacity>
                        <Text style={{fontSize:getResponsiveFontSize(11.5),fontFamily:"PoppinsRegular",color:'#BCBCBC'}} >  {filterdepensetype || 'choisi'} </Text>
                   </TouchableOpacity>
      
                
                
                </ModalSelector>



</View>













<View style={{marginTop:'3%',display:'flex',justifyContent:'center',flexDirection:'row',alignItems:'center'}}>



<Text style={{fontSize:getResponsiveFontSize(12),fontFamily:'PoppinsSemiBold',color:'#F1EFEB',marginLeft:'10%',textAlign:'center'}}>Filtrer par </Text>


<ModalSelector
                    data={filterdate}
                    initValue="Select Type"
                    onChange={handleOptionChange}
                    style={{backgroundColor:'#0532A3',borderRadius:30,marginLeft:'30%',
                    width:'25%',paddingVertical:'1.15%',
                    display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'
                  }}
                 >
        
        
         
         
                   <TouchableOpacity>
                        <Text style={{fontSize:getResponsiveFontSize(11.5),fontFamily:"PoppinsRegular",color:'#BCBCBC'}} >  {filtertype || 'choisi'} </Text>
                   </TouchableOpacity>
      
                
                
                </ModalSelector>



</View>








































</LinearGradient>






<ScrollView style={{marginTop:'5%'}}>


{(statistique.length<1 && statistique2.length<1 && statistique3.length<1) &&(<Text style={{fontSize:getResponsiveFontSize(14),textAlign:'center',fontFamily:'PoppinsSemiBold',color:'#9D9D9D'}}>Choisir un type de filtre</Text>)}



{





statistique.length > 0 && statistique.map((x,key)=>{
if(key<(statistique.length-1))

  return(

  <View  key={key}  style={{backgroundColor:'white',paddingHorizontal:'7%',paddingVertical:'4.5%',borderRadius:getResponsiveFontSize(15),marginTop:'1.5%',
  display:'flex',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#EBEAEA'
,marginBottom:'1%'
}}>
      

      

  
      <Text style={{color:'#545456',fontSize:getResponsiveFontSize(14),marginTop:'1%',fontFamily:'PoppinsRegular'}}> La Semaine   {formatDate(x.date.toLocaleString().substring(0,9).replace(/,/g, ""))}   *    {statistique[key+1].date != undefined && formatDate(statistique[key+1].date.toLocaleString().substring(0,9).replace(/,/g, ""))} </Text>

  <Text style={{color:'black',fontSize:getResponsiveFontSize(17),fontFamily:'PoppinsSemiBold',marginTop:'2.5%',textAlign:'center'}}>{parseFloat(x.montant).toFixed(2)} DH</Text>





  </View>




)})



}














{





statistique2.length > 0 && statistique2.map((x,key)=>{


  return(

  <View style={{backgroundColor:'white',paddingHorizontal:'7%',paddingVertical:'4.5%',borderRadius:getResponsiveFontSize(15),marginTop:'1.5%',
  display:'flex',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#EBEAEA'
,marginBottom:'1%'
}}>
      

      

  
      
      <Text style={{color:'#545456',fontSize:getResponsiveFontSize(14),marginTop:'1%',fontFamily:'PoppinsRegular'}}> Le mois   {formatDate(x.mois.toLocaleString().substring(0,9).replace(/,/g, ""))}   *     </Text>
  <Text style={{color:'black',fontSize:getResponsiveFontSize(15),fontFamily:'PoppinsSemiBold',marginTop:'2.5%',textAlign:'center'}}>{parseFloat(x.montant).toFixed(2)} DH</Text>



{x.montant>0 &&
  <View style={{width:'100%',marginTop:'4%',borderWidth:1,borderRadius:getResponsiveFontSize(5),borderColor:'#F6F6F6'}}>
    
    <View style={{backgroundColor:x.montant/sommedepense2*100 <30 ?'#09D812' :x.montant/sommedepense2*100 <80 ? '#278AF3' : '#FF1401',borderRadius:getResponsiveFontSize(5),width:`${((x.montant/sommedepense2)*100)}%`}}>
      <Text style={{fontSize:getResponsiveFontSize(10),color:x.montant/sommedepense*100 <30 ?'#09D812' :x.montant/sommedepense2*100 <80 ? '#278AF3' : '#FF1401'}}>.</Text>
    </View>
  
  </View>     

}



  </View>




)})



}












{

statistique3.length > 0 && statistique3.map((x,key)=>{


return(

<View style={{backgroundColor:'white',paddingHorizontal:'7%',paddingVertical:'4.5%',borderRadius:getResponsiveFontSize(15),marginTop:'1.5%',
display:'flex',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#EBEAEA'
,marginBottom:'1%'
}}>
    

    


    
    <Text style={{color:'#545456',fontSize:getResponsiveFontSize(15),marginTop:'1%',fontFamily:'PoppinsRegular'}}>annee {x.date}        </Text>
<Text style={{color:'black',fontSize:getResponsiveFontSize(17),fontFamily:'PoppinsSemiBold',marginTop:'2.5%',textAlign:'center'}}>{parseFloat(x.montant).toFixed(2)} DH</Text>



{(x.montant>0 && statistique3.length>1) &&
<View style={{width:'100%',marginTop:'2%',paddingVertical:getResponsiveFontSize(0.15),borderWidth:1,borderRadius:getResponsiveFontSize(5),borderColor:'#F6F6F6'}}>
  
  <View style={{backgroundColor:x.montant/sommedepense2*100 <30 ?'#09D812' :x.montant/sommedepense3*100 <80 ? '#278AF3' : '#FF1401',borderRadius:getResponsiveFontSize(5),width:`${((x.montant/sommedepense3)*100)}%`}}>
    <Text style={{fontSize:getResponsiveFontSize(14),color:x.montant/sommedepense3*100 <30 ?'#09D812' :x.montant/sommedepense3*100 <80 ? '#278AF3' : '#FF1401'}}>.</Text>
  </View>

</View>     

}



</View>




)})



}










































</ScrollView>


















   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default Statistique