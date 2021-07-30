import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../../pages/collection/collection.component'
import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions'
import { selectIsCollectionFetching, selectIsCollectionLoaded} from '../../redux/shop/shop.selectors'
const CollectionsOverviewWithSpinner=WithSpinner(CollectionsOverview)
const CollectionsPageWithSpinner=WithSpinner(CollectionPage)
class ShopPage extends React.Component {

       componentDidMount(){
      const {fetchCollectionsStartAsync}=this.props
      fetchCollectionsStartAsync()

       }
       render() {
              const {match, isCollectionFetching,selectIsCollectionLoaded}=this.props
              return (
              
              <div className='shop-page'>
                     {console.log(this.props)}
              <Route exact path={`${match.path}`} render={(props)=><CollectionsOverviewWithSpinner isLoading={isCollectionFetching}{...props}/>} />
              <Route path={`${match.path}/:collectionId`} render={(props)=><CollectionsPageWithSpinner isLoading={!selectIsCollectionLoaded}{...props}/>} />
           </div>
              )
       }
  
   
}

const mapStateToProps=createStructuredSelector({
       isCollectionFetching:selectIsCollectionFetching,
       selectIsCollectionLoaded:selectIsCollectionLoaded
})
const mapDispatchToProps=(dispatch)=>({
       fetchCollectionsStartAsync:()=>dispatch(fetchCollectionsStartAsync())
})
 
export default connect (mapStateToProps,mapDispatchToProps)(ShopPage);