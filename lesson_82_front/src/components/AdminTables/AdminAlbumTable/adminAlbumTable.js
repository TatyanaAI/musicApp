import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { albumsRequest, deleteAlbum, publishAlbum } from '../../../store/actions/albumsActions';

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
    albumPhoto: {
        maxWidth: "100px",
        height: "100px",
    }
});


const AdminAlbumTable = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { albums, error } = useSelector(state => state.albums);

    albums.sort(function (a, b) {
        if (a.artist.name > b.artist.name) {
            return 1;
        }
        if (a.artist.name < b.artist.name) {
            return -1;
        }
        return 0;
    });

    useEffect(() => {
        dispatch(albumsRequest());
    }, [dispatch]);

    const deleteAlbumHandler = id => {
        dispatch(deleteAlbum(id));
    }

    const publishAlbumHandler = id => {
        dispatch(publishAlbum(id));
    }

    return (
        <TableContainer component={Paper} error={error}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Cover</StyledTableCell>
                        <StyledTableCell align="center">Artist</StyledTableCell>
                        <StyledTableCell align="center">Title</StyledTableCell>
                        <StyledTableCell align="center">Year</StyledTableCell>
                        <StyledTableCell align="center">Publish</StyledTableCell>
                        <StyledTableCell align="center">Delete</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {albums.map((album) => (
                        <StyledTableRow key={album.title} >
                            <StyledTableCell align="center"><img src={album.cover} alt="albumPhoto" className={classes.albumPhoto} /></StyledTableCell>
                            <StyledTableCell component="th" scope="row" align="center">
                                {album.artist && album.artist.name}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row" align="center">
                                {album.title}
                            </StyledTableCell>
                            <StyledTableCell align="center">{album.year}</StyledTableCell>
                            <StyledTableCell align="center">
                                {!album.published ? <Button className={classes.publishButton} onClick={() => publishAlbumHandler(album.id)}> Publish </Button> : null}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Button className={classes.deleteButton} onClick={() => deleteAlbumHandler(album.id)}> Delete</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminAlbumTable;