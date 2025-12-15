import styled from 'styled-components';
import { MENU } from '@/shared/constants';
import { ReactNode } from 'react';

interface MenuProps {
    menuActive: string;
    menuClick: (menu: string) => void;
    children?: ReactNode;
}

export function Menu({ menuActive, menuClick, children = null }: MenuProps) {
    return (
        <MenuStyle>
            <ul>
                {MENU &&
                    MENU.map((item, index) => (
                        <li
                            key={index}
                            className={item === menuActive ? 'active' : ''}
                            onClick={() => menuClick(item)}
                        >
                            {item}
                        </li>
                    ))}
            </ul>
            <div>{children}</div>
        </MenuStyle>
    );
}

const MenuStyle = styled.menu`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & ul {
        display: flex;
        align-items: center;
        column-gap: 1rem;

        & li {
            display: inline-flex;
            flex-shrink: 0;
            align-items: center;
            height: 48px;
            padding: 0 0.25rem;
            font-weight: 500;
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
    }
`;
