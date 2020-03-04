import React from 'react';
import {
    Card, Row, Col, CardBody,
    CardTitle, Input, Button, CardLink
  } from 'reactstrap';
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import NavBar from '../Components/NavBar';

const signin = props => {
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
                                    <Input type="password" name="pass" id="pass" placeholder="Password"/>
                                    <div className="d-flex justify-content-center">
                                       <Button color='primary'>Sign in</Button>
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

export default signin;