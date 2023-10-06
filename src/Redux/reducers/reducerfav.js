
const INIT_STATE1 = {
    fav: []
};



export const favreducer = (state = INIT_STATE1, action) => {
    
  
    switch (action.type) {
        case "ADD_FAV":
            const IteamIndex = state.Fav.findIndex((iteam)=> iteam.id === action.payload.id);

            if(IteamIndex >= 0){
                state.Fav[IteamIndex].qnty +=1
                return {
                    ...state,
                    Fav:[...state.Fav]
                }
            }else{
                const temp = {...action.payload,qnty:1}
                 return {
                    ...state,
                    Fav: [...state.Fav, temp]
                }
            }

        case "RMV_FAV":
            const data = state.Fav.filter((el)=>el.id !== action.payload); 
            // console.log(data);

            return {
                ...state,
                Fav:data
            }

            default:
            return state;
    }
}