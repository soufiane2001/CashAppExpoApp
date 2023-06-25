/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Switch,
  useColorScheme,
  View,
  Pressable
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



const Login: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  const [isSelected, setSelection] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch=async() =>{ setIsEnabled(previousState => !previousState)  }
  return (
    <SafeAreaView  style={styles.sectionContainer} >
  <Text>s</Text>
   
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    height:'100%',
    width:'100%',
        backgroundColor:'red'
        
      },
      checkbox: {
        alignSelf: 'center',
      },
      sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
      },
});

export default Login;
