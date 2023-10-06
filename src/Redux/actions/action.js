export const ADD = (item) => {
  return {
    type: "ADD_CART",
    payload: item,
  };
};

export const ADDMORE = (item) => {
  return {
    type: "ADD_MORE",
    payload: item,
  };
};

// remove iteams
export const DLT = (id) => {
  return {
    type: "RMV_CART",
    payload: id,
  };
};

// remove individual iteam

export const REMOVE = (iteam) => {
  return {
    type: "RMV_ONE",
    payload: iteam,
  };
};

export const RESET = (iteam) => {
  return {
    type: "RESET_CART",
    payload: iteam,
  };
};
