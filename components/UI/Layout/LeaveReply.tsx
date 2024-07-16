'use client';

import React, { useRef, useState } from 'react';
import './LeaveReply.scss';
import Rate from '@/components/UI/Checkbox/Rate';
import LeaveReplyInputs from '@/components/UI/Input/LeaveReplyInputs';
import IconIon from '@/components/UI/IonIcon/IconIon';

export default function LeaveReply() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).slice(0, 3); // Limit to 3 files
      setSelectedFiles(filesArray);
    }
  };

  return (
    <section className="leave-a-reply">
      <h2 className="secondary-heading margin-bottom-small">Leave a reply</h2>
      <p className="paragraph leave-a-reply-paragraph">Your email address will not be published. All fields, <b>except
        the image picking,</b> are
        required, though.</p>
      <div className="leave-a-reply-form">
        <form className="leave-a-reply__form">
          <div className="leave-a-reply__form-rate grid">
            <Rate label={`Location`} name={`location`} />
            <Rate label={`Amenities`} name={`amenities`} />
            <Rate label={`Food`} name={`food`} />
            <Rate label={`Room`} name={`room`} />
            <Rate label={`Price`} name={`price`} />
            <Rate label={`Tour Operator`} name={`tour-operator`} />
          </div>
          <LeaveReplyInputs />
          <div className="leave-a-reply__form-inputs-file-upload">
            <input ref={fileInputRef} type="file" name="file" id="file"
                   className="leave-a-reply__form-inputs-file-upload-input"
                   multiple onChange={handleFileChange} accept="image/jpg, image/jpeg, image/png" />
          </div>
          <div className={`choose-files-btn-wrapper`}>
            <button type="button" onClick={openFilePicker} className={`choose-files-btn`}>Pick Files</button>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className={`user-img ${selectedFiles[index] ? '' : 'none'}`}
                   style={selectedFiles[index] ? { backgroundImage: `url(${URL.createObjectURL(selectedFiles[index])})` } : {}}>
              </div>
            ))}
          </div>
          <button className="btn btn--submit flex flex-align-center">Post comment
            <IconIon type={`arrowForwardOutline`} className="icon icon--right-arrow"></IconIon>
          </button>
        </form>
      </div>
    </section>
  );
}