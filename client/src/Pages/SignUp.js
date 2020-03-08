import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import {Link as RouterLink} from "react-router-dom";
import {Helmet} from "react-helmet";
import { createBrowserHistory } from 'history';
import {FirebaseContext} from '../Components/Firebase';
import NavBar from '../Components/NavBar';

const useStyles = makeStyles(theme => ({
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
}));

const SignUp = props => {
    const classes = useStyles();

    var [emailErr, setEmailErr] = useState(false);
    var [emailErrMessage, setEmailErrMess] = useState("");

    var [passErr, setPassErr] = useState(false);
    var [passErrMessage, setPassErrMess] = useState("");

    var [usernameErr, setNameErr] = useState(false);
    var [usernameErrMessage, setNameErrMess] = useState("");

    var [cfPassErr, setCfPassErr] = useState(false);
    var [cfPassErrMessage, setCfPassErrMess] = useState("");

    const resetErr = () => {
        setEmailErr(false);
        setEmailErrMess("");
        
        setPassErr(false);
        setPassErrMess("");

        setNameErr(false);
        setNameErrMess("");

        setCfPassErr(false);
        setCfPassErrMess("");
    }

    const validateUser = (email, username, pass, cfp) => {
        if (!username) {
            setNameErr(true);
            setNameErrMess('Please enter your username');
            return true;
        } else if (username.length < 3 || username.length > 20) {
            setNameErr(true);
            setNameErrMess('Username must be from 3 to 20 characters');
            return true;
        } else if (!email) {
            setEmailErr(true);
            setEmailErrMess('Please enter your email');
            return true;
        } else if (!pass) {
            setPassErr(true);
            setPassErrMess('Please enter your password');
            return true;
        } else if (pass.length < 6) {
            setPassErr(true);
            setPassErrMess('Password must be at least 6 characters long');
            return true;
        } else if (pass !== cfp) {
            setCfPassErr(true);
            setCfPassErrMess('Please make sure your passwords match');
            return true;
        }
    }

    const addUser = e => {
        const email = document.getElementById('email').value.trim();
        const username = document.getElementById('username').value.trim();
        const pass = document.getElementById('pass').value.trim();
        const cfp = document.getElementById('confirmPassword').value.trim();

        if (validateUser(email, username, pass, cfp)) {
            return false;
        }

        props.firebase.auth.createUserWithEmailAndPassword(email, pass).then((authData) => {
            const user = props.firebase.auth.currentUser;
            user.updateProfile({
                displayName: username
            }).then(function() {
                // Update successful.
                const history = createBrowserHistory({forceRefresh: true});
                history.push('/');
            }).catch(function(error) {
                // An error happened.
                alert(error.code);
            });
        }).catch((error) => {
            // Handle Errors here.
            // alert(error.message);
            if (error.code === 'auth/invalid-email' || error.code === 'auth/email-already-in-use') {
                setEmailErr(true);
                setEmailErrMess(error.message);
                // console.log(error.message)
            } else {
                // alert(error.message);
                alert(error.code)
            }
        });
    }

    return (
        <div>
            <Helmet>
                <title>Sign Up - Collabnest</title>
            </Helmet>
            <NavBar>
                {/* <img src={banner}/> */}



                <Grid container>
                    <Grid item md={4}>
                    </Grid>
                    <Grid className="g1-lgn" item md={4}>
                    <Card className={classes.root}>
                    <CardContent className="auth-ls">
                        <div className="card-title">Create a new Collabnest account</div>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField error={usernameErr} helperText={usernameErrMessage} onChange={resetErr} fullWidth className="tf-clgn" type="text" name="username" id="username" label="Username" />
                            <TextField error={emailErr} helperText={emailErrMessage} onChange={resetErr} fullWidth className="tf-clgn" type="email" name="email" id="email" label="Email" />
                            <TextField error={passErr} helperText={passErrMessage} onChange={resetErr} fullWidth className="tf-clgn" type="password" name="pass" id="pass" label="Password" />
                            <TextField error={cfPassErr} helperText={cfPassErrMessage} onChange={resetErr} fullWidth className="tf-clgn" type="password" name="confirmPassword" id="confirmPassword" label="Confirm password" />
                        </form>
                        <div className="d-flex justify-content-center">
                            <Button onClick={addUser} variant="contained">Sign in</Button>
                        </div>
                        <div className="cr-lgn">
                            <Link component={RouterLink} to="/signin">Log in to existing account</Link>
                        </div>
                    </CardContent>
                    </Card>
                    </Grid>
                    <Grid item md={4}>
                    </Grid>
                </Grid>





                {/* <div className="lgn-card">
                    <Row>
                        <Col md="4"></Col>
                        <Col md="4">
                            <Card>
                                <form onSubmit={handleSubmit(addUser)}>
                                    <CardBody className="auth-ls">
                                        <CardTitle>Create a new Collabnest account</CardTitle>
                                        
                                        <Input type="text" innerRef={register({required : 'Please enter your username', maxLength : {value : 20, message : 'Username must be from 3 to 20 characters'}, minLength : {value : 3, message : 'Username must be from 3 to 20 characters'}})} name="username" id="username" placeholder="Username"/>
                                        <div className="cr-sn">{errors.username && errors.username.message}</div>

                                        <Input type="email" innerRef={register({required : {value : true, message : 'Please enter your email'}})} name="email" id="email" placeholder="Email"/>
                                        <div className="cr-sn">{errors.email && errors.email.message}</div>

                                        <Input type="password" innerRef={register({required : 'Please enter your password', minLength : {value : 6, message : 'Password must be at least 6 characters long'}})} name="pass" id="pass" placeholder="Password"/>
                                        <div className="cr-sn">{errors.pass && errors.pass.message}</div>
                                        
                                        <Input type="password" innerRef={register({validate : (cfpass) => cfpass === watch('pass')})} name="confirmPassword" id="confirmPassword" placeholder="Confirm password"/>
                                        <div className="cr-sn">{errors.confirmPassword && <span>Please make sure your passwords match</span>}</div>

                                        <div className="d-flex justify-content-center">
                                            <Button type="submit" color='primary'>Sign up</Button>
                                        </div>
                                        <div className="cr-lgn">
                                            <CardLink tag={Link} to="/signin">Log in to existing account</CardLink>
                                        </div>
                                    </CardBody>
                                </form>
                            </Card>
                        </Col>
                        <Col md="4"></Col>
                    </Row>
                </div> */}
            </NavBar>
        </div>
    );
}

const SignUpFbConsumer = () => (
    <div>
        <FirebaseContext.Consumer>
            {firebase => <SignUp firebase={firebase} />}
        </FirebaseContext.Consumer>
    </div>
);

export default SignUpFbConsumer;