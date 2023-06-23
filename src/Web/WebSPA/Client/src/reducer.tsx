import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { serializeRequestError } from 'src/utils/error-result';
import * as emailServices from 'src/services/api/email';

export type GeneralState = {
    conferenceSharingDialogOpen: boolean,
    inviteEmailsMessage: {message: string} | null
};


const initialState: GeneralState = {
    conferenceSharingDialogOpen: false,
    inviteEmailsMessage: null,
};

export const sendInviteEmailAsync = createAsyncThunk(
    'inviteemails/send',
    async (dto: { emails: string[]}) => {
       return await emailServices.create(dto);
    },
    {
       serializeError: serializeRequestError,
    },
 );

const generalSlice = createSlice({
   name: 'general',
   initialState,
   reducers: {
    closeConferenceSharingDialog(state) {
        state.conferenceSharingDialogOpen = false;
     },
    openConferenceSharingDialog(state) {
        state.conferenceSharingDialogOpen = true;
     },
   },
   extraReducers: {
    [sendInviteEmailAsync.fulfilled.type]: (state, action: PayloadAction<{message: string}>) => {
        state.inviteEmailsMessage = action.payload;
     },
   },
});

export const {
    closeConferenceSharingDialog,
    openConferenceSharingDialog
} = generalSlice.actions;

export default generalSlice.reducer;
