import React from 'react';

import { compose } from 'recompose';
import { withAuthorization } from '../Session';

const withURLgathering = (condition, files) => Component => {
    class WithURLgathering extends React.Component {
        constructor(props) {
            super(props);
      
            this.state = {
              dataAvailable: false,
              data: {}
            };
        }

        componentDidMount() {
            files.forEach(file => {
                const source = file.source === 'users' ? this.props.authUser : null;
                const ext = source[file.type + 'Ext'];
                if (ext) {
                    const path = file.compress ? file.source + '/' + file.type + '/' + source.uid + '_200x200' + ext : 
                                    file.source + '/' + file.type + '/' + source.uid + ext;
                    this.props.firebase
                        .getURL(path)
                        .then(url => {
                            let clonedData = {...this.state.data};
                            clonedData[file.type + 'URL'] = url;
                            this.setState(() => ({
                                data: clonedData
                            }));
                        })
                        .catch(error => {alert(error.code)});
                }
            });
            this.setState({ dataAvailable: true });
        }
    
        render() {
            return (<> { this.state.dataAvailable ? <Component data={this.state.data} {...this.props} /> : null } </>);
        }
    }
  
    return compose(
      withAuthorization(condition)
    )(WithURLgathering);
  };
  
  export default withURLgathering;
  