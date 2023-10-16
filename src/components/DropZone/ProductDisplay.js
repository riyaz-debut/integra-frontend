import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import PropTypes from "prop-types";

//import ConFirmationDialog from './../../confirmation-dialog/ConFirmationDialog';
import Alert from "@mui/material/Alert";
import config from "config.js";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  productContainer: {
    marginTop: "10px",
  },
  paper: {
    //height: '350px',
    width: "100%",
    textAlign: "center",
    // color: theme.palette.text.secondary,
    position: "relative",
  },
  deleteIcon: {
    position: "relative",
    right: 0,
  },
  // alertWrapper '& MuiAlert-message' : {
  //   padding: "0px 0"
  // }
}));

const ProductDisplay = (props) => {
  const { productImages, editFileData, onDeleteProductImage } = props;

  const [selectedfile, setSelectedFile] = useState("");
  const classes = useStyles();
  const conFirmationDialogRef = useRef(null);

  const onConfirmDelete = (type, image) => {
    setSelectedFile({ key: type, imageData: image });
    conFirmationDialogRef.current.handleClickOpen();
  };

  const deleteRecord = (type, image) => {
    console.log("block 1", selectedfile)
    setSelectedFile({key: type, imageData:image });
    onDeleteProductImage({key: type, imageData:image });
  };

  //   @@@@@@@@@@@@@@@@@@@@@@@@@@@@ Image Previou @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const previouImages = () => {
    return productImages.map((image, index) => {
      return (
        <React.Fragment key={index}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className={`${classes.productContainer} outerWrapper `}
          >
            <Paper className={classes.paper}>
              <Alert severity="success" variant="outlined"  className="alertWrapper">
                {image.file.name}
                <DeleteForeverIcon  fontSize="medium" onClick={() => deleteRecord("selectedImages", image)}/>
              </Alert>
              {/* <img src={image.previousFile} className="selected" alt="productPhoto"/> */}{" "}
              {image.errors.length > 0 ? (
                <Alert severity="error" variant="outlined">
                  {displayError(image.errors)}
                </Alert>
              ) : (
                ""
              )}
            </Paper>
          </Grid>
        </React.Fragment>
      );
    });
  };

  //   @@@@@@@@@@@@@@@@@@@@@@@@@@@@ edit images @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//   const editImages = () => {
//     return editFileData.map((image, index) => {
//       return (
//         <React.Fragment key={index}>
//           <Grid
//             item
//             xs={12}
//             sm={6}
//             md={6}
//             lg={4}
//             className={`${classes.productContainer} outerWrapper `}
//           >
//             <Paper className={classes.paper}>
//               {/* <img src={`${config.baseURL}/${config.backendImagePath}/${image.name}`} className="selected" alt="producImage"/> */}
//               <img src={`${config.baseURL}/${image.name}`} className="selected" alt="producImage" />
//               {/* @@@@@@@@@@@@@@@@@@@@@@@@@@ Delete Icon @@@@@@@@@@@@@@@@@@@@ */}
//               <div className="deleteIcon">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="25"
//                   height="25"
//                   fill="currentColor"
//                   className="deleteImageIcon bi bi-trash"
//                   viewBox="0 0 16 16"
//                   onClick={() => onConfirmDelete("editImage", image)}
//                 >
//                   <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
//                   <path
//                     fillRule="evenodd"
//                     d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
//                   />
//                 </svg>
//               </div>{" "}
//             </Paper>
//           </Grid>
//         </React.Fragment>
//       );
//     });
//   };

  //   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Error Display @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const displayError = (errors) => {
    return errors.map((error, index) => {
      if (error.code === "file-invalid-type") {
        return (
          <span className="text-danger" key={index}>
            Invalid file type. Only jpg, jpeg, png image files are allowed.
          </span>
        );
      }
      if (error.code === "file-too-large") {
        return (
          <span className="text-danger" key={index}>
            File Size is too large. Allowed file size is less than 5MB
          </span>
        );
      }

      return (
        <span className="text-danger" key={index}>
          {error.message}
        </span>
      );
    });
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {/* {editFileData.length> 0 && displayImages() } */}
          {/* {editFileData && editFileData.length > 0 && editImages()} */}
          {productImages.length > 0 && previouImages()}
        </Grid>
      </div>

      {/* <ConFirmationDialog
                ref={conFirmationDialogRef}
                title="Delete Product Image"
                content="Are you sure to delete product image ? "
                isConfirm={deleteRecord}
            /> */}
    </React.Fragment>
  );
};

ProductDisplay.propTypes = {
  productImages: PropTypes.any,
  onDeleteProductImage: PropTypes.any,
  editFileData: PropTypes.any,
  // allFieldValue: PropTypes.any,
  // fileValidate: PropTypes.any,
};

export default ProductDisplay;
