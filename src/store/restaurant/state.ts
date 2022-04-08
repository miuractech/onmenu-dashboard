import IRestaurantState from "./type";

const RestaurantState: IRestaurantState = {
  restaurantId: "",
  name: "",
  logo: "",
  menus: [],
  tag: "",
  address: "",
  published: false,
  serviceCharge: null,
  latitude: 0,
  longitude: 0,
  loaded: false,
  area: '',
  razorpayId: '',
  qrImage: "",
  url: "",
  whatsapp:'',
  categories:[],
  mobile:'',
  corporateName:'',
  fssai:'',
};

export default RestaurantState;
