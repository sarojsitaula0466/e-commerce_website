import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import "./header.styles.scss";
const Header = ({ currentUser, hidden, toggleCartHidden }) => {
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/contact">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}

        {hidden ? (
          <CartIcon />
        ) : (
          <OutsideClickHandler
            display="contents"
            onOutsideClick={() => undefined}
          >
            <CartIcon />
          </OutsideClickHandler>
        )}
      </div>
      {hidden ? null : (
        <OutsideClickHandler
          display="contents"
          onOutsideClick={toggleCartHidden}
        >
          <CartDropdown />
        </OutsideClickHandler>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
