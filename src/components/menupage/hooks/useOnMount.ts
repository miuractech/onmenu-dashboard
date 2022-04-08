import { useDispatch, useSelector } from "react-redux";
import useFetchCategories from "../../../hooks/useFetchCategories";
import useFetchMenus from "../../../hooks/useFetchMenus";
import { setActiveCategory, setCategories } from "../../../store/category/slice";
import { setActiveMenu, setActiveMenuType } from "../../../store/menu/slice";
import { RootState } from "../../../store/store.root";

export default function useOnMount() {
  const dispatch = useDispatch();
  const MenuState = useSelector((state: RootState) => state.menu);
  useFetchMenus();
  useFetchCategories();

  function handleClick(type: string,menu?:string,category?:string) {
    dispatch(setActiveMenuType(type));
    dispatch(setActiveMenu(menu?menu:""));
    dispatch(setActiveCategory(category?category:""));
  }

  return { handleClick, MenuState };
}
