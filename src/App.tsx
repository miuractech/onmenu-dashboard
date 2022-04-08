// direct npm package imports
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

// components imports
import LeftSide from "./components/global/left-side";
import Loader from "./components/global/loader";
import TopBar from "./components/global/topbar";

// hooks imports
import useFetchRestaurantInfo from "./hooks/useFetchRestaurantInfo";
import useFetchUser from "./hooks/useFetchUser";

// head components
import MenuPage from "./pages/menu.page";
import AuthPageIndex from "./pages/auth.page";
import Logout from "./pages/logout.page";
import Payment from "./components/payments"
import Feedback from "./components/feedback"
// redux store
import store, { RootState } from "./store/store.root";
import './App.css'
// import logout from "./service/auth/logout.service";
import Index from "./components/settings/settings";
import currentUser from "./components/currentUser";
import Loyalty from "./components/loyalty";
import { Bin, MenuUnderWorkPage, PublishedMenuPage } from "./components/menupage";
import Qrcode from "./components/global/qrcode";
import Orders from "./components/orders";
import useMultiRestaurant from "./hooks/useMultiRestaurant";
import IRestaurantState from "./store/restaurant/type";
import UniversalButton from "./components/global/universal-button";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import fetchRestaurantInfoService from "./service/restaurant/restaurant.info.service";
import { setRestaurantInfo } from "./store/restaurant/slice";
import { setActiveMenuType } from "./store/menu/slice";
import { setUser } from "./store/user/slice";

// logout()


interface IAuthRouteProps {
  component: React.ComponentType<any>;
  componentProps?:any;
  path: string;
  exact: boolean;

}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Wrapper />
    </Provider>
  );
};

const Wrapper = () => {
  useFetchUser();
  const state = useSelector((state: RootState) => state);
  

  return (
    <React.Fragment>
      {state.user.multiRestaurant === undefined && <Loader />}
      {state.user.multiRestaurant === null && <AuthPageIndex />}
      {state.user.multiRestaurant && <MultiRestaurantHandler />}
    </React.Fragment>
  );
};



export const MultiRestaurantHandler = () => {
  // useMultiRestaurant();
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch()
  
  return (
    <React.Fragment>
      {state.user.multiRestaurant && !state.user.user && 
      <div
      style={{width: '100%', height: '100vh',display: 'flex',alignItems:'center',justifyContent:'center'}}
      >
        <div>
          <div
          style={{
            textAlign:'center',
            justifyContent:'center',
            fontWeight:700,
            fontSize:24
          }}
          >
            Select Restaurant
          </div>
          <br />
            {state.user.multiRestaurant.map((restaurant:IRestaurantState)=>(
              <Card 
              style={{ width: 345,margin:16 }}
              onClick={async ()=>{
                localStorage.setItem('restaurantId',restaurant.restaurantId)
                dispatch(setUser(restaurant))
                const restaurantInfo = await fetchRestaurantInfoService(
                  restaurant.restaurantId
                );
                if (Object.keys(restaurantInfo).length > 0) {
        
                  dispatch(setRestaurantInfo(restaurantInfo));
        
                  dispatch(setActiveMenuType("deli"));
                }
                else{
                  alert('error')
                }
              }}
              >
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={restaurant.logo?restaurant.logo:"https://via.placeholder.com/350"}
              />
              <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                  {restaurant.name}
                </Typography>
               
              </CardContent>
              <CardActions>
                <Button size="small">Open</Button>
              </CardActions>
            </Card>
            ))}
            </div>
        </div>
      }
      {/* {state.user.user === null && <AuthPageIndex />} */}
      {state.user.user && <DashBoard />}
    </React.Fragment>
  );
}

const DashBoard: React.FC = () => {
  // useFetchRestaurantInfo();

  return (
    <div className="app">
      <Router>
        <Switch>
          <AuthRoute path="/menus/:selectedType/:selectedMenu/:selectedCategory" exact component={MenuPage}  />
          <AuthRoute path="/menus/:selectedType/:selectedMenu/" exact component={MenuPage} />
          <AuthRoute path="/menus/:selectedType/" exact component={MenuPage} />
          <AuthRoute path="/menus/" exact component={MenuPage} />
          <Route path="/" exact>
          <Redirect to="/menus" />
          </Route>
          <AuthRoute path="/payments/" exact component={Payment} />
          <AuthRoute path="/service-alert/" exact component={Feedback} />
          <AuthRoute path="/logout" exact component={Logout} />
          <AuthRoute path="/settings" exact component={Index} />
          <AuthRoute path="/active-customers" exact component={currentUser} />
          <AuthRoute path="/published-menus" exact component={PublishedMenuPage} />
          <AuthRoute path="/under-work" exact component={MenuUnderWorkPage} componentProps={{publish:'created'}} />
          <AuthRoute path="/bin" exact component={Bin} />
          <AuthRoute path="/loyalty-alert" exact component={Loyalty} />
          <AuthRoute path="/qr-code" exact component={Qrcode} />
          <AuthRoute path="/orders" exact component={Orders} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

const AuthRoute: React.FC<IAuthRouteProps> = ({
  component: Component,
  componentProps,
  ...rest
}) => {
  const RestaurantState = useSelector((state: RootState) => state.restaurant);
  return (
    <React.Fragment>
      {RestaurantState.loaded ? 
      <>
        <div className="app__left"><LeftSide /></div>
        <div className="app__right"><TopBar />
          <Route {...rest} render={(props) => <Component {...componentProps} {...props} />} />
        </div> 
      </>
      : null}
    </React.Fragment>
  );
};

const NotFound: React.FC = () => {
  return <Redirect to='/' />;
};



export default App;
