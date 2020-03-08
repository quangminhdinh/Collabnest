import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import ChatIcon from '@material-ui/icons/Chat';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import { deepOrange } from '@material-ui/core/colors';
import logo from '../assets/img/TabLogo.png';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import {observer, FirebaseContext} from './Firebase';
import { createBrowserHistory } from 'history';


const drawerWidth = 240;

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  ava: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  liAva: {
    justifyContent: "center",
   },
   avaIco: {
    color: "rgba(255, 255, 255, 0.8)",
   },
   lIco: {
    color: "#fff",
   },
   emp: {
    padding: "0",
    '&:hover': {
      background: "#5475d1",
   },
   },
   footer: {
    [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
   },
   fab: {
    position: 'absolute',
    bottom: theme.spacing(10),
    right: theme.spacing(10),
    zIndex: 1200,
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#fff',
    // [theme.breakpoints.up('sm')]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   marginLeft: drawerWidth,
    // },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#5475d1",
    color: "#fff",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
  liButton: {
    '&:hover': {
      background: "#3f66d1",
   },
   
  }
}));

function ResponsiveDrawer(props) {
  observer(props.firebase.auth, true, (user) => {
    // setUser(user);
    // console.log(user);
    props.firebase.firestore.collection("users").doc(user.uid).get().then(function(doc) {
        if (doc.exists) {
            setUser(doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

  });
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const history = createBrowserHistory({forceRefresh: true});


  var [user, setUser] = React.useState({displayName: "default"});


  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const signOut = () => {
    props.firebase.auth.signOut().then(function() {
      // Sign-out successful.
      history.push('/intro');
    }).catch(function(error) {
      // An error happened.
      alert(error.message);
    });
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem style={{paddingTop: "1rem"}} className={classes.liAva}>

        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
        >
          <Avatar className={classes.ava}>{user.displayName.substr(0,1).toUpperCase()}</Avatar>
        </StyledBadge>
        
          </ListItem>
          <ListItem style={{paddingTop: "0"}} className={classes.liAva}>
          <Typography variant="h6">
          {user.displayName}
        </Typography>

          </ListItem>

          <ListItem style={{paddingTop: "0", paddingBottom: "2rem"}} className={classes.liAva}>
          <Tooltip title="Profile">
          <IconButton component={RouterLink} to="/profile" className={classes.emp}>
          <PersonIcon fontSize="small" className={classes.avaIco}/>
          </IconButton></Tooltip>

          <Box px={2}>
          <Tooltip title="Settings">
          <IconButton className={classes.emp}>
          <SettingsIcon fontSize="small" className={classes.avaIco}/>
          </IconButton></Tooltip></Box>

          <Tooltip title="Log out">
          <IconButton onClick={signOut} className={classes.emp}>
          <ExitToAppIcon fontSize="small" className={classes.avaIco}/>
          </IconButton></Tooltip>

          </ListItem>

          <Divider light/>
        
          <ListItem className={classes.liButton} button key="home">
            <ListItemIcon><DashboardIcon className={classes.lIco}/></ListItemIcon>
            <ListItemText primary="My projects" />
          </ListItem>
          <ListItem className={classes.liButton} button key="explore">
            <ListItemIcon><FindInPageIcon className={classes.lIco}/></ListItemIcon>
            <ListItemText primary="Explore" />
          </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        <Container maxWidth={false}>
        <Box display="flex">
          <IconButton
            style={{ color: "#3a3a3a" }}
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap> */}
          
          <Box p={2} className={classes.title}>
            <Link component={RouterLink} to="/">
                <img height='30px' src={logo} alt="logo"/> 
                {/* <span className="bn-lgo align-middle">Collabnest</span> */}
            </Link>
            </Box>
            <Box py={2}>
            <TextField type="search" placeholder="Search"  InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon color="disabled"/></InputAdornment>,
                  }} /></Box>
            <Box p={1} alignItems="center">
            {/* <PersonIcon/> */}
            
            <Tooltip title="Messages">
                <IconButton
                    className="ic-but"
                ><Badge badgeContent={2} color="primary" className="clpr-badge">
                <ChatIcon className="nav-ic"/>
                </Badge>
                </IconButton></Tooltip>

                <Tooltip title="Notifications">
                <IconButton
                    className="ic-but"
                >
                  <Badge badgeContent={4} color="secondary">
                     <NotificationsIcon className="nav-ic"/>
                  </Badge>
                </IconButton></Tooltip>

                <Tooltip title="Create new project">
                <IconButton
                    className="ic-but"
                >
                <AddIcon className="nav-ic"/>
                </IconButton></Tooltip>

                <Tooltip title="Profile">
                <IconButton
                    className="ic-but"
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                <PersonIcon className="nav-ic"/>
                </IconButton></Tooltip>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            <MenuItem component={RouterLink} to="/profile">Profile</MenuItem>
                            <MenuItem component={RouterLink} to="/signin">Settings</MenuItem>
                            <Divider/>
                            <MenuItem onClick={signOut}>Log out</MenuItem>
                        </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
                </Popper>

            </Box></Box> {/* </Typography> */}
          </Container>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children(user)}
        <Tooltip title="Create new project">
        <Fab color="primary" className={classes.fab} aria-label="Create new project">
          <AddIcon />
        </Fab></Tooltip>
        <footer className={classes.footer}>© 2020 <a href="https://www.facebook.com/minh.dinh.112" rel="noopener noreferrer" target="_blank">Minh Dinh</a>, All rights reserved.</footer>
      </main>
    </div>
  );
}

const DrawerFbConsumer = props => (
  <div>
      <FirebaseContext.Consumer>
        {firebase => <ResponsiveDrawer firebase={firebase} >{props.children}</ResponsiveDrawer>}
      </FirebaseContext.Consumer>
  </div>
);

export default DrawerFbConsumer;