import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'


const StripeCheckoutButton=({price})=>{
const priceForStripe=price*100;
const publishableKey='pk_test_51JIUOxHY2BtAt4F72NTaC68EY3fTox72FCFjF7tTo7zzdDy7lhEcOdymz9X0484PJUpcER5zlAtCKhx5LOWEa11a00BB2CcMB0'
const onToken=token=>{
   axios({
       url:'payment',
       method:'post',
       data:{
           amount:priceForStripe,
           token
       }
   }).then(response=>{
       alert('Payment successful')
   }).catch(error=>{
       console.log('Payment error:', JSON.parse(error));
       alert('There was an issue with your payment. Please make sure you use the provided credit card')
   })
}
return (
    <StripeCheckout
    label='Pay Now'
    name='Clothing'
    billingAddress
    shippingAddress
    image='https://svgshare.com/i/CUz.svg'
    description={`Your total is €${price}`}
    amount={priceForStripe}
    panelLabel='Pay Now'
    token={onToken}
    stripeKey={publishableKey}
    />
)
}
export default StripeCheckoutButton