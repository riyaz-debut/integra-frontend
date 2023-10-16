import React from 'react'

const FileHeader = (props) => {
    const { file, onDelete } = props

    return (
        <React.Fragment>
            <div className="d-flex">
        <div>
         {file.name}
        </div>
        <div className="ml-auto">
          <button className="btn btn-danger" onClick={() => onDelete(file)}>Delete</button>
        </div>
      </div>
            
        </React.Fragment>
    )
}

export default FileHeader
