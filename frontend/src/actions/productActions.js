import axios from 'axios'
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from '../constants/productContants'

export const listProducts = () => async (dispatch) => {
  try {
    // Loading is true
    dispatch({ type: PRODUCT_LIST_REQUEST })

    // Fetch Data
    const { data } = await axios.get('/api/products')
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    // if there is an error
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}