import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginCardStatus: false,
    signUpCardStatus: false,
    profileMenuStatus: false,
    userProfileStatus: false,
    createStoreFormStatus: false
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
        },

        openSignUpCard: (state) => {
            state.loginCardStatus = false
            state.signUpCardStatus = true
        },
        closeSignUpCard: (state) => {
            state.signUpCardStatus = false
        },

        openUserProfile: (state) => {
            state.userProfileStatus = true
        },
        closeUserProfile: (state) => {
            state.userProfileStatus = false
        },

        openCreateStoreForm: (state) => {
            state.createStoreFormStatus = true
            state.signUpCardStatus = false
            state.loginCardStatus = false
        },
        closeCreateStoreForm: (state) => {
            state.createStoreFormStatus = false
        },


    }
});

export const { openLoginCard,
    closeLoginCard,
    openProfileMenu,
    closeProfileMenu,
    openSignUpCard,
    closeSignUpCard,
    openUserProfile,
    closeUserProfile,
    openCreateStoreForm,
    closeCreateStoreForm
} = componentsSlice.actions;

export default componentsSlice.reducer;