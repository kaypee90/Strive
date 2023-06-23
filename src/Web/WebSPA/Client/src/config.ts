import { UserManagerSettings } from 'oidc-client';

export type AppGitInfo = {
   commit: string;
   ref: string;
   timestamp: string;
};

export type AppSettings = {
   identityUrl: string;
   conferenceUrl: string;
   signalrHubUrl: string;
   equipmentSignalrHubUrl: string;
   frontendUrl: string;

   gitInfo: AppGitInfo;
};

// injected by ASP.Net Core, normalize urls. All urls don't have a trailing slash
const appSettings: AppSettings = {

} as AppSettings

appSettings.identityUrl = "https://identity.localhost";
appSettings.conferenceUrl = "https://api.localhost";
appSettings.frontendUrl = "https://localhost";
appSettings.signalrHubUrl = "https://api.localhost/signalr";
appSettings.equipmentSignalrHubUrl = "https://api.localhost/equipment-signalr";

export default appSettings;

export const ocidConfig: UserManagerSettings = {
   client_id: 'spa',
   redirect_uri: `${appSettings.frontendUrl}/authentication/callback`,
   response_type: 'code',
   post_logout_redirect_uri: `${appSettings.frontendUrl}/`,
   scope: 'openid profile user.info',
   authority: appSettings.identityUrl,
   silent_redirect_uri: `${appSettings.frontendUrl}/authentication/silent_callback`,
   automaticSilentRenew: true,
   loadUserInfo: true,
};
