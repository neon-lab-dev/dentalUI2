import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  induranceStatus: string;
  phoneNo: number;
  dob: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  induranceStatus: "",
  phoneNo: 0,
  dob: "",
  isLoggedIn: false,
};

// Rehydrate state from localStorage if it exists
if (typeof window !== "undefined") {
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  if (savedUser?.isLoggedIn) {
    initialState.id = savedUser.id;
    initialState.first_name = savedUser.first_name;
    initialState.last_name = savedUser.last_name;
    initialState.email = savedUser.email;
    initialState.induranceStatus = savedUser.induranceStatus;
    initialState.phoneNo = savedUser.phoneNo;
    initialState.dob = savedUser.dob;
    initialState.isLoggedIn = true;
  }
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const { id, first_name, last_name, email, induranceStatus, phoneNo, dob } = action.payload;
      state.id = id;
      state.first_name = first_name;
      state.last_name = last_name;
      state.email = email;
      state.induranceStatus = induranceStatus;
      state.phoneNo = phoneNo;
      state.dob = dob;
      state.isLoggedIn = true;

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(state));
    },
    clearUser: (state) => {
      state.id = "";
      state.first_name = "";
      state.last_name = "";
      state.email = "";
      state.induranceStatus = "";
      state.phoneNo = 0;
      state.dob = "";
      state.isLoggedIn = false;

      // Clear user data from localStorage
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
