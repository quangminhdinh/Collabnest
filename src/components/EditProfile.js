import React, {Component} from 'react';
import { compose } from 'recompose';
import {withFirebase} from './Firebase';
// import { withRouter } from 'react-router-dom';

import { withStyles, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@material-ui/core';

const styles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        minWidth: 275,
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

const INITIAL_STATE = {
    company: '',
    position: '',
    phone: '',
    address: '',
    bio: '',
    skills: [],
    website: '',
    usernameError: null,
    open: false,
    dialogContent: '',
    dialogStatus: ''
};

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, INITIAL_STATE, this.props.authUser);
    }

    onChange = event => {
        this.setState({
            usernameError: null,
            [event.target.name]: event.target.value
        });
    }

    onKeyDown = event => {
        if (event.key === 'Enter') {
            this.onSubmit();
        }
    }

    onSubmit = () => {
        const { uid, username, company, position, phone, address, bio, skills, website } = this.state;

        if (username.trim().length < 3 || username.trim().length > 20) {
            this.setState({ usernameError: 'Username must be from 3 to 20 characters'});
            return false;
        } 

        this.props.firebase.user(uid).set(
        {
            username,
            company,
            position,
            phone,
            address,
            bio,
            website
        },
        { merge: true },
        )
        .then(() => {
            this.setState({
                dialogStatus: 'Success',
                dialogContent: 'Your profile has been updated',
                open: true
            })

        })
        .catch(error => {
            this.setState({
                dialogStatus: 'Error',
                dialogContent: error,
                open: true
            })
        });

    }

    handleClose = () => {
        this.setState({ open: false})
        if (this.state.dialogStatus === 'Success') {
            window.location.reload();
        }
    }

    render() {
        const { classes } = this.props;
        const { username, company, position, phone, address, bio, skills, website, usernameError, open, dialogContent, dialogStatus } = this.state;

        const isInvalid = username.trim() === '';

        return (
            <>
                <Box>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField error={!!usernameError} 
                                    helperText={usernameError} 
                                    onChange={this.onChange} 
                                    fullWidth 
                                    className="tf-clgn1" 
                                    type="text" 
                                    name="username" 
                                    value={username} 
                                    label="Username"
                                    onKeyDown={isInvalid ? null : this.onKeyDown} />
                        <TextField onChange={this.onChange} 
                                    fullWidth 
                                    className="tf-clgn1" 
                                    type="text" 
                                    name="company" 
                                    value={company} 
                                    label="Company"
                                    onKeyDown={isInvalid ? null : this.onKeyDown} />
                        <TextField onChange={this.onChange} 
                                    fullWidth 
                                    className="tf-clgn1" 
                                    type="text" 
                                    name="position" 
                                    value={position} 
                                    label="Position"
                                    onKeyDown={isInvalid ? null : this.onKeyDown} />
                        <TextField onChange={this.onChange} 
                                    fullWidth 
                                    className="tf-clgn1" 
                                    type="text" 
                                    name="phone" 
                                    value={phone} 
                                    label="Phone"
                                    onKeyDown={isInvalid ? null : this.onKeyDown} />
                        <TextField onChange={this.onChange} 
                                    fullWidth 
                                    className="tf-clgn1" 
                                    type="text" 
                                    name="address" 
                                    value={address} 
                                    label="Address"
                                    onKeyDown={isInvalid ? null : this.onKeyDown} />
                        <TextField onChange={this.onChange} 
                                    fullWidth 
                                    className="tf-clgn1" 
                                    type="url" 
                                    name="website" 
                                    value={website} 
                                    label="Website"
                                    onKeyDown={isInvalid ? null : this.onKeyDown} />
                        <TextField onChange={this.onChange} 
                                    fullWidth 
                                    className="tf-clgn1" 
                                    type="text" 
                                    name="bio" 
                                    value={bio} 
                                    multiline
                                    rows="6"
                                    label="About me"
                                    onKeyDown={isInvalid ? null : this.onKeyDown} />
                    </form>
                    <Box mt={2} className="d-flex justify-content-center">
                        <Button disabled={isInvalid} color="primary" size="large" onClick={this.onSubmit} variant="contained">Update profile</Button>
                    </Box>
                </Box>
                <Dialog open={open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{dialogStatus}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogContent}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        OK
                    </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default compose(
    // withRouter,
    withStyles(styles),
    withFirebase
)(EditProfile);