import { groq } from 'next-sanity';
import { CTA_BTN_FIELDS, SEO_FIELDS, LINK_FIELDS } from './fragments';

export const PAGE_QUERY = groq`
  *[_type == "pages" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    enableSmoothScroll,
    sections[] {
    ...,
      _type,
      _key,
      header {
        eyebrow { text, position },
        heading[] { text, isHighlighted, variant },
        headingTag,
        description,
        cta_btn[] { ${CTA_BTN_FIELDS} },
        cta_button_position
      },
      _type == "heroSection" => {
        eyebrow,
        backgroundScript,
        "heroImage": heroImage.asset->url,
        partnerText,
        partnerLogos {
          logos[] { "url": asset->url, alt, iconSvg },
          autoPlay,
          autoPlaySpeed
        }
      },
      _type == "companyLogoSection" => {
        ...,
        "logos": partnerLogos.logos[] {
          "url": asset->url,
          alt,
          iconSvg
        },
        "autoPlay": partnerLogos.autoPlay,
        "autoPlaySpeed": partnerLogos.autoPlaySpeed,
        "partnerText": partnerText
      },
      _type == "comparisonSection" => {
        columns[] {
          position,
          heading,
          highlight,
          items[] {
            name,
            "icon": select(
              defined(icon.asset) || defined(icon.iconSvg) => {
                "url": icon.asset->url,
                "alt": icon.alt,
                "iconSvg": icon.iconSvg
              },
              icon
            )
          },
          type,
          "icon": select(
            defined(icon.asset) || defined(icon.iconSvg) => {
              "url": icon.asset->url,
              "alt": icon.alt,
              "iconSvg": icon.iconSvg
            },
            icon
          )
        },
        highlightedColumn,
        bottomText
      },
      _type == "vsComparisonSection" => {
        eyebrow,
        columns[] {
          position,
          heading,
          highlight,
          items[] {
            name,
            "icon": select(
              defined(icon.asset) || defined(icon.iconSvg) => {
                "url": icon.asset->url,
                "alt": icon.alt,
                "iconSvg": icon.iconSvg
              },
              icon
            )
          },
          type,
          "icon": select(
            defined(icon.asset) || defined(icon.iconSvg) => {
              "url": icon.asset->url,
              "alt": icon.alt,
              "iconSvg": icon.iconSvg
            },
            icon
          )
        },
        cta_btn[] { ${CTA_BTN_FIELDS} }
      },
      _type == "websitesUnderperformSection" => {
        heading {
          heading[] { text, isHighlighted, variant },
          headingTag,
          description,
          cta_btn[] { ${CTA_BTN_FIELDS} },
          cta_button_position
        },
        cards[] {
          title,
          "icon": select(
            defined(icon.asset) || defined(icon.iconSvg) => {
              "url": icon.asset->url,
              "alt": icon.alt,
              "iconSvg": icon.iconSvg
            },
            icon
          )
        },
        footerText
      },
      _type == "graphSection" => {
        graph {
          stages[] { name, barHeight, highlight, description }
        }
      },
      _type == "specializedAreaSection" => {
        areas[] { title, description, icon, badge },
        columns
      },
      _type == "growthPhaseProcessSection" => {
        ...,
        overlapPrevious,
        cards[] {
          badgeNumber,
          icon { "url": asset->url, alt, iconSvg },
          title,
          description,
          learnMoreLink { ${LINK_FIELDS} }
        }
      },
      _type == "howItWorksSection" => {
        ...,
        cards[] { icon { "url": asset->url, alt, iconSvg }, title, description }
      },
      _type == "growthPhaseDetailsSection" => {
        ...,
        cards[] {
          badgeNumber,
          title,
          description,
          checklistTitle,
          checkpoints[] { icon { "url": asset->url, alt, iconSvg }, text }
        }
      },
      _type == "phaseDominatingProcessSection" => {
        phases[] { title, description, icon { "url": asset->url, alt, iconSvg }, badge }
      },
      _type == "faqSection" => {
        header {
          eyebrow { text, position },
          heading[] { text, isHighlighted, variant },
          headingTag,
          description,
          cta_btn[] { ${CTA_BTN_FIELDS} },
          cta_button_position
        },
        items[] { question, answer[] { ..., _type == "imageWithAlt" => { "url": asset->url, alt } } },
        allowMultipleOpen,
        footerText
      },
      _type == "ctaSection" => {
        ...,
        header {
          ...,
          cta_btn[] { ${CTA_BTN_FIELDS} }
        },
        features[] { "logo": icon { "url": asset->url, alt, iconSvg }, "description": label },
        supportingText[] { ..., _type == "imageWithAlt" => { "url": asset->url, alt } },
        "backgroundImage": backgroundImage.asset->url,
      },
      _type == "cardsGrid" => {
        cardVariant,
        useManualOrder,
        cardsPerPage,
        "header": headerSection {
          eyebrow { text, position },
          heading[] { text, isHighlighted, variant },
          headingTag,
          description,
          cta_btn[] { ${CTA_BTN_FIELDS} },
          cta_button_position
        },
        caseStudies[] {
          _id,
          _ref,
          _type
        }
      },
      _type == "growthMetricsSection" => {
        ...,
        header {
          eyebrow { text, position },
          heading[] { text, isHighlighted, variant },
          headingTag,
          description,
          cta_btn[] { ${CTA_BTN_FIELDS} },
          cta_button_position
        },
        metrics[] {
          ...,
          "graphImageUrl": graphImage.asset->url,
          "graphImageSvg": graphImage.iconSvg
        }
      },
      _type == "servicesSection" => {
        ...,
        header {
          eyebrow { text, position },
          heading[] { text, isHighlighted, variant },
          headingTag,
          description,
          cta_btn[] { ${CTA_BTN_FIELDS} },
          cta_button_position
        },
        bullets[] { "logo": icon { "url": asset->url, alt, iconSvg }, "description": label },
        services[] {
          title,
          description,
          "icon": icon { "url": asset->url, alt, iconSvg }
        }
      },
      _type == "seoFeaturesSection" => {
        ...,
        header {
          ...,
          cta_btn[] { ${CTA_BTN_FIELDS} }
        },
        cards[] {
          title,
          description,
          icon {
            alt,
            "url": asset->url,
            iconSvg
          },
          badge,
          link {
            ${LINK_FIELDS}
          }
        }
      },
      _type == "seoFoundationSection" => {
        cards[] {
          icon,
          items
        }
      },
      _type == "caseAcquisitionSection" => {
        "header": headerSection {
          eyebrow { text, position },
          heading[] { text, isHighlighted, variant },
          headingTag,
          description,
          cta_btn[] { ${CTA_BTN_FIELDS} },
          cta_button_position
        },
        cards[] {
          title,
          "icon": icon { "url": asset->url, alt, iconSvg }
        }
      },
      _type == "legalMarketingSection" => {
        "header": header {
          eyebrow { text, position },
          heading[] { text, isHighlighted, variant },
          headingTag,
          description,
          cta_btn[] { ${CTA_BTN_FIELDS} },
          cta_button_position
        },
        services[] {
          title,
          description,
          "icon": icon { "url": asset->url, alt, iconSvg }
        }
      },
      _type == "builtAroundDataSection" => {
        "header": header {
          eyebrow { text, position },
          heading[] { text, isHighlighted, variant },
          headingTag,
          description,
          cta_btn[] { ${CTA_BTN_FIELDS} },
          cta_button_position
        },
        checkpoints[] {
          icon,
          text
        }
      },
      _type == "growthSystemSection" => {
        "header": header {
          eyebrow { text, position },
          heading[] { text, isHighlighted, variant },
          headingTag,
          description,
          cta_btn[] { ${CTA_BTN_FIELDS} },
          cta_button_position
        },
        "image": image { "url": asset->url, alt }
      },
      _type == "resultsMattersSection" => {
        "header": header {
          eyebrow { text, position },
          heading[] { text, isHighlighted, variant },
          headingTag,
          description,
          cta_btn[] { ${CTA_BTN_FIELDS} },
          cta_button_position
        },
        cards[] {
          title,
          description,
          "icon": icon { "url": asset->url, alt, iconSvg }
        }
      },
      _type == "marketingAuditSection" => {
        eyebrow,
        heading[] { text, type, isHighlighted, variant },
        description,
        auditItems[] { icon, text },
        pricing,
        cta { ${CTA_BTN_FIELDS} }
      },
      _type == "practiceAreasSection" => {
        heading[] { text, type, isHighlighted, variant },
        cards[] {
          "icon": icon { "url": asset->url, alt, iconSvg },
          eyebrow,
          title,
          details[] {
            ...,
            _type == "imageWithAlt" => { "url": asset->url, alt }
          }
        },
        cta { ${CTA_BTN_FIELDS} }
      },
      _type == "growthServicesSection" => {
        heading[] { text, type, isHighlighted, variant },
        cards[] {
          "icon": icon { "url": asset->url, alt, iconSvg },
          title,
          description,
          features[] { icon, text }
        },
        cta { ${CTA_BTN_FIELDS} }
      },
      _type == "campaignPlansSection" => {
        plans[] {
          badgeNumber,
          title,
          subtitle,
          price,
          description,
          checklistLabel,
          checklist[] { icon, text },
          pricingBlock
        }
      },
      _type == "richTextSection" => {
        content,
        containerSize
      },
      _type == "contactFormSection" => {
        contactInfo[] {
          label,
          value,
          "icon": icon { "url": asset->url, alt, iconSvg }
        },
        formFields[] {
          name,
          label,
          placeholder,
          type,
          required
        },
        submitButtonText
      },
      _type == "featuredArticlesCategory" => {
        heading[] { text, isHighlighted, variant },
        showFilter,
        useManualOrder,
        featuredPost-> {
          _id,
          "title": array::join(title[].text, " "),
          slug,
          excerpt,
          description,
          "image": image.asset->url,
          category-> { _id, title, slug },
          publishedAt,
          author-> { _id, name, "image": image.asset->url }
        },
        enabledCategories[]-> { _id, title, slug },
        blogs[]-> {
          _id,
          "categoryTitle": category->title
        },
        blogsPerPage
      },
      _type == "notFoundSection" => {
        title,
        description,
        ctaButtons[] { ${CTA_BTN_FIELDS} }
      }
    },
    seo { ${SEO_FIELDS} }
  }
`;

