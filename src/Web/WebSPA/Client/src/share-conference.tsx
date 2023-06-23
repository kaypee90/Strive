import React, { useState, useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import { TextField, Button, Dialog, DialogContent, DialogTitle, DialogActions, Fab } from '@material-ui/core';
import { closeConferenceSharingDialog, openConferenceSharingDialog, sendInviteEmailAsync } from './reducer';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
 },
  btnSubmit: {
    marginTop: theme.spacing(1)
  }
}));



export default function Tags() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.general.conferenceSharingDialogOpen);
  const handleCloseDialog = () => dispatch(closeConferenceSharingDialog());
  const handleOpenDialog = () => {
        dispatch(openConferenceSharingDialog());
        setSelectedValues([]);
  }

  const [selectedValues, setSelectedValues] = useState([]);

    const handleAutocompleteChange = (_ :any, values :any) => {
       setSelectedValues(values);
    };

    const validateEmail = (email: string) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email)
    };

    const validateEmails = () => {
        const results = selectedValues.map((email) => {
          return validateEmail(email);
        });

        return !results.includes(false);
    };

    const payload = {"emails": selectedValues};
    const sendEmails = () =>  dispatch(sendInviteEmailAsync(payload));


    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Access the selected value from the Autocomplete component

        if (selectedValues.length < 1) {
            alert("Please enter atleast one email address!");
            return;
        }

        if (!validateEmails()) {
            alert("Please make sure all inputs are valid emails!");
            return;
        }
        
        sendEmails()
        alert("Email invite sent out!");
        handleCloseDialog();
      };

  return (
    <div className={classes.root}>
        <Fab aria-label="invite participants" className={classes.fab} color="primary" onClick={handleOpenDialog}>
            <AddIcon />
        </Fab>

        <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="md">
         <DialogTitle>Share conference</DialogTitle>
         <DialogContent>

             <form onSubmit={handleSubmit}>
                <Autocomplete
                    multiple
                    id="tags-filled"
                    onChange={handleAutocompleteChange}
                    options={emailsToShare.map((option) => option.title)}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip variant="outlined" key={index} label={option} {...getTagProps({ index })} />
                    ))
                    }
                    renderInput={(params) => (
                    <TextField {...params} variant="filled" label="Email addresses" placeholder="Share conference" />
                    )}
                />

            
            
         <DialogActions>
          <Button className={classes.btnSubmit} variant="contained" type="submit" color="primary">Share Conference</Button>
          <Button className={classes.btnSubmit} onClick={handleCloseDialog} color="primary">Cancel</Button>
        </DialogActions>
         </form>

         </DialogContent>
      </Dialog>
    </div>

       
  );
}

const emailsToShare = [
  { title: '', value: 0 }
];
