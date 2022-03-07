const innitialState = {
  listData:[]
};

const ReducerPrevRegister = (state = innitialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'LIST_DATA_REGISTER':
      return {
        ...state,
        listData: [...state.listData, ...payload],
      };
    default:
      return state;
  }
};

export default ReducerPrevRegister;
