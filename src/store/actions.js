import * as types from './types.js';
import mock from '@/server/index';

export default {
    async getMock({commit}) {
        let {data} = await mock.mockData()
        commit(types.SET_MOCK, data);
    }
};