import {createSlice} from '@reduxjs/toolkit'

const INITIAL_STATE = {
    preBookingInvoiceAdmin: '',

}

const adminSlice = createSlice({
    name: 'admin',
    initialState : INITIAL_STATE,
    reducers: {
        getPreBookingInvoiceAdmin:(state, action)=>{
            const preBookingInvoiceAdmin = action.payload;
            return {...state,preBookingInvoiceAdmin}
        }
    }
})

export const {
    getPreBookingInvoiceAdmin
} = adminSlice.actions

export default adminSlice.reducer;