import styled from "styled-components";

// 모달 메뉴 탭
export const ModalMenu = styled.ul`
    display: flex;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--c-border-primary);

    & li {
        display: inline-flex;
        flex-shrink: 0;
        align-items: center;
        height: 30px;
        font-weight: 500;
        font-size: 0.9rem;
        color: inherit;
        border-bottom: 3px solid transparent;
        text-decoration: none;
        cursor: pointer;
        transition: 0.15s ease;
    }

    & li:hover,
    & li.active {
        color: var(--c-accent-primary);
        border-bottom-color: var(--c-accent-primary);
    }
`;

// 설정 폼 컨테이너
export const SettingForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    height: 100%;
    max-height: 380px;
    overflow-y: auto;
    padding: 5px;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: var(--c-background-tertiary);
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--c-border-primary);
        border-radius: 3px;
    }
`;

// 폼 라벨
export const StyledLabel = styled.label`
    color: var(--c-text-action);
    font-size: 0.85rem;
    font-weight: 500;
    margin-top: 0.25rem;
`;

// 텍스트 입력 필드
export const StyledInput = styled.input`
    padding: 0.6rem 0.75rem;
    border: 2px solid var(--c-border-primary);
    border-radius: 8px;
    outline: none;
    font-size: 0.9rem;
    transition: 0.2s ease-in-out;
    background: var(--c-background-primary);

    &:focus {
        border-color: var(--c-accent-primary);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    &::placeholder {
        color: var(--c-text-tertiary);
    }
`;

// 색상 입력 래퍼 - 원형 색상 선택기
export const ColorInputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
`;

// 원형 색상 선택 버튼
export const CircleColorInput = styled.input`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 36px;
    height: 36px;
    border: 3px solid var(--c-background-primary);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    flex-shrink: 0;

    &::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    &::-webkit-color-swatch {
        border: none;
        border-radius: 50%;
    }

    &::-moz-color-swatch {
        border: none;
        border-radius: 50%;
    }

    &:focus {
        outline: none;
    }
`;

// 색상 값 입력 필드
export const ColorValueInput = styled.input`
    width: 90px;
    font-size: 0.8rem;
    font-family: monospace;
    color: var(--c-text-secondary);
    background: var(--c-background-tertiary);
    padding: 0.35rem 0.5rem;
    border: 2px solid transparent;
    border-radius: 4px;
    outline: none;
    transition: 0.2s ease-in-out;
    text-transform: uppercase;

    &:focus {
        border-color: var(--c-accent-primary);
        background: var(--c-background-primary);
    }

    &:hover:not(:focus) {
        background: var(--c-background-secondary);
    }
`;

// 그라데이션 색상 그리드
export const ColorGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    padding: 0.5rem 0;
`;

// 그라데이션 색상 아이템
export const ColorGridItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: var(--c-background-tertiary);
    border-radius: 8px;
`;

// 색상 아이템 라벨
export const ColorItemLabel = styled.span`
    font-size: 0.75rem;
    color: var(--c-text-secondary);
    white-space: nowrap;
`;

// 레거시 지원 - 기존 코드 호환성
export const StyledColorLabel = styled.label`
    display: none;
`;

// 레거시 지원
export const HiddenColorInput = styled.input`
    display: none;
`;
