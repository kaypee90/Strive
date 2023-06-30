
export type UserProfile = {
    firstName: string;
    lastName: string;
    displayName: string;
    emailAddress: string;
 };

 export type GenericResponse = {
    message: string
 }

 export type UpdateUserProfileResponse = GenericResponse & {
    idempotencyKey: string;
 };

 export type UpdateUserProfileRequest = UserProfile & {
    idempotencyKey: string;
 }

 export type UserPasswordChange = {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
 }
 