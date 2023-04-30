const { FETCH_USERS, ADD_USER, UPDATE_USER, DELETE_USER } = require("../types")

const initialState ={
    data:[],
}
const usersReducer = (state = initialState, action) =>{
    switch(action.type){
        case FETCH_USERS:
            return{
                ...state,
                data: action.payload,
            };
        case ADD_USER:
            return {
                ...state,
                data: [...state.data, action.payload],
            };
        case UPDATE_USER:
            const updateIndex = state.data.findIndex(item => item.id === action.payload.id);
            const updateData = [...state.data];
            updateData[updateIndex] = {...updateData[updateIndex], ...action.payload.newData};
            return {
                ...state,
                data: updateData,
            };
        case DELETE_USER:
            const newData = state.data.filter(item => item.id !== action.payload);
            return {
                ...state,
                data: newData,
            }
        default:
            return state;
    }
}
export default usersReducer;