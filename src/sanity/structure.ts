import type { StructureResolver } from "sanity/structure";
import { CogIcon, EnvelopeIcon } from "@sanity/icons";
import { ContactSubmissionsTool } from "./tools/ContactSubmissionsTool";

// Main Structure desk list
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Pages
      S.documentTypeListItem("pages").title("Pages"),

      // Divider
      S.divider(),

      // Blog Content Types
      S.documentTypeListItem("blog").title("Blog Posts"),
      S.documentTypeListItem("blogCategory").title("Blog Categories"),
      S.documentTypeListItem("author").title("Authors"),

      // Divider
      S.divider(),

      // Case Studies
      S.documentTypeListItem("caseStudy").title("Case Studies"),
      S.documentTypeListItem("caseStudyTag").title("Case Study Tags"),
      S.documentTypeListItem("location").title("Locations"),

      // Divider
      S.divider(),

      // Global Configuration Singleton
      S.listItem()
        .title("Global Configuration")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("globalConfiguration")
            .documentId("globalConfiguration")
            .title("Global Configuration"),
        ),
      S.documentTypeListItem("testimonial").title("Testimonials"),

      // Divider
      S.divider(),

      // Contact Inbox — renders the custom submissions UI inside the Structure pane
      S.listItem()
        .title("Contact Inbox")
        .icon(EnvelopeIcon)
        .child(
          S.component(ContactSubmissionsTool)
            .id("contact-submissions")
            .title("Contact Inbox"),
        ),
    ]);
