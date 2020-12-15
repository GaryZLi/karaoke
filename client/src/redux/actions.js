import * as types from './action-types';

export const updateVideo = video => ({
    type: types.UPDATE_VIDEO,
    video,
});

export const getVideo = () => ({
    type: types.GET_VIDEO,
});

export const updateSidePanel = opened => ({
    type: types.UPDATE_SIDE_PANEL,
    opened,
});

export const updatePlaylist = videos => ({
    type: types.UPDATE_PLAYLIST,
    videos,
});

export const addToQueue = video => ({
    type: types.ADD_TO_QUEUE,
    video,
});

export const removeFromQueue = (video, number) => ({
    type: types.REMOVE_FROM_QUEUE,
    number,
});

export const setDelay = seconds => ({
    type: types.SET_DELAY,
    seconds,
});

export const sleep = seconds => new Promise((resolve) => setTimeout(resolve, seconds));