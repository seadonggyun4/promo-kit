import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
`;

export const CircleInput = styled.input`
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

export const TextInput = styled.input`
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
