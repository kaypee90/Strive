import { User, Profile} from 'oidc-client';


export type CustomProfile = Profile & {
    userId: string,
    userDisplayName: string,
    userFirstname: string,
    userLastName: string,
    UserEmail: string
}

export type CustomUser = User & {
    customProfile: CustomProfile
}

export const mapCustomUser = (oidcUser: User | null): CustomUser | null  =>  {
    if (oidcUser && oidcUser.profile.name) {
        const customData = JSON.parse(oidcUser.profile.name)
        const customProfile = { ...oidcUser.profile, ...customData} as CustomProfile
        const customUser = { ...oidcUser, customProfile} as CustomUser
        return customUser;
    }

    return null;
}
