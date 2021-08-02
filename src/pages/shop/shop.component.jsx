import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'

import CollectionsOverviewComtainer from '../../components/collections-overview/collections-overview.container'
import CollectionPageContainer from '../../pages/collection/collection.container'
import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions'



const ShopPage=({fetchCollectionsStartAsync,match})=> {

useEffect(() => {
 fetchCollectionsStartAsync()
}, [fetchCollectionsStartAsync])

            
return (
              
              <div className='shop-page'>
                 
              <Route exact path={`${match.path}`} component={CollectionsOverviewComtainer} />
              <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
           </div>
              )
       }
  
   



const mapDispatchToProps=(dispatch)=>({
       fetchCollectionsStartAsync:()=>dispatch(fetchCollectionsStartAsync())
})
 
export default connect (null,mapDispatchToProps)(ShopPage);