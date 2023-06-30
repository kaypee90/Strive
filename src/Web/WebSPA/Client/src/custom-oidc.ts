import React, { ComponentType } from 'react';
import { User, Profile, UserManagerEvents, UserManager } from 'oidc-client';

import {AuthenticationContext} from '@axa-fr/react-oidc-context/src/oidcContext/AuthenticationContext'

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

export type oidcContext = {
  oidcUser: User | null;
  isEnabled: boolean;
  login: Function;
  logout: Function;
  events: UserManagerEvents;
  authenticating: ComponentType;
  isLoading: boolean;
  isLoggingOut: boolean;
  userManager: UserManager;
  error: string;
};

const mapCustomUser = (oidcUser: User | null): CustomUser | null  =>  {
    if (oidcUser && oidcUser.profile.name) {
        const customData = JSON.parse(oidcUser.profile.name)
        const customProfile = { ...oidcUser.profile, ...customData} as CustomProfile
        const customUser = { ...oidcUser, customProfile} as CustomUser
        return customUser;
    }

    return null;
}


export const useCustomOidc = () => {
  const { isEnabled, login, logout, oidcUser, events } = React.useContext(AuthenticationContext);
  const custUser = mapCustomUser(oidcUser)
  console.log(JSON.stringify(custUser))
  alert(JSON.stringify(custUser));
  return { isEnabled, login, logout, custUser, events };
};
