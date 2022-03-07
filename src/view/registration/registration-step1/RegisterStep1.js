import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { Size } from "../../../components/sizeing/Sizeing";
import { 
  fillRegData, 
  getKecamatan, 
  getKelurahan, 
  getKota, 
  getProvinsi, 
  registerFinish 
} from "../../../redux/action/ActionRegister";

function RegisterStep1({action}) {
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const { 
    provinsi, 
    kota, 
    kecamatan, 
    kelurahan, 
    registerData:Data 
  } = useSelector((state) => state.ReducerRegister);
  const initialstate = {
    provinsi:false,
    kota:false,
    kecamatan:false,
    kelurahan:false,
    loading:false,
  }
  const [state, setState] = useState(initialstate);

  const handleChange = (field, value) => {
    if(field === 'provinsi'){
      dispatch(fillRegData(field,value));
      dispatch(getKota(value));
    }else if(field === 'kota'){
      dispatch(fillRegData(field,value));
      dispatch(getKecamatan(Data.provinsi, value));
    }else if(field === 'kecamatan'){
      dispatch(fillRegData(field,value));
      dispatch(getKelurahan(Data.provinsi,Data.kota,value));
    }else if(field === 'kelurahan'){
      try {
        dispatch(fillRegData('kelurahan',value.kelurahan));
        dispatch(fillRegData('kode_pos',value.kode_pos));
      } catch (error) {
        console.log(error);
      }
    }else{
      dispatch(fillRegData(field,value));
      if(value === ''){
        dispatch(registerFinish('step1',false));
        dispatch(registerFinish('step3',false));
      }
    }
  };

  useEffect(() => {
    dispatch(getProvinsi());
  }, [dispatch,isFocus]);

  const handleOpen = (value) => {
    setState(prev=>({...prev,
      provinsi:value === 'provinsi' ? !state[value]:false,
      kota:value === 'kota' ? !state[value]:false,
      kecamatan:value === 'kecamatan' ? !state[value]:false,
      kelurahan:value === 'kelurahan' ? !state[value]:false,
    }));
  };

  const handleSubmit = () =>{
    if(
    Data.firstName === ''||
    Data.lastName  === ''||
    Data.biodata   === ''||
    Data.kecamatan === ''||
    Data.kota      === ''||
    Data.provinsi  === ''||
    Data.kelurahan === ''||
    Data.kode_pos  === ''){
      alert('Data belum di isi lengkap !');
    }else{
      try {
        dispatch(registerFinish('step1',true));
        action(2);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return(
    <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.container}>
      {/* First Name Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.textTittle}>Nama Awal</Text>
        <TextInput 
          value={Data.firstName} 
          style={styles.textInput}
          onChangeText={(e)=>handleChange('firstName',e)} 
          placeholder="Nama Awal"/>
      </View>

      {/* Last Name Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.textTittle}>Nama Akhir</Text>
        <TextInput 
          value={Data.lastName} 
          style={styles.textInput}
          onChangeText={(e)=>handleChange('lastName',e)} 
          placeholder="Nama Akhir"/>
      </View>

      {/* Biodata Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.textTittle}>Biodata</Text>
        <TextInput 
        value={Data.biodata} 
        style={styles.inputMultiline} 
        onChangeText={(e)=>handleChange('biodata',e)} 
        multiline 
        placeholder="Biodata Diri"
        />
      </View>

      {/* Dropdown Province */}
      <View style={[styles.fieldContainer, {height:state.provinsi ? 300:50}]}>
        <DropDownPicker  
         items={provinsi?.map((item) => ({
            label: item,
            value: item,
          }))}
          maxHeight={250}
          listMode="SCROLLVIEW"
          value={Data?.provinsi}
          loading={state.loading}
          mode={'SIMPLE'}
          open={state.provinsi}
          onOpen={()=>handleOpen('provinsi')}
          onClose={()=>handleOpen('provinsi')}
          searchable={true}
          dropDownDirection="BOTTOM"
          defaultValue={Data?.provinsi}
          placeholder={'Provinsi'}
          onSelectItem={ item => handleChange('provinsi',item.value)}
          />
      </View>

      {/* Dropdown City */}
      <View style={[styles.fieldContainer, {height:state.kota ? 300:50}]}>
        <DropDownPicker  
         items={kota?.map((item) => ({
            label: item,
            value: item,
          }))}
          maxHeight={250}
          listMode="SCROLLVIEW"
          value={Data?.kota}
          loading={state.loading}
          mode={'SIMPLE'}
          open={state.kota}
          onOpen={()=>handleOpen('kota')}
          onClose={()=>handleOpen('kota')}
          searchable={true}
          dropDownDirection="BOTTOM"
          defaultValue={Data?.kota}
          placeholder={'Kota'}
          onSelectItem={ item => handleChange('kota',item.value)}
          />
      </View>

      {/* Dropdown For Kecamatan */}
      <View style={[styles.fieldContainer, {height:state.kecamatan ? 300:50}]}>
        <DropDownPicker  
          items={kecamatan?.map((item) => ({
            label: item,
            value: item,
          }))}
          maxHeight={250}
          listMode="SCROLLVIEW"
          value={Data?.kecamatan}
          loading={state.loading}
          mode={'SIMPLE'}
          open={state.kecamatan}
          onOpen={()=>handleOpen('kecamatan')}
          onClose={()=>handleOpen('kecamatan')}
          searchable={true}
          dropDownDirection="BOTTOM"
          defaultValue={Data?.kecamatan}
          placeholder={'Kecamatan'}
          onSelectItem={ item => handleChange('kecamatan',item.value)}
          />
      </View>

      {/* Dropdown For Kelurahan */}
      <View style={[styles.fieldContainer, {height:state.kelurahan ? 300:50, flexDirection:'row'}]}>
        <DropDownPicker  
          items={kelurahan?.map((item) => ({
            label: item.kelurahan,
            value: item.kelurahan,
            kodepos: item.kode_pos
          }))}
          maxHeight={250}
          containerStyle={{width:250}}
          listMode="SCROLLVIEW"
          value={Data?.kelurahan}
          loading={state.loading}
          mode={'SIMPLE'}
          open={state.kelurahan}
          onOpen={()=>handleOpen('kelurahan')}
          onClose={()=>handleOpen('kelurahan')}
          searchable={true}
          dropDownDirection="BOTTOM"
          defaultValue={Data?.kelurahan}
          placeholder={'Kelurahan'}
          onSelectItem={ item => handleChange('kelurahan',{kelurahan: item.value, kode_pos: item.kodepos})}
          />
          <TextInput 
            value={Data.kode_pos.toString()} 
            style={styles.txtKodePos} 
            keyboardType={'number-pad'}
            editable={false} 
            placeholder="Kode Pos"/>
      </View>
      
      {/* Button Submit For Next Form */}
      <View>
        <TouchableOpacity onPress={()=>handleSubmit()} style={styles.button}>
            <Text style={styles.txtBtn}>Lanjutkan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'column',
    borderWidth:1,
    borderRadius:10,
    padding:10,
    width: Size.ww(90),
  },
  textInput:{
    width:'100%',
    borderBottomWidth:1,
    padding:0,
    borderRadius:5,
    paddingHorizontal:5
  },
  txtKodePos:{
    width:'30%',
    height:50,
    borderBottomWidth:1,
    padding:0,
    fontWeight:'700',
    borderRadius:5,
    paddingHorizontal:5
  },
  textTittle:{
    fontSize:15,
    fontWeight:'700',
    color:'#8895BE'
  },
  fieldContainer:{
    marginVertical:10,
    borderRadius:5,
  },
  inputMultiline:{
    borderWidth:1,
    height:100,
    textAlignVertical:'top',
    padding:5,
    borderRadius:5
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

export default RegisterStep1;