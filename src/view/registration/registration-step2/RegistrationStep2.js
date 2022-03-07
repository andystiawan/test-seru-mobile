import React, { useRef, useState }  from "react";
import { 
  faArrowAltCircleLeft,
} from "@fortawesome/free-regular-svg-icons";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import ImageView from "react-native-image-viewing";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Animated from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { Size } from "../../../components/sizeing/Sizeing";
import UploadPhoto from "../../../components/uploadPhoto/UploadPhoto";
import { fillRegData, registerFinish } from "../../../redux/action/ActionRegister";

function RegisterStep2({action}) {
  const initialState = {
    field:'',
    image:''
  };
  const dispatch = useDispatch();
  const {registerData:Data} = useSelector(state => state.ReducerRegister); 
  const [state, setState] = useState(initialState);

  const daftarUpload = [
    {
      field:'ktp',
      context:'Upload Foto KTP'
    },
    {
      field:'selfie',
      context:'Upload Foto Selfie'
    },
    {
      field:'bebas',
      context:'Upload Foto Bebas'
    }
  ]
  
  const handleSubmit = () =>{
    if(
    Data.ktp    === ''||
    Data.selfie === ''||
    Data.bebas  === ''){
      alert('Data belum di isi lengkap !');
    }else{
      try {
        dispatch(registerFinish('step2',true));
        action(3);
      } catch (error) {
        console.log(error);
      }
    }
  }
  const renderUpload = ({title, name}) =>{
    return(
      <View style={styles.imageContainer}>
        {Data[name] === '' ?
        <>
          <TouchableOpacity onPress={() => open(name)} style={styles.iconPlus}>
            <FontAwesomeIcon icon={faPlus}/>
          </TouchableOpacity>
          <View>
            <Text>{title}</Text>
          </View>
        </>
        :
          <TouchableOpacity onPress={()=>setState(prv => ({...prv, image:Data[name]}))} style={styles.imgContain}>
            <Image style={styles.image} source={{uri:Data[name]}}/>
          </TouchableOpacity>
        }
        
      </View>
    )
    
  }
  const open = (field) => {
    try {
      sheetRef.current.snapTo(1);
      setState(prev => ({...prev,field: field}));
    } catch (error) {
      console.log(error);
    }
  }

  const upload = (res) => {
    try {
      dispatch(fillRegData(state.field,res.uri));
      sheetRef.current.snapTo(2);
      setState(prev => ({...prev,field: ''}));
    } catch (error) {
      console.log(error);
    }
  }

  const deleteData = (field) => {
    try {
      dispatch(fillRegData(field,''));
      dispatch(registerFinish('step2',false));
      dispatch(registerFinish('step3',false));
    } catch (error) {
      console.log(error);
    }
  }

  let  imgView = [{uri:state.image}];

  const sheetRef = useRef();
  const fall = new Animated.Value(1);
  return(
    <View style={styles.contain}>

      {/* To Upload Image */}
      <UploadPhoto
        sheetRef={sheetRef}
        setResponse={(e)=>upload(e)}
        close={()=>sheetRef.current.snapTo(2)}
        fall={fall} />

      {/* To View Picture */}
      <ImageView
          images={imgView}
          imageIndex={0}
          visible={state.image !== ''}
          onRequestClose={() => setState(prev => ({...prev, image:''}))}
        />

      <Animated.View style={{opacity: Animated.add(0.1, Animated.multiply(fall, 1.0))}}>
        <ScrollView 
          nestedScrollEnabled={true} 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.container}>

          {/* Daftar upload */}
          {daftarUpload.map((item,index) => {
            return(
              <View style={{marginVertical:5}} key={index}>
                {Data[item.field] !== '' && 
                  <Text style={styles.titleField}>Foto {item.field.toUpperCase()}</Text>
                }
                {renderUpload({
                  title:item.context,
                  name:item.field,
                })}
                {Data[item.field] !== '' &&
                  <TouchableOpacity onPress={()=>deleteData(item.field)} style={styles.btnTrash}>
                    <FontAwesomeIcon color="red" icon={faTrash}/>
                  </TouchableOpacity>
                }
              </View>
            )
          })}

          {/* Button Submit For Next Form */}
          <View>
            <TouchableOpacity onPress={()=>handleSubmit()} style={styles.button}>
                <Text style={styles.txtBtn}>Lanjutkan</Text>
            </TouchableOpacity>
          </View>

          {/* Go Back */}
          <View style={styles.goBack}>
            <TouchableOpacity onPress={()=>action(1)}>
              <FontAwesomeIcon size={40} color={'#B5BCD8'} icon={faArrowAltCircleLeft}/>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexGrow:0,
    borderWidth:1,
    borderRadius:10,
    padding:10,
    width: Size.ww(90),
  },
  contain:{
    alignItems:'center',
    flex:1
  },
  titleField:{
    width:'100%',
    fontWeight:'700',
    color:'#6B79B0',
    textAlign:'left',
    paddingLeft:10
  },
  btnTrash:{
    backgroundColor:'white',
    position:'absolute',
    right:0,
    borderTopLeftRadius:10,
    borderBottomRightRadius:10,
    bottom:0,
    width:30,
    height:30,
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
  iconPlus:{
    borderWidth:1.5, 
    borderRadius:60,
    marginVertical:10,
    alignItems:'center',
    justifyContent:'center',
    width:35, 
    height:35
  },
  imageContainer:{
    borderWidth:1,
    borderRadius:10,
    marginVertical:5,
    height:180,
    justifyContent:'center',
    alignItems:'center'
  },
  goBack:{
    width:'100%', 
    alignItems:'center', 
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
export default RegisterStep2;