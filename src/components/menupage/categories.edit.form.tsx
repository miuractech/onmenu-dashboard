import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import uploadImageToFirebaseStorage from '../../service/utils/upload.image';
import UploadedImage from '../../service/utils/uploadedImage';
import UniversalButton from "../global/universal-button";
import useCategoryEdit from './hooks/useCategoryEdit';
import SnackBarMessage from './snackbar.message';
import styles from "./styles/categories.add.form.module.scss";
interface IProps {
  handleClose: () => void;
}
const CategoriesEditForm:React.FC<IProps> = ({ handleClose }) => {
  const [imageFile, setImageFile] = React.useState<string | null>(null);
  const { register, handleSubmit,formState: { errors } } = useForm();
  const {onSubmit,selectedCategoryDetails,successMessage}=useCategoryEdit();
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file !== undefined) {
        const res = await uploadImageToFirebaseStorage("category", file);
        setImageFile(res);
      } else {
        setImageFile(null);
      }
    }
  }
  useEffect(() => {
    if(selectedCategoryDetails?.image){
      setImageFile(selectedCategoryDetails.image)
    }
  }, [])
  const submitFunction = (data: any) => {
    onSubmit({...selectedCategoryDetails,...data,image:imageFile})
  }
  return (
    <>
      <div className={styles.container}>
        <form
          className={styles["form-container"]}
          onSubmit={handleSubmit(submitFunction)}
        >
          <div className={styles["fields-container"]}>
            <label style={{ fontSize: "1.5rem" }}>Name of the Category: </label>
            <div className={styles["fields-container-textarea"]}>
              <textarea
                defaultValue={selectedCategoryDetails?.name}
                {...register("categoryName", { required: true, minLength: 1 })}
              />
              {errors?.categoryName?.type === "required" && (
                <div className={styles["fields-container-textarea--required"]}>
                  Category Name is required
                </div>
              )}
            </div>
          </div>
          <div className={styles["fields-container"]}>
            <label style={{ fontSize: "1.5rem" }}>Description: </label>
            <div className={styles["fields-container-textarea"]}>
              <textarea
              defaultValue={selectedCategoryDetails?.description}
                style={{ height: "100px" }}
                {...register("description")}
              />
              {errors?.description?.type === "required" && (
                <div className={styles["fields-container-textarea--required"]}>
                  Description is required
                </div>
              )}
            </div>
          </div>
          <div className={styles["fields-container"]}>
            <label style={{ fontSize: "1.5rem" }}>Image: </label>
              {imageFile?
                <UploadedImage
                src={imageFile}
                imgProps={{style:{maxHeight:150,maxWidth:150}}}
                style={{display:'inline-block',width:'60%'}}
                remove={()=>setImageFile(null)}
                />
              :
              <label className={styles["upload-custom-btn"]}>
                <input
                  type="file"
                  className={styles["input"]}
                  multiple
                  accept="image/*"
                  required
                  onChange={(e) => handleChange(e)}
                />
                Upload Image
              </label>
              }
          </div>
          <div className={styles["fields-container"]}>
            <label style={{ fontSize: "1.5rem" }}>Tax: </label>
            <div className={styles["fields-container-input"]}>
              <input
              defaultValue={selectedCategoryDetails?.tax}
                type="number"
                {...register("tax", { required: true, min: 0, max: 10000 })}
              />
              {errors?.tax?.type === "required" && (
                <div className={styles["fields-container-input--required"]}>
                  Tax is required
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "1.5rem 1.5rem 0 1.5rem",
            }}
          >
          <UniversalButton
            height={40}
            width={130}
            selected={true}
            handleClick={handleSubmit(submitFunction)}
          >
            SAVE
          </UniversalButton>
          <UniversalButton
            height={40}
            width={130}
            selected={false}
            handleClick={handleClose}
          >
            CLOSE
          </UniversalButton>
          </div>
        </form>
      </div>
      <SnackBarMessage
        open={successMessage}
        message="Menu updated successfully"
        severity="success"
      />
    </>
  )
}

export default CategoriesEditForm