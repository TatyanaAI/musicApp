import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import Alert from '@material-ui/lab/Alert';
import FormElement from '../../../components/UI/Form/formElement';
import { artistsRequest } from "../../../store/actions/artistsActions";
import { albumsRequest } from "../../../store/actions/albumsActions";
import { addTrack } from "../../../store/actions/tracksActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flexLeft',
    marginLeft: "30px"
  },
  additionTitle: {
    textAlign: "left",
    marginBottom: "20px"
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    width: "30%"
  },
  alert: {
    marginTop: theme.spacing(3),
    width: "100%"
  },
  select: {
    variant: ""
  }
}));

const AddTrackForm = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    title: "",
    duration: "",
    number: "",
    video: "",
    artist: "",
    album: ""
  });

  const dispatch = useDispatch();
  const artists = useSelector(state => state.artists.artists);
  const artistsError = useSelector(state => state.artists.error);
  const albums = useSelector(state => state.albums.albums);
  const albumsError = useSelector(state => state.albums.error);
  const tracksError = useSelector(state => state.tracks.error);

  useEffect(() => {
  }, [dispatch,state]);

  useEffect(() => {
    dispatch(artistsRequest())
  }, [dispatch]);

  useEffect(() => {
    dispatch(albumsRequest(state.artist))
  }, [dispatch, state.artist]);

  const inputChangeHandler = e => {
    const { name, value } = e.target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const formSubmitHandler = e => {
    e.preventDefault();
    dispatch(addTrack({ ...state }));
  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5" className={classes.additionTitle}><b>Add track</b></Typography>
      {
        (albumsError || tracksError || artistsError) && <Alert
          severity="error"
          className={classes.alert}
        >
          {(albumsError || tracksError || artistsError)}
        </Alert>
      }
      <form onSubmit={formSubmitHandler}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              fullWidth
              label="Title"
              name="title"
              onChange={inputChangeHandler}
              value={state.title}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Duration"
              name="duration"
              onChange={inputChangeHandler}
              value={state.duration}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              type="number"
              label="Number"
              name="number"
              onChange={inputChangeHandler}
              value={state.number}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Video Link"
              name="video"
              onChange={inputChangeHandler}
              value={state.video}
              required
            />
          </Grid>
          <FormElement
            name="artist"
            label="Artist"
            value={state.artist}
            required={true}
            type="select"
            select={true}
            options={artists}
            onChange={inputChangeHandler}
          />

          <FormElement
            name="album"
            label="Album"
            value={state.album}
            required={true}
            type="select"
            select={true}
            options={albums}
            onChange={inputChangeHandler}
          />

          <Grid item>
            <Button type="submit" color="primary" variant="contained" >
              Add track
          </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddTrackForm;