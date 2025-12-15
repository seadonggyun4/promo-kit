import { useState } from 'react';
import { MENU } from '@/shared/constants';

export function useMenu() {
    const [isActive, setIsActive] = useState<string>(MENU[0]);

    const activeMenu = (data: string): void => {
        setIsActive(data);
    };

    return { isActive, activeMenu };
}
