import React from 'react';
import {Helmet} from "react-helmet";
import {FirebaseContext} from '../Components/Firebase';
import Drawer from "../Components/Drawer";

const Profile = props => {

    const canvas = user => {
        return (
            <Helmet>
                <title>{user.displayName} - Collabnest</title>
            </Helmet>
        );
    };

    return (
        <div>
            <Drawer>{canvas}</Drawer>
        </div>
    );
}

const ProfileFbConsumer = () => (
    <div>
        <FirebaseContext.Consumer>
            {firebase => <Profile firebase={firebase} />}
        </FirebaseContext.Consumer>
    </div>
);

export default ProfileFbConsumer;