interface ILocation {
  lat: number;
  long: number;
}

export default interface IRestaurantState {
  fssai: any;
  corporateName: any;
  whatsapp: string;
  restaurantId: string;
  name: string;
  logo: string;
  menus: Array<string>;
  tag: string;
  address: string;
  published: boolean;
  serviceCharge: number | null;
  latitude: number;
  longitude: number;
  loaded: boolean;
  area: string;
  razorpayId: string;
  qrImage: string;
  url: string;
  categories:Array<string>;
  mobile:string;
}
