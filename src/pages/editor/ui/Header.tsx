import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import logoImg from '@/asset/img/promokit_logo.png';

const LANGUAGES = [
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
];

export function Header() {
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLang = LANGUAGES.find((lang) => lang.code === i18n.language) || LANGUAGES[0];

    const changeLanguage = (code: string) => {
        i18n.changeLanguage(code);
        localStorage.setItem('language', code);
        setIsLangOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <HeaderBar>
            <HeaderContent>
                <LogoLink to="/">
                    <LogoImage src={logoImg} alt="PromoKit" />
                </LogoLink>
                <RightSection>
                    <Nav>
                        <NavLink to="/" $active={location.pathname === '/'}>
                            {t('common.home')}
                        </NavLink>
                        <NavLink to="/editor" $active={location.pathname === '/editor'}>
                            {t('common.editor')}
                        </NavLink>
                    </Nav>
                    <LangSelector ref={dropdownRef}>
                        <LangButton onClick={() => setIsLangOpen(!isLangOpen)}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M2 12h20" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                            <span>{currentLang.flag}</span>
                        </LangButton>
                        {isLangOpen && (
                            <LangDropdown>
                                {LANGUAGES.map((lang) => (
                                    <LangOption
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        $active={i18n.language === lang.code}
                                    >
                                        <span>{lang.flag}</span>
                                        <span>{lang.label}</span>
                                    </LangOption>
                                ))}
                            </LangDropdown>
                        )}
                    </LangSelector>
                </RightSection>
            </HeaderContent>
        </HeaderBar>
    );
}

const HeaderBar = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background: var(--c-background-secondary);
    box-shadow: var(--neu-shadow);
    z-index: 100;
`;

const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;
`;

const LogoLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
`;

const LogoImage = styled.img`
    height: 120px;
    width: auto;
`;

const Nav = styled.nav`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const NavLink = styled(Link)<{ $active: boolean }>`
    padding: 0.625rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${({ $active }) => ($active ? 'var(--c-primary-dark)' : 'var(--c-text-secondary)')};
    background: ${({ $active }) => ($active ? 'var(--c-primary-soft)' : 'transparent')};
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
        color: var(--c-primary-dark);
        background: var(--c-primary-soft);
    }
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const LangSelector = styled.div`
    position: relative;
`;

const LangButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: var(--c-background-tertiary);
    border: none;
    border-radius: 12px;
    cursor: pointer;
    color: var(--c-text-secondary);
    transition: all 0.2s ease;

    &:hover {
        background: var(--c-primary-soft);
        color: var(--c-primary-dark);
    }

    svg {
        flex-shrink: 0;
    }
`;

const LangDropdown = styled.div`
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    background: var(--c-background-secondary);
    border-radius: 12px;
    box-shadow: var(--neu-shadow);
    overflow: hidden;
    min-width: 140px;
    z-index: 200;
`;

const LangOption = styled.button<{ $active: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    background: ${({ $active }) => ($active ? 'var(--c-primary-soft)' : 'transparent')};
    color: ${({ $active }) => ($active ? 'var(--c-primary-dark)' : 'var(--c-text-primary)')};
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: var(--c-primary-soft);
        color: var(--c-primary-dark);
    }
`;
