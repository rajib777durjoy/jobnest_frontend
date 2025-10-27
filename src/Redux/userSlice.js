import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData:"hello world",
}

export const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        setUserData:(state,action)=>{
         state.userData = action.payload
        }
    }
})
export const {setUserData}= userSlice.actions;
export default userSlice.reducer;