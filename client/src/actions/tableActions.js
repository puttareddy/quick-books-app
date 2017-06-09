import CONSTS from '../constants'
import fetchDispatch from './fetchUtils'

const apiProps = {
  url: CONSTS.QUICK_BOOKS_CUSTOMERS_API,
  types: {
    request: CONSTS.ACTIONS.REQUEST_NUTRIENTS_DATA,
    receive: CONSTS.ACTIONS.RECEIVE_NUTRIENTS_DATA
  }
}

function shouldFetchData ({table}) {
  return (!table.data || !table.isFetching)
}

function fetchData () {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      return dispatch(fetchDispatch(apiProps))
    }
  }
}

function filterBy (filterString) {
  return {
    type: CONSTS.ACTIONS.FILTER_NUTRIENTS_DATA,
    filterString
  }
}

function sortBy (sortKey) {
  return {
    type: CONSTS.ACTIONS.SORT_NUTRIENTS_DATA,
    sortKey
  }
}

export default { fetchData, filterBy, sortBy }
