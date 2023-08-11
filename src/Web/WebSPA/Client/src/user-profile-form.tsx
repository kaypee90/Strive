import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfileDetails } from './reducer';
import { RootState } from 'src/store';
import { TextField, Grid } from '@material-ui/core';
import { useReactOidc } from '@axa-fr/react-oidc-context';
import CustomDialog from './custom-dialog';
import ProgressButton from './progress-button';


export default function UserProfileForm() {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (dialogMessage: string) => {
        setMessage(dialogMessage)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    const [profileFormData, setProfileFormData] = useState({
        firstName: "",
        lastName:  "",
        displayName: "",
        emailAddress: "",
    });

    const [formErrorStatus, setFormErrorStatus] = useState({
        firstNameError: "",
        lastNameError: "",
        displayNameError: "",
        emailAddressError: ""
    });
   
    let userName = "Demo"; // FetchUserNAME  
    try {
        const { oidcUser } = useReactOidc();
        alert(oidcUser.profile);
        userName = oidcUser.profile.name!;
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

    const validateForm = (payload: any) => {
        let firstNameError = "";
        let lastNameError = "";
        let displayNameError = "";
        let emailAddressError = "";

        if (!payload.firstName) {
            firstNameError = "Firstname is required!"
        }

        if (!payload.lastName) {
            lastNameError = "Lastname is required!"
        }

        if (!payload.displayName) {
            displayNameError = "Display name is required!"
        }

        if (!payload.emailAddress) {
            emailAddressError = "Email name is required!"
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(payload.emailAddress)) {
            emailAddressError = "Invalid email address"
        }

        setFormErrorStatus({
            firstNameError,
            lastNameError,
            displayNameError,
            emailAddressError
        })


        if(!firstNameError
            && !lastNameError
            && !displayNameError
            && !emailAddressError) {
            dispatch(updateUserProfileDetails({payload, userName}))
        
            if (!loading) {
                setSuccess(false);
                setLoading(true);
            }

            handleClickOpen("Submitting your profile information");
        }
    }

    const handleUserProfileSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        const randomId = generateRandomId();
        const payload = { ...profileFormData, idempotencyKey: randomId };
        validateForm(payload);
    }

    const {idempotencyKey, updateUserMessage} = useSelector((state: RootState) => state.general);
    useEffect(() => {
        if (idempotencyKey && updateUserMessage)
        {
            if (loading) {
                setSuccess(true);
                setLoading(false);
            }
            handleClickOpen(updateUserMessage);
        }
    }, [idempotencyKey]);

    return (
        <form id="profileForm" onSubmit={handleUserProfileSubmit}>
            
            <CustomDialog 
                title="Profile information update."
                message={message}
                opened={open}
                onClose={handleClose}
            />

            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                <TextField
                    error={formErrorStatus.firstNameError != ""}
                    required
                    id="firstName"
                    name="firstName"
                    label="Firstname"
                    value={profileFormData.firstName}
                    onChange={handleProfileFormChange}
                    fullWidth
                    helperText={formErrorStatus.firstNameError}
                    autoFocus/>
                </Grid>
                <Grid item xs={12} md={12}>
                <TextField
                    error={formErrorStatus.lastNameError != ""}
                    required
                    id="lastName"
                    name="lastName"
                    label="Lastname"
                    value={profileFormData.lastName}
                    onChange={handleProfileFormChange}
                    fullWidth
                    helperText={formErrorStatus.lastNameError}
                />
                </Grid>
                <Grid item xs={12} md={12}>
                <TextField
                    error={formErrorStatus.displayNameError != ""}
                    required 
                    id="displayName"
                    name="displayName"
                    label="Display Name" 
                    value={profileFormData.displayName}
                    onChange={handleProfileFormChange}
                    fullWidth
                    helperText={formErrorStatus.displayNameError}/>
                </Grid>
                <Grid item xs={12} md={12}>
                <TextField
                    error={formErrorStatus.emailAddressError != ""}
                    required
                    id="emailAddress"
                    name="emailAddress"
                    label="Email Address"
                    value={profileFormData.emailAddress}
                    onChange={handleProfileFormChange}
                    fullWidth
                    type='email'
                    helperText={formErrorStatus.emailAddressError}
                />
                </Grid>

                <Grid item xs={12} md={6}>
                    <ProgressButton
                        loading={loading}
                        success={success}
                        onClick={handleUserProfileSubmit}
                    />
                </Grid>
                
            </Grid>
            
        </form>
    )
}