import { FormBuilder } from '@angular/forms';

export const createFileUploadControl = (asset = {
    assetId: '',
    mimetype: '',
    uploadDate: '',
    originalname: ''
}) => {
    const formBuilder = new FormBuilder();
    return formBuilder.group({
        assetId: [asset.assetId],
        mimetype: [asset.mimetype],
        uploadDate: [asset.uploadDate],
        originalname: [asset.originalname]
    });
};
