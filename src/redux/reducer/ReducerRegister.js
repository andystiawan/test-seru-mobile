const innitialState = {
  registerData:{
    firstName:'',
    lastName:'',
    biodata:'',
    provinsi:'',
    kota:'',
    kecamatan:'',
    kelurahan:'',
    kode_pos:'',
    ktp:'',
    selfie:'',
    bebas:''
  },
  registerFinish:{
    step1:false,
    step2:false,
    step3:false
  },
  provinsi: [],
  kecamatan: [],
  kota: [],
  kelurahan: [],
};

const ReducerRegister = (state = innitialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'FILL_REGISTER_DATA':
      return {
        ...state,
        registerData: {
          ...state.registerData,
          [payload.field]: payload.value,
        },
      };
    case 'ADD_PROVINSI':
      return {
        ...state,
        isLoading: true,
        provinsi: payload,
      };
    case 'ADD_KOTA':
      return {
        ...state,
        kota: payload,
        kecamatan: [],
        kelurahan: [],
        registerData: {
          ...state.registerData,
          kota:'',
          kecamatan:'',
          kelurahan:'',
          kode_pos:'',
        },
      };
    case 'ADD_KECAMATAN':
      return {
        ...state,
        kecamatan: payload,
      };
    case 'ADD_KELURAHAN':
      return {
        ...state,
        kelurahan: payload,
      };
    case 'REGISTER_FINISH':
      return{
        ...state,
        registerFinish:{
          ...state.registerFinish,
          [payload.field] : payload.status
        },
      };
    case 'FINISHED':
     return innitialState;
    default:
      return state;
  }
};

export default ReducerRegister;
