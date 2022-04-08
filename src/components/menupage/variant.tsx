import React from "react";
import styles from './styles/variant.module.scss'
import {
  Control,
  FieldValues,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
import { IconButton } from "@material-ui/core";
import RemoveIcon from '@mui/icons-material/Remove';
interface IProps {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues, object>;
  variantName: string;
}

const Variant: React.FC<IProps> = ({ register, control, variantName }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: variantName,
  });
  return (
    <div className={styles["variant"]}>
      <label 
      className={styles["variant__label"]} 
      style={{fontWeight:400}}
      >{variantName}: </label>
        <div className={styles["variant__container--detailed"]} style={{display: "inline-block"}} >
          {/* <label>Maximum allowed :</label> */}
          <input
            type="number"
            placeholder="Enter base price"
            {...register(`food_variants.${variantName}`, {
              required: true,
              min: 1,
            })}
          />
        </div>
    </div>
  );
};

export default Variant;
