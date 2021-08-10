import React, {useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import OutsideClickHandler from 'react-outside-click-handler';
import {createStructuredSelector} from 'reselect'
import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selectors'
import {trueCartHidden} from '../../redux/cart/cart.actions'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import {auth} from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import './header.styles.scss'
const Header= React.forwardRef(({currentUser,hidden, trueCartHidden},ref)=>{
   

  
    useEffect(() => {
      const checkIfClickedOutside = (e) => {
          console.log(hidden)
        // If the menu is open and the clicked target is not within the menu,
        // then close the menu
        if (hidden===false && ref.current && !ref.current.contains(e.target)) {
            trueCartHidden()
            console.log(hidden)
        }
       /*  if (hidden){
            console.log('hello')
        } */
      };
      console.log(hidden)
      document.addEventListener("mousedown", checkIfClickedOutside);
  
      return () => {
        // Cleanup the event listener
        document.removeEventListener("mousedown", checkIfClickedOutside);
      };
    });
    return(
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/contact'>
                CONTACT
            </Link>
            {
                currentUser?<div className='option' onClick={()=>auth.signOut()}>SIGN OUT</div>:<Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon ref={ref}/>
        </div>
            {hidden?null:/* (<OutsideClickHandler className='header-dropdown'
      onOutsideClick={
          () => {
        console.log('hello')
        trueCartHidden()
      }
    }
    >
      <CartDropdown/>
    </OutsideClickHandler>) */ <CartDropdown ref={ref}/>}
    </div>
)})

const mapDispatchToProps=dispatch=>({
    trueCartHidden:()=>dispatch(trueCartHidden())
}
)

const mapStateToProps=createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden
})
export default connect(mapStateToProps,mapDispatchToProps)(Header);