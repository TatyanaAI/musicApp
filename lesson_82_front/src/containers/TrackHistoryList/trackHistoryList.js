import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import dateFormat from 'dateformat';
import { push } from 'connected-react-router';
import { nanoid } from 'nanoid';
import { getTracks } from '../../store/actions/trackHistoryActions';
import BackDrop from '../../components/UI/BackDrop/backDrop';
import VideoModal from "../../components/UI/VideoModal/videoModal"


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
    videoButton: {
        border: "2px solid white",
        backgroundColor: "darkred",
        borderRadius: "10px",
        fontWeight: "700",
        color: "white",
        "&:hover": {
            backgroundColor: "grey",
            color: "black"
        }
    }
});

const TracksHistoryList = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { history, loading, error } = useSelector(state => state.trackHistory);

    const { user } = useSelector(state => state.users);

    const [modal, setModal] = React.useState({
        open: false,
        video: null
    });

    const handleOpen = video => {
        setModal({ ...modal, open: true, video });
    };

    const handleClose = () => {
        setModal({ ...modal, open: false, video: null });
    };

    useEffect(() => {
        if (user && user.token) {
            dispatch(getTracks(user.token));
        } else {
            dispatch(push('/login'));
        }
    }, [dispatch, user]);

    return (
        <>
            <BackDrop loading={loading} />
            <TableContainer component={Paper} error={error}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center"> Artist</StyledTableCell>
                            <StyledTableCell align="center">Track title</StyledTableCell>
                            <StyledTableCell align="center">Datetime</StyledTableCell>
                            <StyledTableCell align="center">Video</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history.map((track) => (
                            <StyledTableRow key={nanoid()}>
                                <StyledTableCell align="center">{track.track.album.artist.name}</StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="center">
                                    {track.track.title}
                                </StyledTableCell>
                                <StyledTableCell align="center">{dateFormat(track.datetime, "dd.mm.yyyy HH:MM")}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {track.track.video ? <Button onClick={() => handleOpen(track.track.video)} className={classes.videoButton}> Watch Video</Button> : ""}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <VideoModal
                video={modal.video}
                open={modal.open}
                handleClose={handleClose}
            />
        </>
    );
}

export default TracksHistoryList;

