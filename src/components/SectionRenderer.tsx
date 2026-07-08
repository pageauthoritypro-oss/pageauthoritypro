import { Fragment } from 'react';
import HeroSection from '@/components/home/HeroSection';
import AreasOfLawSection from '@/components/home/AreasOfLawSection';
import CompanyLogoSection from '@/components/home/CompanyLogoSection';
import NumbersSection from '@/components/home/NumbersSection';
import ComparisonSection from '@/components/home/ComparisonSection';
import VsComparisonSection from '@/components/attorney/VsComparisonSection';
import GraphSection from '@/components/home/GraphSection';
import PhaseDominatingProcessSection from '@/components/home/PhaseDominatingProcessSection';
import FAQSection from '@/components/home/FAQSection';
import CtaSection from '@/components/home/CtaSection';
import CaseStudiesSection from '@/components/home/CaseStudiesSection';
import ProcessOverview from '@/components/process/ProcessOverview';
import ProcessBreakdown from '@/components/process/ProcessBreakdown';
import WhyProcessWorks from '@/components/process/WhyProcessWorks';
import WebsitesUnderperformSection from '@/components/attorney/WebsitesUnderperformSection';
import SeoFoundationSection from '@/components/attorney/SeoFoundationSection';
import StatsSection from '@/components/seo/StatsSection';
import SEOServicesSection from '@/components/seo/SEOServicesSection';
import WhySEOMattersSection from '@/components/seo/WhySEOMattersSection';
import FeaturedArticlesCategorySection, { FeaturedArticlesCategoryProps } from '@/components/blog/FeaturedArticlesCategorySection';
import WhyGoogleAdsMatterSection from '@/components/google-ads/WhyGoogleAdsMatterSection';
import GrowthSystemSection from '@/components/google-ads/GrowthSystemSection';
import ResultsSection from '@/components/google-ads/ResultsSection';
import CoreServicesSection from '@/components/pricing/CoreServicesSection';
import OptionalGrowthServicesSection from '@/components/pricing/OptionalGrowthServicesSection';
import AuditSection from '@/components/pricing/AuditSection';
import ClientEngagementSection from '@/components/pricing/ClientEngagementSection';
import AnimatedSection from '@/components/AnimatedSection';
import BuiltAroundDataSection from '@/components/about/BuiltAroundDataSection';
import LegalMarketingSection from '@/components/about/LegalMarketingSection';
import NotFoundSection from '@/components/home/NotFoundSection';
import LegalTextSection from '@/components/legal/LegalTextSection';
import ContactFormSection from '@/components/contact/ContactFormSection';
import type {
	PageSection,
	HeroSectionData,
	CompanyLogoSectionData,
	SpecializedAreaSectionData,
	NumbersSectionData,
	ComparisonSectionData,
	VsComparisonSectionData,
	GraphSectionData,
	PhaseDominatingProcessSectionData,
	FaqSectionData,
	CtaSectionData,
	CardsGridSectionData,
	GrowthPhaseProcessSectionData,
	GrowthPhaseDetailsSectionData,
	HowItWorksSectionData,
	WebsitesUnderperformSectionData,
	SeoFoundationSectionData,
	GrowthMetricsSectionData,
	ServicesSectionData,
	SeoFeaturesSectionData,
	CaseAcquisitionSectionData,
	CampaignPlansSectionData,
	GrowthServicesSectionData,
	MarketingAuditSectionData,
	PracticeAreasSectionData,
	GrowthSystemSectionData,
	ResultsMattersSectionData,
	BuiltAroundDataSectionData,
	LegalMarketingSectionData,
	NotFoundSectionData,
	RichTextSectionData,
	ContactFormSectionData,
} from '@/sanity/types/index';
import CaseAcquisitionSection from './attorney/CaseAcquisitionSection';

type SectionRenderFn = (section: PageSection, overlapPrevious: boolean) => React.ReactNode;

