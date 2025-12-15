import { useState, useEffect, ChangeEvent } from "react";
import * as S from "./styles";

declare global {
    interface Window {
        SeoToast: {
            error: (message: string) => void;
            success: (message: string) => void;
            warning: (message: string) => void;
            info: (message: string) => void;
        };
    }
}

interface ColorPickerProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let color = e.target.value.toUpperCase();

        if (color && !color.startsWith('#')) {
            color = '#' + color;
        }

        if (/^#[A-Fa-f0-9]{0,6}$/.test(color) || color === '') {
            setInputValue(color || '#');
        }
    };

    const handleBlur = () => {
        if (/^#[A-Fa-f0-9]{6}$/.test(inputValue)) {
            onChange({ target: { value: inputValue } } as ChangeEvent<HTMLInputElement>);
        } else {
            if (window.SeoToast) {
                window.SeoToast.error('올바른 색상 코드를 입력해주세요 (예: #FF5500)');
            }
            setInputValue(value);
        }
    };

    return (
        <S.Wrapper>
            <S.CircleInput
                type="color"
                value={value}
                onChange={onChange}
            />
            <S.TextInput
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                maxLength={7}
                placeholder="#000000"
            />
        </S.Wrapper>
    );
}
