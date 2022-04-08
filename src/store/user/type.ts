export default interface IUser {
  multiRestaurant: any;
  user: undefined | null | IUserData;
  authPageToggle: boolean;
}

interface IUserData {
  email: string;
  registered: boolean;
  restaurantId: string;
  role: "admin" | "staff";
}
