import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { albumRequest, setAlbum } from '../../store/actions/albumsActions';
import { tracksRequest, deleteTrack, publishTrack } from '../../store/actions/tracksActions';
import { setTrack } from '../../store/actions/trackHistoryActions';
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
  clickedRow: {
    cursor: "pointer",
    '&:hover': {
      backgroundColor: "lightgray"
    }
  },
  videoButton: {
    border: "2px solid white",
    backgroundColor: "dodgerblue",
    borderRadius: "10px",
    fontWeight: "700",
    color: "white",
    "&:hover": {
      backgroundColor: "grey",
      color: "black"
    }
  },
  publishingStatus: {
    lineHeight: "70px",
    color: "darkred",
    fontWeight: "700"
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

const TracksList = (props) => {
  const id = props.match.params.id;

  const classes = useStyles();

  const dispatch = useDispatch();
  const { albums } = useSelector(state => state.albums);
  const { tracks, loading, error } = useSelector(state => state.tracks);
  const { user } = useSelector(state => state.users);

  const publishTrackHandler = (event, id) => {
    event.stopPropagation();
    dispatch(publishTrack(id));
  }

  const deleteTrackHandler = (event, id) => {
    event.stopPropagation();
    dispatch(deleteTrack(id));
  }

  const [modal, setModal] = React.useState({
    open: false,
    video: null
  });

  useEffect(() => {
    const album = albums.find(album => album.id === id);
    if (album) {
      dispatch(setAlbum(album));
    } else {
      dispatch(albumRequest(id));
    }

    dispatch(tracksRequest(id));
  }, [dispatch, id, albums]);

  const setTrackHandler = (trackId) => {
    if (user && user.token) {
      dispatch(setTrack({ track: trackId }));
    }
  }

  const handleOpen = (event, video) => {
    event.stopPropagation();
    setModal({ ...modal, open: true, video });
  };

  const handleClose = () => {
    setModal({ ...modal, open: false, video: null });
  };

  return (
    <>
      <BackDrop loading={loading} />
      <TableContainer component={Paper} error={error}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Track number</StyledTableCell>
              <StyledTableCell align="center">Track title</StyledTableCell>
              <StyledTableCell align="center">Duration</StyledTableCell>
              <StyledTableCell align="center">Video</StyledTableCell>
              {user && user.role === "admin" && <StyledTableCell align="center">Publish</StyledTableCell>}
              {user && user.role === "admin" && <StyledTableCell align="center">Delete</StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {tracks.map((track) => (
              <StyledTableRow key={track.title} className={user && user.token ? classes.clickedRow : ""} onClick={() => setTrackHandler(track.id)}>
                <StyledTableCell align="center">{user && track.published === false ? (<div className={classes.publishingStatus}>Unpublished</div>) : <div></div>}</StyledTableCell>
                <StyledTableCell align="center">{track.number}</StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {track.title}
                </StyledTableCell>
                <StyledTableCell align="center">{track.duration}</StyledTableCell>
                <StyledTableCell align="center">
                  {track.video ? <Button onClick={(event) => handleOpen(event, track.video)} className={classes.videoButton}> Watch Video</Button> : ""}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user && user.role === "admin" && !track.published &&
                    <Button className={classes.publishButton} onClick={(event) => publishTrackHandler(event, track.id)}> Publish </Button>
                  }
                </StyledTableCell>
                {user && user.role === "admin" && <StyledTableCell align="center"><Button className={classes.deleteButton} onClick={(event) => deleteTrackHandler(event, track.id)}>  Delete</Button>  </StyledTableCell>}
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

export default TracksList;