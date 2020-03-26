import React, {Component} from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { withStyles, Card, CardContent, Button, TextField, Grid } from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Layout from '../components/LayoutN';
import * as ROUTES from '../components/constants/routes';

import {withFirebase} from '../components/Firebase';
import {randomColor} from '../components/utils/stringToColor';

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
    username: '',
    email: '',
    pass: '',
    confirmPass: '',
    isAdmin: false,
    usernameError: null,
    emailError: null,
    passError: null,
    confirmPassError: null
};

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
        if (localStorage.getItem('authUser')) {
            this.props.history.push('/');
        }
    }

    onChange = event => {
        this.setState({
            usernameError: null,
            emailError: null,
            passError: null,
            confirmPassError: null,
            [event.target.name]: event.target.value
        });
    }

    onKeyDown = e => {
        if (e.key === 'Enter') {
            this.onSubmit();
        }
    }

    onSubmit = () => {
        const { username, email, pass, confirmPass, isAdmin } = this.state;

        if (username.length < 3 || username.length > 20) {
            this.setState({ usernameError: 'Username must be from 3 to 20 characters'});
            return false;
        } else if (pass.length < 6) {
            this.setState({ passError: 'Password must be at least 6 characters long'});
            return false;
        } else if (pass !== confirmPass) {
            this.setState({ confirmPassError: 'Please make sure your passwords match'});
            return false;
        }

        // Handle
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, pass)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                const avaColor = randomColor();
                return this.props.firebase.user(authUser.user.uid).set(
                {
                    username,
                    email,
                    isAdmin,
                    avaColor
                },
                { merge: true },
                );
            })
            // .then(() => {
            //     return this.props.firebase.doSendEmailVerification();
            // })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push('/');
            })
            .catch(error => {
                switch(error.code) {
                    case 'auth/invalid-email':
                    case 'auth/email-already-in-use':
                        this.setState({ emailError: error.message });
                        break;
                    default:
                        alert(error.message);
                }
            });
    }

    render() {
        const { classes } = this.props;
        const { username, email, pass, confirmPass, usernameError, emailError, passError, confirmPassError } = this.state;

        const isInvalid = username.trim() === '' || pass.trim() === ''  || confirmPass.trim() === '' || email.trim() === '';

        return (
            <Layout>
                {/* <img src={banner}/> */}
                <Grid container>
                    <Grid item md={4}>
                    </Grid>
                    <Grid className="g1-lgn" item md={4}>
                    <Card className={classes.root}>
                    <CardContent className="auth-ls">
                        <div className="card-title">Create a new Collabnest account</div>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField error={!!usernameError} 
                                        helperText={usernameError} 
                                        onChange={this.onChange} 
                                        fullWidth 
                                        className="tf-clgn" 
                                        type="text" 
                                        name="username" 
                                        value={username} 
                                        label="Username"
                                        onKeyDown={isInvalid ? null : this.onKeyDown} />
                            <TextField error={!!emailError} 
                                        helperText={emailError} 
                                        onChange={this.onChange} 
                                        fullWidth 
                                        className="tf-clgn" 
                                        type="email" 
                                        name="email" 
                                        value={email} 
                                        label="Email"
                                        onKeyDown={isInvalid ? null : this.onKeyDown} />
                            <TextField error={!!passError} 
                                        helperText={passError} 
                                        onChange={this.onChange} 
                                        fullWidth 
                                        className="tf-clgn" 
                                        type="password" 
                                        name="pass" 
                                        value={pass} 
                                        label="Password"
                                        onKeyDown={isInvalid ? null : this.onKeyDown} />
                            <TextField error={!!confirmPassError} 
                                        helperText={confirmPassError} 
                                        onChange={this.onChange} 
                                        fullWidth 
                                        className="tf-clgn" 
                                        type="password" 
                                        name="confirmPass" 
                                        value={confirmPass} 
                                        label="Confirm password"
                                        onKeyDown={isInvalid ? null : this.onKeyDown} />
                        </form>
                        <div className="d-flex justify-content-center">
                            <Button disabled={isInvalid} onClick={this.onSubmit} variant="contained">Sign up</Button>
                        </div>
                        <div className="cr-lgn">
                            <Link component={RouterLink} to={ROUTES.SIGN_IN}>Log in to existing account</Link>
                        </div>
                    </CardContent>
                    </Card>
                    </Grid>
                    <Grid item md={4}>
                    </Grid>
                </Grid>
            </Layout>
        );
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    withFirebase
)(SignUp);