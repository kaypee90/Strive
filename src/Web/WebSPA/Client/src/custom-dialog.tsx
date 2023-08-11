import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';


type Props = {title: string, message: string, opened: boolean, onClose: any};

export default function CustomDialog({title, message, opened, onClose}: Props) {

    return (
        <Dialog
                open={opened}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={onClose} color="primary" autoFocus>
                    OK
                </Button>
                </DialogActions>
            </Dialog>
    )
}