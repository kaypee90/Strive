import { useReactOidc } from '@axa-fr/react-oidc-context';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function RedirectToConference() {
   const history = useHistory();


   const redirectUrl = "/";

   useEffect(() => {
      history.replace(redirectUrl)
   }, [redirectUrl]);

   return null;
}
