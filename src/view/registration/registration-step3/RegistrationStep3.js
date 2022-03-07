import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import ImageView from "react-native-image-viewing";
import { useDispatch, useSelector } from "react-redux";
import { Size } from "../../../components/sizeing/Sizeing";
import { regFinished, registerFinish } from "../../../redux/action/ActionRegister";

function RegisterStep3({action}) {
  const navigation = useNavigation();
  const initialState = {
    image:''
  };
  const isFocus = useIsFocused();
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  const {registerData:Data} = useSelector(state => state.ReducerRegister);
  useEffect(() => {
    if(isFocus){
      if (
        Data.firstName !== ''&&
        Data.lastName  !== ''&&
        Data.biodata   !== ''&&
        Data.kecamatan !== ''&&
        Data.kota      !== ''&&
        Data.provinsi  !== ''&&
        Data.kelurahan !== ''&&
        Data.kode_pos  !== ''&&
        Data.ktp       !== ''&&
        Data.selfie    !== ''&&
        Data.bebas     !== ''
      ) {
        dispatch(registerFinish('step3',true));
      }else{
        action(1);
        dispatch(registerFinish('step3',false));
      } 
    }
  }, [isFocus])
  
  const DataString = [
    {field: Data?.firstName, name:'Nama Awal'},
    {field:Data?.lastName, name:'Nama Akhir'},
    {field:Data?.biodata, name:'Biodata'},
    {field:Data?.provinsi, name:'Provinsi'},
    {field:Data?.kota, name:'Kota'},
    {field:Data?.kecamatan, name:'Kecamatan'},
    {field:Data?.kelurahan, name:'Kelurahan'},
    {field:Data?.kode_pos, name:'Kode Pos'},
  ]

  const DataImage = [
    {field: Data?.ktp, name:'Foto KTP'},
    {field:Data?.selfie, name:'Foto Selfie'},
    {field:Data?.bebas, name:'Foto Bebas'},
  ]

  let  imgView = [{uri:state.image}];

  const handleSubmit = () =>{
    dispatch(regFinished(Data));
    navigation.goBack();
  }
  return(
    <ScrollView 
      nestedScrollEnabled={true} 
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={styles.container}
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
      
      {/* To Finished Registration */}
      <View>
        <TouchableOpacity onPress={()=>handleSubmit()} style={styles.button}>
            <Text style={styles.txtBtn}>Selesai</Text>
        </TouchableOpacity>
      </View>

      {/* To View Picture */}
      <ImageView
          images={imgView}
          imageIndex={0}
          visible={state.image !== ''}
          onRequestClose={() => setState(prev => ({...prev, image:''}))}
        />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    borderWidth:1,
    borderRadius:10,
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

export default RegisterStep3;