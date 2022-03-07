import React, { useEffect, useRef, useState } from "react";
import{
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
}from 'react-native';
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import RegisterStep1 from "./registration-step1/RegisterStep1";
import RegisterStep2 from "./registration-step2/RegistrationStep2";
import RegisterStep3 from "./registration-step3/RegistrationStep3";


const myComponents = {
  1: RegisterStep1,
  2: RegisterStep2,
  3: RegisterStep3,
}

function RegistrationContainer({navigation}) {
  const scrollRef = useRef();
  const {registerFinish} = useSelector((state) => state.ReducerRegister);
  const regOption = [
    {
      id: 1,
      icon:require("../../assets/icons/writing.png"),
      title: 'Form Data Diri',
      content: '1',
      status: registerFinish.step1,
    },
    {
      id:2,
      icon:require("../../assets/icons/card.png"),
      title: 'Foto KTP, Selfie, Bebas',
      content: '2',
      status: registerFinish.step2,
    },
    {
      id:3,
      icon:require("../../assets/icons/car.png"),
      title: 'Data Siap Kirim',
      content: '3',
      status: registerFinish.step3,
    }
  ];

  const initialState = {
    content:1,
  };

  const [state, setState] = useState(initialState);

  const handleOnClickOption = (id) => {
    setState(prev => ({...prev, content: id}));
    scrollRef.current?.scrollTo({x:id == 3 ? 300 : id == 2 ? 150 :0 });
  }
  const Component = myComponents[regOption[state.content-1].content];

  
  
  return(
    <SafeAreaView style={styles.container}>
      {/* Cutom Header*/}
      <View style={{flex:0}}>
        <Header
          action={()=> navigation.goBack()}
          title={'Registrasi Klaim'}
        />
      </View>
     
     
      {/* Register Option */}
      <View style={{flex:0}}>
        <ScrollView 
          ref={scrollRef}
          contentContainerStyle={styles.optionScroll} 
          horizontal 
          showsHorizontalScrollIndicator={false}
        >
          {regOption.map(item => {
            return(
              <TouchableOpacity 
                disabled={!item.status}
                onPress={()=>handleOnClickOption(item.id)} 
                style={styles.optionContainer(item,state.content)} 
                key={item.id}
              >
                <View style={styles.bgStatusOption(item.status)}/>
                <View style={styles.iconOption(item.status)}>
                  <Image style={styles.image} source={item.icon}/>
                </View>
                <View style={styles.option}>
                  <Text style={styles.textOption}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
      

      {/* Register Field Content */}
      <View style={styles.content}>
        <Component
          action={(e)=>handleOnClickOption(e)}
        />
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
  content:{
    alignItems:'center',
    paddingBottom:5,
    flex:1
  },
  optionScroll:{
    justifyContent:'center',
    height:80,
    flexGrow:1,
  },
  optionContainer:(item,state)=>({
    margin:10,
    height: 50,
    alignItems:'center',
    flexDirection:'row',
    borderRadius:5,
    backgroundColor: item.id === state && item.status ? '#ACEC96' : item.id === state ? '#8895BE' :'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }),
  image:{
    resizeMode:'contain', 
    maxHeight:'90%',
    maxWidth:'90%'
  },
  bgStatusOption:(i)=>({
    height:'100%', 
    width:5, 
    borderRadiusTopLeft:5,
    backgroundColor: i ? '#61B946':'#22378A',
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5,
  }),
  iconOption:(status)=>({
    width:50,
    alignItems:'center',
    justifyContent:'center',
    height:'100%',
    backgroundColor: status ?'#DEF4D7':'#B5BCD8'
  }),
  textOption:{
    width:150,
    alignItems:'center',
    textAlign:'center',
    fontWeight:'bold',
  }
})

export default RegistrationContainer;