import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button, FlatList ,Image,TouchableOpacity, Alert} from 'react-native';

import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';



import uuid from "uuid";
import { ActivityIndicator } from 'react-native';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as firebase from "firebase/app";
import * as Location from 'expo-location';

const storage = getStorage();


const storageRef = ref(storage);

async function uploadImageAsync(uri) {

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(getStorage(), uuid.v4());
  const result = await uploadBytes(fileRef, blob);

 
  blob.close();

  return await getDownloadURL(fileRef);
}








export default function Cameras({navigation ,route}) {

    const [imageUri, setImageUri] = useState(null);
    const [imageurl, setImageUrl] = useState(null);
    const [componentWidth, setComponentWidth] = React.useState(0);
    const [recognizedText, setRecognizedText] = useState('');
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         base64: true
       });
  
      if (!result.assets[0].cancelled) {
        setImageUri(result.assets[0].uri);
      }



    
        let base64Img =  `data:image/jpg;base64,${result.assets[0].base64}`;
      
        

        const uploadUrl = await uploadImageAsync(result.assets[0].uri);


    

       recognizeText(uploadUrl)


    };


    const getCameraAndPhotoLibraryPermissions=async()=> {
      const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
      const { status: photoLibraryStatus } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    
      if (cameraStatus === 'granted' && photoLibraryStatus === 'granted') {
       
        return true;
      } else {
       
        return false;
      }
    }




    const launchCamera = async() => {
      Alert.alert(
        'Permission',
        'Permettez-vous à cashapp d’utiliser votre appareil photo ? ',
        [
          {
            text: 'refuser',
            style: 'cancel',
          },
          {
            text: 'accepter',
            onPress: async () => {
              const { status } = await Location.requestForegroundPermissionsAsync();
        
       
if (status == 'granted') {
  console.log('Permission to access location was denied');




        try {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 0.1,
              aspect: [4, 3],
              base64: true
            });
        
        
              
       
              if (!result.assets[0].cancelled) {
                setImageUri(result.assets[0].uri);
              setload('block')
               let base64Img =  `data:image/jpg;base64,${result.assets[0].base64}`;
              const uploadUrl = await uploadImageAsync(result.assets[0].uri);
        
        
            recognizeText(uploadUrl)
           
              }
          } catch (error) {
            setload("none")
   
          }
        }


      },
    },
  ]
);




    };




















    


    
    const recognizeText = async (x) => {
      
      setload('block')
    /*  var myHeaders = new Headers();
      myHeaders.append("apikey", "TMlKq85q7lsDOKOrjKgEwShBgHdpuTiP");
      
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };
      
      fetch("https://api.apilayer.com/image_to_text/url?url="+x, requestOptions)
        .then(response => response.text())
        .then(result =>{ setRecognizedText(JSON.parse(result).all_text)
      
          const text = JSON.parse(result).annotations;
        
         const numbersWithTwoDecimalPlaces = findNumbersWithTwoDecimalPlaces(text);
          const largestNumber = findLargestNumber(numbersWithTwoDecimalPlaces);
          if(text!=undefined && largestNumber!=undefined){
          setload('none')
 navigation.navigate('OcrResult',{prix:largestNumber})
          }
        else{
          setload('none')
          alert("aucun prix detecte")


        }


        })
        .catch(error => {
      
        setload('none')
      });
      

*/











      const requestBody = {
      
        parent: "",
        requests: [
          {
            image: {
              source: {
                imageUri: x,
              }
            },
            features: [
              {
                type: "TEXT_DETECTION"
              },
            
            ]
          }
        ]
      
    };

    // Make a POST request using fetch
    fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA0kiTA_ejo3BDKvTGLvdJIhpcIsR87ZGs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify the content type
        // You may need to include other headers like authentication tokens
      },
      body: JSON.stringify(requestBody), // Convert the body to JSON format
    })
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
         var datastring=[];
         if(data.responses[0].textAnnotations!=undefined){
       for(var i=1;i<data.responses[0].textAnnotations.length;i++){
        datastring.push(data.responses[0].textAnnotations[i].description)
       }
      
        const numbersWithTwoDecimalPlaces = findNumbersWithTwoDecimalPlaces(datastring);
        const largestNumber = findLargestNumber(numbersWithTwoDecimalPlaces);
        console.log(largestNumber)
        const text = data.responses[0].textAnnotations[0].description;
 if(text!=undefined && largestNumber!=undefined){
          setload('none')
 navigation.navigate('OcrResult',{prix:largestNumber})
          }
        else{
          setload('none')
          alert("aucun prix detecte")


        }
      }
      else{
        setload('none')
        alert("aucun prix detecte")
      }

        
      })
      .catch(error => {
        setload('none')
       
      });














      };

















     
const findLargestNumber=(numbers)=> {
  if (numbers.length === 0) {
    return null; // Return null if the array is empty
  }

  // Use the spread operator (...) to pass the array elements as arguments to Math.max()
  const largestNumber = Math.max(...numbers);

  return largestNumber;
}












      const findNumbersWithTwoDecimalPlaces=(arrayOfStrings)=> {
        const numberRegex = /^\d+(?:[.,]\d{2})?/;
        const numbers = [];
      
        arrayOfStrings.forEach((str) => {
          const matches = str.match(numberRegex);
          if (matches) {
            matches.forEach((match) => {
              numbers.push(parseFloat(match.replace(',', '.')));
            });
          }
        });
      
        return numbers;
      }
      



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
      
useEffect(()=>{
  setload('none')
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




       
        <LinearGradient  style={{backgroundColor:'white',paddingHorizontal:"2%",height:'100%',paddingVertical:"3%"}}
         colors={['#FF5733', '#FFC300', '#FFC500']}
       
       >
<TouchableOpacity style={{marginTop:"5%"}} onPress={()=>{navigation.navigate("Home")}}>
<Icon name="home" size={getResponsiveFontSize(35)} color="white" style={{marginLeft:'2.5%'}}/>

</TouchableOpacity>


<View style={{ display:'flex',justifyContent:'center',alignItems:'center',height:'80%'}}>

{imageUri && <Image source={{ uri: imageUri}} style={{ width: 200, height: 200 }} />}

<Entypo name="camera" size={getResponsiveFontSize(75)} color="white" onPress={launchCamera} style={{marginBottom:'10%'}} />
<MaterialIcons name="library-books" size={getResponsiveFontSize(75)} onPress={pickImage} style={{marginTop:'10%'}} color="white" />

</View>


        </LinearGradient>
        </View>
      
      )

}













