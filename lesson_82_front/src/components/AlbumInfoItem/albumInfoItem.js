import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Card, CardContent, Typography, CardMedia, CardActionArea, Button } from "@material-ui/core";
import PublishOutlineButton from "@material-ui/icons/PublishOutlined";
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import { makeStyles } from '@material-ui/core/styles';
import { publishAlbum, deleteAlbum } from "../../store/actions/albumsActions";

const useStyles = makeStyles({
    card: {
        minWidth: '400px',
        marginLeft: "15px",
    },
    media: {
        maxWidth: "200px",
        height: "200px",
        marginLeft: "100px",
    },
    cardTitle: {
        paddingTop: "10px",
        paddingBottom: "10px"
    },
    publishingStatus: {
        position: "absolute",
        bottom: "7%",
        right: "-10%",
        backgroundColor: "darkred",
        color: "white",
        width: "220px",
        height: "30px",
        borderRadius: 5,
        textTransform: "uppercase",
        fontWeight: "700",
        fontSize: 13,
        transform: "rotate(-30deg)",
        lineHeight: "30px"
    },
    buttons: {
        display: 'flex',
        flexDirection: "column"
    },

    publishButton: {
        position: "absolute",
        bottom: "3%",
        left: "20%",
        width: "30px",
        height: "30px",
        backgroundColor: "green",
        borderRadius: "10px",
        border: "1px solid white",
        color: "white",
        fontWeight: "600",
        "&:hover": {
            backgroundColor: "lightgreen",
            color: "grey"
        }
    },
    deleteButton: {
        position: "absolute",
        bottom: "3%",
        left: "3%",
        width: "30px",
        height: "30px",
        backgroundColor: "red",
        borderRadius: "10px",
        border: "1px solid white",
        color: "white",
        fontWeight: "600",
        "&:hover": {
            backgroundColor: "tomato",
            color: "lightgrey"
        }
    }
});

const AlbumInfoItem = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);

    const publishAlbumHandler = (event, id) => {
        event.stopPropagation();
        event.preventDefault();
        dispatch(publishAlbum(id));
    }

    const publishAlbumHandlerOnMouseDown = (event) => {
        event.stopPropagation();
    }

    const deleteAlbumHandler = (event, id) => {
        event.stopPropagation();
        event.preventDefault();
        dispatch(deleteAlbum(id));
    }

    const deleteAlbumHandlerOnMouseDown = (event) => {
        event.stopPropagation();
    }

    return (
        <Grid item >
            <Card className={classes.card}>
                <CardActionArea component={Link} to={"/albums/" + props.id} className={classes.cardLink}>
                    {user && props.published === false ? (<div className={classes.publishingStatus}>Unpublished</div>) : null}
                    <Typography variant="h5" className={classes.cardTitle}>
                        <b>{props.title} </b>
                    </Typography>
                    <CardMedia
                        className={classes.media}
                        image={props.cover}
                    />
                    <CardContent>
                        <Typography variant="h6">
                            <i><b>Year: </b>{props.year}</i>
                        </Typography>
                    </CardContent>
                    <div className={classes.buttons}>
                        {user && user.role === "admin" && !props.published && <Button className={classes.publishButton} onClick={(event) => publishAlbumHandler(event, props.id)} onMouseDown={(event) => publishAlbumHandlerOnMouseDown(event)}> <PublishOutlineButton>Publish </PublishOutlineButton></Button>}
                        {user && user.role === "admin" && <Button className={classes.deleteButton} onClick={(event) => deleteAlbumHandler(event, props.id)} onMouseDown={(event) => deleteAlbumHandlerOnMouseDown(event)}> <DeleteOutlineRoundedIcon>Delete</DeleteOutlineRoundedIcon> </Button>}
                    </div>
                </CardActionArea>
            </Card>
        </Grid >
    );
};

export default AlbumInfoItem;
