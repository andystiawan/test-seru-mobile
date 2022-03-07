import React, { useEffect } from "react";
import { 
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { useSelector } from "react-redux";
import { Size } from "../../components/sizeing/Sizeing";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faIdCard} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/header/Header";


function PreviewRegisterContainer({navigation}) {
  const {listData} = useSelector(state => state.ReducerPrevRegister); 
  const renderItem = (item) => {
    let names = [];
    for (const data in item) {
      names.push(data);
    };
    let results = item[names];
    return(
      <TouchableOpacity onPress={()=>navigation.navigate('PreviewDetail',{data: results})} style={styles.listContainer}>
        <View style={styles.imgSize}>
          <Image style={styles.listImg} source={{uri: results?.selfie}}/>
        </View>
        <View style={{flex:1}}>
          <Text style={styles.textTitle}>{names}</Text>
          <Text style={styles.subTxt}>"{results?.biodata.slice(0,25)}"</Text>
        </View>
        <View style={styles.iconList}>
          <FontAwesomeIcon size={40} color="#6B79B0" icon={faIdCard}/>
        </View>
      </TouchableOpacity>
    )
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header
            action={()=> navigation.goBack()}
            title={'Hasil Registrasi'}
          />
      </View>
     
      {listData?.length > 1 && 
        <View>
          <Text style={styles.textTitle}>
            Daftar Hasil Registrasi
          </Text>
        </View>
      }
      <FlatList
        data={listData}
        renderItem={({item})=>renderItem(item)}
        keyExtractor={(item,index) => index}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    alignItems:'center'
  },
  header:{
    alignItems:'flex-start',
    width:'100%'
  },
  listContainer:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#6B79B0',
    padding:10,
    marginVertical:5,
    borderRadius:10,
    borderWidth:1,
    height:Size.hw(10),
    width:Size.ww(85)
  },
  textTitle:{
    paddingHorizontal:10,
    fontSize:18,
    fontWeight:'700',
    textTransform:'capitalize',
    textAlignVertical:'center'
  },
  subTxt:{
    paddingHorizontal:10,
    fontWeight:'500',
    textTransform:'capitalize',
    textAlignVertical:'center'
  },
  iconList:{
    borderRadius:60,
    width:60,
    height:60,
    justifyContent:'center',
    backgroundColor:'#A8B0D1', 
    alignItems:'center',
  },
  listImg:{
    resizeMode:'cover',
    borderRadius:50,
    flex:1
  },
  imgSize:{
    height:70, 
    width:70
  }
})
export default PreviewRegisterContainer;