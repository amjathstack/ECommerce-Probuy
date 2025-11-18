import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginCardStatus: false,
    signUpCardStatus:false,
    profileMenuStatus:false,
}

const componentsSlice = createSlice({
    name: 'components',
    initialState,
    reducers: {
        openLoginCard: (state) => {
            state.signUpCardStatus = false
            state.loginCardStatus = true
        },
        closeLoginCard: (state) => {
            state.loginCardStatus = false
        },

        openProfileMenu: (state) => {
            state.profileMenuStatus = true
        },
        closeProfileMenu: (state) => {
            state.profileMenuStatus = false
            console.log('Done')
        },

        openSignUpCard: (state) => {
            state.loginCardStatus = false
            state.signUpCardStatus = true
        },
        closeSignUpCard: (state) => {
            state.signUpCardStatus = false
        },


    }
});

export const { openLoginCard,
               closeLoginCard,
               openProfileMenu, 
               closeProfileMenu,
               openSignUpCard,
               closeSignUpCard,
              } = componentsSlice.actions;

export default componentsSlice.reducer;