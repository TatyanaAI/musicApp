import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { albumRequest, setAlbum } from '../../store/actions/albumsActions';
import { tracksRequest } from '../../store/actions/tracksActions';
import BackDrop from '../../components/UI/BackDrop/backDrop'

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
});



const TracksList = (props) => {
  const id = props.match.params.id;

  const classes = useStyles();

  const dispatch = useDispatch();
  const { albums } = useSelector(state => state.albums);
  const { tracks, loading, error } = useSelector(state => state.tracks);

  useEffect(() => {
    const album = albums.find(album => album.id === id);
    if (album) {
      dispatch(setAlbum(album));
    } else {
      dispatch(albumRequest(id));
    }

    dispatch(tracksRequest(id));
  }, [dispatch, id]);

  return (
    <>
      <BackDrop loading={loading} />
      <TableContainer component={Paper} error={error}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Track number</StyledTableCell>
              <StyledTableCell>Track title</StyledTableCell>
              <StyledTableCell align="right">Duration</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tracks.map((track) => (
              <StyledTableRow key={track.title}>
                <StyledTableCell>{track.number}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {track.title}
                </StyledTableCell>
                <StyledTableCell align="right">{track.duration}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TracksList;