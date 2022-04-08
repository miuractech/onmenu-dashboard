export default interface IMenuState {
  showMenuEditForm: boolean;
  activeMenuType: string;
  activeMenu: string;
  menus: Array<IMenu>;
}

export interface IMenu {
  index: number;
  name: string;
  type: string;
  menuId: string;
  restaurantId: string;
  published: boolean|string;
  timing: ITiming;
  image: string;
  description: string;
}

interface ITiming {
  Monday: Array<any>;
  Tuesday: Array<any>;
  Wednesday: Array<any>;
  Thurday: Array<any>;
  Friday: Array<any>;
  Saturday: Array<any>;
  Sunday: Array<any>;
}
