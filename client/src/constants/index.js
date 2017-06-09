function stringsToObject (actions) {
  return actions.trim().split(/\s+/).reduce((obj, action) => {
    obj[action] = action
    return obj
  }, {})
}

export default {
  // nutrient ids from SR28 docs
  // http://www.ars.usda.gov/sp2UserFiles/Place/80400525/Data/SR/SR28/sr28_doc.pdf
  NUTRIENTS: [208, 205, 203, 204, 269, 291, 303],
  USDA_NUTRIENTS_URL_WITH_APIKEY: 'http://localhost:3006/api/Customers',

  ACTIONS: stringsToObject(`
    REQUEST_NUTRIENTS_DATA
    RECEIVE_NUTRIENTS_DATA
    FILTER_NUTRIENTS_DATA
    SORT_NUTRIENTS_DATA

    SET_ERROR_MESSAGE
    RESET_ERROR_MESSAGE
  `)
}
