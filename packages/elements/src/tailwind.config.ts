import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import defaultTheme, { stroke } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
// fix hr

export const texts = {
	"title-h1": [
		"3.5rem",
		{
			lineHeight: "4rem",
			letterSpacing: "-0.01em",
			fontWeight: "500",
		},
	],
	"title-h2": [
		"3rem",
		{
			lineHeight: "3.5rem",
			letterSpacing: "-0.01em",
			fontWeight: "500",
		},
	],
	"title-h3": [
		"2.5rem",
		{
			lineHeight: "3rem",
			letterSpacing: "-0.01em",
			fontWeight: "500",
		},
	],
	"title-h4": [
		"2rem",
		{
			lineHeight: "2.5rem",
			letterSpacing: "-0.005em",
			fontWeight: "500",
		},
	],
	"title-h5": [
		"1.5rem",
		{
			lineHeight: "2rem",
			letterSpacing: "0em",
			fontWeight: "500",
		},
	],
	"title-h6": [
		"1.25rem",
		{
			lineHeight: "1.75rem",
			letterSpacing: "0em",
			fontWeight: "500",
		},
	],
	"label-xl": [
		"1.5rem",
		{
			lineHeight: "2rem",
			letterSpacing: "-0.015em",
			fontWeight: "500",
		},
	],
	"label-lg": [
		"1.125rem",
		{
			lineHeight: "1.5rem",
			letterSpacing: "-0.015em",
			fontWeight: "500",
		},
	],
	"label-md": [
		"1rem",
		{
			lineHeight: "1.5rem",
			letterSpacing: "-0.011em",
			fontWeight: "500",
		},
	],
	"label-sm": [
		".875rem",
		{
			lineHeight: "1.25rem",
			letterSpacing: "-0.006em",
			fontWeight: "500",
		},
	],
	"label-xs": [
		".75rem",
		{
			lineHeight: "1rem",
			letterSpacing: "0em",
			fontWeight: "500",
		},
	],
	"paragraph-xl": [
		"1.5rem",
		{
			lineHeight: "2rem",
			letterSpacing: "-0.015em",
			fontWeight: "400",
		},
	],
	"paragraph-lg": [
		"1.125rem",
		{
			lineHeight: "1.5rem",
			letterSpacing: "-0.015em",
			fontWeight: "400",
		},
	],
	"paragraph-md": [
		"1rem",
		{
			lineHeight: "1.5rem",
			letterSpacing: "-0.011em",
			fontWeight: "400",
		},
	],
	"paragraph-sm": [
		".875rem",
		{
			lineHeight: "1.25rem",
			letterSpacing: "-0.006em",
			fontWeight: "400",
		},
	],
	"paragraph-xs": [
		".75rem",
		{
			lineHeight: "1rem",
			letterSpacing: "0em",
			fontWeight: "400",
		},
	],
	"subheading-md": [
		"1rem",
		{
			lineHeight: "1.5rem",
			letterSpacing: "0.06em",
			fontWeight: "500",
		},
	],
	"subheading-sm": [
		".875rem",
		{
			lineHeight: "1.25rem",
			letterSpacing: "0.06em",
			fontWeight: "500",
		},
	],
	"subheading-xs": [
		".75rem",
		{
			lineHeight: "1rem",
			letterSpacing: "0.04em",
			fontWeight: "500",
		},
	],
	"subheading-2xs": [
		".6875rem",
		{
			lineHeight: ".75rem",
			letterSpacing: "0.02em",
			fontWeight: "500",
		},
	],
	"doc-label": [
		"1.125rem",
		{
			lineHeight: "2rem",
			letterSpacing: "-0.015em",
			fontWeight: "500",
		},
	],
	"doc-paragraph": [
		"1.125rem",
		{
			lineHeight: "2rem",
			letterSpacing: "-0.015em",
			fontWeight: "400",
		},
	],
} as unknown as Record<string, string>;

export const shadows = {
	"regular-xs": "0 1px 2px 0 #0a0d1408",
	"regular-sm": "0 2px 4px #1b1c1d0a",
	"regular-md": "0 16px 32px -12px #0e121b1a",
	"button-primary-focus": [
		"0 0 0 2px theme(colors.bg[white-0])",
		"0 0 0 4px theme(colors.primary[alpha-10])",
	],
	"button-important-focus": [
		"0 0 0 2px theme(colors.bg[white-0])",
		"0 0 0 4px theme(colors.neutral[alpha-16])",
	],
	"button-error-focus": [
		"0 0 0 2px theme(colors.bg[white-0])",
		"0 0 0 4px theme(colors.red[alpha-10])",
	],
	"fancy-buttons-neutral": ["0 1px 2px 0 #1b1c1d7a", "0 0 0 1px #242628"],
	"fancy-buttons-primary": [
		"0 1px 2px 0 #0e121b3d",
		"0 0 0 1px theme(colors.primary[base])",
	],
	"fancy-buttons-error": [
		"0 1px 2px 0 #0e121b3d",
		"0 0 0 1px theme(colors.error[base])",
	],
	"fancy-buttons-stroke": [
		"0 1px 3px 0 #0e121b1f",
		"0 0 0 1px theme(colors.stroke[soft-200])",
	],
	"toggle-switch": ["0 6px 10px 0 #0e121b0f", "0 2px 4px 0 #0e121b08"],
	"switch-thumb": ["0 4px 8px 0 #1b1c1d0f", "0 2px 4px 0 #0e121b14"],
	tooltip: ["0 12px 24px 0 #0e121b0f", "0 1px 2px 0 #0e121b08"],
	"custom-xs": [
		"0 0 0 1px rgba(51, 51, 51, 0.04)",
		"0 4px 8px -2px rgba(51, 51, 51, 0.06)",
		"0 2px 4px rgba(51, 51, 51, 0.04)",
		"0 1px 2px rgba(51, 51, 51, 0.04)",
		"inset 0 -1px 1px -0.5px rgba(51, 51, 51, 0.06)",
	],
	"custom-sm": [
		"0 0 0 1px rgba(51, 51, 51, 0.04)",
		"0 16px 8px -8px rgba(51, 51, 51, 0.01)",
		"0 12px 6px -6px rgba(51, 51, 51, 0.02)",
		"0 5px 5px -2.5px rgba(51, 51, 51, 0.08)",
		"0 1px 3px -1.5px rgba(51, 51, 51, 0.16)",
		"inset 0 -0.5px 0.5px rgba(51, 51, 51, 0.08)",
	],
	"custom-md": [
		"0 0 0 1px rgba(51, 51, 51, 0.04)",
		"0 1px 1px 0.5px rgba(51, 51, 51, 0.04)",
		"0 3px 3px -1.5px rgba(51, 51, 51, 0.02)",
		"0 6px 6px -3px rgba(51, 51, 51, 0.04)",
		"0 12px 12px -6px rgba(51, 51, 51, 0.04)",
		"0 24px 24px -12px rgba(51, 51, 51, 0.04)",
		"0 48px 48px -24px rgba(51, 51, 51, 0.04)",
		"inset 0 -1px 1px -0.5px rgba(51, 51, 51, 0.06)",
	],
	"custom-lg": [
		"0 0 0 1px rgba(51, 51, 51, 0.04)",
		"0 1px 1px 0.5px rgba(51, 51, 51, 0.04)",
		"0 3px 3px -1.5px rgba(51, 51, 51, 0.02)",
		"0 6px 6px -3px rgba(51, 51, 51, 0.04)",
		"0 12px 12px -6px rgba(51, 51, 51, 0.04)",
		"0 24px 24px -12px rgba(51, 51, 51, 0.04)",
		"0 48px 48px -24px rgba(51, 51, 51, 0.04)",
		"0 96px 96px -32px rgba(51, 51, 51, 0.06)",
		"inset 0 -1px 1px -0.5px rgba(51, 51, 51, 0.06)",
	],
} as unknown as Record<string, string>;

export const borderRadii = {
	"5": ".3125rem",
	"10": ".625rem",
	"20": "1.25rem",
} as unknown as Record<string, string>;

const config = {
	corePlugins: {
		preflight: false,
		backgroundOpacity: false,
	},
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	future: {
		respectDefaultRingColorOpacity: true,
	},
	theme: {
		colors: {
			gray: {
				"0": "hsl(var(--kf-gray-0))",
				"50": "hsl(var(--kf-gray-50))",
				"100": "hsl(var(--kf-gray-100))",
				"200": "hsl(var(--kf-gray-200))",
				"300": "hsl(var(--kf-gray-300))",
				"400": "hsl(var(--kf-gray-400))",
				"500": "hsl(var(--kf-gray-500))",
				"600": "hsl(var(--kf-gray-600))",
				"700": "hsl(var(--kf-gray-700))",
				"800": "hsl(var(--kf-gray-800))",
				"900": "hsl(var(--kf-gray-900))",
				"950": "hsl(var(--kf-gray-950))",
				"alpha-24": "hsl(var(--kf-gray-alpha-24))",
				"alpha-16": "hsl(var(--kf-gray-alpha-16))",
				"alpha-10": "hsl(var(--kf-gray-alpha-10))",
			},
			slate: {
				"0": "hsl(var(--kf-slate-0))",
				"50": "hsl(var(--kf-slate-50))",
				"100": "hsl(var(--kf-slate-100))",
				"200": "hsl(var(--kf-slate-200))",
				"300": "hsl(var(--kf-slate-300))",
				"400": "hsl(var(--kf-slate-400))",
				"500": "hsl(var(--kf-slate-500))",
				"600": "hsl(var(--kf-slate-600))",
				"700": "hsl(var(--kf-slate-700))",
				"800": "hsl(var(--kf-slate-800))",
				"900": "hsl(var(--kf-slate-900))",
				"950": "hsl(var(--kf-slate-950))",
				"alpha-24": "hsl(var(--kf-slate-alpha-24))",
				"alpha-16": "hsl(var(--kf-slate-alpha-16))",
				"alpha-10": "hsl(var(--kf-slate-alpha-10))",
			},
			neutral: {
				"0": "hsl(var(--kf-neutral-0))",
				"50": "hsl(var(--kf-neutral-50))",
				"100": "hsl(var(--kf-neutral-100))",
				"200": "hsl(var(--kf-neutral-200))",
				"300": "hsl(var(--kf-neutral-300))",
				"400": "hsl(var(--kf-neutral-400))",
				"500": "hsl(var(--kf-neutral-500))",
				"600": "hsl(var(--kf-neutral-600))",
				"700": "hsl(var(--kf-neutral-700))",
				"800": "hsl(var(--kf-neutral-800))",
				"900": "hsl(var(--kf-neutral-900))",
				"950": "hsl(var(--kf-neutral-950))",
				"alpha-24": "hsl(var(--kf-neutral-alpha-24))",
				"alpha-16": "hsl(var(--kf-neutral-alpha-16))",
				"alpha-10": "hsl(var(--kf-neutral-alpha-10))",
			},
			blue: {
				"50": "hsl(var(--kf-blue-50))",
				"100": "hsl(var(--kf-blue-100))",
				"200": "hsl(var(--kf-blue-200))",
				"300": "hsl(var(--kf-blue-300))",
				"400": "hsl(var(--kf-blue-400))",
				"500": "hsl(var(--kf-blue-500))",
				"600": "hsl(var(--kf-blue-600))",
				"700": "hsl(var(--kf-blue-700))",
				"800": "hsl(var(--kf-blue-800))",
				"900": "hsl(var(--kf-blue-900))",
				"950": "hsl(var(--kf-blue-950))",
				"alpha-24": "hsl(var(--kf-blue-alpha-24))",
				"alpha-16": "hsl(var(--kf-blue-alpha-16))",
				"alpha-10": "hsl(var(--kf-blue-alpha-10))",
			},
			orange: {
				"50": "hsl(var(--kf-orange-50))",
				"100": "hsl(var(--kf-orange-100))",
				"200": "hsl(var(--kf-orange-200))",
				"300": "hsl(var(--kf-orange-300))",
				"400": "hsl(var(--kf-orange-400))",
				"500": "hsl(var(--kf-orange-500))",
				"600": "hsl(var(--kf-orange-600))",
				"700": "hsl(var(--kf-orange-700))",
				"800": "hsl(var(--kf-orange-800))",
				"900": "hsl(var(--kf-orange-900))",
				"950": "hsl(var(--kf-orange-950))",
				"alpha-24": "hsl(var(--kf-orange-alpha-24))",
				"alpha-16": "hsl(var(--kf-orange-alpha-16))",
				"alpha-10": "hsl(var(--kf-orange-alpha-10))",
			},
			red: {
				"50": "hsl(var(--kf-red-50))",
				"100": "hsl(var(--kf-red-100))",
				"200": "hsl(var(--kf-red-200))",
				"300": "hsl(var(--kf-red-300))",
				"400": "hsl(var(--kf-red-400))",
				"500": "hsl(var(--kf-red-500))",
				"600": "hsl(var(--kf-red-600))",
				"700": "hsl(var(--kf-red-700))",
				"800": "hsl(var(--kf-red-800))",
				"900": "hsl(var(--kf-red-900))",
				"950": "hsl(var(--kf-red-950))",
				"alpha-24": "hsl(var(--kf-red-alpha-24))",
				"alpha-16": "hsl(var(--kf-red-alpha-16))",
				"alpha-10": "hsl(var(--kf-red-alpha-10))",
			},
			green: {
				"50": "hsl(var(--kf-green-50))",
				"100": "hsl(var(--kf-green-100))",
				"200": "hsl(var(--kf-green-200))",
				"300": "hsl(var(--kf-green-300))",
				"400": "hsl(var(--kf-green-400))",
				"500": "hsl(var(--kf-green-500))",
				"600": "hsl(var(--kf-green-600))",
				"700": "hsl(var(--kf-green-700))",
				"800": "hsl(var(--kf-green-800))",
				"900": "hsl(var(--kf-green-900))",
				"950": "hsl(var(--kf-green-950))",
				"alpha-24": "hsl(var(--kf-green-alpha-24))",
				"alpha-16": "hsl(var(--kf-green-alpha-16))",
				"alpha-10": "hsl(var(--kf-green-alpha-10))",
			},
			yellow: {
				"50": "hsl(var(--kf-yellow-50))",
				"100": "hsl(var(--kf-yellow-100))",
				"200": "hsl(var(--kf-yellow-200))",
				"300": "hsl(var(--kf-yellow-300))",
				"400": "hsl(var(--kf-yellow-400))",
				"500": "hsl(var(--kf-yellow-500))",
				"600": "hsl(var(--kf-yellow-600))",
				"700": "hsl(var(--kf-yellow-700))",
				"800": "hsl(var(--kf-yellow-800))",
				"900": "hsl(var(--kf-yellow-900))",
				"950": "hsl(var(--kf-yellow-950))",
				"alpha-24": "hsl(var(--kf-yellow-alpha-24))",
				"alpha-16": "hsl(var(--kf-yellow-alpha-16))",
				"alpha-10": "hsl(var(--kf-yellow-alpha-10))",
			},
			purple: {
				"50": "hsl(var(--kf-purple-50))",
				"100": "hsl(var(--kf-purple-100))",
				"200": "hsl(var(--kf-purple-200))",
				"300": "hsl(var(--kf-purple-300))",
				"400": "hsl(var(--kf-purple-400))",
				"500": "hsl(var(--kf-purple-500))",
				"600": "hsl(var(--kf-purple-600))",
				"700": "hsl(var(--kf-purple-700))",
				"800": "hsl(var(--kf-purple-800))",
				"900": "hsl(var(--kf-purple-900))",
				"950": "hsl(var(--kf-purple-950))",
				"alpha-24": "hsl(var(--kf-purple-alpha-24))",
				"alpha-16": "hsl(var(--kf-purple-alpha-16))",
				"alpha-10": "hsl(var(--kf-purple-alpha-10))",
			},
			sky: {
				"50": "hsl(var(--kf-sky-50))",
				"100": "hsl(var(--kf-sky-100))",
				"200": "hsl(var(--kf-sky-200))",
				"300": "hsl(var(--kf-sky-300))",
				"400": "hsl(var(--kf-sky-400))",
				"500": "hsl(var(--kf-sky-500))",
				"600": "hsl(var(--kf-sky-600))",
				"700": "hsl(var(--kf-sky-700))",
				"800": "hsl(var(--kf-sky-800))",
				"900": "hsl(var(--kf-sky-900))",
				"950": "hsl(var(--kf-sky-950))",
				"alpha-24": "hsl(var(--kf-sky-alpha-24))",
				"alpha-16": "hsl(var(--kf-sky-alpha-16))",
				"alpha-10": "hsl(var(--kf-sky-alpha-10))",
			},
			pink: {
				"50": "hsl(var(--kf-pink-50))",
				"100": "hsl(var(--kf-pink-100))",
				"200": "hsl(var(--kf-pink-200))",
				"300": "hsl(var(--kf-pink-300))",
				"400": "hsl(var(--kf-pink-400))",
				"500": "hsl(var(--kf-pink-500))",
				"600": "hsl(var(--kf-pink-600))",
				"700": "hsl(var(--kf-pink-700))",
				"800": "hsl(var(--kf-pink-800))",
				"900": "hsl(var(--kf-pink-900))",
				"950": "hsl(var(--kf-pink-950))",
				"alpha-24": "hsl(var(--kf-pink-alpha-24))",
				"alpha-16": "hsl(var(--kf-pink-alpha-16))",
				"alpha-10": "hsl(var(--kf-pink-alpha-10))",
			},
			teal: {
				"50": "hsl(var(--kf-teal-50))",
				"100": "hsl(var(--kf-teal-100))",
				"200": "hsl(var(--kf-teal-200))",
				"300": "hsl(var(--kf-teal-300))",
				"400": "hsl(var(--kf-teal-400))",
				"500": "hsl(var(--kf-teal-500))",
				"600": "hsl(var(--kf-teal-600))",
				"700": "hsl(var(--kf-teal-700))",
				"800": "hsl(var(--kf-teal-800))",
				"900": "hsl(var(--kf-teal-900))",
				"950": "hsl(var(--kf-teal-950))",
				"alpha-24": "hsl(var(--kf-teal-alpha-24))",
				"alpha-16": "hsl(var(--kf-teal-alpha-16))",
				"alpha-10": "hsl(var(--kf-teal-alpha-10))",
			},
			white: {
				DEFAULT: "#fff",
				"alpha-24": "hsl(var(--kf-white-alpha-24))",
				"alpha-16": "hsl(var(--kf-white-alpha-16))",
				"alpha-10": "hsl(var(--kf-white-alpha-10))",
			},
			black: {
				DEFAULT: "#000",
				"alpha-24": "hsl(var(--kf-black-alpha-24))",
				"alpha-16": "hsl(var(--kf-black-alpha-16))",
				"alpha-10": "hsl(var(--kf-black-alpha-10))",
			},
			primary: {
				dark: "hsl(var(--kf-primary-dark))",
				darker: "hsl(var(--kf-primary-darker))",
				base: "hsl(var(--kf-primary-base))",
				"alpha-24": "hsl(var(--kf-primary-alpha-24))",
				"alpha-16": "hsl(var(--kf-primary-alpha-16))",
				"alpha-10": "hsl(var(--kf-primary-alpha-10))",
			},
			static: {
				black: "hsl(var(--kf-static-black))",
				white: "hsl(var(--kf-static-white))",
			},
			bg: {
				"strong-950": "hsl(var(--kf-bg-strong-950))",
				"surface-800": "hsl(var(--kf-bg-surface-800))",
				"sub-300": "hsl(var(--kf-bg-sub-300))",
				"soft-200": "hsl(var(--kf-bg-soft-200))",
				"weak-50": "hsl(var(--kf-bg-weak-50))",
				"white-0": "hsl(var(--kf-bg-white-0))",
			},
			text: {
				"strong-950": "hsl(var(--kf-text-strong-950))",
				"sub-600": "hsl(var(--kf-text-sub-600))",
				"soft-400": "hsl(var(--kf-text-soft-400))",
				"disabled-300": "hsl(var(--kf-text-disabled-300))",
				"white-0": "hsl(var(--kf-text-white-0))",
			},
			stroke: {
				"strong-950": "hsl(var(--kf-stroke-strong-950))",
				"sub-300": "hsl(var(--kf-stroke-sub-300))",
				"soft-200": "hsl(var(--kf-stroke-soft-200))",
				"white-0": "hsl(var(--kf-stroke-white-0))",
			},
			faded: {
				dark: "hsl(var(--kf-faded-dark))",
				base: "hsl(var(--kf-faded-base))",
				light: "hsl(var(--kf-faded-light))",
				lighter: "hsl(var(--kf-faded-lighter))",
			},
			information: {
				dark: "hsl(var(--kf-information-dark))",
				base: "hsl(var(--kf-information-base))",
				light: "hsl(var(--kf-information-light))",
				lighter: "hsl(var(--kf-information-lighter))",
			},
			warning: {
				dark: "hsl(var(--kf-warning-dark))",
				base: "hsl(var(--kf-warning-base))",
				light: "hsl(var(--kf-warning-light))",
				lighter: "hsl(var(--kf-warning-lighter))",
			},
			error: {
				dark: "hsl(var(--kf-error-dark))",
				base: "hsl(var(--kf-error-base))",
				light: "hsl(var(--kf-error-light))",
				lighter: "hsl(var(--kf-error-lighter))",
			},
			success: {
				dark: "hsl(var(--kf-success-dark))",
				base: "hsl(var(--kf-success-base))",
				light: "hsl(var(--kf-success-light))",
				lighter: "hsl(var(--kf-success-lighter))",
			},
			away: {
				dark: "hsl(var(--kf-away-dark))",
				base: "hsl(var(--kf-away-base))",
				light: "hsl(var(--kf-away-light))",
				lighter: "hsl(var(--kf-away-lighter))",
			},
			feature: {
				dark: "hsl(var(--kf-feature-dark))",
				base: "hsl(var(--kf-feature-base))",
				light: "hsl(var(--kf-feature-light))",
				lighter: "hsl(var(--kf-feature-lighter))",
			},
			verified: {
				dark: "hsl(var(--kf-verified-dark))",
				base: "hsl(var(--kf-verified-base))",
				light: "hsl(var(--kf-verified-light))",
				lighter: "hsl(var(--kf-verified-lighter))",
			},
			highlighted: {
				dark: "hsl(var(--kf-highlighted-dark))",
				base: "hsl(var(--kf-highlighted-base))",
				light: "hsl(var(--kf-highlighted-light))",
				lighter: "hsl(var(--kf-highlighted-lighter))",
			},
			stable: {
				dark: "hsl(var(--kf-stable-dark))",
				base: "hsl(var(--kf-stable-base))",
				light: "hsl(var(--kf-stable-light))",
				lighter: "hsl(var(--kf-stable-lighter))",
			},
			social: {
				apple: "hsl(var(--kf-social-apple))",
				twitter: "hsl(var(--kf-social-twitter))",
				github: "hsl(var(--kf-social-github))",
				notion: "hsl(var(--kf-social-notion))",
				tidal: "hsl(var(--kf-social-tidal))",
				amazon: "hsl(var(--kf-social-amazon))",
				zendesk: "hsl(var(--kf-social-zendesk))",
			},
			overlay: {
				DEFAULT: "hsl(var(--kf-overlay))",
			},
			transparent: "transparent",
			current: "currentColor",
		},
		fontSize: {
			...texts,
			inherit: "inherit",
		},
		boxShadow: {
			...shadows,
			none: defaultTheme.boxShadow.none,
		},
		extend: {
			borderRadius: {
				...borderRadii,
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0", opacity: "0" },
					to: {
						height: "var(--kf-radix-accordion-content-height)",
						opacity: "1",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--kf-radix-accordion-content-height)",
						opacity: "1",
					},
					to: { height: "0", opacity: "0" },
				},
			},
		},
	},
	plugins: [
		animate,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		plugin(({ addBase, addVariant, theme }: any) => {
			/**
			 * Extends Tailwind's built-in `addBase` function by scoping styles to
			 * only affect components within the `@clerk/ui` package.
			 *
			 * Currently, we do this by only applying to elements with a class that
			 * begins with `kf-` (set by the `tailwindcss-transformer`), however, we
			 * may want to explore something more rigid (e.g. data attributes) in the
			 * future.
			 *
			 * Selectors are wrapped in a `:where()` pseudo-selector to keep
			 * specificity to 0,0,0.
			 */
			const addScopedBase = (
				styles: Record<string, string | Record<string, string>>,
			) => {
				const scopedStyles = Object.entries(styles).reduce(
					(acc, [selectors, properties]) => ({
						// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
						...acc,
						[`:where(${selectors
							// Splits selectors by the comma, unless that comma is in brackets
							// e.g. a pseudo selector like :not(svg,use)
							.match(/(?:[^,()]|\((?:[^()]|\([^()]*\))*\))+(?=\s*(?:,|$))/g)
							?.map((item) => item.trim())
							.filter((item) => item !== "")
							.map((selector) => {
								return [
									`${selector}[class^='kf-']`, // direct; class starts with ` kf-`
									`[class^='kf-'] ${selector}`, //  child; class starts with ` kf-`
									`${selector}[class*=' kf-']`, // direct class contains ` kf-`
									`[class*=' kf-'] ${selector}`, // child; class contains ` kf-`
								].join(", ");
							})
							.join(", ")})`]: properties,
					}),
					{} as Record<string, string | Record<string, string>>,
				);

				addBase(scopedStyles);
			};

			/* Global Styles
        ============================================ */

			/**
			 * Keyframes (unscoped)
			 */
			addBase({
				"@keyframes kf-spin": {
					from: { transform: "rotate(0deg)" },
					to: { transform: "rotate(360deg)" },
				},
				"@keyframes kf-blink": {
					"from, to": { opacity: "1" },
					"50%": { opacity: "0" },
				},
				":root": {
					"--kf-light": "initial",
					"--kf-dark": " ",
					colorScheme: "light dark",
				},
			});

			/**
			 * 1. Revert all styles to User Agent defaults (scoped)
			 *
			 *    We intentionally avoid targeting SVGs (and their children) due to
			 *    unwanted side-effects
			 *
			 *    See https://cloudfour.com/thinks/resetting-inherited-css-with-revert
			 */
			addScopedBase({
				"*:not(svg, svg *), use": {
					all: "revert",
				},
			});

			/**
			 * 2. Apply Tailwind's `preflight.css` (scoped)
			 *
			 *    See https://tailwindcss.com/docs/preflight
			 *
			 *    i. In the official `preflight.css`, the next ruleset would be:
			 *
			 *       ```css
			 *       ::before, ::after {
			 *         --tw-content: '';
			 *       }
			 *       ```
			 *
			 *       However, in `tailwindcss-transformer`, our variables are prefixed
			 *       with `kl` to prevent collision with consumers using Tailwind.
			 *
			 *       Additionally, all of our variables are **not scoped**. For this
			 *       reset to work effectively, we'll need to move it to `addBase`
			 *       later.
			 *
			 *    ii. `html`, `:host` and `body` won't be used within our UI
			 *        components. Instead we'll swap `html, :host` for a `*` selector,
			 *        and ditch the `body` styles completely.
			 */
			addScopedBase({
				"*, ::before, ::after": {
					boxSizing: "border-box",
					borderWidth: "0",
					borderStyle: "solid",
					borderColor: theme("borderColor.DEFAULT", "currentColor"),
				},
				/* [i] */
				/* [ii] */
				"*": {
					lineHeight: "1.5",
					WebkitTextSizeAdjust: "100%",
					MozTabSize: "4",
					tabSize: "4",
					fontFamily: theme(
						"fontFamily.sans",
						'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
					),
					fontFeatureSettings: theme(
						"fontFamily.sans[1].fontFeatureSettings",
						"normal",
					),
					fontVariationSettings: theme(
						"fontFamily.sans[1].fontVariationSettings",
						"normal",
					),
					WebkitTapHighlightColor: "transparent",
				},
				hr: { height: "0", color: "inherit", borderTopWidth: "1px" },
				"abbr[title]": { textDecoration: "underline dotted" },
				"h1, h2, h3, h4, h5, h6": {
					fontSize: "inherit",
					fontWeight: "inherit",
				},
				a: { color: "inherit", textDecoration: "inherit" },
				"b, strong": { fontWeight: "bolder" },
				"code, kbd, samp, pre": {
					fontFamily: theme(
						"fontFamily.mono",
						'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
					),
					fontFeatureSettings: theme(
						"fontFamily.mono[1].fontFeatureSettings",
						"normal",
					),
					fontVariationSettings: theme(
						"fontFamily.mono[1].fontVariationSettings",
						"normal",
					),
					fontSize: "1em",
				},
				small: { fontSize: "80%" },
				"sub, sup": {
					fontSize: "75%",
					lineHeight: "0",
					position: "relative",
					verticalAlign: "baseline",
				},
				sub: { bottom: "-0.25em" },
				sup: { top: "-0.5em" },
				table: {
					textIndent: "0",
					borderColor: "inherit",
					borderCollapse: "collapse",
				},
				"button, input, optgroup, select, textarea": {
					fontFamily: "inherit",
					fontFeatureSettings: "inherit",
					fontVariationSettings: "inherit",
					fontSize: "100%",
					fontWeight: "inherit",
					lineHeight: "inherit",
					letterSpacing: "inherit",
					color: "inherit",
					margin: "0",
					padding: "0",
				},
				"button, select": { textTransform: "none" },
				"button, input:where([type='button']), input:where([type='reset']), input:where([type='submit'])":
					{
						WebkitAppearance: "button",
						backgroundColor: "transparent",
						backgroundImage: "none",
					},
				":-moz-focusring": { outline: "auto" },
				":-moz-ui-invalid": { boxShadow: "none" },
				progress: { verticalAlign: "baseline" },
				"::-webkit-inner-spin-button, ::-webkit-outer-spin-button": {
					height: "auto",
				},
				"[type='search']": {
					WebkitAppearance: "textfield",
					outlineOffset: "-2px",
				},
				"::-webkit-search-decoration": { WebkitAppearance: "none" },
				"::-webkit-file-upload-button": {
					WebkitAppearance: "button",
					font: "inherit",
				},
				summary: { display: "list-item" },
				"blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre": {
					margin: "0",
				},
				fieldset: { margin: "0", padding: "0" },
				legend: { padding: "0" },
				"ol, ul, menu": { listStyle: "none", margin: "0", padding: "0" },
				dialog: { padding: "0" },
				textarea: { resize: "vertical" },
				"input::placeholder, textarea::placeholder": {
					opacity: "1",
					color: theme("colors.gray.400", "#9ca3af"),
				},
				'button, [role="button"]': { cursor: "pointer" },
				":disabled": { cursor: "default" },
				"img, svg, video, canvas, audio, iframe, embed, object": {
					display: "block",
					verticalAlign: "middle",
				},
				"img, video": { maxWidth: "100%", height: "auto" },
				"[hidden]": { display: "none" },
			});

			/**
			 * 3. Apply default theme variables (unscoped)
			 */
			addBase({
				":where(:root)": {
					"--kf-gray-950": "0 0% 9.02%",
					"--kf-gray-900": "0 0% 10.98%",
					"--kf-gray-800": "0 0% 16.08%",
					"--kf-gray-700": "0 0% 20%",
					"--kf-gray-600": "0 0% 36.08%",
					"--kf-gray-500": "0 0% 48.24%",
					"--kf-gray-400": "0 0% 63.92%",
					"--kf-gray-300": "0 0% 81.96%",
					"--kf-gray-200": "0 0% 92.16%",
					"--kf-gray-100": "0 0% 96.08%",
					"--kf-gray-50": "0 0% 96.86%",
					"--kf-gray-0": "0 0% 100%",

					"--kf-gray-alpha-24": "0 0% 63.92% / 24%",
					"--kf-gray-alpha-16": "0 0% 63.92% / 16%",
					"--kf-gray-alpha-10": "0 0% 63.92% / 10%",

					"--kf-slate-950": "221.54 31.71% 8.04%",
					"--kf-slate-900": "226.15 21.31% 11.96%",
					"--kf-slate-800": "227.14 17.07% 16.08%",
					"--kf-slate-700": "221.25 15.69% 20%",
					"--kf-slate-600": "222 10.87% 36.08%",
					"--kf-slate-500": "221.05 7.76% 48.04%",
					"--kf-slate-400": "220 11.48% 64.12%",
					"--kf-slate-300": "218.57 15.22% 81.96%",
					"--kf-slate-200": "220 17.65% 90%",
					"--kf-slate-100": "210 30% 96.08%",
					"--kf-slate-50": "216 33.33% 97.06%",
					"--kf-slate-0": "0 0% 100%",

					"--kf-slate-alpha-24": "220 11.48% 64.12% / 24%",
					"--kf-slate-alpha-16": "220 11.48% 64.12% / 16%",
					"--kf-slate-alpha-10": "220 11.48% 64.12% / 10%",

					"--kf-neutral-950": "var(--kf-gray-950)",
					"--kf-neutral-900": "var(--kf-gray-900)",
					"--kf-neutral-800": "var(--kf-gray-800)",
					"--kf-neutral-700": "var(--kf-gray-700)",
					"--kf-neutral-600": "var(--kf-gray-600)",
					"--kf-neutral-500": "var(--kf-gray-500)",
					"--kf-neutral-400": "var(--kf-gray-400)",
					"--kf-neutral-300": "var(--kf-gray-300)",
					"--kf-neutral-200": "var(--kf-gray-200)",
					"--kf-neutral-100": "var(--kf-gray-100)",
					"--kf-neutral-50": "var(--kf-gray-50)",
					"--kf-neutral-0": "var(--kf-gray-0)",

					"--kf-neutral-alpha-24": "var(--kf-gray-alpha-24)",
					"--kf-neutral-alpha-16": "var(--kf-gray-alpha-16)",
					"--kf-neutral-alpha-10": "var(--kf-gray-alpha-10)",

					"--kf-blue-950": "228.14 70.49% 23.92%",
					"--kf-blue-900": "228 70.55% 31.96%",
					"--kf-blue-800": "228.17 69.61% 40%",
					"--kf-blue-700": "228.07 69.8% 48.04%",
					"--kf-blue-600": "228 80.36% 56.08%",
					"--kf-blue-500": "227.94 100% 60%",
					"--kf-blue-400": "222.12 100% 70.39%",
					"--kf-blue-300": "219.81 100% 79.61%",
					"--kf-blue-200": "220 100% 87.65%",
					"--kf-blue-100": "221.43 100% 91.76%",
					"--kf-blue-50": "222 100% 96.08%",

					"--kf-blue-alpha-24": "227.93 100% 63.92% / 24%",
					"--kf-blue-alpha-16": "227.93 100% 63.92% / 16%",
					"--kf-blue-alpha-10": "227.93 100% 63.92% / 10%",

					"--kf-orange-950": "23.88 83.74% 24.12%",
					"--kf-orange-900": "24.09 84.05% 31.96%",
					"--kf-orange-800": "24.07 83.92% 39.02%",
					"--kf-orange-700": "24.26 83.93% 43.92%",
					"--kf-orange-600": "24 83.67% 48.04%",
					"--kf-orange-500": "24 95.74% 53.92%",
					"--kf-orange-400": "23.84 100% 70.39%",
					"--kf-orange-300": "24.23 100% 79.61%",
					"--kf-orange-200": "23.81 100% 87.65%",
					"--kf-orange-100": "24.29 100% 91.76%",
					"--kf-orange-50": "24 100% 96.08%",

					"--kf-orange-alpha-24": "24.13 100% 63.92% / 24%",
					"--kf-orange-alpha-16": "24.13 100% 63.92% / 16%",
					"--kf-orange-alpha-10": "24.13 100% 63.92% / 10%",

					"--kf-red-950": "355.12 70.49% 23.92%",
					"--kf-red-900": "354.78 70.55% 31.96%",
					"--kf-red-800": "354.93 69.61% 40%",
					"--kf-red-700": "355.09 69.8% 48.04%",
					"--kf-red-600": "355 80.36% 56.08%",
					"--kf-red-500": "354.8 96.08% 60%",
					"--kf-red-400": "354.83 100% 70.39%",
					"--kf-red-300": "354.81 100% 79.61%",
					"--kf-red-200": "355.24 100% 87.65%",
					"--kf-red-100": "355.71 100% 91.76%",
					"--kf-red-50": "357 100% 96.08%",

					"--kf-red-alpha-24": "354.8 96.08% 60% / 24%",
					"--kf-red-alpha-16": "354.8 96.08% 60% / 16%",
					"--kf-red-alpha-10": "354.8 96.08% 60% / 10%",

					"--kf-green-950": "148.47 72.84% 15.88%",
					"--kf-green-900": "148.46 63.93% 23.92%",
					"--kf-green-800": "147.69 63.64% 28.04%",
					"--kf-green-700": "148.21 71.78% 31.96%",
					"--kf-green-600": "147.95 71.57% 40%",
					"--kf-green-500": "148.15 72.32% 43.92%",
					"--kf-green-400": "147.78 72.32% 56.08%",
					"--kf-green-300": "147.96 72.03% 71.96%",
					"--kf-green-200": "148.24 71.83% 86.08%",
					"--kf-green-100": "154.88 84.31% 90%",
					"--kf-green-50": "147.69 72.22% 92.94%",

					"--kf-green-alpha-24": "148.15 72.32% 43.92% / 24%",
					"--kf-green-alpha-16": "148.15 72.32% 43.92% / 16%",
					"--kf-green-alpha-10": "148.15 72.32% 43.92% / 10%",

					"--kf-yellow-950": "42.16 60.66% 23.92%",
					"--kf-yellow-900": "41.71 64.42% 31.96%",
					"--kf-yellow-800": "42 63.73% 40%",
					"--kf-yellow-700": "42.04 64.08% 48.04%",
					"--kf-yellow-600": "41.85 80.39% 50%",
					"--kf-yellow-500": "41.94 92.31% 54.12%",
					"--kf-yellow-400": "42.12 100% 70.39%",
					"--kf-yellow-300": "42.12 100% 79.61%",
					"--kf-yellow-200": "41.9 100% 87.65%",
					"--kf-yellow-100": "41.18 100% 90%",
					"--kf-yellow-50": "43.9 100% 91.96%",

					"--kf-yellow-alpha-24": "41.93 95.65% 63.92% / 24%",
					"--kf-yellow-alpha-16": "41.93 95.65% 63.92% / 16%",
					"--kf-yellow-alpha-10": "41.93 95.65% 63.92% / 10%",

					"--kf-purple-950": "257.8 63.64% 28.04%",
					"--kf-purple-900": "258.29 64.42% 31.96%",
					"--kf-purple-800": "258 63.73% 40%",
					"--kf-purple-700": "257.96 64.08% 48.04%",
					"--kf-purple-600": "255.93 72.32% 56.08%",
					"--kf-purple-500": "255.93 88.04% 63.92%",
					"--kf-purple-400": "252.18 88.08% 70.39%",
					"--kf-purple-300": "249.81 100% 79.61%",
					"--kf-purple-200": "249.52 100% 87.65%",
					"--kf-purple-100": "250 100% 91.76%",
					"--kf-purple-50": "252 100% 96.08%",

					"--kf-purple-alpha-24": "255.93 83.51% 61.96% / 24%",
					"--kf-purple-alpha-16": "255.93 83.51% 61.96% / 16%",
					"--kf-purple-alpha-10": "255.93 83.51% 61.96% / 10%",

					"--kf-sky-950": "200.23 70.49% 23.92%",
					"--kf-sky-900": "199.83 70.55% 31.96%",
					"--kf-sky-800": "199.86 69.61% 40%",
					"--kf-sky-700": "200 69.8% 48.04%",
					"--kf-sky-600": "200 80.36% 56.08%",
					"--kf-sky-500": "199.89 100% 63.92%",
					"--kf-sky-400": "199.87 100% 70.39%",
					"--kf-sky-300": "200.19 100% 79.61%",
					"--kf-sky-200": "200 100% 87.65%",
					"--kf-sky-100": "200 100% 91.76%",
					"--kf-sky-50": "201 100% 96.08%",

					"--kf-sky-alpha-24": "199.89 100% 63.92% / 24%",
					"--kf-sky-alpha-16": "199.89 100% 63.92% / 16%",
					"--kf-sky-alpha-10": "199.89 100% 63.92% / 10%",

					"--kf-pink-950": "330 70.49% 23.92%",
					"--kf-pink-900": "329.74 70.55% 31.96%",
					"--kf-pink-800": "330 69.61% 40%",
					"--kf-pink-700": "330.18 69.8% 48.04%",
					"--kf-pink-600": "330 80.36% 56.08%",
					"--kf-pink-500": "330 95.65% 63.92%",
					"--kf-pink-400": "330.2 100% 70.39%",
					"--kf-pink-300": "330 100% 79.61%",
					"--kf-pink-200": "330.48 100% 87.65%",
					"--kf-pink-100": "330 100% 91.76%",
					"--kf-pink-50": "333 100% 96.08%",

					"--kf-pink-alpha-24": "330 95.65% 63.92% / 24%",
					"--kf-pink-alpha-16": "330 95.65% 63.92% / 16%",
					"--kf-pink-alpha-10": "330 95.65% 63.92% / 10%",

					"--kf-teal-950": "171.86 72.84% 15.88%",
					"--kf-teal-900": "172.31 63.93% 23.92%",
					"--kf-teal-800": "172.09 63.64% 28.04%",
					"--kf-teal-700": "172.31 71.78% 31.96%",
					"--kf-teal-600": "172.19 71.57% 40%",
					"--kf-teal-500": "171.86 72.24% 48.04%",
					"--kf-teal-400": "172.08 70.67% 55.88%",
					"--kf-teal-300": "171.84 72.03% 71.96%",
					"--kf-teal-200": "171.76 71.83% 86.08%",
					"--kf-teal-100": "171.63 84.31% 90%",
					"--kf-teal-50": "172.17 74.19% 93.92%",

					"--kf-white-alpha-24": "0 0% 100% / 24%",
					"--kf-white-alpha-16": "0 0% 100% / 16%",
					"--kf-white-alpha-10": "0 0% 100% / 10%",

					"--kf-black-alpha-24": "0 0% 0% / 24%",
					"--kf-black-alpha-16": "0 0% 0% / 16%",
					"--kf-black-alpha-10": "0 0% 0% / 10%",

					"--kf-overlay-gray": "0 0% 20% / 24%",
					"--kf-overlay-slate": "221.25 15.69% 20% / 24%",

					"--kf-overlay": "var(--kf-overlay-gray)",

					"--kf-primary-dark": "var(--kf-blue-800)",
					"--kf-primary-darker": "var(--kf-blue-700)",
					"--kf-primary-base": "var(--kf-blue-500)",
					"--kf-primary-alpha-24": "var(--kf-blue-alpha-24)",
					"--kf-primary-alpha-16": "var(--kf-blue-alpha-16)",
					"--kf-primary-alpha-10": "var(--kf-blue-alpha-10)",

					"--kf-static-black": "var(--kf-neutral-950)",
					"--kf-static-white": "var(--kf-neutral-0)",

					"--kf-bg-strong-950": "var(--kf-neutral-950)",
					"--kf-bg-surface-800": "var(--kf-neutral-800)",
					"--kf-bg-sub-300": "var(--kf-neutral-300)",
					"--kf-bg-soft-200": "var(--kf-neutral-200)",
					"--kf-bg-weak-50": "var(--kf-neutral-50)",
					"--kf-bg-white-0": "var(--kf-neutral-0)",

					"--kf-text-strong-950": "var(--kf-neutral-950)",
					"--kf-text-sub-600": "var(--kf-neutral-600)",
					"--kf-text-soft-400": "var(--kf-neutral-400)",
					"--kf-text-disabled-300": "var(--kf-neutral-300)",
					"--kf-text-white-0": "var(--kf-neutral-0)",

					"--kf-stroke-strong-950": "var(--kf-neutral-950)",
					"--kf-stroke-sub-300": "var(--kf-neutral-300)",
					"--kf-stroke-soft-200": "var(--kf-neutral-200)",
					"--kf-stroke-white-0": "var(--kf-neutral-0)",

					"--kf-faded-dark": "var(--kf-neutral-800)",
					"--kf-faded-base": "var(--kf-neutral-500)",
					"--kf-faded-light": "var(--kf-neutral-200)",
					"--kf-faded-lighter": "var(--kf-neutral-100)",

					"--kf-information-dark": "var(--kf-blue-950)",
					"--kf-information-base": "var(--kf-blue-500)",
					"--kf-information-light": "var(--kf-blue-200)",
					"--kf-information-lighter": "var(--kf-blue-50)",

					"--kf-warning-dark": "var(--kf-orange-950)",
					"--kf-warning-base": "var(--kf-orange-500)",
					"--kf-warning-light": "var(--kf-orange-200)",
					"--kf-warning-lighter": "var(--kf-orange-50)",

					"--kf-error-dark": "var(--kf-red-950)",
					"--kf-error-base": "var(--kf-red-500)",
					"--kf-error-light": "var(--kf-red-200)",
					"--kf-error-lighter": "var(--kf-red-50)",

					"--kf-success-dark": "var(--kf-green-950)",
					"--kf-success-base": "var(--kf-green-500)",
					"--kf-success-light": "var(--kf-green-200)",
					"--kf-success-lighter": "var(--kf-green-50)",

					"--kf-away-dark": "var(--kf-yellow-950)",
					"--kf-away-base": "var(--kf-yellow-500)",
					"--kf-away-light": "var(--kf-yellow-200)",
					"--kf-away-lighter": "var(--kf-yellow-50)",

					"--kf-feature-dark": "var(--kf-purple-950)",
					"--kf-feature-base": "var(--kf-purple-500)",
					"--kf-feature-light": "var(--kf-purple-200)",
					"--kf-feature-lighter": "var(--kf-purple-50)",

					"--kf-verified-dark": "var(--kf-sky-950)",
					"--kf-verified-base": "var(--kf-sky-500)",
					"--kf-verified-light": "var(--kf-sky-200)",
					"--kf-verified-lighter": "var(--kf-sky-50)",

					"--kf-highlighted-dark": "var(--kf-pink-950)",
					"--kf-highlighted-base": "var(--kf-pink-500)",
					"--kf-highlighted-light": "var(--kf-pink-200)",
					"--kf-highlighted-lighter": "var(--kf-pink-50)",

					"--kf-stable-dark": "var(--kf-teal-950)",
					"--kf-stable-base": "var(--kf-teal-500)",
					"--kf-stable-light": "var(--kf-teal-200)",
					"--kf-stable-lighter": "var(--kf-teal-50)",
				},
				".dark": {
					"--kf-bg-strong-950": "var(--kf-neutral-0)",
					"--kf-bg-surface-800": "var(--kf-neutral-200)",
					"--kf-bg-sub-300": "var(--kf-neutral-600)",
					"--kf-bg-soft-200": "var(--kf-neutral-700)",
					"--kf-bg-weak-50": "var(--kf-neutral-900)",
					"--kf-bg-white-0": "var(--kf-neutral-950)",

					"--kf-text-strong-950": "var(--kf-neutral-0)",
					"--kf-text-sub-600": "var(--kf-neutral-400)",
					"--kf-text-soft-400": "var(--kf-neutral-500)",
					"--kf-text-disabled-300": "var(--kf-neutral-600)",
					"--kf-text-white-0": "var(--kf-neutral-950)",

					"--kf-stroke-strong-950": "var(--kf-neutral-0)",
					"--kf-stroke-sub-300": "var(--kf-neutral-600)",
					"--kf-stroke-soft-200": "var(--kf-neutral-700)",
					"--kf-stroke-white-0": "var(--kf-neutral-950)",

					"--kf-faded-dark": "var(--kf-neutral-300)",
					"--kf-faded-base": "var(--kf-neutral-500)",
					"--kf-faded-light": "var(--kf-neutral-alpha-24)",
					"--kf-faded-lighter": "var(--kf-neutral-alpha-16)",

					"--kf-information-dark": "var(--kf-blue-400)",
					"--kf-information-base": "var(--kf-blue-500)",
					"--kf-information-light": "var(--kf-blue-alpha-24)",
					"--kf-information-lighter": "var(--kf-blue-alpha-16)",

					"--kf-warning-dark": "var(--kf-orange-400)",
					"--kf-warning-base": "var(--kf-orange-600)",
					"--kf-warning-light": "var(--kf-orange-alpha-24)",
					"--kf-warning-lighter": "var(--kf-orange-alpha-16)",

					"--kf-error-dark": "var(--kf-red-400)",
					"--kf-error-base": "var(--kf-red-600)",
					"--kf-error-light": "var(--kf-red-alpha-24)",
					"--kf-error-lighter": "var(--kf-red-alpha-16)",

					"--kf-success-dark": "var(--kf-green-400)",
					"--kf-success-base": "var(--kf-green-600)",
					"--kf-success-light": "var(--kf-green-alpha-24)",
					"--kf-success-lighter": "var(--kf-green-alpha-16)",

					"--kf-away-dark": "var(--kf-yellow-400)",
					"--kf-away-base": "var(--kf-yellow-600)",
					"--kf-away-light": "var(--kf-yellow-alpha-24)",
					"--kf-away-lighter": "var(--kf-yellow-alpha-16)",

					"--kf-feature-dark": "var(--kf-purple-400)",
					"--kf-feature-base": "var(--kf-purple-500)",
					"--kf-feature-light": "var(--kf-purple-alpha-24)",
					"--kf-feature-lighter": "var(--kf-purple-alpha-16)",

					"--kf-verified-dark": "var(--kf-sky-400)",
					"--kf-verified-base": "var(--kf-sky-600)",
					"--kf-verified-light": "var(--kf-sky-alpha-24)",
					"--kf-verified-lighter": "var(--kf-sky-alpha-16)",

					"--kf-highlighted-dark": "var(--kf-pink-400)",
					"--kf-highlighted-base": "var(--kf-pink-600)",
					"--kf-highlighted-light": "var(--kf-pink-alpha-24)",
					"--kf-highlighted-lighter": "var(--kf-pink-alpha-16)",

					"--kf-stable-dark": "var(--kf-teal-400)",
					"--kf-stable-base": "var(--kf-teal-600)",
					"--kf-stable-light": "var(--kf-teal-alpha-24)",
					"--kf-stable-lighter": "var(--kf-teal-alpha-16)",

					"--kf-overlay-gray": "0 0% 20% / 56%",
					"--kf-overlay-slate": "221.25 15.69% 20% / 56%",

					"--kf-overlay": "var(--kf-overlay-gray)",
				},
				// "@supports (color: color(display-p3 1 1 1))": {
				// 	"@media (color-gamut: p3)": {
				// 		":where(:root)": {
				// 			"--kf-accent-1": "oklch(99.4% 0.0012 279.2)",
				// 			"--kf-accent-2": "oklch(98.3% 0.005 279.2)",
				// 			"--kf-accent-3": "oklch(95.5% 0.0112 279.2)",
				// 			"--kf-accent-4": "oklch(92.8% 0.0174 279.2)",
				// 			"--kf-accent-5": "oklch(89.8% 0.0188 279.2)",
				// 			"--kf-accent-6": "oklch(86.2% 0.0188 279.2)",
				// 			"--kf-accent-7": "oklch(81.2% 0.0188 279.2)",
				// 			"--kf-accent-8": "oklch(74.1% 0.0188 279.2)",
				// 			"--kf-accent-9": "oklch(31.1% 0.0125 279.2)",
				// 			"--kf-accent-10": "oklch(38.4% 0.0125 279.2)",
				// 			"--kf-accent-11": "oklch(51.5% 0.0188 279.2)",
				// 			"--kf-accent-12": "oklch(33% 0.0125 279.2)",
				// 			"--kf-accent-a1":
				// 				"color(display-p3 0.0196 0.0196 0.5098 / 0.008)",
				// 			"--kf-accent-a2":
				// 				"color(display-p3 0.0235 0.1608 0.7216 / 0.028)",
				// 			"--kf-accent-a3":
				// 				"color(display-p3 0.0078 0.1255 0.5333 / 0.067)",
				// 			"--kf-accent-a4":
				// 				"color(display-p3 0.0039 0.0784 0.5216 / 0.106)",
				// 			"--kf-accent-a5":
				// 				"color(display-p3 0.0078 0.0627 0.4118 / 0.146)",
				// 			"--kf-accent-a6": "color(display-p3 0.0078 0.0471 0.298 / 0.189)",
				// 			"--kf-accent-a7":
				// 				"color(display-p3 0.0039 0.0314 0.2196 / 0.251)",
				// 			"--kf-accent-a8":
				// 				"color(display-p3 0.0039 0.0275 0.1647 / 0.342)",
				// 			"--kf-accent-a9": "color(display-p3 0 0.0039 0.0353 / 0.816)",
				// 			"--kf-accent-a10": "color(display-p3 0 0.0078 0.0392 / 0.742)",
				// 			"--kf-accent-a11": "color(display-p3 0 0.0157 0.0863 / 0.604)",
				// 			"--kf-accent-a12": "color(display-p3 0 0.0039 0.0353 / 0.797)",
				// 			"--kf-accent-contrast": "#fff",
				// 			"--kf-accent-surface":
				// 				"color(display-p3 0.9725 0.9725 0.9843 / 0.8)",
				// 			"--kf-accent-indicator": "oklch(31.1% 0.0125 279.2)",
				// 			"--kf-accent-track": "oklch(31.1% 0.0125 279.2)",
				// 			"--kf-gray-1": "oklch(99.2% 0.0017 279.2)",
				// 			"--kf-gray-2": "oklch(98.3% 0.0031 279.2)",
				// 			"--kf-gray-3": "oklch(95.6% 0.0055 279.2)",
				// 			"--kf-gray-4": "oklch(93.2% 0.0073 279.2)",
				// 			"--kf-gray-5": "oklch(90.9% 0.0094 279.2)",
				// 			"--kf-gray-6": "oklch(88.6% 0.0108 279.2)",
				// 			"--kf-gray-7": "oklch(85.4% 0.0134 279.2)",
				// 			"--kf-gray-8": "oklch(79.4% 0.0181 279.2)",
				// 			"--kf-gray-9": "oklch(64.6% 0.0182 279.2)",
				// 			"--kf-gray-10": "oklch(61.1% 0.0173 279.2)",
				// 			"--kf-gray-11": "oklch(50.5% 0.015 279.2)",
				// 			"--kf-gray-12": "oklch(24.5% 0.0125 279.2)",
				// 			"--kf-gray-a1": "color(display-p3 0.0235 0.0235 0.349 / 0.012)",
				// 			"--kf-gray-a2": "color(display-p3 0.0235 0.0235 0.5137 / 0.024)",
				// 			"--kf-gray-a3": "color(display-p3 0.0078 0.0667 0.3176 / 0.063)",
				// 			"--kf-gray-a4": "color(display-p3 0.0118 0.051 0.2588 / 0.095)",
				// 			"--kf-gray-a5": "color(display-p3 0.0078 0.0353 0.2235 / 0.126)",
				// 			"--kf-gray-a6": "color(display-p3 0.0039 0.0275 0.2078 / 0.153)",
				// 			"--kf-gray-a7": "color(display-p3 0.0078 0.0275 0.2039 / 0.197)",
				// 			"--kf-gray-a8": "color(display-p3 0.0039 0.0314 0.2039 / 0.275)",
				// 			"--kf-gray-a9": "color(display-p3 0.0039 0.0196 0.1137 / 0.455)",
				// 			"--kf-gray-a10": "color(display-p3 0.0039 0.0118 0.098 / 0.495)",
				// 			"--kf-gray-a11": "color(display-p3 0 0.0157 0.0667 / 0.616)",
				// 			"--kf-gray-a12": "color(display-p3 0 0.0039 0.0275 / 0.879)",
				// 			"--kf-gray-contrast": "#fff",
				// 			"--kf-gray-surface": "color(display-p3 1 1 1 / 80%)",
				// 			"--kf-gray-indicator": "oklch(64.6% 0.0182 279.2)",
				// 			"--kf-gray-track": "oklch(64.6% 0.0182 279.2)",
				// 		},
				// 	},
				// },
			});

			/**
			 * 4. Apply aforementioned `preflight.css` pseudo resets (unscoped)
			 */
			addBase({
				"::before, ::after": {
					"--kf-content": "''",
				},
			});

			/**
			 * 5. Set page-level styling (scoped)
			 *
			 *    Ordinarily we'd opt for applying these styles to the `html` or
			 *    `body` elements, but in our case, we have no "root" element to
			 *    target. Instead, we apply these defaults to **all** of our elements.
			 */
			addScopedBase({
				"*": {
					fontFamily: "var(--kf-font-family)",
				},
			});

			/**
			 * Conditionally apply CSS to ios devices
			 */
			addVariant("supports-ios", "@supports (-webkit-touch-callout: none)");
		}),
	],
} satisfies Config;

export default config;
