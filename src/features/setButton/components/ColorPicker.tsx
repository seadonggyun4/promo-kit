import { useState, useEffect, ChangeEvent } from "react";
import { ColorInputWrapper, CircleColorInput, ColorValueInput } from "./FormStyles";

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

function ColorPicker({ value, onChange }: ColorPickerProps) {
    const [inputValue, setInputValue] = useState(value);

    // value prop이 변경되면 inputValue 동기화 (color picker에서 변경 시)
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    // 텍스트 입력 핸들러 - 자유롭게 입력 허용
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let color = e.target.value.toUpperCase();

        // # 없으면 추가
        if (color && !color.startsWith('#')) {
            color = '#' + color;
        }

        // HEX 문자만 허용
        if (/^#[A-Fa-f0-9]{0,6}$/.test(color) || color === '') {
            setInputValue(color || '#');
        }
    };

    // blur 시 유효성 검사 후 적용
    const handleBlur = () => {
        // 유효한 HEX 형식인지 확인 (6자리만)
        if (/^#[A-Fa-f0-9]{6}$/.test(inputValue)) {
            onChange({ target: { value: inputValue } } as ChangeEvent<HTMLInputElement>);
        } else {
            // 유효하지 않으면 toast 알림 후 원래 값으로 복원
            if (window.SeoToast) {
                window.SeoToast.error('올바른 색상 코드를 입력해주세요 (예: #FF5500)');
            }
            setInputValue(value);
        }
    };

    return (
        <ColorInputWrapper>
            <CircleColorInput
                type="color"
                value={value}
                onChange={onChange}
            />
            <ColorValueInput
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                maxLength={7}
                placeholder="#000000"
            />
        </ColorInputWrapper>
    );
}

export default ColorPicker;
