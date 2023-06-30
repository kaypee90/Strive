import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfileDetails } from './reducer';
import { RootState } from 'src/store';
import { Button, TextField, Grid } from '@material-ui/core';
import { useReactOidc } from '@axa-fr/react-oidc-context';


export default function UserProfileForm() {
    const dispatch = useDispatch();
    const [profileFormData, setProfileFormData] = useState({
        firstName: '',
        lastName: '',
        displayName: '',
        emailAddress: ''
    });
   
    const { oidcUser } = useReactOidc();
    let userName = "Demo" // FetchUserNAME  
    try {
        alert(oidcUser.profile);
        // userName = oidcUser.profile.name //
    }
    catch {
        console.log("Couldn't retrieve profile")
    }

    useEffect(() => {
            dispatch(fetchUserProfile(userName));
        }, [dispatch]);
    
    const userProfile = useSelector((state: RootState) => state.general.userProfile);
    useEffect(() => {
        setProfileFormData({
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            displayName: userProfile.displayName,
            emailAddress: userProfile.emailAddress
          });
    }, [userProfile])

    const handleProfileFormChange = (event: any) => {
        setProfileFormData((prevFormData) => ({
          ...prevFormData,
          [event.target.name]: event.target.value
        }));
      };
    

    const generateRandomId = () => {
        const timestamp = Date.now().toString(36); // Convert current timestamp to base36 string
        const random = Math.random().toString(36).substr(2, 5); // Generate a random string
        
        return timestamp + random; // Combine timestamp and random string
    };
    const handleUserProfileSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const randomId = generateRandomId();
        const payload = { ...profileFormData, idempotencyKey: randomId };
        dispatch(updateUserProfileDetails({payload, userName}))
        alert("Profle information has been submitted!")
    }

    const {idempotencyKey, updateUserMessage} = useSelector((state: RootState) => state.general);
    useEffect(() => {
        if (idempotencyKey && updateUserMessage)
        {
            alert(updateUserMessage)
        }
    }, [idempotencyKey]);

    return (
        <form id="profileForm" onSubmit={handleUserProfileSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="Firstname"
                    value={profileFormData.firstName}
                    onChange={handleProfileFormChange}
                    fullWidth
                    autoFocus/>
                </Grid>
                <Grid item xs={12} md={12}>
                <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Lastname"
                    value={profileFormData.lastName}
                    onChange={handleProfileFormChange}
                    fullWidth
                />
                </Grid>
                <Grid item xs={12} md={12}>
                <TextField
                    required 
                    id="displayName"
                    name="displayName"
                    label="Display Name" 
                    value={profileFormData.displayName}
                    onChange={handleProfileFormChange}
                    fullWidth
                    helperText="The name to display when you join a call."/>
                </Grid>
                <Grid item xs={12} md={12}>
                <TextField
                    required
                    id="emailAddress"
                    name="emailAddress"
                    label="Email Address"
                    value={profileFormData.emailAddress}
                    onChange={handleProfileFormChange}
                    fullWidth
                    type='email'
                />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Button type='submit' color='secondary' variant='contained'>Submit</Button>
                </Grid>
                
            </Grid>
        </form>
    )
}