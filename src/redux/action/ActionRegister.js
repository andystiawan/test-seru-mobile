import AsyncStorage from '@react-native-async-storage/async-storage';

const locataion =  require('../../network/daerah.json');

export const fillRegData = (field, value) => async (dispatch) => {
  dispatch({
    type: 'FILL_REGISTER_DATA',
    payload: {
      field,
      value,
    },
  });
};


export const registerFinish = (field, status) => async (dispatch) => {
  dispatch({
    type: 'REGISTER_FINISH',
    payload: {
      field,
      status,
    },
  });
};


export const getProvinsi = () => async (dispatch) => {
  let results = [];
  let lists = locataion;
  try {
    for (const data in lists) {
      results.push(data);
    };
    dispatch({
      type: 'ADD_PROVINSI',
      payload: results,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getKota = (provinsi) => async (dispatch) => {
  let results = [];
  let lists = locataion[provinsi];
  try {
    for (const data in lists) {
      results.push(data);
    };
    dispatch({
      type: 'ADD_KOTA',
      payload: results,
    });
  } catch (error) {
    console.log(error);
  }
};


export const getKecamatan = (provinsi,kota) => async (dispatch) => {
  let results = [];
  let lists = locataion[provinsi][kota];
  try {
    for (const data in lists) {
      results.push(data);
    };
    dispatch({
      type: 'ADD_KECAMATAN',
      payload: results,
    });
  } catch (error) {
    console.log(error);
  }
};


export const getKelurahan = (provinsi,kota,kecamatan) => async (dispatch) => {
  let lists = locataion[provinsi][kota][kecamatan];
  try {
    dispatch({
      type: 'ADD_KELURAHAN',
      payload: lists,
    });
  } catch (error) {
    console.log(error);
  }
};


export const regFinished = (data) => async (dispatch) => {
  const changeData = [{[data.firstName+' '+data.lastName] : data}];
  try {
    dispatch({
      type: 'LIST_DATA_REGISTER',
      payload: changeData
    });
    dispatch({
      type: 'FINISHED',
    });
  } catch (error) {
    console.log(error);
  }
};