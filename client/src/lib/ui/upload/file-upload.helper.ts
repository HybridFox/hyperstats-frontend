import { FormBuilder } from '@angular/forms';

export const createFileUploadControl = (asset = {
    id: '',
    mimetype: '',
    uploadDate: '',
    originalname: ''
}) => {
    const formBuilder = new FormBuilder();
    return formBuilder.group({
        id: [asset.id],
        mimetype: [asset.mimetype],
        uploadDate: [asset.uploadDate],
        originalname: [asset.originalname]
    });
};
