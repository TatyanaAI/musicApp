import React, { useState } from 'react';
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import Alert from '@material-ui/lab/Alert';
import FileInput from '../../../components/UI/FileInput/fileInput';
import { addArtist } from "../../../store/actions/artistsActions";

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
}));

const AddArtistForm = () => {
    const classes = useStyles();

    const [state, setState] = useState({
        name: "",
        info: "",
        photo: "",
    });

    const dispatch = useDispatch();
    const error = useSelector(state => state.artists.error);

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
                photo: file
            };
        });
    };

    const formSubmitHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        });
        dispatch(addArtist(formData));
    };

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5" className={classes.additionTitle}><b>Add artist</b></Typography>
            { (error) && <Alert severity="error" className={classes.alert}> {(error)} </Alert>}
            <form onSubmit={formSubmitHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            fullWidth
            label="Name"
            name="name"
            onChange={inputChangeHandler}
            value={state.name}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Info"
            name="info"
            onChange={inputChangeHandler}
            value={state.info}
            required
          />
        </Grid>
        <Grid item>
          <FileInput
            label="Photo"
            name="photo"
            onChange={fileChangeHandler}
          />
        </Grid>
        <Grid item>
          <Button type="submit" color="primary" variant="contained" >
            Add artist
          </Button>
        </Grid>
      </Grid>
    </form>
        </div>
    );
};

export default AddArtistForm;