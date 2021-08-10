import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'
import {selectCartItems} from '../../redux/cart/cart.selectors'
import {toggleCartHidden} from '../../redux/cart/cart.actions'

import './cart-dropdown.styles.scss'
const ref = React.createRef();
const CartDropdown=({cartItems,history,dispatch})=>(
    <div className='cart-dropdown' ref={ref}>
        <div className='cart-items'>
            {
            cartItems.length?
            cartItems.map(cartItem=>(
                <CartItem key={cartItem.id} item={cartItem}/>
            )):(
                <span className='empty-message'>Your cart is empty</span>
            )}
        </div>
        {cartItems.length?<CustomButton onClick={()=>{history.push('/checkout'); dispatch(toggleCartHidden())}}>GO TO CHECKOUT</CustomButton>:null}
    </div>
)

const mapStateToProps=(state)=>({
cartItems:selectCartItems(state)
}
)

export default withRouter(connect(mapStateToProps)(CartDropdown))