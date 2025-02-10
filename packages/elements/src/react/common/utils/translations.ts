import type { TranslationConfig, Translations } from '@koroflow/core-js';

/**
 * Deep merges translation objects
 */
export function deepMergeTranslations(
	base: Translations,
	override: Partial<Translations>
): Translations {
	return {
		cookieBanner: {
			...base.cookieBanner,
			...(override.cookieBanner || {}),
		},
		consentManagerDialog: {
			...base.consentManagerDialog,
			...(override.consentManagerDialog || {}),
		},
		consentManagerWidget: {
			...base.consentManagerWidget,
			...(override.consentManagerWidget || {}),
		},
		consentTypes: {
			...base.consentTypes,
			...(override.consentTypes || {}),
		},
	};
}

/**
 * Merges custom translations with defaults
 */
export function mergeTranslationConfigs(
	defaultConfig: TranslationConfig,
	customConfig?: Partial<TranslationConfig>
): TranslationConfig {
	const mergedTranslations = { ...defaultConfig.translations };

	if (customConfig?.translations) {
		// Merge English translations first
		if (customConfig.translations.en) {
			mergedTranslations.en = deepMergeTranslations(
				defaultConfig.translations.en as Translations,
				customConfig.translations.en as Partial<Translations>
			);
		}

		// Merge other languages
		for (const [lang, translations] of Object.entries(
			customConfig.translations
		)) {
			if (lang !== 'en' && translations) {
				const baseTranslations = mergedTranslations.en;
				mergedTranslations[lang] = deepMergeTranslations(
					baseTranslations as Translations,
					translations as Partial<Translations>
				);
			}
		}
	}

	return {
		...defaultConfig,
		...customConfig,
		translations: mergedTranslations as Record<string, Translations>,
	};
}

/**
 * Detects browser language and returns appropriate default language
 */
export function detectBrowserLanguage(
	translations: Record<string, unknown>,
	defaultLanguage: string | undefined,
	disableAutoSwitch = false
): string {
	if (disableAutoSwitch) {
		return defaultLanguage || 'en';
	}

	const browserLanguages = navigator?.languages || [
		navigator?.language || 'en',
	];

	for (const lang of browserLanguages) {
		const primaryLang = lang.split('-')[0];
		if (primaryLang && primaryLang in translations) {
			return primaryLang;
		}
	}

	return 'en';
}
