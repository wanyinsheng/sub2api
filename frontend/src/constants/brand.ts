export const DEFAULT_SITE_NAME = 'Synora'
export const DEFAULT_SITE_SUBTITLE = 'AI Access Gateway'

const LEGACY_SITE_NAME = 'Sub2API'
const LEGACY_SITE_SUBTITLES = new Set([
  'Subscription to API Conversion Platform',
  'AI API Gateway Platform',
])

export function resolveSiteName(value?: string | null): string {
  const trimmed = value?.trim() || ''
  if (!trimmed || trimmed === LEGACY_SITE_NAME) {
    return DEFAULT_SITE_NAME
  }
  return trimmed
}

export function resolveSiteSubtitle(value?: string | null): string {
  const trimmed = value?.trim() || ''
  if (!trimmed || LEGACY_SITE_SUBTITLES.has(trimmed)) {
    return DEFAULT_SITE_SUBTITLE
  }
  return trimmed
}
