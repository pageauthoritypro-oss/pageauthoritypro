import { type SchemaTypeDefinition } from "sanity";

// Objects
import { seoObject } from "./objects/seo";
import { advancedSeo } from "./objects/advancedSeo";
import { socialObject } from "./objects/social";
import { navigationItem } from "./objects/navigation";
import { ctaBtn } from "./objects/blocks/ctaBtn";
import { navLink } from "./objects/navLink";
import { link } from "./objects/link";
import { imageSlider } from "./objects/blocks/imageSlider";
import { comparisonItem } from "./objects/blocks/comparisonItem";
import { stage } from "./objects/blocks/stage";
import { growthGraph } from "./objects/blocks/growthGraph";
import { card } from "./objects/blocks/card";
import { faq } from "./objects/blocks/faq";
import { headingPart } from "./objects/common/headingPart";
import { headerSection } from "./objects/common/headerSection";
import { partnerLogos } from "./objects/blocks/partnerLogos";
import { iconTextItem } from "./objects/blocks/iconTextItem";
import { numberStatItem } from "./objects/blocks/numberStatItem";
import { caseStudyMetric } from "./objects/blocks/caseStudyMetric";
import { imageWithAlt } from "./objects/blocks/imageWithAlt";
import { richText } from "./objects/blocks/richText";
import { metricWithGraphItem } from "./objects/blocks/metricWithGraphItem";
import { cardWithLink } from "./objects/blocks/cardWithLink";
import { heroSection } from "./objects/sections/heroSection";
import { companyLogoSection } from "./objects/sections/companyLogoSection";
import { numbersSection } from "./objects/sections/numbersSection";
import { comparisonSection } from "./objects/sections/comparisonSection";
import { vsComparisonSection } from "./objects/sections/vsComparisonSection";
import { graphSection } from "./objects/sections/graphSection";
import { specializedAreaSection } from "./objects/sections/specializedAreaSection";
import { phaseDominatingProcessSection } from "./objects/sections/phaseDominatingProcessSection";
import { faqSection } from "./objects/sections/faqSection";
import { ctaSection } from "./objects/sections/ctaSection";
import { cardsGridSection } from "./objects/sections/cardsGridSection";
import { growthPhaseProcessSection } from "./objects/sections/growthPhaseProcessSection";
import { growthPhaseDetailsSection } from "./objects/sections/growthPhaseDetailsSection";
import { howItWorksSection } from "./objects/sections/howItWorksSection";
import { growthMetricsSection } from "./objects/sections/growthMetricsSection";
import { servicesSection } from "./objects/sections/servicesSection";
import { seoFeaturesSection } from "./objects/sections/seoFeaturesSection";
import { websitesUnderperformSection } from "./objects/sections/websitesUnderperformSection";
import { seoFoundationSection } from "./objects/sections/seoFoundationSection";
import { caseAcquisitionSection } from "./objects/sections/caseAcquisitionSection";
import { marketingAuditSection } from "./objects/sections/marketingAuditSection";
import { practiceAreasSection } from "./objects/sections/practiceAreasSection";
import { growthServicesSection } from "./objects/sections/growthServicesSection";
import { campaignPlansSection } from "./objects/sections/campaignPlansSection";
import { notFoundSection } from "./objects/sections/notFoundSection";




import { serviceItem } from "./objects/common/serviceItem";
import { checklistCheckpoint } from "./objects/common/checklistCheckpoint";
import { legalMarketingSection } from "./objects/sections/legalMarketingSection";
import { builtAroundDataSection } from "./objects/sections/builtAroundDataSection";
import { growthSystemSection } from "./objects/sections/growthSystemSection";
import { resultsMattersSection } from "./objects/sections/resultsMattersSection";
import { richTextSection } from "./objects/sections/richTextSection";
import { contactFormSection } from "./objects/sections/contactFormSection";

import { bookCallCard } from "./objects/blocks/bookCallCard";
import { sharePost } from "./objects/blocks/sharePost";
import { checklistBlock } from "./objects/blocks/checklistBlock";
import { detailedCardsGrid } from "./objects/blocks/detailedCardsGrid";
import { iconCardList } from "./objects/blocks/iconCardList";
import { resultsBlock } from "./objects/blocks/resultsBlock";
import { testimonialBlock } from "./objects/blocks/testimonialBlock";
import { featuredArticlesCategory } from "./objects/sections/featuredArticlesCategory";


// Documents
import { globalConfiguration } from "./siteSettings";
import { pages } from "./page";
import { author } from "./author";
import { caseStudy } from "./caseStudy";
import { caseStudyTag } from "./caseStudyTag";
import { blogCategory } from "./blogCategory";
import { blog } from "./blog";
import { location } from "./location";
import { testimonial } from "./testimonial";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    seoObject,
    advancedSeo,
    socialObject,
    navigationItem,
    ctaBtn,
    navLink,
    link,
    imageSlider,
    comparisonItem,
    stage,
    growthGraph,
    card,
    faq,
    headingPart,
    headerSection,
    partnerLogos,
    iconTextItem,
    numberStatItem,
    caseStudyMetric,
    imageWithAlt,
    richText,
    metricWithGraphItem,
    cardWithLink,
    heroSection,
    companyLogoSection,
    numbersSection,
    comparisonSection,
    vsComparisonSection,
    graphSection,
    specializedAreaSection,
    phaseDominatingProcessSection,
    faqSection,
    ctaSection,
    cardsGridSection,
    growthPhaseProcessSection,
    growthPhaseDetailsSection,
    howItWorksSection,
    growthMetricsSection,
    servicesSection,
    seoFeaturesSection,
    websitesUnderperformSection,
    seoFoundationSection,
    caseAcquisitionSection,
    marketingAuditSection,
    practiceAreasSection,
    growthServicesSection,
    campaignPlansSection,
    notFoundSection,
    legalMarketingSection,
    builtAroundDataSection,
    growthSystemSection,
    resultsMattersSection,
    richTextSection,
    contactFormSection,

    bookCallCard,
    sharePost,
    checklistBlock,
    detailedCardsGrid,
    iconCardList,
    resultsBlock,
    testimonialBlock,
    featuredArticlesCategory,
    serviceItem,
    checklistCheckpoint,


    // Documents
    globalConfiguration,
    pages,
    author,
    caseStudy,
    caseStudyTag,
    blogCategory,
    blog,
    location,
    testimonial,
  ],
};