const SECTION_MAP: Record<string, SectionRenderFn> = {
	heroSection: (section) => <HeroSection {...(section as HeroSectionData)} />,
	companyLogoSection: (section, overlapPrevious) => (
		<CompanyLogoSection {...(section as CompanyLogoSectionData)} overlapPrevious={overlapPrevious} />
	),
	specializedAreaSection: (section) => <AreasOfLawSection {...(section as SpecializedAreaSectionData)} />,
	cardsGrid: (section) => <CaseStudiesSection {...(section as CardsGridSectionData)} />,
	numbersSection: (section) => <NumbersSection {...(section as NumbersSectionData)} />,
	comparisonSection: (section) => <ComparisonSection {...(section as ComparisonSectionData)} />,
	vsComparisonSection: (section) => <VsComparisonSection data={section as VsComparisonSectionData} />,
	websitesUnderperformSection: (section) => <WebsitesUnderperformSection data={section as WebsitesUnderperformSectionData} />,
	seoFoundationSection: (section) => <SeoFoundationSection {...(section as SeoFoundationSectionData)} />,
	graphSection: (section) => <GraphSection {...(section as GraphSectionData)} />,
	phaseDominatingProcessSection: (section) => <PhaseDominatingProcessSection {...(section as PhaseDominatingProcessSectionData)} />,
	faqSection: (section) => <FAQSection {...(section as FaqSectionData)} />,
	ctaSection: (section) => <CtaSection {...(section as CtaSectionData)} />,
	growthPhaseProcessSection: (section, overlapPrevious) => (
		<ProcessOverview {...(section as GrowthPhaseProcessSectionData)} overlapPrevious={overlapPrevious} />
	),
	growthPhaseDetailsSection: (section) => {
		const data = section as GrowthPhaseDetailsSectionData;
		return <ProcessBreakdown cards={data.cards} />;
	},
	howItWorksSection: (section) => {
		const data = section as HowItWorksSectionData;
		return <WhyProcessWorks heading={data.heading} headingTag={data.headingTag} cards={data.cards} />;
	},
	growthMetricsSection: (section) => <StatsSection {...(section as GrowthMetricsSectionData)} />,
	// servicesSection is shared: google-ads uses WhyGoogleAdsMatterSection (has bullets), SEO uses SEOServicesSection
	servicesSection: (section, overlapPrevious) => {
		const data = section as ServicesSectionData;
		return data.bullets?.length ? (
			<WhyGoogleAdsMatterSection data={data} overlapPrevious={overlapPrevious} />
		) : (
			<SEOServicesSection {...data} overlapPrevious={overlapPrevious} />
		);
	},
	growthSystemSection: (section) => <GrowthSystemSection data={section as GrowthSystemSectionData} />,
	resultsMattersSection: (section) => <ResultsSection data={section as ResultsMattersSectionData} />,
	seoFeaturesSection: (section, overlapPrevious) => (
		<WhySEOMattersSection {...(section as SeoFeaturesSectionData)} overlapPrevious={overlapPrevious} />
	),
	caseAcquisitionSection: (section) => <CaseAcquisitionSection {...(section as CaseAcquisitionSectionData)} />,
	featuredArticlesCategory: (section) => <FeaturedArticlesCategorySection {...(section as FeaturedArticlesCategoryProps)} />,
	campaignPlansSection: (section, overlapPrevious) => (
		<CoreServicesSection {...(section as CampaignPlansSectionData)} overlapPrevious={overlapPrevious} />
	),
	growthServicesSection: (section) => <OptionalGrowthServicesSection {...(section as GrowthServicesSectionData)} />,
	marketingAuditSection: (section) => <AuditSection {...(section as MarketingAuditSectionData)} />,
	practiceAreasSection: (section) => <ClientEngagementSection {...(section as PracticeAreasSectionData)} />,
	builtAroundDataSection: (section) => <BuiltAroundDataSection {...(section as BuiltAroundDataSectionData)} />,
	legalMarketingSection: (section, overlapPrevious) => (
		<LegalMarketingSection {...(section as LegalMarketingSectionData)} overlapPrevious={overlapPrevious} />
	),
	notFoundSection: (section) => <NotFoundSection {...(section as NotFoundSectionData)} />,
	richTextSection: (section) => <LegalTextSection {...(section as RichTextSectionData)} />,
	contactFormSection: (section) => <ContactFormSection data={section as ContactFormSectionData} />,
};

interface Props {
	sections?: PageSection[];
}

export default function SectionRenderer({ sections }: Props) {
	if (!sections?.length) return null;

	return (
		<>
			{sections.map((section, i) => {
				const render = SECTION_MAP[section._type];
				if (!render) return null;
				const isHero = section._type === 'heroSection' || section._type === 'companyLogoSection';

				// Determine if the previous section was heroSection
				const previousSection = i > 0 ? sections[i - 1] : null;
				const overlapPrevious = previousSection?._type === 'heroSection';

				return (
					<AnimatedSection key={section._key} isHero={isHero} isLcp={i === 0 || overlapPrevious}>
						{render(section, overlapPrevious)}
					</AnimatedSection>
				);
			})}
		</>
	);
}
