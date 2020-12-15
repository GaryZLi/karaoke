import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import {
    updateVideo,
} from '../redux/actions';

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxHeight: '40%',
        overflow: 'auto',
    },
    video: {
        width: '90%',
        borderLeft: '1px solid black',
        borderTop: '1px solid black',
        display: 'flex',
        padding: 10,

        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#CBCBCB',
        }
    },
    button: {
        minHeight: 30,
        minWidth: 30,
        maxHeight: 30,
        maxWidth: 30,
    },
});

const Playlist = ({
    videos,
    icon,
    updateVideo,
    buttonAction,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                videos.map((video, id) => (
                    <div
                        key={id}
                        className={classes.video}
                    >
                        <div onClick={() => updateVideo(video)}>
                            {video}
                        </div>
                        <button 
                            className={classes.button}
                            onClick={() => buttonAction(video, id)}
                        >
                            {icon}
                        </button>
                    </div>
                ))
            }
        </div>
    );
};

const state = ({}) => ({});

const dispatch = {
    updateVideo,
};

export default connect(state, dispatch)(Playlist);