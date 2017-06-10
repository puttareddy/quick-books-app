function stringsToObject (actions) {
  return actions.trim().split(/\s+/).reduce((obj, action) => {
    obj[action] = action
    return obj
  }, {})
}

export default {
  QUICK_BOOKS_CUSTOMERS_API: 'https://quick-books-app.herokuapp.com/api/customers',

  ACTIONS: stringsToObject(`
    REQUEST_NUTRIENTS_DATA
    RECEIVE_NUTRIENTS_DATA
    FILTER_NUTRIENTS_DATA
    SORT_NUTRIENTS_DATA

    SET_ERROR_MESSAGE
    RESET_ERROR_MESSAGE
  `)
}
