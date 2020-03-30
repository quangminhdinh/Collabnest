import React, {Component} from 'react';
import { compose } from 'recompose';
import {withFirebase} from './Firebase';
// import { withRouter } from 'react-router-dom';

import { withStyles, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Chip, Slider } from '@material-ui/core';

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
    skills: {
        margin: theme.spacing(0.5),
    }
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
    dialogStatus: '',
    dialogForm: false,
    tempSkillName: '',
    tempSkillValue: 0
};

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, INITIAL_STATE, this.props.authUser);
    }

    handleSkillDelete = (skillToDelete) => () => {
        this.setState((state) => ({
            skills: state.skills.filter(skill => skill.key !== skillToDelete.key)
        }));
    };

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
            website,
            skills
        },
        { merge: true },
        )
        .then(() => {
            this.setState({
                dialogStatus: 'Success',
                dialogContent: 'Your profile has been updated',
                dialogForm: false,
                open: true
            })

        })
        .catch(error => {
            this.setState({
                dialogStatus: 'Error',
                dialogContent: error,
                dialogForm: false,
                open: true
            })
        });

    }

    handleClose = () => {
        this.setState({
            tempSkillName: '',
            tempSkillValue: 0
        });
        this.setState({ open: false});
    }

    handleOK = () => {
        switch(this.state.dialogStatus) {
            case 'Success':
                window.location.reload();
                break;
            case 'Add new skill':
                const {skills, tempSkillName, tempSkillValue} = this.state;
                if (tempSkillName.trim() === '') {
                    return ;
                }
                const newSkill = {
                    key: skills.length > 0 ? skills[skills.length - 1].key + 1 : 0,
                    name: tempSkillName,
                    value: tempSkillValue
                };
                const newSkills = skills.concat([newSkill]);
                this.setState({
                    skills: newSkills,
                    tempSkillName: '',
                    tempSkillValue: 0
                });
                break;
        }
        this.setState({ open: false});
    }

    render() {
        const { classes } = this.props;
        const { username, company, position, phone, address, bio, skills, website, usernameError, open, dialogContent, dialogStatus, dialogForm, tempSkillName, tempSkillValue } = this.state;

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
                    <Box>
                        <Button onClick={() => {this.setState({
                                                    dialogStatus: 'Add new skill',
                                                    dialogContent: '',
                                                    dialogForm: true,
                                                    open: true
                                                })}} 
                                className="tf-clgn1">Add skill</Button>
                        {skills.map((skill) => (
                            <Chip
                                className={classes.skills}
                                key={skill.key}
                                label={skill.name + ": " + skill.value + "%"}
                                onDelete={this.handleSkillDelete(skill)}
                            />
                        ))}
                    </Box>
                    <Box mt={2} className="d-flex justify-content-center">
                        <Button disabled={isInvalid} color="primary" size="large" onClick={this.onSubmit} variant="contained">Update profile</Button>
                    </Box>
                </Box>
                <Dialog open={open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        maxWidth={'sm'}
                        fullWidth={true}
                >
                    <DialogTitle id="alert-dialog-title">{dialogStatus}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogContent}
                    </DialogContentText>
                    {dialogForm ? (
                        <Box display="flex" alignItems="center">
                            <TextField
                                autoFocus
                                style={{margin:'auto'}}
                                value={tempSkillName}
                                label="Skill"
                                type="text"
                                name="tempSkillName"
                                onChange={this.onChange}
                            />
                            {/* <Box width="50%" display="inline-block"> */}
                                <Slider value={tempSkillValue} 
                                        name="tempSkillValue" 
                                        onChange={(event, newValue) => {this.setState({ tempSkillValue: newValue })}} 
                                        aria-labelledby="continuous-slider"
                                        min={0}
                                        max={100}
                                        step={1}
                                        style={{width: '50%', margin: 'auto'}}
                                        valueLabelDisplay="auto" />
                            {/* </Box> */}
                        </Box>
                    ) : null}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleOK} color="primary" autoFocus>
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