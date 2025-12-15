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
