import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { GridList, GridListTile, GridListTileBar, Button } from "@material-ui/core";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { artistsRequest, initArtist, publishArtist, deleteArtist } from "../../store/actions/artistsActions";
import { initAlbum } from "../../store/actions/albumsActions";
import BackDrop from '../../components/UI/BackDrop/backDrop'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    position: "relative"
  },
  publishingStatus: {
    position: "absolute",
    bottom: "13%",
    right: "-9%",
    backgroundColor: "darkred",
    color: "white",
    width: "300px",
    height: "25px",
    borderRadius: 5,
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 13,
    transform: "rotate(-30deg)",
  },
  publishButton: {
    position: "absolute",
    top: "2%",
    left: "25%",
    width: "100px",
    height: "30px",
    backgroundColor: "green",
    borderRadius: "10px",
    color: "white",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: "lightgreen",
      color: "grey"
    }
  },
  deleteButton: {
    position: "absolute",
    top: "2%",
    left: "1%",
    width: "100px",
    height: "30px",
    backgroundColor: "red",
    borderRadius: "10px",
    color: "white",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: "tomato",
      color: "lightgrey"
    }
  }

}));


const ArtistsList = () => {
  const dispatch = useDispatch();
  const artists = useSelector(state => state.artists.artists);
  const loading = useSelector(state => state.artists.loading);
  const error = useSelector(state => state.artists.error);
  const { user } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(initArtist());
    dispatch(initAlbum());
    dispatch(artistsRequest());

  }, [dispatch]);

  const publishArtistHandler = (event, id) => {
    event.stopPropagation();
    dispatch(publishArtist(id));
  }

  const deleteArtistHandler = (event, id) => {
    event.stopPropagation();
    dispatch(deleteArtist(id));
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BackDrop loading={loading} />
      <GridList cellHeight={300} className={classes.gridList} cols={3} error={error} >
        {artists.map((tile) => (
          <GridListTile key={tile.id} >
            {user && user.role === "admin" && <Button className={classes.deleteButton} onClick={(event) => deleteArtistHandler(event, tile.id)}> Delete </Button>}
            {user && user.role === "admin" && !tile.published ? <Button className={classes.publishButton} onClick={(event) => publishArtistHandler(event, tile.id)}> Publish </Button> : null}
            {user && tile.published === false ? (<div className={classes.publishingStatus}>Unpublished</div>) : null}
            <Link to={"/artists/" + tile.id} >
              <img src={tile.photo} alt={tile.name} />
              <GridListTileBar
                title={tile.name}
                subtitle={<span>{tile.info}</span>}
              />
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>

  );
};

export default ArtistsList;
