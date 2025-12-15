import styled from 'styled-components';

export function Header() {
    return (
        <HeaderStyle>
            <h1>Promotion Page Editor</h1>
        </HeaderStyle>
    );
}

const HeaderStyle = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;

    & h1 {
        font-size: 1.75rem;
        font-weight: 600;
        line-height: 1.25;
    }
`;
