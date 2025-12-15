import styled, { css } from 'styled-components';
import { useState } from 'react';
import { useUploadImageStore } from '@/shared/store';

interface UploadAreaStyleProps {
    $isDraggedOver: boolean;
}

export function UploadArea() {
    const { handleDrop, handleDragOver, handleFileSelect } = useUploadImageStore();
    const [isDraggedOver, setIsDraggedOver] = useState(false);

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggedOver(true);
        handleDragOver(event);
    };

    const onDragDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggedOver(false);
        handleDrop(event);
    };

    return (
        <>
            <UploadAreaStyle
                $isDraggedOver={isDraggedOver}
                onDragOver={onDragOver}
                onDrop={onDragDrop}
                onDragLeave={() => setIsDraggedOver(false)}
            >
                <p>
                    이미지 파일을 <br />
                    드래그 해주세요.
                </p>
            </UploadAreaStyle>
            <input
                id="promotionPage-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileSelect}
            />
            <UploadBtn htmlFor="promotionPage-upload">이미지 업로드</UploadBtn>
        </>
    );
}

const UploadAreaStyle = styled.div<UploadAreaStyleProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
    padding: 1rem;
    width: 200px;
    height: 150px;
    border: 3px dashed #e5e5e5;
    background-color: transparent;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    text-align: center;

    ${(props) =>
        props.$isDraggedOver &&
        css`
            border: 3px dashed var(--c-accent-primary);
        `}

    & p {
        font-weight: 700;
        color: var(--c-accent-primary);
    }
`;

const UploadBtn = styled.label`
    display: block;
    padding: 0.5rem;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background: var(--c-accent-primary);
    color: #ffffff;
    box-shadow: 0 0 10px var(--c-accent-primary);
    text-align: center;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover {
        opacity: 0.9;
    }
`;
