import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as coreHub from 'src/core-hub';

type Props = {
    callUrl: string;
 };

const RedirectToCall = ( { callUrl }: Props) => {
   const dispatch = useDispatch();
   const handleOpenConference = () => dispatch(coreHub.openConference());

   const history = useHistory();

   const redirectUrl = callUrl;

   useEffect(() => {
      if (callUrl) {
         if (history.location.pathname !== callUrl) {
            history.replace(callUrl);
         }
      }

      handleOpenConference();
   }, [redirectUrl]);

   return null;
}

export default RedirectToCall;