import Axios from 'axios';
import appSettings from 'src/config';
import { UserInfo } from 'src/features/create-conference/types';
import { UserProfile, UpdateUserProfileRequest, UpdateUserProfileResponse, UserPasswordChange, GenericResponse } from 'src/features/user-management/types';

export async function getUserInfo(ids: string[]): Promise<UserInfo[]> {
   const response = await Axios.post<UserInfo[]>(`${appSettings.identityUrl}/api/v1/user/list`, ids);
   return response.data;
}

export async function getUserProfileDetails(userName: string): Promise<UserProfile> {
   const response = await Axios.get<UserProfile>(`${appSettings.identityUrl}/api/v1/user/${userName}`);
   return response.data;
}

export async function updateUserProfile(userName: string, payload: UpdateUserProfileRequest): Promise<UpdateUserProfileResponse> {
   const response = await Axios.put<UpdateUserProfileResponse>(`${appSettings.identityUrl}/api/v1/user/${userName}`, payload);
   return response.data;
}

export async function updatePassword(userName: string, payload: UserPasswordChange): Promise<GenericResponse> {
   const response = await Axios.put<GenericResponse>(`${appSettings.identityUrl}/api/v1/user/${userName}/password`, payload);
   return response.data;
}
