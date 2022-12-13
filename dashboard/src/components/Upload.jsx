import React, { useState } from 'react'

const Upload = ({fileRef,handleFileChange}) => {

    return (
        <div className='hidden'>
            <input ref={fileRef} type="file" onChange={handleFileChange} multiple />
        </div>
    )
}

export default Upload;