import React, { useState, useEffect } from "react";
import FileHeader from './FileHeader'

const SingleFileUploadWithProgress = (props) => {
    const { file, onDelete, onUpoad } = props
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const upload = async () => {
      let url = await uploadFile(file, setProgress);
      console.log("url", url)
      onUpoad(file, url)
    };

    upload();
  }, []);

  const uploadFile = (file, onProgress) => {
    //Upload file in cloudinary for testing 
    //https://cloudinary.com/documentation/upload_images

    const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
    const key = "docs_upload_example_us_preset";

    return new Promise((res, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);

      xhr.onload = () => {
        const response = JSON.parse(xhr.responseText);
        res(response.secure_url);
      };

      xhr.onerror = (event) => reject(event);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = (event.loaded / event.total) * 100;
          onProgress(Math.round(percentage));
        }
      };

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", key);

      xhr.send(formData);
    });
  };

  return (
    <React.Fragment>
      @@@@@@@@@@@@@@@@@ {progress} @@@@@@@@@@@@
      <FileHeader file={file} onDelete={onDelete} /> 
      {/* <div className="d-flex">
        <div>
         {file.name}
        </div>
        <div className="ml-auto">
          <button className="btn btn-danger" onClick={() => onDelete(file)}>Delete</button>
        </div>
      </div> */}
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {progress}%
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleFileUploadWithProgress;
