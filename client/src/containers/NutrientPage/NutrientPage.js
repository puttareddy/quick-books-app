import React from 'react'
import CustomerTable from '../../components/CustomerTable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { tableActions as actions } from '../../actions'

const NutrientPage = (props) => {
  return (
    <div>
      <h2> Quick Books Customers List </h2>
      <CustomerTable {...props} />
    </div>
  )
}

const mapStateToProps = ({table}) => table
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(NutrientPage)
