import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import summaryApi from "../Common/index.js";

const initialState = {
  status: "idle",
  userDetails: "",
  BooksData: "",
  auth:false

};
///////////////////////////////////////////

export const fetchUserDetails = createAsyncThunk(
  "user/userDetails",
  async () => {
    const response = await fetch(summaryApi.userDetails.url, {
      method: summaryApi.userDetails.method,
      credentials: "include",
    });

    const data = await response.json();

    return data.data;
  }
);
//////////////////////////////////////////////

/////////////////////////////////////////////////

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    //demo reducer
     increment:(state,action)=>{
      state+=1
     },
     reset:(state,action)=>{
      state.userDetails=''
     }
    
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
      });
  },
});

export const { increment,reset} = userDetailsSlice.actions;

export const selectUserDetails = (state) => state.user.userDetails;
 


export default userDetailsSlice.reducer;
