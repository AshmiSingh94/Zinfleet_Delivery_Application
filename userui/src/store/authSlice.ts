import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getUser=()=>{
  const user=localStorage.getItem('user')
  if(user){
    return  JSON.parse(user) as User
  } 
  return null
}
interface User {
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}


const initialState: AuthState = {
  isAuthenticated: !!getUser(),
  user: getUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      localStorage.setItem('user', JSON.stringify(action.payload))
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// Export the actions
export const { login, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
