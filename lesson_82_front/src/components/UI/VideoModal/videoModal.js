import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const VideoModal = (props) => {
    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            closeAfterTransition
            onClose={props.handleClose}
            open={props.open}
        >
            <>
                {props.video ? <iframe
                    width="560"
                    height="315"
                    src={props.video}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={true}></iframe> : ""}
            </>
        </Modal>
    )
}

export default VideoModal;