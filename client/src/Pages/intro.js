import React from 'react';
import {Button} from 'reactstrap';
import {Helmet} from "react-helmet";
import NavBar from '../Components/NavBar';
// import banner from '../assets/img/v2.jpg';

const intr = ({history}) => {
    
    return (
        <div>
            <Helmet>
                <title>Collabnest</title>
            </Helmet>
            <NavBar></NavBar>
            <section className="banner">
                {/* <img src={banner}/> */}
                <h1 className="bn-cap">Collabnest</h1>
                <div className="bn-but">
                    <Button onClick={() => history.push('/signin')} color="info" size="lg">Get started</Button>
                </div>
            </section>
        </div>
    );

}

export default intr;