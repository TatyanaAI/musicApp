import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { tracksRequest, deleteTrack, publishTrack } from '../../../store/actions/tracksActions';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    publishButton: {
        border: "2px solid white",
        backgroundColor: "green",
        borderRadius: "10px",
        fontWeight: "600",
        color: "white",
        "&:hover": {
            backgroundColor: "lightgreen",
            color: "grey"
        }
    },
    deleteButton: {
        border: "2px solid white",
        backgroundColor: "red",
        borderRadius: "10px",
        fontWeight: "600",
        color: "white",
        "&:hover": {
            backgroundColor: "tomato",
            color: "lightgrey"
        }
    },
});


const AdminTrackTable = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    let tracks = useSelector(state => state.tracks.tracks);
    const error = useSelector(state => state.tracks.error);

    let tracksArtistSort = tracks.sort(function (a, b) {
        if (a.album.artist.name > b.album.artist.name) {
            return 1;
        }
        if (a.album.artist.name < b.album.artist.name) {
            return -1;
        }
        return 0;
    });

    tracks = tracksArtistSort.sort(function (a, b) {
        if (a.album.title > b.album.title) {
            return 1;
        }
        if (a.album.title < b.album.title) {
            return -1;
        }
        return 0;
    })


    useEffect(() => {
        dispatch(tracksRequest());
    }, [dispatch]);

    const deleteTrackHandler = id => {
        dispatch(deleteTrack(id));
    }

    const publishTrackHandler = id => {
        dispatch(publishTrack(id));
    }

    return (
        <TableContainer component={Paper} error={error}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Artist</StyledTableCell>
                        <StyledTableCell align="center">Album</StyledTableCell>
                        <StyledTableCell align="center">Title</StyledTableCell>
                        <StyledTableCell align="center">Number</StyledTableCell>
                        <StyledTableCell align="center">Duration</StyledTableCell>
                        <StyledTableCell align="center">Publish</StyledTableCell>
                        <StyledTableCell align="center">Delete</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tracks.map((track) => (
                        <StyledTableRow key={track.title} >
                            <StyledTableCell component="th" scope="row" align="center">
                                {track.album.artist && track.album.artist.name}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row" align="center">
                                {track.album && track.album.title}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row" align="center">
                                {track.title}
                            </StyledTableCell>
                            <StyledTableCell align="center">{track.number}</StyledTableCell>
                            <StyledTableCell align="center">{track.duration}</StyledTableCell>
                            <StyledTableCell align="center">
                                {!track.published ? <Button className={classes.publishButton} onClick={() => publishTrackHandler(track.id)}> Publish </Button> : null}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Button className={classes.deleteButton} onClick={() => deleteTrackHandler(track.id)}> Delete</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminTrackTable;