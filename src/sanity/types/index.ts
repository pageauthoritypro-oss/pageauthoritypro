/**
 * Type definitions for Site Settings and Page Sections
 */

import type { PortableTextBlock } from '@portabletext/react';
import type { SanityBlogPost } from './blog';

export interface SeoSettings {
	metaTitle?: string;
	metaDescription?: string;
	ogImageUrl?: string;
	keywords?: string[];
	twitterCard?: string;
	twitterHandle?: string;
}

export interface SocialMedia {
	platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok' | 'github';
	url: string;
}

export interface NavigationChild {
	label: string;
	url: string;
	openInNewTab?: boolean;
	logo?: SanityLogoItem;
}

export interface NavigationItem {
	label: string;
	url: string;
	openInNewTab?: boolean;
	children?: NavigationChild[];
}

export interface MaintenanceMode {
	enabled: boolean;
	message?: string;
}

export interface Stage {
	name: string;
	barHeight: number;
	highlight?: boolean;
	description?: string;
}

export interface StageGraph {
	stages: Stage[];
}

export interface HeaderCtaItem {
	cta_text: string;
	url: string;
	variant?: 'primary' | 'secondary' | 'accent' | 'info';
	target?: '_self' | '_blank';
	linkType?: 'internal' | 'external';
	internalPage?: { _ref: string; _type: 'reference' };
	icon?: SanityImageWithAlt;
}

export interface TopBannerSettings {
	enabled: boolean;
	text?: string;
	link?: string;
	variant?: 'primary' | 'secondary' | 'accent' | 'info';
}

export interface CtaBtn {
	cta_text: string;
	url: string;
	variant?: 'primary' | 'secondary' | 'accent' | 'info';
	target?: '_self' | '_blank';
	linkType?: 'internal' | 'external';
	internalPage?: { _ref: string; _type: 'reference' };
	icon?: SanityImageWithAlt;
}

export interface SiteSettings {
	_id?: string;
	_rev?: string;
	title: string;
	description?: string;
	logoUrl?: string;
	logoSvg?: string;
	headerLogoUrl?: string;
	headerLogoSvg?: string;
	faviconUrl?: string;
	seo?: SeoSettings;
	socialMedia?: SocialMedia[];
	headerNavigation?: NavigationItem[];
	headerCta?: HeaderCtaItem[];
	stickyHeader?: boolean;
	transparentHeader?: boolean;
	topBanner?: TopBannerSettings;
	stageGraph?: StageGraph;
	footerLogo?: { alt?: string; url?: string; iconSvg?: string };
	footerTagline?: string;
	footerCta?: CtaBtn[];
	footerNavigation?: NavigationItem[];
	footerCopyright?: string;
	footerCredits?: string;
	footerDescription?: string;
	googleAnalyticsId?: string;
	googleTagManagerId?: string;
	headerScripts?: string;
	footerScripts?: string;
	maintenanceMode?: MaintenanceMode;
}

export interface SettingsCache {
	data: SiteSettings | null;
	timestamp: number;
}

// ─── Shared primitives ────────────────────────────────────────────────────────

export interface SanityImageWithAlt {
	url?: string;
	alt?: string;
	iconSvg?: string;
}

export interface SanityHeadingPart {
	text: string;
	isHighlighted?: boolean;
	variant?: string;
}

export interface SanityCtaBtn {
	cta_text: string;
	url: string;
	variant?: 'primary' | 'secondary' | 'accent' | 'info';
	target?: '_self' | '_blank';
	icon?: SanityLogoItem;
}

export interface SanityHeaderSection {
	eyebrow?: {
		text?: string;
		position?: 'top' | 'center' | 'bottom';
	};
	heading?: SanityHeadingPart[];
	headingTag?: string;
	description?: string;
	cta_btn?: SanityCtaBtn[];
	cta_button_position?: 'top' | 'center' | 'bottom';
}

export interface SanityLogoItem {
	url?: string;
	alt?: string;
	iconSvg?: string;
}

export interface SanityPartnerLogos {
	logos?: SanityLogoItem[];
	autoPlay?: boolean;
	autoPlaySpeed?: number;
}

export interface SanityLink {
	label?: string;
	url?: string;
	target?: '_self' | '_blank';
}

// ─── Section Data Types ───────────────────────────────────────────────────────

export interface HeroSectionData {
	_type: 'heroSection';
	_key: string;
	eyebrow?: string;
	backgroundScript?: string;
	header?: SanityHeaderSection;
	heroImage?: string;
	partnerText?: string;
	partnerLogos?: SanityPartnerLogos;
}

export interface CompanyLogoSectionData {
	_type: 'companyLogoSection';
	_key: string;
	partnerText?: string;
	logos?: SanityLogoItem[];
	autoPlay?: boolean;
	autoPlaySpeed?: number;
}

export interface NumberStatItem {
	number: string;
	label: string;
	variant?: string;
}

export interface NumbersSectionData {
	_type: 'numbersSection';
	_key: string;
	heading?: string;
	statItems?: NumberStatItem[];
	extraSpacingBottom?: boolean;
}

export interface ComparisonFeature {
	name: string;
	icon?: 'tick' | 'cross' | 'circle-check';
}

export interface ComparisonColumnItem {
	position?: 'left' | 'center' | 'right';
	heading: string;
	highlight?: 'brand' | 'destructive' | 'transparent';
	items?: ComparisonFeature[];
	type?: string;
	icon?: string;
}

export interface ComparisonSectionData {
	_type: 'comparisonSection';
	_key: string;
	header?: SanityHeaderSection;
	columns?: ComparisonColumnItem[];
	highlightedColumn?: 'left' | 'center' | 'right';
	bottomText?: string;
}

export interface VsComparisonSectionData {
	_type: 'vsComparisonSection';
	_key: string;
	eyebrow?: string;
	columns?: ComparisonColumnItem[];
	cta_btn?: CtaBtn[];
}

export interface GraphStage {
	name: string;
	barHeight: number;
	highlight?: boolean;
	description?: string;
}

export interface GraphSectionData {
	_type: 'graphSection';
	_key: string;
	header?: SanityHeaderSection;
	graph?: { stages?: GraphStage[] };
}

export interface SanityCard {
	title: string;
	description?: string;
	icon?: string | SanityLogoItem;
	badge?: string;
}

export interface SpecializedAreaSectionData {
	_type: 'specializedAreaSection';
	_key: string;
	header?: SanityHeaderSection;
	areas?: SanityCard[];
	columns?: 2 | 3 | 4;
}

// ─── How It Works Section (WhyProcessWorks) ──────────────────────────────────

export interface HowItWorksCard {
	icon?: SanityLogoItem;
	title: string;
	description?: string;
}

export interface HowItWorksSectionData {
	_type: 'howItWorksSection';
	_key: string;
	heading?: SanityHeadingPart[];
	headingTag?: string;
	cards?: HowItWorksCard[];
}

// ─── Growth Phase Process Section (ProcessOverview) ───────────────────────────

export interface GrowthPhaseProcessCard {
	badgeNumber?: string;
	icon?: SanityLogoItem;
	title: string;
	description?: string;
	learnMoreLink?: SanityLink;
}

export interface GrowthPhaseProcessSectionData {
	_type: 'growthPhaseProcessSection';
	_key: string;
	overlapPrevious?: 'default' | 'overlap';
	eyebrow?: string;
	heading?: SanityHeadingPart[];
	headingTag?: string;
	cards?: GrowthPhaseProcessCard[];
}

// ─── Growth Phase Details Section (ProcessBreakdown) ─────────────────────────

export interface GrowthPhaseCheckpoint {
	icon?: string | SanityLogoItem;
	text: string;
}

export interface GrowthPhaseDetailsCard {
	badgeNumber?: string;
	title: string;
	description?: string;
	checklistTitle?: string;
	checkpoints?: GrowthPhaseCheckpoint[];
}

export interface GrowthPhaseDetailsSectionData {
	_type: 'growthPhaseDetailsSection';
	_key: string;
	cards?: GrowthPhaseDetailsCard[];
}

// ─── Phase Dominating Process Section ────────────────────────────────────────

export interface PhaseDominatingProcessSectionData {
	_type: 'phaseDominatingProcessSection';
	_key: string;
	header?: SanityHeaderSection;
	phases?: SanityCard[];
}

export interface FaqItem {
	question: string;
	answer: PortableTextBlock[];
}

export interface FaqSectionData {
	_type: 'faqSection';
	_key: string;
	header?: SanityHeaderSection;
	items?: FaqItem[];
	allowMultipleOpen?: boolean;
	footerText?: PortableTextBlock[];
}

export interface IconTextItem {
	logo?: SanityLogoItem;
	description?: string;
}

export interface CtaSectionData {
	_type: 'ctaSection';
	_key: string;
	header?: SanityHeaderSection;
	features?: IconTextItem[];
	supportingText?: PortableTextBlock[];
	backgroundImage?: string;
}

export interface CaseStudyMetricItem {
	value: string;
	label: string;
	isHighlighted?: boolean;
	variant?: string;
}

export interface CaseStudyTagItem {
	_id: string;
	title: string;
	slug: string;
}

export interface CaseStudyItem {
	_id: string;
	title: string | SanityHeadingPart[];
	slug: string;
	image?: string;
	description?: string;
	excerpt?: string;
	location?: {
		_id: string;
		name: string;
		slug: { current: string };
		area: string;
	};
	tags?: CaseStudyTagItem[];
	caseStudyMetrics?: CaseStudyMetricItem[];
}

export interface CardsGridSectionData {
	_type: 'cardsGrid';
	_key: string;
	header?: SanityHeaderSection;
	caseStudies?: Array<{
		_id?: string;
		_ref?: string;
		_type: string;
	}>;
	cardVariant?: 'primary' | 'secondary';
	useManualOrder?: boolean;
	cardsPerPage?: number;
}

export interface UnderperformCardItem {
	title: string;
	icon?: SanityLogoItem;
}

export interface WebsitesUnderperformSectionData {
	_type: 'websitesUnderperformSection';
	_key: string;
	heading?: SanityHeaderSection;
	cards?: UnderperformCardItem[];
	footerText?: string;
}

export interface SeoFoundationCardItem {
	icon?: 'tick' | 'cross' | 'circle-check';
	text?: string;
}

export interface SeoFoundationCard {
	items?: SeoFoundationCardItem[];
}

export interface SeoFoundationSectionData {
	_type: 'seoFoundationSection';
	_key: string;
	header?: SanityHeaderSection;
	cards?: SeoFoundationCard[];
}

// ─── Growth Metrics Section ───────────────────────────────────────────────────

export interface MetricWithGraphItem {
	_key?: string;
	number: string;
	label: string;
	graphImageUrl?: string;
	graphImageSvg?: string;
	variant?: 'brand' | 'secondary' | 'destructive' | 'transparent';
}

export interface GrowthMetricsSectionData {
	_type: 'growthMetricsSection';
	_key: string;
	header?: SanityHeaderSection;
	metrics?: MetricWithGraphItem[];
}

// ─── Services Section ─────────────────────────────────────────────────────────

export interface ServiceItem {
	_key?: string;
	title: string;
	description?: string;
	icon?: string | SanityLogoItem;
}

export interface ServicesSectionData {
	_type: 'servicesSection';
	_key: string;
	header?: SanityHeaderSection;
	bullets?: IconTextItem[];
	services?: ServiceItem[];
	columns?: 2 | 3 | 4;
}

// ─── SEO Features Section ─────────────────────────────────────────────────────

export interface CardWithLink {
	_key?: string;
	title: string;
	description?: string;
	icon?: SanityLogoItem;
	badge?: string;
	link?: SanityLink;
}

export interface SeoFeaturesSectionData {
	_type: 'seoFeaturesSection';
	_key: string;
	header?: SanityHeaderSection;
	cards?: CardWithLink[];
	columns?: 2 | 3 | 4;
}

export interface CaseAcquisitionCard {
	_key?: string;
	title: string;
	icon?: SanityLogoItem;
}

export interface CaseAcquisitionSectionData {
	_type: 'caseAcquisitionSection';
	_key: string;
	header?: SanityHeaderSection;
	cards?: CaseAcquisitionCard[];
}
export interface FeaturedArticlesCategorySectionData {
	_type: 'featuredArticlesCategory';
	_key: string;
	heading: SanityHeadingPart[];
	featuredPost?: SanityBlogPost;
	showFilter?: boolean;
	useManualOrder?: boolean;
	enabledCategories?: Array<{
		_id: string;
		title: string;
		slug: { current: string };
	}>;
	blogs?: Array<{
		_id: string;
		categoryTitle?: string;
	}>;
	blogsPerPage?: number;
}

// ─── Marketing Audit Section ──────────────────────────────────────────────────

export interface MarketingAuditSectionData {
	_type: 'marketingAuditSection';
	_key: string;
	eyebrow?: string;
	heading?: SanityHeadingPart[];
	headingTag?: string;
	description?: string;
	auditItems?: ChecklistCheckpoint[];
	pricing?: {
		label?: string;
		price?: string;
	};
	cta?: SanityCtaBtn;
}

// ─── Practice Areas Section ───────────────────────────────────────────────────

export interface PracticeAreaCard {
	_key?: string;
	icon?: SanityImageWithAlt;
	eyebrow?: string;
	title: string;
	details?: PortableTextBlock[];
}

export interface PracticeAreasSectionData {
	_type: 'practiceAreasSection';
	_key: string;
	heading?: SanityHeadingPart[];
	headingTag?: string;
	cards?: PracticeAreaCard[];
	cta?: SanityCtaBtn;
}

// ─── Growth Services Section ──────────────────────────────────────────────────

export interface GrowthServiceCard {
	_key?: string;
	icon?: SanityImageWithAlt;
	title: string;
	description?: string;
	features?: ChecklistCheckpoint[];
}

export interface GrowthServicesSectionData {
	_type: 'growthServicesSection';
	_key: string;
	heading?: SanityHeadingPart[];
	headingTag?: string;
	cards?: GrowthServiceCard[];
	cta?: SanityCtaBtn;
}

// ─── Phase Dominating Process Section ────────────────────────────────────────

export interface PhaseDominatingProcessSectionData {
	_type: 'phaseDominatingProcessSection';
	_key: string;
	header?: SanityHeaderSection;
	phases?: SanityCard[];
}

export interface FaqItem {
	question: string;
	answer: PortableTextBlock[];
}

export interface FaqSectionData {
	_type: 'faqSection';
	_key: string;
	header?: SanityHeaderSection;
	items?: FaqItem[];
	allowMultipleOpen?: boolean;
	footerText?: PortableTextBlock[];
}

export interface IconTextItem {
	logo?: SanityLogoItem;
	description?: string;
}

export interface CtaSectionData {
	_type: 'ctaSection';
	_key: string;
	header?: SanityHeaderSection;
	features?: IconTextItem[];
	supportingText?: PortableTextBlock[];
	backgroundImage?: string;
}

export interface CaseStudyMetricItem {
	value: string;
	label: string;
	isHighlighted?: boolean;
	variant?: string;
}

export interface CaseStudyTagItem {
	_id: string;
	title: string;
	slug: string;
}

export interface CaseStudyItem {
	_id: string;
	title: string | SanityHeadingPart[];
	slug: string;
	image?: string;
	description?: string;
	excerpt?: string;
	location?: {
		_id: string;
		name: string;
		slug: { current: string };
		area: string;
	};
	tags?: CaseStudyTagItem[];
	caseStudyMetrics?: CaseStudyMetricItem[];
}

export interface UnderperformCardItem {
	title: string;
	icon?: SanityLogoItem;
}

export interface WebsitesUnderperformSectionData {
	_type: 'websitesUnderperformSection';
	_key: string;
	heading?: SanityHeaderSection;
	cards?: UnderperformCardItem[];
	footerText?: string;
}

export interface SeoFoundationCardItem {
	icon?: 'tick' | 'cross' | 'circle-check';
	text?: string;
}

export interface SeoFoundationCard {
	items?: SeoFoundationCardItem[];
}

export interface SeoFoundationSectionData {
	_type: 'seoFoundationSection';
	_key: string;
	header?: SanityHeaderSection;
	cards?: SeoFoundationCard[];
}

// ─── Growth Metrics Section ───────────────────────────────────────────────────

export interface MetricWithGraphItem {
	_key?: string;
	number: string;
	label: string;
	graphImageUrl?: string;
	graphImageSvg?: string;
	variant?: 'brand' | 'secondary' | 'destructive' | 'transparent';
}

export interface GrowthMetricsSectionData {
	_type: 'growthMetricsSection';
	_key: string;
	header?: SanityHeaderSection;
	metrics?: MetricWithGraphItem[];
}

// ─── Services Section ─────────────────────────────────────────────────────────

export interface ServiceItem {
	_key?: string;
	title: string;
	description?: string;
	icon?: string | SanityLogoItem;
}

export interface ServicesSectionData {
	_type: 'servicesSection';
	_key: string;
	header?: SanityHeaderSection;
	bullets?: IconTextItem[];
	services?: ServiceItem[];
	columns?: 2 | 3 | 4;
}

// ─── SEO Features Section ─────────────────────────────────────────────────────

export interface CardWithLink {
	_key?: string;
	title: string;
	description?: string;
	icon?: SanityLogoItem;
	badge?: string;
	link?: SanityLink;
}

export interface SeoFeaturesSectionData {
	_type: 'seoFeaturesSection';
	_key: string;
	header?: SanityHeaderSection;
	cards?: CardWithLink[];
	columns?: 2 | 3 | 4;
}

export interface CaseAcquisitionCard {
	_key?: string;
	title: string;
	icon?: SanityLogoItem;
}

export interface CaseAcquisitionSectionData {
	_type: 'caseAcquisitionSection';
	_key: string;
	header?: SanityHeaderSection;
	cards?: CaseAcquisitionCard[];
}
export interface ChecklistCheckpoint {
	_key?: string;
	icon: 'checkCircle' | 'tick' | 'cross';
	text: string;
}

export interface LegalMarketingSectionData {
	_type: 'legalMarketingSection';
	_key: string;
	header?: SanityHeaderSection;
	services?: ServiceItem[];
}

export interface BuiltAroundDataSectionData {
	_type: 'builtAroundDataSection';
	_key: string;
	header?: SanityHeaderSection;
	checkpoints?: ChecklistCheckpoint[];
	numberOfCheckPoints?: number;
}

export interface GrowthSystemSectionData {
	_type: 'growthSystemSection';
	_key: string;
	header?: SanityHeaderSection;
	image?: SanityImageWithAlt;
}

export interface ResultsMattersSectionData {
	_type: 'resultsMattersSection';
	_key: string;
	header?: SanityHeaderSection;
	cards?: ServiceItem[];
}

// ─── Campaign Plans Section ───────────────────────────────────────────────────

export interface CampaignPlan {
	_key?: string;
	badgeNumber: string;
	title: string;
	subtitle?: string;
	price?: string;
	description?: string;
	checklistLabel?: string;
	checklist: ChecklistCheckpoint[];
	pricingBlock?: {
		label?: string;
		title?: string;
		description?: string;
	};
}

export interface CampaignPlansSectionData {
	_type: 'campaignPlansSection';
	_key: string;
	plans: CampaignPlan[];
}

export interface RichTextSectionData {
	_type: 'richTextSection';
	_key: string;
	content?: PortableTextBlock[];
	containerSize?: 'default' | 'narrow' | 'wide';
}

export interface ContactInfoItem {
	_key?: string;
	label: string;
	value: string;
	icon: SanityImageWithAlt;
}

export interface FormFieldItem {
	_key?: string;
	name: string;
	label: string;
	placeholder?: string;
	type: 'text' | 'email' | 'tel' | 'textarea';
	required?: boolean;
}

export interface ContactFormSectionData {
	_type: 'contactFormSection';
	_key: string;
	header?: SanityHeaderSection;
	contactInfo?: ContactInfoItem[];
	formFields?: FormFieldItem[];
	submitButtonText?: string;
}

export interface NotFoundSectionData {
	_type: 'notFoundSection';
	_key: string;
	title: string;
	description: string;
	ctaButtons?: CtaBtn[];
}

// ─── Page Section union ───────────────────────────────────────────────────────

export type PageSection =
	| HeroSectionData
	| CompanyLogoSectionData
	| NumbersSectionData
	| ComparisonSectionData
	| VsComparisonSectionData
	| GraphSectionData
	| SpecializedAreaSectionData
	| GrowthPhaseProcessSectionData
	| GrowthPhaseDetailsSectionData
	| HowItWorksSectionData
	| PhaseDominatingProcessSectionData
	| FaqSectionData
	| CtaSectionData
	| CardsGridSectionData
	| WebsitesUnderperformSectionData
	| SeoFoundationSectionData
	| GrowthMetricsSectionData
	| ServicesSectionData
	| SeoFeaturesSectionData
	| CaseAcquisitionSectionData
	| FeaturedArticlesCategorySectionData
	| MarketingAuditSectionData
	| PracticeAreasSectionData
	| GrowthServicesSectionData
	| CampaignPlansSectionData
	| NotFoundSectionData
	| LegalMarketingSectionData
	| BuiltAroundDataSectionData
	| GrowthSystemSectionData
	| ResultsMattersSectionData
	| RichTextSectionData
	| ContactFormSectionData
	| { _type: string; _key: string };
