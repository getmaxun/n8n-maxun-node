const DEFAULT_MAXUN_BASE_URL = 'https://app.maxun.dev';

export function normalizeBaseUrl(baseUrl?: string): string {
	const candidate = baseUrl?.trim() || DEFAULT_MAXUN_BASE_URL;
	return candidate.replace(/\/+$/, '');
}

export function getMaxunSdkBaseUrl(baseUrl?: string): string {
	return normalizeBaseUrl(baseUrl);
}
