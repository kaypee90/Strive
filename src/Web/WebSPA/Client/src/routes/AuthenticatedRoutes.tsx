import { useReactOidc } from '@axa-fr/react-oidc-context';
import Axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { setParticipantId } from 'src/features/auth/reducer';
import ConferenceRoute from './ConferenceRoute';
import MainRoute from './MainRoute';
import {useCustomOidc} from 'src/custom-oidc'

export default function AuthenticatedRoutes() {
    // const { oidcUser } = useReactOidc();
   const { custUser } = useCustomOidc()
   const dispatch = useDispatch();

   useEffect(() => {
      console.log(JSON.stringify(custUser))
      alert(JSON.stringify(custUser));
      if (custUser) {
         dispatch(setParticipantId(custUser.profile.sub));
         Axios.defaults.headers.common = {
            Authorization: `Bearer ${custUser.access_token}`,
         };
      }
   }, [custUser]);

   return (
      <Switch>
         <Route exact path="/" component={MainRoute} />
         <Route path="/c/:id" component={ConferenceRoute} />
      </Switch>
   );
}
