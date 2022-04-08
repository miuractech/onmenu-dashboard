import { Dialog } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SystemColors from "../../constants/colors";
import { setActiveCategory } from "../../store/category/slice";

import { RootState } from "../../store/store.root";
import UniversalButton from "../global/universal-button";
import CategoriesEditForm from "./categories.edit.form";
import { EllipsisPosition, OptionPosition, SingleItem, StyleLessButton } from "./constants";

// styles imports
import genericStyles from "./styles/generic.module.scss";
import PublishDialog from "./publish.dialog";
import SnackBarMessage from "./snackbar.message";

import styles from './styles/single.menu.module.scss'
import EllipsisWhite from "../global/svgs/ellipsis.white";
import EllipsisBlack from "../global/svgs/ellipsis.black";
import useCategoryEdit from "./hooks/useCategoryEdit";
import { Popover } from "@mui/material";
import { useHistory } from "react-router-dom";

const SingleCategory = ({ category }: any) => {
  const state = useSelector((state: RootState) => state);
  const role = state.user.user?.role
  const CategoryState = useSelector((state: RootState) => state.category)
  const [showOptions, setShowOptions] = React.useState<HTMLButtonElement | null>(null);
  const [publishDialog, setPublishDialog] = React.useState(false);
const history = useHistory()
  const { unpublishOrPublishCategory, successMessage } = useCategoryEdit();
  const [open,setopen]=React.useState(false);
  const dispatch = useDispatch();
  const background =
  state.category.activeCategory !== category.categoryId
    ? SystemColors.Gray_6
    : SystemColors.Blue;

    const handledialogactions = () => {
      setopen(false);
    };
    
  return (
    <>
    <div
      className={styles["single-menu"]}
      key={category.categoryId}
    >
      <div
        style={{
          minHeight: 40,
          borderRadius:4,
          paddingLeft:45,
          margin:'8px 0px',
          width: state.category.activeCategory === category.categoryId ?272:292,
          background: state.category.activeCategory === category.categoryId ? SystemColors.Blue : SystemColors.Gray_6,
          color: state.category.activeCategory === category.categoryId ? SystemColors.Gray_6 : SystemColors.Primary,
        }}
        onClick={() => {
          dispatch(setActiveCategory(category.categoryId))
          history.push(`/menus/${state.menu.activeMenuType}/${state.menu.activeMenu}/${category.categoryId}`)
        }}
      >
        <p style={SingleItem}>{category.name}</p>
      </div>
      {!category.published && (
          <div style={{ position: "absolute", top: 5, left: 5 }}>
            <img src="/unpublished.png" alt="unpublished" />
          </div>
        )}
        {CategoryState.activeCategory === category.categoryId &&
          <button
            style={{
              ...EllipsisPosition,
              position: "absolute",
              background: background,
            }}
            onClick={e => setShowOptions(e.currentTarget)}
            disabled={CategoryState.activeCategory !== category.categoryId}
            className={genericStyles["style-less-button"]}
          >
              <EllipsisWhite />
          </button>
          }
          <Popover
          open={Boolean(showOptions)}
          anchorEl={showOptions}
          onClose={() => setShowOptions(null)}
          aria-labelledby="form-dialog-title"
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
                  {category.published ? `Unpublish` : `Publish`}
                </button>
              </div>
              {role === 'admin' && <div  style={{padding:2}}>
                <button
                  style={{ ...StyleLessButton }}
                  onClick={() =>{
                    setopen(true)
                    setShowOptions(null)
                  }}
                >
                  Edit
                </button>
              </div>}
            </div>
          </Popover>
        
    </div>
    {open && (
        <Dialog
          open={open}
          onClose={() => setopen(false)}
          aria-labelledby="form-dialog-title"
        >
          <CategoriesEditForm handleClose={handledialogactions} />
        </Dialog>
      )}
      {publishDialog && (
        <Dialog
          open={publishDialog}
          onClose={() => setPublishDialog(false)}
          aria-labelledby="form-dialog-title"
        >
          <PublishDialog
            pubOrUnPub={() => unpublishOrPublishCategory()}
            published={category.published}
            handleClose={() => setPublishDialog(false)}
          />
        </Dialog>
      )}
      <SnackBarMessage
        open={successMessage}
        message={`Category ${
          category.published ? "published" : "unpublished"
        } successfully!`}
        severity="success"
      />
    </>
  );
};

export default SingleCategory;
