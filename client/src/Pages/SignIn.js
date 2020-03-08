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
  

const SignIn = props => {

    const classes = useStyles();

    var [emailErr, setEmailErr] = useState(false);
    var [emailErrMessage, setEmailErrMess] = useState("");

    var [passErr, setPassErr] = useState(false);
    var [passErrMessage, setPassErrMess] = useState("");

    const resetErr = () => {
        setEmailErr(false);
        setEmailErrMess("");
        setPassErr(false);
        setPassErrMess("");
    }

    const checkUser = e => {
    
        const email = document.getElementById('email').value;
        const pass = document.getElementById('pass').value;

        if (!email) {
            setEmailErr(true);
            setEmailErrMess("Please enter your email");
            return false;
        } if (!pass) {
            setPassErr(true);
            setPassErrMess("Please enter your password");
            return false;
        }

        props.firebase.auth.signInWithEmailAndPassword(email, pass).then(authVal => {
            const history = createBrowserHistory({forceRefresh: true});
            history.push('/');
        }).catch((error) => {
            // Handle Errors here.
            if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
                setEmailErr(true);
                setEmailErrMess(error.message);
            } else if (error.code === 'auth/wrong-password') {
                setPassErr(true);
                setPassErrMess(error.message);
            } else {
                alert(error.message);
            }
        });
    }

    return (
        <div>
            <Helmet>
                <title>Sign in - Collabnest</title>
            </Helmet>
            <NavBar>
                {/* <img src={banner}/> */}

                <Grid container>
                    <Grid item md={4}>
                    </Grid>
                    <Grid className="g1-lgn" item md={4}>
                    <Card className={classes.root}>
                    <CardContent className="auth-ls">
                        <div className="card-title">Sign in to Collabnest</div>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField error={emailErr} helperText={emailErrMessage} onChange={resetErr} fullWidth className="tf-clgn" type="email" name="email" id="email" label="Email" />
                            <TextField error={passErr} helperText={passErrMessage} onChange={resetErr} fullWidth className="tf-clgn" type="password" name="pass" id="pass" label="Password" />
                        </form>
                        <div className="d-flex justify-content-center">
                            <Button onClick={checkUser} variant="contained">Sign in</Button>
                        </div>
                        <div className="cr-lgn">
                            <Link component={RouterLink} to="/signup">Create an Collabnest account</Link>
                        </div>
                    </CardContent>
                    </Card>
                    </Grid>
                    <Grid item md={4}>
                    </Grid>
                </Grid>
            </NavBar>
        </div>
    );
}

const SignInFbConsumer = () => (
    <div>
        <FirebaseContext.Consumer>
            {firebase => <SignIn firebase={firebase} />}
        </FirebaseContext.Consumer>
    </div>
);

export default SignInFbConsumer;