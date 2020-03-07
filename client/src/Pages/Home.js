import React from 'react';
import {Helmet} from "react-helmet";
import {FirebaseContext} from '../Components/Firebase';
import Drawer from "../Components/Drawer";

const Home = props => {
    return (
        <div>
            <Helmet>
                <title>Home - Collabnest</title>
            </Helmet>
            <Drawer></Drawer>
        </div>
    );
}

const HomeFbConsumer = () => (
    <div>
        <FirebaseContext.Consumer>
            {firebase => <Home firebase={firebase} />}
        </FirebaseContext.Consumer>
    </div>
);

export default HomeFbConsumer;