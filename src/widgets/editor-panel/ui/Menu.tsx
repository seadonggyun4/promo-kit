import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { MENU } from '@/shared/constants';
import { ReactNode } from 'react';

interface MenuProps {
    menuActive: string;
    menuClick: (menu: string) => void;
    children?: ReactNode;
}

export function Menu({ menuActive, menuClick, children = null }: MenuProps) {
    const { t } = useTranslation();

    return (
        <MenuStyle>
            <MenuList>
                {MENU &&
                    MENU.map((item, index) => (
                        <MenuItem
                            key={index}
                            $isActive={item === menuActive}
                            onClick={() => menuClick(item)}
                        >
                            {t(`editor.${item}`)}
                        </MenuItem>
                    ))}
            </MenuList>
            <ActionArea>{children}</ActionArea>
        </MenuStyle>
    );
}

const MenuStyle = styled.menu`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const MenuList = styled.ul`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

interface MenuItemProps {
    $isActive: boolean;
}

const MenuItem = styled.li<MenuItemProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 1.25rem;
    font-weight: 600;
    font-size: 0.9rem;
    color: ${props => props.$isActive ? 'var(--c-primary-dark)' : 'var(--c-text-secondary)'};
    background: ${props => props.$isActive ? 'var(--c-background-tertiary)' : 'transparent'};
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: ${props => props.$isActive ? 'var(--neu-shadow-inset)' : 'none'};

    &:hover {
        color: var(--c-primary);
        background: var(--c-background-tertiary);
    }
`;

const ActionArea = styled.div`
    display: flex;
    align-items: center;
`;