export const PAGE_BY_ID_QUERY = groq`
  *[_type == "pages" && _id == $id][0] {
    _id,
    title,
    slug,
    sections[] {
    ...,
      _type,
      _key,
      header {
        eyebrow,
        heading[] { text, type, isHighlighted, variant },
        description,
        cta_btn[] { ${CTA_BTN_FIELDS} },
        cta_button_position
      },
      _type == "heroSection" => {
        eyebrow,
        backgroundScript,
        "heroImage": heroImage.asset->url,
        partnerText,
        partnerLogos {
          logos[] { "url": asset->url, alt, iconSvg },
          autoPlay,
          autoPlaySpeed
        }
      },
      _type == "comparisonSection" => {
        columns[] {
          position,
          heading,
          highlight,
          items[] {
            name,
            "icon": select(
              defined(icon.asset) || defined(icon.iconSvg) => {
                "url": icon.asset->url,
                "alt": icon.alt,
                "iconSvg": icon.iconSvg
              },
              icon
            )
          },
          type,
          "icon": select(
            defined(icon.asset) || defined(icon.iconSvg) => {
              "url": icon.asset->url,
              "alt": icon.alt,
              "iconSvg": icon.iconSvg
            },
            icon
          )
        },
        highlightedColumn,
        bottomText
      },
      _type == "ctaSection" => {
        ...,
        features[] { "logo": icon { "url": asset->url, alt, iconSvg }, "description": label },
        supportingText[] { ..., _type == "imageWithAlt" => { "url": asset->url, alt } },
        "backgroundImage": backgroundImage.asset->url,
      }
    },
    seo { ${SEO_FIELDS} }
  }
`;

export const ALL_PAGES_QUERY = groq`
  *[_type == "pages"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "noIndex": seo.noIndex
  }
`;

export const PAGE_PATHS_QUERY = groq`
  *[_type == "pages" && defined(slug.current)][].slug.current
`;
