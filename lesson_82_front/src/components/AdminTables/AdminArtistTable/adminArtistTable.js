import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { artistsRequest, deleteArtist, publishArtist } from '../../../store/actions/artistsActions';

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
    artistPhoto: {
        maxWidth: "100px",
        height: "100px",
    }
});


const AdminArtistTable = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { artists, error } = useSelector(state => state.artists);

    useEffect(() => {
        dispatch(artistsRequest());
    }, [dispatch]);

    const deleteArtistHandler = id => {
        dispatch(deleteArtist(id));
    }

    const publishArtistHandler = id => {
        dispatch(publishArtist(id));
    }

    return (
        <TableContainer component={Paper} error={error}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Photo</StyledTableCell>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Info</StyledTableCell>
                        <StyledTableCell align="center">Publish</StyledTableCell>
                        <StyledTableCell align="center">Delete</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {artists.map((artist) => (
                        <StyledTableRow key={artist.name} >
                            <StyledTableCell align="center"><img src={artist.photo} alt="artistPhoto" className={classes.artistPhoto} /></StyledTableCell>
                            <StyledTableCell component="th" scope="row" align="center">
                                {artist.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">{artist.info}</StyledTableCell>
                            <StyledTableCell align="center">
                                {!artist.published ? <Button className={classes.publishButton} onClick={() => publishArtistHandler(artist.id)}> Publish </Button> : null}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Button className={classes.deleteButton} onClick={() => deleteArtistHandler(artist.id)}> Delete </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminArtistTable;