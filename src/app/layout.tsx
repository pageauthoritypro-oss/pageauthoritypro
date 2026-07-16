import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';
import { SanityLive } from '@/sanity/lib/live';
import { draftMode, headers } from 'next/headers';
import { StudioRouteGate, VisualEditingGate } from '@/components/sanity-live-wrapper';
import { Toaster } from '@/components/ui/sonner';
import { getSiteSettings } from '@/sanity/helpers/settings';
import { MaintenanceMode } from '@/components/MaintenanceMode';
import DraftModeBanner from '@/components/DraftModeBanner';
import { CustomScriptsInjector } from '@/components/CustomScriptsInjector';

const satoshi = localFont({
	src: [
		{
			path: './fonts/Satoshi-Regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: './fonts/Satoshi-Regular.woff',
			weight: '400',
			style: 'normal',
		},
		{
			path: './fonts/Satoshi-Medium.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: './fonts/Satoshi-Medium.woff',
			weight: '500',
			style: 'normal',
		},
		{
			path: './fonts/Satoshi-Bold.woff2',
			weight: '700',
			style: 'normal',
		},
		{
			path: './fonts/Satoshi-Bold.woff',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-satoshi',
	display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
	const settings = await getSiteSettings({ cache: true });
	const seo = settings?.seo;
	const siteName = settings?.title ?? 'Page Authority Pro';

	return {
		metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pageauthoritypro.com'),
		title: {
			default: seo?.metaTitle ?? `${siteName} — Attorney SEO & Google Ads for Law Firms`,
			template: `%s | ${siteName}`,
		},
		...(seo?.metaDescription && { description: seo.metaDescription }),
		openGraph: {
			type: 'website',
			locale: 'en_US',
			siteName,
			...(seo?.ogImageUrl && { images: [seo.ogImageUrl] }),
		},
		twitter: {
			card: (seo?.twitterCard ?? 'summary_large_image') as 'summary' | 'summary_large_image' | 'app' | 'player',
			...(seo?.twitterHandle && { site: seo.twitterHandle }),
		},
		robots: { index: true, follow: true },
		...(settings?.faviconUrl && {
			icons: {
				icon: settings.faviconUrl,
				shortcut: settings.faviconUrl,
				apple: settings.faviconUrl,
			},
		}),
	};
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isEnabled: isDraftMode } = await draftMode();
	const headersList = await headers();
	const isStudioRoute = (headersList.get('x-pathname') ?? '').startsWith('/studio');
	const settings = await getSiteSettings({ cache: true });
	const { googleAnalyticsId, googleTagManagerId, headerScripts, footerScripts } = settings ?? {};

	// Draft mode is enabled by the Presentation Tool's preview iframe (loading real
	// page URLs, not /studio), so it must bypass maintenance mode the same way
	// Studio itself does - otherwise editors can't preview/edit while it's on.
	const bypassMaintenance = isStudioRoute || isDraftMode;
	const page = bypassMaintenance ? children : <MaintenanceMode>{children}</MaintenanceMode>;

	return (
		<html lang='en' className={`${satoshi.variable} h-full antialiased`} suppressHydrationWarning>
			<head>
				{!isStudioRoute && googleTagManagerId && (
					<Script id='gtm-script' strategy='afterInteractive'>
						{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${googleTagManagerId}');`}
					</Script>
				)}
				{!isStudioRoute && googleAnalyticsId && (
					<>
						<Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} strategy='afterInteractive' />
						<Script id='google-analytics' strategy='afterInteractive'>
							{`window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', '${googleAnalyticsId}');`}
						</Script>
					</>
				)}
				{!isStudioRoute && headerScripts && <CustomScriptsInjector html={headerScripts} target='head' />}
			</head>
			<body className='min-h-full flex flex-col'>
				{!isStudioRoute && googleTagManagerId && (
					<noscript>
						<iframe
							src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
							height='0'
							width='0'
							style={{ display: 'none', visibility: 'hidden' }}
						/>
					</noscript>
				)}
				{page}
				{isDraftMode && !isStudioRoute && <DraftModeBanner />}
				<Toaster
					position='bottom-right'
					toastOptions={{
						style: {
							background: '#08101C',
							border: '1px solid rgba(199,147,61,0.25)',
							color: '#F5F5F5',
							fontFamily: 'var(--font-satoshi)',
						},
					}}
				/>
				<StudioRouteGate>
					{/* SanityLive handles real-time updates when draft mode or Presentation Tool is active */}
					<SanityLive />
					{/* VisualEditingGate renders click-to-edit overlays only inside the Presentation Tool's iframe */}
					{isDraftMode && <VisualEditingGate />}
				</StudioRouteGate>
				{!isStudioRoute && footerScripts && <CustomScriptsInjector html={footerScripts} target='body' />}
			</body>
		</html>
	);
}
