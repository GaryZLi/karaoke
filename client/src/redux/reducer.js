import * as types from './action-types';

const initialState = {
    currentVideo: '',
    queue: [],
    playlist: [],
    sidePanelOpened: true,
    delay: null,
};

const reducer = (state = JSON.parse(JSON.stringify(initialState)), action) => {
    switch (action.type) {
        case types.UPDATE_VIDEO:
            return {
                ...state,
                currentVideo: action.video,
            };

        case types.GET_VIDEO:
            let newQueue = [
                ...state.queue,
            ];
            newQueue.push(newQueue.shift());

            let video = newQueue.length? newQueue[0] : '';

            return {
                ...state,
                currentVideo: video,
                queue: [
                    ...newQueue
                ],
            };

        case types.UPDATE_SIDE_PANEL:
            return {
                ...state,
                sidePanelOpened: action.opened,
            };

        case types.UPDATE_PLAYLIST:
            return {
                ...state,
                playlist: [
                    ...state.playlist,
                    ...action.videos,
                ],
            };

        case types.ADD_TO_QUEUE:
            return {
                ...state,
                queue: [
                    ...state.queue,
                    action.video,
                ],
                currentVideo: state.currentVideo.length? state.currentVideo : action.video,
            };

        case types.REMOVE_FROM_QUEUE:
            return {
                ...state,
                queue: [
                    ...state.queue.slice(0, action.number),
                    ...state.queue.slice(action.number + 1),
                ],
            }

        case types.SET_DELAY:
            return {
                ...state,
                delay: action.seconds,
            };

        default:
            return state;
    }
};

export default reducer;