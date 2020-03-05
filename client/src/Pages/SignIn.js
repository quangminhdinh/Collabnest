import React from 'react';
import {
    Card, Row, Col, CardBody,
    CardTitle, Input, Button, CardLink
  } from 'reactstrap';
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import { createBrowserHistory } from 'history';
import {FirebaseContext} from '../Components/Firebase';
import NavBar from '../Components/NavBar';

const SignIn = props => {

    const checkUser = e => {

        const email = document.getElementById('email').value;
        const pass = document.getElementById('pass').value;

        if (!email) {
            document.getElementById("err-email").style.display = "block";
            return false;
        } if (!pass) {
            document.getElementById("err-pass").style.display = "block";
            return false;
        }

        props.firebase.auth.signInWithEmailAndPassword(email, pass).then(authVal => {
            const history = createBrowserHistory({forceRefresh: true});
            history.push('/');
        }).catch((error) => {
            // Handle Errors here.
            alert(error.message);
        });

        // var docRef = props.firebase.firestore.collection("users").doc(email);

        // docRef.get().then((doc) => {
        //     if (doc.exists) {
        //         if (doc.data().pass === pass) {
        //             localStorage.username = doc.data().username;
        //             localStorage.pass = pass;
        //             localStorage.email = email;
        //         }
        //         else {
        //             alert("Sai mat khau");
        //         }
        //     } else {
        //         alert("Tai khoan khong ton tai!");
        //     }
        // }).catch(function(error) {
        //     console.log("Error getting document:", error);
        // });
    }

    return (
        <div>
            <Helmet>
                <title>Sign in - Collabnest</title>
            </Helmet>
            <NavBar></NavBar>
            <section className="banner">
                {/* <img src={banner}/> */}
                <div className="lgn-card">
                    <Row>
                        <Col md="4"></Col>
                        <Col md="4">
                            <Card>
                                <CardBody className="auth-ls">
                                    <CardTitle>Sign in to Collabnest</CardTitle>
                                    <Input type="email" name="email" id="email" placeholder="Email"/>
                                    <div id="err-email" className="cr-sn err-auth"><span>Please enter your email</span></div>
                                    <Input type="password" name="pass" id="pass" placeholder="Password"/>
                                    <div id="err-pass" className="cr-sn err-auth"><span>Please enter your password</span></div>
                                    <div className="d-flex justify-content-center">
                                       <Button onClick={checkUser} color='primary'>Sign in</Button>
                                    </div>
                                    <div className="cr-lgn">
                                        <CardLink tag={Link} to="/signup">Create an Collabnest account</CardLink>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="4"></Col>
                    </Row>
                </div>
            </section>
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