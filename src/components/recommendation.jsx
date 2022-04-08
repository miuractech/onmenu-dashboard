import React, { useState } from 'react'
import styles from "./menupage/styles/dish.add.form.module.scss";
import { InstantSearch, Hits, Configure } from "react-instantsearch-dom"
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter"
import { createConnector, connectStateResults } from 'react-instantsearch-dom';
import { RootState } from "../store/store.root";
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import DishCard from './dishCard';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
    server: {
      apiKey: "Eksb8SAIEYXiEhndyYJrI5YaFlUydHVI", // Be sure to use a Search API Key
      nodes: [{
        'host': 'zl04bsu67g1dmjotp-1.a1.typesense.net', // where xxx is the ClusterID of your Typesense Cloud cluster
        'port': '443',
        'protocol': 'https'
      }],
    },
    // The following parameters are directly passed to Typesense's search API endpoint.
    //  So you can pass any parameters supported by the search endpoint below.
    //  queryBy is required.
    additionalSearchParameters: {
      queryBy: "dish_name",
      per_page:30,
      // filter_by:`restaurant_id: ${restaurant.restaurantId}`,
      // group_by:`category`
    },
  })

export default function Recommendation({recommendation, setRecommendation}) {
    return (
        <div style={{minWidth:350,height:500}} >
            <div
            style={{
                marginLeft:40,
                fontWeight:600,
                fontSize:21
            }}
            >
                Add recommendation
            </div>
            <div className={styles.container}
            style={{margin:0}}
            >
                <div
                className={styles["form-container"]}
                >
                <div className={styles["fields-container-textarea"]}  style={{width:'100%'}}>
                {/* <textarea
                style={{width:'100%'}}
                placeholder="Search for dish to add..."
                    // {...register("dishName", { required: true, minLength: 1 })}
                /> */}
                <TypesenseSearch
                recommendation={recommendation}
                setRecommendation={setRecommendation}
                />
             
            </div>
                </div>
            </div>
        </div>
    )
}






// import { IconButton, TextField } from '@material-ui/core';
// import {  Clear, SearchOutlined } from '@material-ui/icons';
// import { useDispatch, useSelector } from 'react-redux';
// import {  selectrestaurant } from '../restaurant/restaurantSlice';
// import { setCurrent } from '../bottomNav/bottomSlice';
// import { SearchClient as TypesenseSearchClient } from "typesense";




const convert = (t) => { 
  for (var key in t){
      try{
        t[key] = JSON.parse(t[key])
      }
      catch(err){
        
      }
    }
  return t
}

function TypesenseSearch({recommendation, setRecommendation}) {
  const restaurant = useSelector((RootState) => RootState.restaurant)
  const currentType = useSelector((state) => state.menu.activeMenuType)
  // console.log(currentType);
  
  const Hit = ({ hit }) => {
    const dish = convert(hit)
        return(
            <React.Fragment key={dish.dish_id}>
            {/* <DishCard dish={dish} filter={[]} /> */}
            <div style={{margin:'14px 0px',width:'100%',maxWidth:400,display:'flex'}}>
              <div>
                <img src={dish.image?dish.image:''} style={{width:75,borderRadius:8}} alt="" />
              </div>
              <div
              style={{
                  paddingLeft:15,
                  fontSize:14
              }}
              >
                  <div 
                  style={{marginBottom:8}}
                  >
                    {dish.dish_name}
                  </div>
              <div>
                  {(recommendation.filter(d=>d.dish_id === dish.dish_id).length > 0) ?
                  <Button
                  variant='outlined'
                  color='primary'
                  onClick={()=>{
                      var refined = recommendation.filter(d=>d.dish_id !== dish.dish_id);
                      setRecommendation(refined)
                  }}
                  >
                      remove
                  </Button>
                :  
                <Button
                  variant='contained'
                  color='primary'
                  onClick={()=>{
                    var refined =[...recommendation,{dish_id:dish.dish_id,dish_name:dish.dish_name,images:dish.images?dish.images:''}]
                    // console.log(refined)
                    setRecommendation(refined)
                }}
                  >
                      add
                  </Button>
                }
              </div>
              </div>
            </div>
          </React.Fragment>
      )
    }



  const facetFilters = React.useMemo(() => [`restaurant_id: ${restaurant.restaurantId}`,`type:${currentType}`], [restaurant.restaurantId])
  
  return (
    <div>
      <InstantSearch searchClient={typesenseInstantsearchAdapter.searchClient} indexName="dishes"  >
        <ConnectedSearchBox  />
        {/* <Stats /> */}
        <Configure facetFilters={facetFilters} />
        {/* <RefinementList
          attribute={'category'}
        /> */}
          <Hits hitComponent={Hit} />
          <Results>
          </Results>
      </InstantSearch>
    </div>
  )
}

const Results = connectStateResults(({ searchState,children }) => 
  (!searchState || !searchState.query) && (
    <div>
    </div>
  )
);


const connectWithQuery = createConnector({
  displayName: 'WidgetWithQuery',
  getProvidedProps(props, searchState) {
    const currentRefinement = searchState.attributeForMyQuery || null;
    return { currentRefinement };
  },
  refine(props, searchState, nextRefinement) {
    return {
      ...searchState,
      attributeForMyQuery: nextRefinement,
    };
  },
  getSearchParameters(searchParameters, props, searchState) {
    
    return searchParameters.setQuery(searchState.attributeForMyQuery || null);
  },
  cleanUp(props, searchState) {
    const { attributeForMyQuery, ...nextSearchState } = searchState;

    return nextSearchState;
  },
});

const MySearchBox = ({ currentRefinement, refine,cleanUp }) => {
  return(
    <TextField
      placeholder='search' 
      onFocus={(e) => e.target.placeholder = ""} 
      onBlur={(e) => e.target.placeholder = "search"}
      value={currentRefinement}
      onChange={e => refine(e.currentTarget.value)}
      variant='outlined'
      fullWidth
      InputProps={{
        disableUnderline:true,
        className:'onmenu-input',
        style:{width:'100%'},
        // startAdornment:<SearchOutlined style={{color:'#a0a0a0',marginRight:8}} />,
        // endAdornment:currentRefinement?
        // <IconButton 
        // size='small' 
        // style={{marginLeft:-4}} 
        // onClick={(e) =>{
        //   refine('')
        // }}
        // >
        //   <Clear />
        // </IconButton>
        // :null
      }}
      />
)};

const ConnectedSearchBox = connectWithQuery(MySearchBox);