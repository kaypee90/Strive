import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';


import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createConferenceAsync, openDialogToCreateAsync } from 'src/features/create-conference/reducer';
import { RootState } from 'src/store';
import RedirectToCall from "src/RedirectToCall";

import { activateRenderRedirectToCall, deactivateRenderRedirectToCall } from './reducer';



const useStyles = makeStyles((theme) => ({
    root: {
      width: 500,
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
    },
  }));
  

export default function Expriement() {
    const classes = useStyles();


 const dispatch = useDispatch();
   const { t } = useTranslation();
   
   const [activateRedirect, setActivateRedirect] = useState(false);

//    const handleCreateConference = () => dispatch(openDialogToCreateAsync());
//    // Load default values
//     // dispatch(openDialogToCreateAsync());

  

// //    alert(conferenceData);

// //    // Get default values and create conference
// //    dispatch(createConferenceAsync(conferenceData!));

// //    const { createdConferenceId } = useSelector(
// //       (state: RootState) => state.createConference,
// //    );

    const handleSubmit = () => {
        setActivateRedirect(true);
    }


    return (

        <div>
            {activateRedirect === true ? (
           <RedirectToCall callUrl="c/1" />
         ) : (
            <div className={classes.root}>
                <Button onClick={handleSubmit} variant='contained'>TESTING</Button>
            </div>
         )
        
        }
        </div>

       
    )
}