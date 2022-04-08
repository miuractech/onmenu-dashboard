// npm packages direct imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@material-ui/core";

// constants imports
import SystemColors from "../../constants/colors";
import {
  DefaultPoppins,
  EllipsisPosition,
  OptionPosition,
  StyleLessButton,
} from "./constants";

// reducers imports
import { setActiveCategory } from "../../store/category/slice";
import { setActiveMenu } from "../../store/menu/slice";

// types imports
import { RootState } from "../../store/store.root";

// global components imports
import EllipsisBlack from "../global/svgs/ellipsis.black";
import EllipsisWhite from "../global/svgs/ellipsis.white";
import UniversalButton from "../global/universal-button";

// hooks imports
import useMenuEdit from "./hooks/useMenuEdit";

import styles from "./styles/single.menu.module.scss";

// native components imports
import MenuEditForm from "./menu.edit.form";

// styles imports
import genericStyles from "./styles/generic.module.scss";
import PublishDialog, { DeleteDialog } from "./publish.dialog";
import SnackBarMessage from "./snackbar.message";
import { Popover } from "@mui/material";
import { useHistory } from "react-router-dom";

const SingleMenu = ({ menu,key,path }: any) => {
  const MenuState = useSelector((state: RootState) => state.menu);
  const role = useSelector((state: RootState) => state.user.user?.role);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showOptions, setShowOptions] = React.useState<HTMLButtonElement | null>(null);
  const { unpublishOrPublishMenu, successMessage,deleteMenu } = useMenuEdit();
  const [open, setopen] = React.useState(false);
  const [publishDialog, setPublishDialog] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState(false)

  const handledialogactions = () => {
    setopen(false);
  };

  const background =
    MenuState.activeMenu !== menu.menuId
      ? SystemColors.Gray_6
      : SystemColors.Blue;

  return (
    <>
      <div
        className={styles["single-menu"]}
        // style={{ position: "relative", marginBottom: "10px" }}
        key={key}
      >

        {/* {MenuState.showMenuEditForm && <MenuEditForm />} */}
        <div
        style={{
          minHeight: 40,
          borderRadius:4,
          paddingLeft:45,
          margin:'8px 0px',
          width: MenuState.activeMenu === menu.menuId?272:292,
          background: MenuState.activeMenu === menu.menuId ? SystemColors.Blue : SystemColors.Gray_6,
          color: MenuState.activeMenu === menu.menuId ? SystemColors.Gray_6 : SystemColors.Primary,
        }}
          // height={40}
          // width={MenuState.activeMenu === menu.menuId?272:292}
          // selected={MenuState.activeMenu === menu.menuId}
          onClick={() => {
            dispatch(setActiveMenu(menu.menuId));
            dispatch(setActiveCategory(""));
            history.push(`/menus/${MenuState.activeMenuType}/${menu.menuId}`)
          }}
        >
          <p
            style={{
              ...DefaultPoppins,
              fontSize: "1.75rem",
            }}
          >
            {menu.name}
          </p>
        </div>
        {(!menu.published || menu.published === 'created') && (
          <div style={{ position: "absolute", top: 5, left: 5 }}>
            <img src="/unpublished.png" alt="unpublished" />
          </div>
        )}
        {MenuState.activeMenu === menu.menuId && 
        <button
          style={{
            ...EllipsisPosition,
            position: "absolute",
            background: background,
          }}
          onClick={e => setShowOptions(e.currentTarget)}
          // disabled={MenuState.activeMenu !== menu.menuId}
          className={genericStyles["style-less-button"]}
        >
            <EllipsisWhite />
         
        </button>}
        {Boolean(showOptions) && (
          // <div
          //   style={{ ...OptionPosition, position: "absolute", zIndex: 1200 }}
          // >
          <Popover
            open={Boolean(showOptions)}
            anchorEl={showOptions}
            onClose={()=>setShowOptions(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <div style={{padding:8}}>
              <div  style={{padding:2}}>
                <button
                  style={{ ...StyleLessButton }}
                  onClick={() =>{
                     setPublishDialog(true)
                     setShowOptions(null)
                    }}
                >
                  {menu.published ==='deleted'?
                    "Restore"
                    :
                    <>
                    {!menu.published || menu.published ==='created'  ? `Publish`:`Unpublish` }
                    </>
                  }
                </button>
              </div>
              {role === 'admin' && <>
              <div  style={{padding:2}}>
                <button
                  style={{ ...StyleLessButton }}
                  onClick={() =>{
                    setopen(true)
                    setShowOptions(null)
                  }}
                >
                  Edit
                </button>
              </div>
              {menu.published !=='deleted' &&<div  style={{padding:2}}>
                <button
                  style={{ ...StyleLessButton }}
                  onClick={() =>{
                     setDeleteDialog(true)
                     setShowOptions(null)
                    }}
                >
                  Delete
                </button>
              </div>}
              </>}
            </div>
         </Popover>
        )}
        
      </div>
      {open && (
        <Dialog
          open={open}
          onClose={() => setopen(false)}
          aria-labelledby="form-dialog-title"
        >
          <MenuEditForm handleClose={handledialogactions} />
        </Dialog>
      )}
      
        <Dialog
          open={publishDialog}
          onClose={() => setPublishDialog(false)}
          aria-labelledby="form-dialog-title"
        >
          <PublishDialog
            pubOrUnPub={() => unpublishOrPublishMenu()}
            published={menu.published}
            handleClose={() => setPublishDialog(false)}
          />
        </Dialog>

        <Dialog
          open={deleteDialog}
          onClose={() => setPublishDialog(false)}
          aria-labelledby="form-dialog-title"
        >
          <DeleteDialog
            deleteMenu={()=>deleteMenu()}
            handleClose={() => setDeleteDialog(false)}
          />
        </Dialog>
      
      <SnackBarMessage
        open={successMessage}
        message={`Menu ${
          menu.published ? "published" : "unpublished"
        } successfully!`}
        severity="success"
      />
    </>
  );
};

export default SingleMenu;
