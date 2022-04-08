import IRestaurantState from "./type";
import IAction from "../../types/action.type";

const RestaurantReducer = {
  setRestaurantInfo: (state: IRestaurantState, action: IAction) => {
    const { payload } = action;
    state.restaurantId = payload.restaurantId;
    state.name = payload.name;
    state.logo = payload.logo;
    state.area = payload.area;
    state.razorpayId = payload.razorpayId;
    state.menus = payload.menus;
    state.categories = payload.categories;
    state.address = payload.address;
    state.published = payload.published;
    state.tag = payload.tag;
    state.latitude = payload.latitude;
    state.longitude = payload.longitude; 
    state.url = payload.url; 
    state.whatsapp = payload.whatsapp; 
    state.mobile = payload.mobile; 
    state.qrImage = payload.qrImage; 
    state.corporateName = payload.corporateName;
    state.fssai = payload.fssai;
    state.serviceCharge = payload.serviceCharge;
    state.loaded = true;

  },
};

export default RestaurantReducer;
