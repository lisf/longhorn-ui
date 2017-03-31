import { query } from '../services/volume'
import { parse } from 'qs'

export default {
  namespace: 'volume',
  state: {
    data: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/volume') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },
  effects: {
    *query({
      payload,
    }, { call, put }) {
      const data = yield call(query, parse(payload))
      if (payload.field && payload.keyword) {
        data.data = data.data.filter(item => item[payload.field].indexOf(payload.keyword) > -1)
      }
      yield put({ type: 'queryVolume', payload: { ...data } })
    },
  },
  reducers: {
    queryVolume(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
