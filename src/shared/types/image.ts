import { DragEvent, ChangeEvent } from 'react';

export interface UploadImageContextType {
    uploadedImage: string | ArrayBuffer | null;
    handleDrop: (e: DragEvent<HTMLDivElement>) => void;
    handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
    handleFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
}
