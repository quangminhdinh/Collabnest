import { createBrowserHistory } from 'history';

const config = {
    forceRefresh: true
};

const observer = (auth, require, callback=a=>1) => {
    // console.log(1);
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            if (!require) {
                const history = createBrowserHistory(config);
                history.push('/');
            }
            callback(user);
        } else {
            // No user is signed in.
            if (require) {
                const history = createBrowserHistory(config);
                history.push('/intro');
            }
            // console.log(2);
        }
    });
    // unsubscribe();
}

export default observer;