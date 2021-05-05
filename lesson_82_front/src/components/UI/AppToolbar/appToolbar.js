import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Grid, Toolbar, Typography } from "@material-ui/core";
import LibraryMusicSharpIcon from '@material-ui/icons/LibraryMusicSharp';
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => {
  return {
    appLink: {
      color: "inherit",
      textDecoration: "none",
      "&:hover": {
        color: "dodgerblue"
      }
    },
    staticToolbar: {
      marginBottom: theme.spacing(2),
    },
    appBar: {
      backgroundColor: "black"
    },
    logo: {
      marginRight: '5px'
    }

  };
});

const AppToolbar = (props) => {
  const artist = useSelector(state => state.artists.artist);
  const albumTitle = useSelector(state => state.albums.album.title);
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} >
        <Toolbar>
          <Link to={'/'} className={classes.appLink} >
            <LibraryMusicSharpIcon className={classes.logo} />
          </Link>
          <Grid container justify="space-between" alignItems="center">
            <Typography variant="h4">
              {!artist.name ? <Link to={'/'} className={classes.appLink} >Music App</Link> : 
               !albumTitle ? artist.name : (<><Link to={'/artists/' + artist.id} className={classes.appLink} >{artist.name}</Link> - {albumTitle} </>)}
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.staticToolbar} />
    </>
  );
};

export default AppToolbar;

