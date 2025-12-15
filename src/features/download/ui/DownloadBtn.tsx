import { useState } from 'react';
import styled from 'styled-components';
import { useWebViewDownload } from '../model';
import backgroundImage from '@/shared/assets/promotionPage.jpeg';

interface DownloadBtnProps {
    uploadedImage: string | ArrayBuffer | null;
}

interface DownloadBtnStyleProps {
    $clicked: boolean;
}

export function DownloadBtn({ uploadedImage }: DownloadBtnProps) {
    const { webViewDownload } = useWebViewDownload(uploadedImage, backgroundImage);
    const [clicked, setClicked] = useState(false);

    const handleBtnClick = () => {
        setClicked((prev) => !prev);
        webViewDownload();
    };

    return (
        <DownloadBtnStyle
            onClick={handleBtnClick}
            $clicked={clicked}
            type="button"
            aria-label="프로모션 페이지 다운로드 버튼"
        >
            <div className="wrapper" aria-hidden>
                <div className="front">페이지 다운로드</div>
                <div className="top"></div>
                <div className="right"></div>
                <div className="bottom"></div>
                <div className="left"></div>
                <div className="back">페이지 다운로드</div>
            </div>
        </DownloadBtnStyle>
    );
}

const DownloadBtnStyle = styled.button<DownloadBtnStyleProps>`
    position: relative;
    perspective: calc(1rem * 10);
    font-family: inherit;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: transparent;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:focus-visible {
        outline: 3px dashed var(--c-accent-primary);
        outline-offset: calc(3px * 2);
    }

    & .wrapper {
        position: relative;
        display: grid;
        transform: ${({ $clicked }) =>
            $clicked
                ? 'translateZ(calc(1rem * -1)) scale(1.001) rotateX(0) rotateY(0) rotateZ(0)'
                : 'translateZ(0) scale(1.001) rotateX(1.5turn) rotateY(0) rotateZ(0)'};
        transform-style: preserve-3d;
        pointer-events: none;
        transition: transform 800ms cubic-bezier(0.3, 1.4, 0.65, 1);
    }

    & .wrapper > * {
        grid-area: 1 / 1;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 800ms cubic-bezier(0.3, 1.4, 0.65, 1);
    }

    & .top,
    & .bottom {
        width: 100%;
        height: 1rem;
    }

    & .left,
    & .right {
        width: 1rem;
        height: 100%;
    }

    & .front {
        transform: translateZ(1rem);
    }

    & .back {
        transform: scaleX(-1) rotate(0.5turn);
    }

    & .top {
        transform-origin: top center;
        transform: rotateX(90deg);
    }

    & .bottom {
        align-self: end;
        transform-origin: bottom center;
        transform: rotateX(-90deg);
    }

    & .right {
        justify-self: end;
        transform-origin: center right;
        transform: rotateY(90deg);
    }

    & .left {
        justify-self: start;
        transform-origin: center left;
        transform: rotateY(-90deg);
    }

    & .front,
    & .back {
        padding: 1rem 2rem;
        background-color: ${({ $clicked }) =>
            $clicked ? 'var(--c-accent-success)' : 'var(--c-accent-primary)'};
    }

    & .wrapper :not(.front):not(.back) {
        background-color: ${({ $clicked }) =>
            $clicked ? 'var(--c-accent-success-secondary)' : 'var(--c-text-action)'};
    }
`;
