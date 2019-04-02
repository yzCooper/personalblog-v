import * as types from './types.js';

export default {
    [types.SET_COUNT](state, count) {
        state.count = count;
    },
    [types.SET_MOCK](state, mock) {
        state.mock = mock.projects;
    }
};