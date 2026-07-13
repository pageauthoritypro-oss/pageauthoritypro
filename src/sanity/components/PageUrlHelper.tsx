import React, { useCallback, useState } from "react";
import { useFormValue } from "sanity";
import { Box, Card, Flex, Text, Button } from "@sanity/ui";
import { ClipboardIcon, LaunchIcon } from "@sanity/icons";
import Link from "next/link";

export function PageUrlHelper() {
  const slug = useFormValue(["slug"]) as { current?: string } | undefined;
  const [copied, setCopied] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const currentSlug = slug?.current || "";

  // Decide route path (homepage docs use slug "/" and render at the root)
  const isHome =
    !currentSlug ||
    currentSlug === "/" ||
    currentSlug === "index" ||
    currentSlug === "home";
  const path = isHome ? undefined : `/${currentSlug}`;

  const absoluteUrl = `${baseUrl}${path ?? ""}`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(absoluteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [absoluteUrl]);

  return (
    <Card
      padding={3}
      radius={2}
      shadow={1}
      style={{
        border: "1px solid var(--card-border-color)",
        background: "var(--card-bg-color)",
        transition: "all 0.2s ease-in-out",
        marginTop: "8px",
      }}
    >
      <Flex direction="column" gap={3}>
        <Flex align="center" justify="space-between" gap={2}>
          <Flex align="center" gap={2}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: currentSlug ? "#10B981" : "#F59E0B",
                display: "inline-block",
                boxShadow: currentSlug ? "0 0 8px #10B981" : "0 0 8px #F59E0B",
              }}
            />
            <Text size={1} weight="semibold" muted>
              {currentSlug ? "Live Page URL" : "Draft Page (Default root route)"}
            </Text>
          </Flex>
          {currentSlug && (
            <Link
              href={absoluteUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "12px",
                color: "#fff",
                fontWeight: 600,
              }}
            >
              Open Page <LaunchIcon style={{ fontSize: "14px" }} />
            </Link>
          )}
        </Flex>

        <Flex
          align="center"
          gap={2}
          style={{
            background: "rgba(100, 100, 100, 0.05)",
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid rgba(100, 100, 100, 0.1)",
            fontFamily: "monospace",
          }}
        >
          <Box flex={1} style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            <span style={{ opacity: 0.6 }}>{baseUrl}</span>
            <strong style={{ fontWeight: 600 }}>{path}</strong>
          </Box>
          <Button
            fontSize={1}
            padding={2}
            mode="ghost"
            tone={copied ? "positive" : "default"}
            icon={ClipboardIcon}
            text={copied ? "Copied!" : "Copy"}
            onClick={handleCopy}
            style={{ cursor: "pointer", flexShrink: 0 }}
          />
        </Flex>
      </Flex>
    </Card>
  );
}
