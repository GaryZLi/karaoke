import { connect } from 'react-redux';
// import { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    ChevronLeft,
    ChevronRight,
} from '@material-ui/icons';
import {
    updateSidePanel,
    updatePlaylist,
} from '../redux/actions';
import { useState } from 'react';
import Axios from 'axios';

const useStyles = makeStyles({
    container: {
        height: 30,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        position: 'relative',
    },
    input: {
        height: '100%',
        width: 400,
        fontSize: 20,
    },
    button: {
        height: '100%',
        width: 100,
        fontSize: 20,
        marginLeft: 20,
    },
    sidePanelButton: {
        position: 'absolute',
        right: 50,
        backgroundColor: 'rgb(239, 239, 239, 0.8)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,

        '&:hover': {
            cursor: 'pointer',
        }
    },
})

const path = 'http://localhost:5000/';

const SongInput = ({
    sidePanelOpened,
    updateSidePanel,
    updatePlaylist,
}) => {
    const classes = useStyles();
    const [link, setLink] = useState('');

    const handleDrawer = () => updateSidePanel(!sidePanelOpened);

    const handleAdd = () => {
        if (!link.length) return;

        Axios.post(path + 'download/', {
            link,
        })
        .then(res => updatePlaylist([res.data]))
        .catch(err => console.log(err));
    };

    return (
        <div className={classes.container}>
            <input 
                className={classes.input} 
                value={link}
                onChange={e => setLink(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAdd()}
            />
            <button className={classes.button} onClick={handleAdd}>加歌</button>
            <div
                className={classes.sidePanelButton}
                onClick={handleDrawer}
            >
                {sidePanelOpened ? <ChevronRight /> : <ChevronLeft />}
            </div>
        </div>
    );
};

const states = ({ sidePanelOpened }) => ({ sidePanelOpened });

const dispatch = {
    updateSidePanel,
    updatePlaylist,
};

export default connect(states, dispatch)(SongInput);