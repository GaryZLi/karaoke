import { connect } from 'react-redux';
import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Playlist from '../Components/Playlist';
import {
    addToQueue,
    removeFromQueue,
    setDelay,
} from '../redux/actions';

const useStyles = makeStyles({
    root: {
        height: '100%',
        transition: 'all 0.5s ease-out',
    },
    heading: {
        fontWeight: 500,
        fontSize: 30,
        paddingTop: 20,
        width: '100%',
        // borderBottom: '1px solid black',
        textShadow: '1px 1px 1px gray'
    },
    input: {
        fontSize: 20,
    }
});

const SidePanel = ({
    sidePanelOpened,
    playlist,
    queue,
    delay,
    addToQueue,
    removeFromQueue,
    setDelay,
}) => {
    const classes = useStyles();
    const [filter, setFilter] = useState('');

    if (filter.length) {
        playlist = playlist.filter(video => video.includes(filter));
    }

    return (
        <div className={classes.root}
            style={{
                width: sidePanelOpened? 400 : 0,
                paddingLeft: sidePanelOpened? 20 : 0,
                visibility: sidePanelOpened? 'visible' : 'hidden',
            }}
        >
            <div className={classes.heading}>隊列</div>
            <input 
                className={classes.input}
                type='number'
                value={delay}
                placeholder='秒延遲'
                onChange={e => setDelay(e.target.value)}
            />
            <Playlist 
                videos={queue} 
                icon='X'
                buttonAction={removeFromQueue}
            />
            <div className={classes.heading}>歌曲播放清單</div>
            <input 
                className={classes.input}
                placeholder='找一首歌'
                value={filter}
                onChange={e => setFilter(e.target.value)}
            />
            <Playlist 
                videos={playlist} 
                icon='+'
                buttonAction={addToQueue}
            />
        </div>
    );
};

const states = ({
    sidePanelOpened,
    playlist,
    queue,
    delay,
}) => ({
    sidePanelOpened,
    playlist,
    queue,
    delay,
});

const dispatch = {
    addToQueue,
    removeFromQueue,
    setDelay,
};

export default connect(states, dispatch)(SidePanel);