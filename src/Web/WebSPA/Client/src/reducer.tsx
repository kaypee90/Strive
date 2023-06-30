import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { serializeRequestError } from 'src/utils/error-result';
import { UserProfile, UpdateUserProfileRequest, UpdateUserProfileResponse, UserPasswordChange, GenericResponse } from 'src/features/user-management/types';
import * as emailServices from 'src/services/api/email';
import { getUserProfileDetails, updateUserProfile, updatePassword } from 'src/services/api/user';

export type GeneralState = {
    renderRedirectToCall: boolean,
    conferenceSharingDialogOpen: boolean,
    inviteEmailsMessage: {message: string} | null
    userProfile: UserProfile,
    idempotencyKey: string | null,
    updateUserMessage: string | null,
    changePasswordMessage: string | null,
};


const initialState: GeneralState = {
    renderRedirectToCall: false,
    conferenceSharingDialogOpen: false,
    inviteEmailsMessage: null,
    userProfile: {
        emailAddress: "",
        firstName: "",
        lastName: "",
        displayName: ""
    },
    idempotencyKey: null,
    updateUserMessage: null,
    changePasswordMessage: null,
};

export const updateUserPasswordDetails = createAsyncThunk(
    'user/updateUserPassword',
    async (request: {payload: UserPasswordChange, userName: string}) =>  {
        return await updatePassword(request.userName, request.payload);
    },
    {
       serializeError: serializeRequestError,
    },
 );

export const updateUserProfileDetails = createAsyncThunk(
    'user/updateUserProfile',
    async (request: {payload: UpdateUserProfileRequest, userName: string}) =>  {
        return await updateUserProfile(request.userName, request.payload);
    },
    {
       serializeError: serializeRequestError,
    },
 );

export const fetchUserProfile = createAsyncThunk(
    'user/fetchProfile',
    async (userName: string) => {
       return await getUserProfileDetails(userName);
    },
    {
       serializeError: serializeRequestError,
    },
 );

export const sendInviteEmailAsync = createAsyncThunk(
    'inviteemails/send',
    async (dto: { emails: string[], conferenceLink: string}) => {
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
    activateRenderRedirectToCall(state) {
        state.conferenceSharingDialogOpen = true;
     },
    deactivateRenderRedirectToCall(state) {
        state.conferenceSharingDialogOpen = true;
     },
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
    [fetchUserProfile.fulfilled.type]: (state, { payload }: PayloadAction<UserProfile>) => {
        state.userProfile = payload;
     },
    [updateUserProfileDetails.fulfilled.type]: (state, { payload }: PayloadAction<UpdateUserProfileResponse>) => {
         state.idempotencyKey = payload.idempotencyKey;
         state.updateUserMessage = payload.message;
     },
    [updateUserProfileDetails.fulfilled.type]: (state, { payload }: PayloadAction<GenericResponse>) => {
         state.changePasswordMessage = payload.message;
     },
   },
});

export const {
    closeConferenceSharingDialog,
    openConferenceSharingDialog,
    activateRenderRedirectToCall,
    deactivateRenderRedirectToCall
} = generalSlice.actions;

export default generalSlice.reducer;
