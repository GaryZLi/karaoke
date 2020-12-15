import axios from 'axios';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import SidePanel from './Containers/SidePanel';
import SongInput from './Containers/SongInput';
import {
    updatePlaylist,
    getVideo,
    sleep,
} from './redux/actions';

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    video: {
        height: '100%',
        width: '100%',
        borderTop: '1px solid black',
        borderRight: '1px solid black',
    },
    
    contentContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
    },
});


const path = 'http://localhost:5000/';

const App = ({
    currentVideo,
    delay,
    updatePlaylist,
    getVideo,
}) => {
    const classes = useStyles();

    // TODO: when it ends, go to next
    useEffect(() => {
        axios.get(path)
        .then(res => updatePlaylist(res.data))
        .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const video = document.getElementById('myVideo');

        const handleVideoEnd = async () => {
            await sleep(Number(delay) * 1000);
            getVideo();
        };

        video.addEventListener('ended', handleVideoEnd);

        return () => video.removeEventListener('ended', handleVideoEnd);
    }, [delay]);

    return (
        <div className={classes.root}>
            <SongInput/>
            <div className={classes.contentContainer}>
                <video 
                    id='myVideo' 
                    className={classes.video} 
                    src={path + currentVideo} 
                    autoPlay 
                    // muted 
                    controls
                />
                <SidePanel/>
            </div>
        </div>
    );
}

const states = ({
    currentVideo,
    delay,
}) => ({
    currentVideo,
    delay,
});

const dispatch = {
    updatePlaylist,
    getVideo,
};

export default connect(states, dispatch)(App);
