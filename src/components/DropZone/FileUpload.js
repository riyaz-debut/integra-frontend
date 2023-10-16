import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import { ErrorMessage } from "formik";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { makeStyles } from '@material-ui/styles';

import MDTextError from "components/MDTextError/";
import ProductDisplay from './ProductDisplay';

import { SNACKBAR_OPEN } from 'store/actions/common/actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    outline: "none",
    border: "none",
    width: "350px",
    margin: "0px 0px 8px 0px"
  },
  root: {
    display: "flex",
    backgroundColor: "#f1f1f1",
    border: "2px dashed #92b0b3",
    width: "350px",
    textAlign: "center",
    outline: "none !important",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    outline: "none !important",
    margin: "0 auto",
  },
  content: {
    flex: "1 0 auto",
    padding: "24px 24px 0px 24px ",
  },
  cover: {
    width: 151,
  },
  fileContent: {
    fontSize: "1.00rem"
  },
  uploadIcon: {
    height: '2em',
    width: "3em"
  },
  dropText: {
    fontSize: "1.00rem",
    padding: "0px 0px 8px 0px"
  },
  inputWrapper: {
    background: 'red'
  }

}));

const FileUpload = (props) => {
  const { name, onSelect, allFieldValue, saveImage, fileData, fileValidate } = props;

  const [images, setImages] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();


  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {

    let count = 0;
    //Here we have create object inside object we have return image previou link and selected file object
    const acceptedFileData = acceptedFiles.map((selectedfile) => {
      if (selectedfile.type != fileValidate.fileExtension) {
        count = 1;
        dispatch({ type: SNACKBAR_OPEN, open: true, message: 'Invalid file ', alertSeverity: 'error', variant: 'alert' });
        return false;
      }
      let data = {
        file: selectedfile,
        errors: [],
        //previousFile ==> used for previous images. here we have create image into base64
        previousFile: URL.createObjectURL(selectedfile),
      };
      return data;

    });
    if (count === 0) {
      // setImages((previousState) => [...previousState, ...acceptedFileData]);
      setImages(acceptedFileData);
      saveImage(allFieldValue, "file", acceptedFileData[0].file);
    }

  });


  //   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Image Delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const onDelete = (deleteData) => {
    let deleteFile = deleteData.imageData;

    // return false
    if (deleteData.key === "selectedImages") {
      console.log(deleteData)
      setImages((currentdata) =>
        currentdata.filter((filterData) => filterData.file !== deleteFile.file)
      );
      // console.log(" TTTTTTTTTTTTTTTTTTTTTT ", allFieldValue.imageData.file )
      // //Apply filter on files array ==> allFieldValue.files( all selected files )
      // const allImages = allFieldValue.imageData.file.filter(
      //   (filterData) => filterData.file !== deleteFile.file
      // );
      saveImage(allFieldValue, "file", []);
    }

    if (deleteData.key === "editImage") {
      // onSelect(allFieldValue, 'deleteImages', deleteFile._id)

      const allImages = allFieldValue.files.filter(
        (filterData) => filterData._id !== deleteFile._id
      );
      let data = {
        deleteImages: [...allFieldValue.deleteImages, deleteFile._id],
        files: allImages,
      };

      onSelect(allFieldValue, data);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 1024 * 1024 * fileValidate.maxSize

  });

  return (
    <React.Fragment>
      <div {...getRootProps()} className={classes.wrapper}>
        <input {...getInputProps()} className={classes.inputWrapper }/>
        <Card className={classes.root}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5" className={classes.fileContent}>
                Live From Space
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <CloudUploadIcon className={classes.uploadIcon} />
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              {isDragActive ? <p className={classes.dropText}>Drop the files here ...</p> : <p className={classes.dropText}>Drag,drop select files here</p>}
            </div>
          </div>
        </Card>
      </div>
      <ErrorMessage name={name} component={MDTextError} />
      {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Display selected file @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
      {/* {images.length > 0 && previouImages()} */}
      {/* @@@@@@@@@@@@@@@ */}
      {/* <ul>
                <li> {images.length > 0 ? JSON.stringify(images) : 'No file selected'}</li>
            </ul> */}
      <ProductDisplay productImages={images} editFileData={fileData} onDeleteProductImage={onDelete} />
    </React.Fragment>
  );
};

FileUpload.propTypes = {
  name: PropTypes.string,
  fileData: PropTypes.any,
  onSelect: PropTypes.any,
  saveImage: PropTypes.any,
  allFieldValue: PropTypes.any,
  fileValidate: PropTypes.any,
  onDelete: PropTypes.any,
  // getInputProps: PropTypes.any,
};

export default FileUpload;
