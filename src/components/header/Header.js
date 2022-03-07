
import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeftLong
} from "@fortawesome/free-solid-svg-icons";
import { Size } from "../sizeing/Sizeing";


function Header({action,title}){
  return(
    <View style={styles.container}>
      <TouchableOpacity onPress={action} style={styles.button}>
        <FontAwesomeIcon color="#2E418F" size={25} icon={faArrowLeftLong}/>
      </TouchableOpacity>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center',
    height:Size.hw(5)
  },
  button:{
    width:'15%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  text:{
    fontSize:15,
    fontWeight:'bold',
    color:'#2E418F'
  }
})
export default Header;