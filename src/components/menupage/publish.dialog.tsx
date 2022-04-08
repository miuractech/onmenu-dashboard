import React from "react";
import UniversalButton from "../global/universal-button";

import { CenterDiv } from "./constants";

interface IProps {
  pubOrUnPub: () => void;
  published: boolean | string;
  handleClose: () => void;
}

const PublishDialog: React.FC<IProps> = ({
  pubOrUnPub,
  published,
  handleClose,
}) => {
  return (
    <div style={{ height: 250, width: 500 }}>
      <div style={{ ...CenterDiv, flexDirection: "column" }}>
        <h3
          style={{
            marginTop: 20,
            fontFamily: "Poppins",
            fontWeight: 500,
            fontStyle: "normal",
            fontSize: "2em",
          }}
        >
          Are you sure you want to {!published || published==='created' ?  "publish?":"unpublish?"}
        </h3>
        <div
          style={{
            marginTop: 50,
            display: "flex",
            justifyContent: "space-between",
            minWidth: 250,
          }}
        >
          <UniversalButton
            height={30}
            width={120}
            selected={true}
            handleClick={() => {
              pubOrUnPub();
              handleClose();
            }}
          >
            Confirm
          </UniversalButton>
          <UniversalButton
            height={30}
            width={120}
            selected={false}
            handleClick={() => handleClose()}
          >
            Cancel
          </UniversalButton>
        </div>
      </div>
    </div>
  );
};

export default PublishDialog;


export const DeleteDialog: React.FC<any> = ({
  deleteMenu,
  handleClose,
}) => {
  // console.log(deleteMenu);
  
  return (
    <div style={{ height: 250, width: 500 }}>
      <div style={{ ...CenterDiv, flexDirection: "column" }}>
        <h3
          style={{
            marginTop: 20,
            fontFamily: "Poppins",
            fontWeight: 500,
            fontStyle: "normal",
            fontSize: "2em",
          }}
        >
          Are you sure you want to Delete?
        </h3>
        <div
          style={{
            marginTop: 50,
            display: "flex",
            justifyContent: "space-between",
            minWidth: 250,
          }}
        >
          <UniversalButton
            height={30}
            width={120}
            selected={true}
            handleClick={() => {
              deleteMenu();
              handleClose();
            }}
          >
            Confirm
          </UniversalButton>
          <UniversalButton
            height={30}
            width={120}
            selected={false}
            handleClick={() => handleClose()}
          >
            Cancel
          </UniversalButton>
        </div>
      </div>
    </div>
  );
};



