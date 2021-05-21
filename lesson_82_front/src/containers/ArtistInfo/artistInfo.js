import { Grid } from "@material-ui/core";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { artistRequest, setArtist } from "../../store/actions/artistsActions";
import { albumsRequest, initAlbum } from "../../store/actions/albumsActions";
import AlbumInfoItem from "../../components/AlbumInfoItem/albumInfoItem";
import BackDrop from '../../components/UI/BackDrop/backDrop';

const ArtistInfo = (props) => {
    const id = props.match.params.id;

    const dispatch = useDispatch();
    const { artists } = useSelector(state => state.artists);
    const { albums, loading, error } = useSelector(state => state.albums);


    useEffect(() => {
        dispatch(initAlbum());

        const artist = artists.find(artist => artist.id === id);
        if (artist) {
            dispatch(setArtist(artist));
        } else {
            dispatch(artistRequest(id));
        }

        dispatch(albumsRequest(id));
    }, [dispatch, id, artists]);

    return (
        <>
            <BackDrop loading={loading} />
            <Grid container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={10}
            >
                {albums.map(album => {
                    return <AlbumInfoItem
                        id={album.id}
                        title={album.title}
                        year={album.year}
                        cover={album.cover}
                        key={album.id}
                        published={album.published}
                        error={error}
                    />
                })}
            </Grid>
        </>
    );
};

export default ArtistInfo;
