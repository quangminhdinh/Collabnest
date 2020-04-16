import React, { Component } from 'react';
import { withStyles, Slide, Button, Dialog, ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { compose } from 'recompose';

const styles = theme => ({
    appBar: {
        position: 'relative',
        backgroundColor: '#5475d1',
      },
      title: {
        marginLeft: theme.spacing(2),
        flex: 1,
      },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class CreateProjectForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, open, handleClose } = this.props;

        return (
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            New project
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            create
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                <ListItem button>
                    <ListItemText primary="Phone ringtone" secondary="Titania" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                </ListItem>
                </List>
            </Dialog>
        );
    }
}

export default compose(
    // withRouter,
    withStyles(styles),
)(CreateProjectForm);