import {addCartItemRequest, addCartItemSuccess, processCodPaymentFail, processCodPaymentRequest, processCodPaymentSuccess} from '../slices/cartSlice';
import {createOrder} from "./orderActions"
import axios from 'axios'

export const addCartItem = (id, quantity) => async(dispatch) => {
    try {
        dispatch(addCartItemRequest())
        const {data } = await axios.get(`/api/v1/product/${id}`)
        dispatch(addCartItemSuccess({
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].image,
            stock: data.product.stock,
            quantity
        }))
    } catch (error) {
        
    }
}

export const processCodPayment = (order) => async (dispatch) => {
    try{
        dispatch(processCodPaymentRequest())
        const response = await createOrder(order)(dispatch)

        if(response.success){
            dispatch(processCodPaymentSuccess())
        }else {
            dispatch(processCodPaymentFail("Payment failed."))
        }
    }catch(error){
        dispatch(processCodPaymentFail(error.message))
    }
}