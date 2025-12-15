import { create } from 'zustand';
import { DragEvent } from 'react';

interface UploadImageState {
    uploadedImage: string | ArrayBuffer | null;
}

interface UploadImageActions {
    setUploadedImage: (image: string | ArrayBuffer | null) => void;
    handleDrop: (e: DragEvent<HTMLDivElement>) => void;
    handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
    handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useUploadImageStore = create<UploadImageState & UploadImageActions>((set) => ({
    uploadedImage: null,

    setUploadedImage: (image) => {
        set({ uploadedImage: image });
    },

    handleDrop: (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = () => {
                set({ uploadedImage: reader.result });
            };
        }
    },

    handleDragOver: (e) => {
        e.preventDefault();
    },

    handleFileSelect: (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = () => {
                set({ uploadedImage: reader.result });
            };
        }
    },
}));
