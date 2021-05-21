import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import Alert from '@material-ui/lab/Alert';
import FileInput from '../../../components/UI/FileInput/fileInput';
import FormElement from '../../../components/UI/Form/formElement';
import { artistsRequest } from "../../../store/actions/artistsActions";
import { addAlbum } from "../../../store/actions/albumsActions";

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

const AddAlbumForm = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    title: "",
    year: "",
    cover: "",
    artist: ""
  });

  const dispatch = useDispatch();
  const artists = useSelector(state => state.artists.artists);
  const artistsError = useSelector(state => state.artists.error);
  const albumsError = useSelector(state => state.albums.error);

  useEffect(() => {
    if (!artists || artists.length === 0) {
      dispatch(artistsRequest());
    }
  }, [dispatch, artists]);

  const inputChangeHandler = e => {
    const { name, value } = e.target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const fileChangeHandler = e => {
    const file = e.target.files[0];
    setState(prevState => {
      return {
        ...prevState,
        cover: file
      };
    });
  };

  const formSubmitHandler = e => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(state).forEach(key => {
      formData.append(key, state[key]);
    });
    dispatch(addAlbum(formData));
  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5" className={classes.additionTitle}><b>Add album</b></Typography>
      {
        (artistsError || albumsError) && <Alert
          severity="error"
          className={classes.alert}
        >
          {(artistsError || albumsError)}
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
              label="Year"
              name="year"
              onChange={inputChangeHandler}
              value={state.year}
              required
            />
          </Grid>
          <FormElement
            name="artist"
            label="Artist"
            value={state.artist}
            required={true}
            type="select"
            select ={true}
            options={artists}
            onChange={inputChangeHandler}
            
          />
          <Grid item>
            <FileInput
              label="Cover"
              name="cover"
              onChange={fileChangeHandler}
            />
          </Grid>
          <Grid item>
            <Button type="submit" color="primary" variant="contained" >
              Add album
          </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddAlbumForm;