import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { artistsRequest, initArtist } from "../../store/actions/artistsActions";
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
    },
  }));


const ArtistsList = () => {
  const dispatch = useDispatch();
  const { artists, loading, error } = useSelector(state => state.artists);

  useEffect(() => {
    dispatch(initArtist());
    dispatch(initAlbum());
    dispatch(artistsRequest());
  }, [dispatch]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BackDrop loading={loading} />
      <GridList cellHeight={300} className={classes.gridList} cols={3} error={error} >
        {artists.map((tile) => (
          <GridListTile key={tile.id} >
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
