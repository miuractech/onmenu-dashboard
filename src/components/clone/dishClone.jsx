import { Dialog, Modal } from '@material-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import addOneDish from '../../service/dish/dish.add.one.service';
import UniversalButton from '../global/universal-button';
import firebase from 'firebase/app';
import 'firebase/firestore'
import { menuTypes } from '../menupage';
import Formstyles from "../menupage/styles/dish.add.form.module.scss";

export default function DishClone({setClonePopUp,clonePopUp,dish}) {
    const [currentType, setCurrentType] = useState(null);
    const [currentMenu, setCurrentMenu] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);
    const { activeMenuType,activeMenu } = useSelector((state) => state.menu)
    const {activeCategory} = useSelector((state) => state.category)
    const { restaurant:{restaurantId,menus,categories} } = useSelector((state) => state)
    // const activeMenu = useSelector((state: RootState) => state.menu)
    // console.log(categories);
    
    return (
        <div
        id="clones-id"
        >
            <Dialog
                open={clonePopUp}
                onClose={() => setClonePopUp(false)}
                key={'clone'}
                aria-labelledby="form-dialog-clone-title"
                maxWidth="md" 
            >
                <div
                id="clones"
                className={Formstyles.container}
                >
                    <div
                    className={Formstyles["form-container"]}
                    >
                        <div>
                        Clone to: 
                        </div>
                        <div className={Formstyles["fields-container"]}>
                            <label style={{ fontSize: "1.5rem" }}>Select Type: </label>
                            <div className={Formstyles["fields-container-select"]}>
                                <select 
                                name="Type" 
                                placeholder="select type"
                                value={currentType} 
                                onChange={e=>{
                                setCurrentType(e.target.value)
                                setCurrentMenu(null)
                                setCurrentCategory(null)
                                }}
                                id="">
                                    <option value={null}>select</option>
                                    {menuTypes.map(({type,name})=>(
                                    <option value={type}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {currentType && <div className={Formstyles["fields-container"]}>
                            <label style={{ fontSize: "1.5rem" }}>Select Menu: </label>
                            <div className={Formstyles["fields-container-select"]}>
                            <select name="menu" id=""
                            value={currentMenu}
                            onChange={e=>{
                                setCurrentMenu(e.target.value)
                            }}
                            ><option value={null}>select</option>
                                {menus.filter(menu=>menu.type === currentType).map(({menuId,name})=>(
                                <option value={menuId}>{name}</option>
                                ))}
                            </select>
                            </div>
                        </div>}
                        {currentMenu && categories && activeMenuType && <div className={Formstyles["fields-container"]}>
                            <label style={{ fontSize: "1.5rem" }}>Select Category: </label>
                            <div className={Formstyles["fields-container-select"]}>
                            {(currentMenu === activeMenu && currentType === activeMenuType )?<select name="category" id=""
                            value={currentCategory}
                            onChange={e=>setCurrentCategory(e.target.value)}
                            ><option value={null}>select</option>
                                {categories.filter(category=>category.menuId === currentMenu).filter(category=>category.categoryId !== activeCategory).map(({categoryId,name})=>(
                                <option value={categoryId}>{name}</option>
                                ))}
                            </select>
                            :
                            <select name="category" id=""
                            value={currentCategory}
                            onChange={e=>setCurrentCategory(e.target.value)}
                            ><option value={null}>select</option>
                                {categories.filter(category=>category.menuId === currentMenu).map(({categoryId,name})=>(
                                <option value={categoryId}>{name}</option>
                                ))}
                            </select>
                            }
                            </div>
                        </div>}
                    </div>
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "1.5rem 1.5rem 0 1.5rem",
                        }}
                    >
                   {currentType && currentMenu && currentCategory && <UniversalButton
                        height={40}
                        width={130}
                        selected={true}
                        handleClick={async()=>{
                            const ref = await firebase
                                        .firestore()
                                        .collection('dishes')
                                        .doc(restaurantId)
                                        .collection(currentType)
                                        .where('category_id','==',currentCategory)
                                        .get()
                            const index = ref.size
                            // console.log(index);
                            const newDish = {...dish,menu_id:currentMenu,category_id:currentCategory,type:currentType,dish_id:uuidV4(),index}
                            await addOneDish(
                                restaurantId, 
                                newDish.menuId,
                                newDish.type,
                                newDish.dish_id, 
                                newDish
                                );
                        }}
                    >
                        SAVE
                    </UniversalButton>}
                    <UniversalButton
                        height={40}
                        width={130}
                        selected={false}
                        handleClick={()=>setClonePopUp(false)}
                    >
                        CLOSE
                    </UniversalButton>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
