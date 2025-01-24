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
  customerId?: number;
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
  customerId: undefined,
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
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      const newState = { ...state, ...action.payload };
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(newState));
      }
      return newState;
    },
    clearUser: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
      return {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        induranceStatus: "",
        phoneNo: 0,
        dob: "",
        isLoggedIn: false,
        customerId: undefined,
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
