import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView
} from 'react-native';
import ImageView from "react-native-image-viewing";
import Header from "../../../components/header/Header";
import { Size } from "../../../components/sizeing/Sizeing";

function Preview({route, navigation}) {
  const initialState = {
    image:''
  };
  const [state, setState] = useState(initialState);

  const {data:Data} = route.params;

  const DataString = [
    {field:Data?.firstName, name:'Nama Awal'},
    {field:Data?.lastName, name:'Nama Akhir'},
    {field:Data?.biodata, name:'Biodata'},
    {field:Data?.provinsi, name:'Provinsi'},
    {field:Data?.kota, name:'Kota'},
    {field:Data?.kecamatan, name:'Kecamatan'},
    {field:Data?.kelurahan, name:'Kelurahan'},
    {field:Data?.kode_pos, name:'Kode Pos'},
  ]

  const DataImage = [
    {field:Data?.ktp, name:'Foto KTP'},
    {field:Data?.selfie, name:'Foto Selfie'},
    {field:Data?.bebas, name:'Foto Bebas'},
  ]

  let  imgView = [{uri:state.image}];

  return(
    <SafeAreaView style={styles.container}>
      {/* Header Back */}
      <Header
        action={()=> navigation.goBack()}
        title={'Detail Registrasi'}
      />
      <ScrollView 
        nestedScrollEnabled={true} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContainer}
        >

        {/* List of Text Field */}
        {DataString.map((item, index) => {
          return(
            <View key={index} style={styles.fieldContainer}>
              <Text style={styles.textTittle}>{item.name}</Text>
              <Text style={styles.textField}>{item.field}</Text>
            </View>
          )
        })}

        {/* List Of Picture*/}
        {DataImage.map((item,index)=>{
          return(
            <View style={{marginVertical:5}} key={index} >
              <Text style={styles.titleField}>{item.name}</Text>
              <View style={styles.imageContainer}>
                <TouchableOpacity 
                  onPress={()=>setState(prv => ({...prv, image:item.field}))} 
                  style={styles.imgContain}
                  >
                  <Image style={styles.image} source={{uri:item.field}}/>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
        

        {/* To View Picture */}
        <ImageView
            images={imgView}
            imageIndex={0}
            visible={state.image !== ''}
            onRequestClose={() => setState(prev => ({...prev, image:''}))}
          />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    paddingBottom:45
  },
  scrollContainer:{
    flexGrow:1,
    borderWidth:1,
    borderRadius:10,
    alignSelf:'center',
    padding:10,
    width: Size.ww(90),
  },
  fieldContainer:{
    marginVertical:5,
    borderRadius:5,
  },
  textTittle:{
    fontSize:15,
    fontWeight:'700',
    color:'#8895BE'
  },
  textField:{
    width:'100%',
    borderWidth:1,
    borderRadius:5,
    height:35,
    fontWeight:'700',
    paddingHorizontal:10,
    textAlignVertical:'center'
  },
  imageContainer:{
    borderWidth:1,
    borderRadius:10,
    marginVertical:5,
    height:180,
    justifyContent:'center',
    alignItems:'center'
  },
  imgContain:{
    width:'100%', 
    height:'100%'
  },
  image:{
    resizeMode:'cover',
    flex:1,
    borderRadius:10
  },
  titleField:{
    width:'100%',
    fontWeight:'700',
    color:'#8895BE',
    textAlign:'left',
    marginVertical:5
  },
  button:{
    backgroundColor:'#6EB564',
    marginVertical:5,
    borderRadius:10,
    height:50,
    alignItems:'center',
    justifyContent:'center'
  },
  txtBtn:{
    fontWeight:'700',
    fontSize:18
  }
})

export default Preview;