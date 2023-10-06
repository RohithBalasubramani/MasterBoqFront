const INIT_STATE_2 = {
    fav: []
};


export const favreducer2 = (state = INIT_STATE_2, action) => {
    switch (action.type) {
        case "CHANGE_FAV":

        const IteamIndex2 = state.fav.findIndex((iteam2)=> iteam2.id === action.payload.id);
        const datafav = state.fav.filter((el)=>el.id !== action.payload);


        if(IteamIndex2 >= 0){
            state.fav[IteamIndex2].qnty +=1
            return {
                ...state,
                fav:datafav
            }
        }else{
            const temp = {...action.payload,qnty:1}
             return {
                ...state,
                fav: [...state.fav, temp]
            }
        }

           


        default:
            return state
    }
}