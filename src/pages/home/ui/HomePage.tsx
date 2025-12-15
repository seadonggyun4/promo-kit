import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Header } from '@/pages/editor/ui/Header';
import bannerImg from '@/asset/img/promokit_baner.png';

export function HomePage() {
    const { t } = useTranslation();

    return (
        <>
            <Header />
            <MainStyle>
                <HeroSection>
                    <GradientBackground>
                        <WaveLayer />
                    </GradientBackground>
                    <HeroContent>
                        <CatchPhrase>
                            <HeroTitle>{t('home.heroTitle').split('\n').map((line, i) => (
                                <span key={i}>{line}{i === 0 && <br />}</span>
                            ))}</HeroTitle>
                            <HeroDescription>{t('home.heroDescription').split('\n').map((line, i) => (
                                <span key={i}>{line}{i === 0 && <br />}</span>
                            ))}</HeroDescription>
                        </CatchPhrase>
                        <BannerImage src={bannerImg} alt="PromoKit Banner" />
                    </HeroContent>
                </HeroSection>

                <SectionContainer>
                    <Section>
                        <SectionIcon>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5" />
                                <path d="M2 12l10 5 10-5" />
                            </svg>
                        </SectionIcon>
                        <SectionTitle>{t('home.purposeTitle')}</SectionTitle>
                        <SectionDescription>{t('home.purposeDescription')}</SectionDescription>
                    </Section>

                    <Section>
                        <SectionIcon>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                        </SectionIcon>
                        <SectionTitle>{t('home.featuresTitle')}</SectionTitle>
                        <FeatureList>
                            <FeatureItem>{t('home.feature1')}</FeatureItem>
                            <FeatureItem>{t('home.feature2')}</FeatureItem>
                            <FeatureItem>{t('home.feature3')}</FeatureItem>
                            <FeatureItem>{t('home.feature4')}</FeatureItem>
                        </FeatureList>
                    </Section>

                    <Section>
                        <SectionIcon>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                        </SectionIcon>
                        <SectionTitle>{t('home.usageTitle')}</SectionTitle>
                        <StepList>
                            <StepItem>
                                <StepNumber>1</StepNumber>
                                <StepText>{t('home.step1')}</StepText>
                            </StepItem>
                            <StepItem>
                                <StepNumber>2</StepNumber>
                                <StepText>{t('home.step2')}</StepText>
                            </StepItem>
                            <StepItem>
                                <StepNumber>3</StepNumber>
                                <StepText>{t('home.step3')}</StepText>
                            </StepItem>
                            <StepItem>
                                <StepNumber>4</StepNumber>
                                <StepText>{t('home.step4')}</StepText>
                            </StepItem>
                        </StepList>
                    </Section>
                </SectionContainer>

                <CTASection>
                    <CTATitle>{t('home.ctaTitle')}</CTATitle>
                    <StartButton to="/editor" $large>{t('home.openEditor')}</StartButton>
                </CTASection>
            </MainStyle>
        </>
    );
}

const MainStyle = styled.main`
    padding: 1.5rem;
    padding-top: 90px;
    margin: 0 auto;
    min-height: 100vh;
    width: 100%;
    max-width: 1400px;
`;

const HeroSection = styled.section`
    position: relative;
    margin-bottom: 3rem;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: var(--neu-shadow);
    height: 450px;
`;

const HeroContent = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 3rem;
`;

const CatchPhrase = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`;

const HeroTitle = styled.h1`
    font-size: 2.75rem;
    font-weight: 800;
    color: #4A4A6A;
    line-height: 1.3;
    text-shadow: 0 2px 10px rgba(255, 255, 255, 0.5);
`;

const HeroDescription = styled.p`
    font-size: 1.125rem;
    color: #5A5A7A;
    line-height: 1.7;
`;

const GradientBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        135deg,
        #FFB3BA 0%,
        #FFDFBA 16%,
        #FFFFBA 32%,
        #BAFFC9 48%,
        #BAE1FF 64%,
        #D4BAFF 80%,
        #FFB3D9 100%
    );
    overflow: hidden;

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 200%;
        height: 200%;
        top: -50%;
        left: -50%;
        background: radial-gradient(ellipse at center, rgba(186, 225, 255, 0.6) 0%, transparent 50%);
        animation: wave1 8s ease-in-out infinite;
    }

    &::after {
        background: radial-gradient(ellipse at center, rgba(212, 186, 255, 0.5) 0%, transparent 50%);
        animation: wave2 10s ease-in-out infinite;
        animation-delay: -2s;
    }

    @keyframes wave1 {
        0%, 100% {
            transform: translate(0%, 0%) rotate(0deg) scale(1);
        }
        25% {
            transform: translate(10%, 10%) rotate(90deg) scale(1.1);
        }
        50% {
            transform: translate(5%, -5%) rotate(180deg) scale(1);
        }
        75% {
            transform: translate(-10%, 5%) rotate(270deg) scale(1.1);
        }
    }

    @keyframes wave2 {
        0%, 100% {
            transform: translate(5%, -5%) rotate(0deg) scale(1.1);
        }
        25% {
            transform: translate(-5%, 10%) rotate(-90deg) scale(1);
        }
        50% {
            transform: translate(-10%, 0%) rotate(-180deg) scale(1.1);
        }
        75% {
            transform: translate(10%, -10%) rotate(-270deg) scale(1);
        }
    }
`;

const WaveLayer = styled.div`
    position: absolute;
    width: 300%;
    height: 300%;
    top: -100%;
    left: -100%;
    background:
        radial-gradient(ellipse at 20% 30%, rgba(255, 179, 186, 0.5) 0%, transparent 40%),
        radial-gradient(ellipse at 80% 20%, rgba(186, 255, 201, 0.5) 0%, transparent 40%),
        radial-gradient(ellipse at 50% 70%, rgba(186, 225, 255, 0.5) 0%, transparent 40%),
        radial-gradient(ellipse at 70% 60%, rgba(212, 186, 255, 0.4) 0%, transparent 50%);
    animation: waveFlow 12s ease-in-out infinite;

    @keyframes waveFlow {
        0%, 100% {
            transform: translate(0%, 0%) rotate(0deg);
        }
        33% {
            transform: translate(5%, 3%) rotate(120deg);
        }
        66% {
            transform: translate(-3%, 5%) rotate(240deg);
        }
    }
`;

const BannerImage = styled.img`
    max-width: 50%;
    max-height: 90%;
    height: auto;
    object-fit: contain;
    display: block;
    filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2));
`;

const StartButton = styled(Link)<{ $large?: boolean }>`
    display: inline-block;
    padding: ${({ $large }) => ($large ? '1rem 2.5rem' : '0.875rem 2rem')};
    font-size: ${({ $large }) => ($large ? '1.125rem' : '1rem')};
    font-weight: 600;
    color: var(--c-primary-dark);
    background: white;
    border-radius: 16px;
    text-decoration: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
    }

    &:active {
        transform: translateY(-1px);
    }
`;

const SectionContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
`;

const Section = styled.section`
    background: var(--c-background-secondary);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: var(--neu-shadow);
`;

const SectionIcon = styled.div`
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--c-primary-soft);
    border-radius: 20px;
    margin-bottom: 1.5rem;
    color: var(--c-primary);
    box-shadow: var(--neu-shadow-sm);
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--c-text-primary);
    margin-bottom: 1rem;
`;

const SectionDescription = styled.p`
    font-size: 1rem;
    line-height: 1.7;
    color: var(--c-text-secondary);
`;

const FeatureList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const FeatureItem = styled.li`
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: 1rem;
    color: var(--c-text-secondary);
    line-height: 1.6;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.5rem;
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, var(--c-primary) 0%, var(--c-primary-dark) 100%);
        border-radius: 50%;
    }

    &:last-child {
        margin-bottom: 0;
    }
`;

const StepList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const StepItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const StepNumber = styled.span`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--c-primary) 0%, var(--c-primary-dark) 100%);
    color: white;
    font-weight: 700;
    font-size: 0.875rem;
    border-radius: 50%;
    flex-shrink: 0;
`;

const StepText = styled.span`
    font-size: 1rem;
    color: var(--c-text-secondary);
    line-height: 1.5;
`;

const CTASection = styled.section`
    text-align: center;
    padding: 3rem 2rem;
    background: var(--c-background-secondary);
    border-radius: 24px;
    box-shadow: var(--neu-shadow);
`;

const CTATitle = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    color: var(--c-text-primary);
    margin-bottom: 1.5rem;
`;
