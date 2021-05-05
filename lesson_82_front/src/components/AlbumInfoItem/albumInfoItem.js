import React from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, Typography, CardMedia, CardActionArea } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        minWidth: '250px',
        marginLeft: "15px",
    },
    media: {
        maxWidth: "200px",
        height: "200px",
        marginLeft: "22px",
    },
    cardTitle: {
        paddingTop: "10px",
        paddingBottom: "10px"
    },
});

const AlbumInfoItem = props => {
    const classes = useStyles();

    return (
        <Grid item >
            <Card className={classes.card}>
                <CardActionArea component={Link} to={"/albums/" + props.id} className={classes.cardLink}>
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
                </CardActionArea>
            </Card>
        </Grid >
    );
};

export default AlbumInfoItem;
