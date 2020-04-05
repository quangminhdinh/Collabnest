import React from 'react';

import { compose } from 'recompose';
import { withAuthorization } from '../Session';

import Loader from '../Loader';

const checkDynamicId = (condition, idType) => Component => {
    class CheckDynamicId extends React.Component {
        constructor(props) {
            super(props);
      
            this.state = {
              dataAvailable: false,
              data: null
            };
        }

        async componentDidMount() {
            const { id } = this.props.match.params;
            const { authUser, firebase } = this.props;
            
            if ( idType === 'users' ) {
                if ( id && id !== authUser.uid ) {
                    await firebase.user(id)
                            .get()
                            .then(snapshot => {
                                const dbUser = snapshot.data();
                    
                                const iUser = {
                                  uid: id,
                                  ...dbUser,
                                };
                    
                                this.setState({ data: iUser });
                            });
                }
            }
            this.setState(() => ({
                dataAvailable: true
            }));
            // this.setState({ dataAvailable: true });
        }
    
        render() {
            return (<> { this.state.dataAvailable ? <Component iUser={this.state.data} {...this.props} /> : <Loader open /> } </>);
        }
    }
  
    return compose(
      withAuthorization(condition)
    )(CheckDynamicId);
  };
  
  export default checkDynamicId;