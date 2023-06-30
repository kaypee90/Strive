import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPasswordDetails } from './reducer';
import { Button, TextField, Grid } from '@material-ui/core';
import { RootState } from 'src/store';


export default function ChangePasswordForm() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const userName = "Demo" // FetchUserNAME

    const handleFormChange = (event: any) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [event.target.name]: event.target.value
        }));
      };

    const handleOnSubmit = (event: React.FormEvent<unknown>) => {
        event.preventDefault()
        if (formData.newPassword === formData.confirmPassword) {
            updateUserPasswordDetails
            dispatch(updateUserPasswordDetails({payload: formData, userName}));
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            alert("Password change request submitted.")
        } else {
            alert("Ooops! New password in not same as confirmed password!!");
        }
    };

    const changePasswordMessage = useSelector((state: RootState) => state.general.changePasswordMessage);
    useEffect(() => {
        if (changePasswordMessage)
        {
            alert(changePasswordMessage)
        }
    }, [changePasswordMessage]);

    return (
        <form onSubmit={handleOnSubmit} id="changePasswordForm">
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                <TextField
                type='password'
                    required
                    id="currentPassword"
                    name="currentPassword"
                    label="Current Password"
                    value={formData.currentPassword}
                    onChange={handleFormChange}
                    fullWidth
                    autoFocus/>
                </Grid>
                <Grid item xs={12} md={12}>
                <TextField
                type='password'
                    required
                    id="newPassword"
                    name="newPassword"
                    label="New Password"
                    value={formData.newPassword}
                    onChange={handleFormChange}
                    fullWidth
                />
                </Grid>
                <Grid item xs={12} md={12}>
                <TextField
                type='password'
                    required 
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleFormChange}
                    fullWidth
                />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Button type='submit' color='secondary' variant='contained'>Submit</Button>
                </Grid>
                
            </Grid>
        </form>
    );
}