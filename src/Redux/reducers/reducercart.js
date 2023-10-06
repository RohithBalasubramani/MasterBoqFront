const savedCarts = localStorage.getItem("carts");
const INIT_STATE = {
  carts: savedCarts ? JSON.parse(savedCarts) : [],
};

export const cartreducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
      const IteamIndex = state.carts.findIndex(
        (iteam) => iteam.id === action.payload.id
      );
      const temp = { ...action.payload, qnty: 1 };

      localStorage.setItem("carts", JSON.stringify(state.carts));
      return {
        ...state,
        carts: [...state.carts, temp],
      };

    //   if (IteamIndex >= 0 ) {
    //     state.carts[IteamIndex].qnty += 1;
    //     return {
    //       ...state,
    //       carts: [...state.carts],
    //     };
    //   } else {
    //     const temp = { ...action.payload, qnty: 1 };
    //     return {
    //       ...state,
    //       carts: [...state.carts, temp],
    //     };
    //   }

    case "ADD_MORE":
      const IteamIndex2 = state.carts.findIndex(
        (iteam) => iteam.id === action.payload.id
      );

      if (IteamIndex2 >= 0) {
        state.carts[IteamIndex2].qnty += 1;
        localStorage.setItem("carts", JSON.stringify(state.carts));
        return {
          ...state,
          carts: [...state.carts],
        };
      } else {
        const temp2 = { ...action.payload, qnty: 1 };
        localStorage.setItem("carts", JSON.stringify(state.carts));
        return {
          ...state,
          carts: [...state.carts, temp2],
        };
      }

    case "RMV_CART":
      const data = state.carts.filter((el) => el.id !== action.payload);
      // console.log(data);
      localStorage.setItem("carts", JSON.stringify(state.carts));

      return {
        ...state,
        carts: data,
      };

    case "RMV_ONE":
      const IteamIndex_dec = state.carts.findIndex(
        (iteam) => iteam.id === action.payload.id
      );

      if (state.carts[IteamIndex_dec].qnty >= 1) {
        const dltiteams = (state.carts[IteamIndex_dec].qnty -= 1);
        // console.log([...state.carts, dltiteams]);
        localStorage.setItem("carts", JSON.stringify(state.carts));

        return {
          ...state,
          carts: [...state.carts],
        };
      } else if (state.carts[IteamIndex_dec].qnty === 1) {
        const data = state.carts.filter((el) => el.id !== action.payload);
        localStorage.setItem("carts", JSON.stringify(state.carts));
        return {
          ...state,
          carts: data,
        };
      }

    case "RESET_CART":
      // Reset the cart to its initial state (empty)
      localStorage.removeItem("carts"); // Remove cart data from local storage
      return INIT_STATE;

    default:
      return state;
  }
};
