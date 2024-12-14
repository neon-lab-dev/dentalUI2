import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id:string
  email: string;
  first_name: string;
  phoneNo:number
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id:"",
  email: "",
  first_name: "",
  phoneNo:0,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.first_name = action.payload.first_name;
      state.isLoggedIn = true;
      console.log(state.first_name)
    },
    clearUser: (state) => {
      state.email = "";
      state.first_name = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
