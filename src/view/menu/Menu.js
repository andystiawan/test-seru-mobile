import React, { useEffect, useState } from "react";
import { 
  FontAwesomeIcon 
} from "@fortawesome/react-native-fontawesome";
import { 
   faAddressCard
} from '@fortawesome/free-solid-svg-icons';
import{
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text
}from 'react-native';
import { Size } from "../../components/sizeing/Sizeing";
import { useSelector } from "react-redux";

//Untuk mengatur dimensi layar
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");


function Menu({navigation}) {
  const [dimensions, setDimensions] = useState({ window, screen });
  const {listData} = useSelector(state => state.ReducerPrevRegister); 
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  });

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.text(dimensions)}>
            Selamat Datang
        </Text>
        <FontAwesomeIcon 
          size={dimensions.screen.width > dimensions.screen.height ? 200 : 350}
          color="#97A2C8" 
          icon={faAddressCard}/>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={()=> navigation.navigate('Register')} style={styles.button(dimensions)}>
          <Text style={styles.text(dimensions)}>
              Registrasi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Preview')} style={styles.button(dimensions)}>
          <Text style={styles.text(dimensions)}>
              Hasil Registrasi
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};


const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
  },
  iconContainer:{
    width:'80%',
    height:'45%',
    justifyContent:'center',
    alignItems:'center'
  },
  buttonContainer:{
    width:'80%',
    justifyContent:'center',
    alignItems:'center',
  },
  button:(dim) => ({
    backgroundColor:'#97A2C8',
    marginVertical:5,
    borderRadius:10,
    width: dim.screen.width > dim.screen.height? '45%' :'70%',
    height:'15%',
    alignItems:'center',
    justifyContent:'center'
  }),
  text: (dim) => ({
    fontSize:dim.screen.width > dim.screen.height ? Size.hw(3.3): Size.hw(2.5),
    fontWeight:'bold'
  })
})

export default Menu;