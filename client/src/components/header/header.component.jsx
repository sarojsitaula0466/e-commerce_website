import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selectors'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import {auth} from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import './header.styles.scss'
function Header({currentUser,hidden}){
    const [dropDown,setDropDown]=useState(hidden)
    const container=React.createRef();
    console.log(hidden)
        useEffect(() => {
            
        function handleClickOutside(event){
            if (
                container.current &&
                !container.current.contains(event.target)
              ) {
                setDropDown(true);
              }
      }
      document.addEventListener("click", ()=>handleClickOutside());
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("click", ()=>handleClickOutside());
      };
      
    });  
   

       
   
    console.log(hidden)
    return(
    <div className='header' ref={container}>
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
            <CartIcon/>
        </div>
            {dropDown?null:<CartDropdown/>}
    </div>
)}

const mapStateToProps=createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden
})
export default connect(mapStateToProps)(Header);