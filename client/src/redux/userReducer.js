import {createSlice} from '@reduxjs/toolkit'

const INITIAL_STATE = {
    loginUserDetails: '',
    availabeDate: '',
    bookingID: '',
    preBookingInvoice: '',

}

const userSlice = createSlice({
    name: 'user',
    initialState : INITIAL_STATE,
    reducers: {
        getUserLoginDetails:(state, action)=>{
            const loginUserDetails = action.payload;
            return {...state,loginUserDetails}
        },
        getAvailableDate:(state, action)=>{
            const availabeDate = action.payload;
            return {...state,availabeDate}
        },
        getBookingID:(state, action)=>{
            const bookingID = action.payload;
            return {...state,bookingID}
        },
        getPreBookingInvoice:(state, action)=>{
            const preBookingInvoice = action.payload;
            return {...state,preBookingInvoice}
        },
    }
})

export const {
    getUserLoginDetails,
    getAvailableDate,
    getBookingID,
    getPreBookingInvoice,
} = userSlice.actions

export default userSlice.reducer;