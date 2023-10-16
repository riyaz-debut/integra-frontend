import React from 'react'
import FileHeader from './FileHeader'
import SingleFileUploadWithProgress from "./SingleFileUploadWithProgress";

const UploadError = (props) => {
    const { file, onDelete, errors } = props
    return (
        <React.Fragment>
            <FileHeader file={file} onDelete={onDelete} /> 
            <div className="progress">
        <div
          className="progress-bar progress-bar-danger progress-bar-striped"
          role="progressbar"
          style={{ width: '100%' }}
          aria-valuenow={100}
          aria-valuemin={0}
          aria-valuemax={100}
        >
        </div>
      </div>
      <ul>
      {errors.map((error, index) => {
          return(
            <li key={index} className="text-danger">{error.message}{error.code}</li>   
          )
      })}
      </ul>
        </React.Fragment>
    )
}

export default UploadError
