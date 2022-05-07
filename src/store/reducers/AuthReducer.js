import { createSlice } from '@reduxjs/toolkit'
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
      loggedIn: false,
      user: {}
    },
    reducers: {
        setUser: (state, action) => {
            console.log(state);
            console.log("action", action)
            state.loggedIn = true;
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.loggedIn = false;
            state.user = null;
        },
    },
});
  
// Action creators are generated for each case reducer function
export const { setUser, clearUser } = authSlice.actions
  
export default authSlice.reducer