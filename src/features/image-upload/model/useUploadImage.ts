import { useState, DragEvent } from 'react';

export function useUploadImage() {
    const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | null>(null);

    const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        checkFiles(files);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        checkFiles(files);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const checkFiles = (files: FileList | null) => {
        if (files && files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = () => {
                setUploadedImage(reader.result);
            };
        }
    };

    return { uploadedImage, handleDrop, handleDragOver, handleFileSelect };
}
