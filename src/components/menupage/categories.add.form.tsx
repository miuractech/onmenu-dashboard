// npm packages direct imports
import React from "react";
import { useForm } from "react-hook-form";

// global components imports
import UniversalButton from "../global/universal-button";
import useAddCategory from "./hooks/useAddCategory";

import uploadImageToFirebaseStorage from "../../service/utils/upload.image";
import UploadedImage from "../../service/utils/uploadedImage";
// styles imports
import styles from "./styles/categories.add.form.module.scss";

interface IProps {
  handleClose: () => void;
  newIndex:number;
}


const CategoriesForm: React.FC<IProps> = ({handleClose,newIndex}) => {
  const { register, handleSubmit,formState: { errors } } = useForm();
  const [imageFile, setImageFile] = React.useState<string | null>(null);
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

  const {onSubmit}=useAddCategory();
  const addCategory = (data:any) => {
    const image = imageFile?imageFile:null
    // console.log(image,data);
    
    onSubmit({...data,index:newIndex,image});
    handleClose()
  }
  

  return (
    <>
      <div className={styles.container}>
        <form
          className={styles["form-container"]}
          onSubmit={handleSubmit(addCategory)}
        >
          <div className={styles["fields-container"]}>
            <label style={{ fontSize: "1.5rem" }}>Name of the Category: </label>
            <div className={styles["fields-container-textarea"]}>
              <textarea
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
                  // required
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
                type="number"
                step=".01"
                {...register("tax", { required: true, min: 0, max: 100 })}
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
            // handleClick={handleSubmit(onSubmit)}
            type="submit"
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
    </>
  );
};

export default CategoriesForm;
