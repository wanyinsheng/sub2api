package service

import "strings"

const (
	defaultSiteName        = "Synora"
	defaultSiteSubtitle    = "AI Access Gateway"
	legacySiteName         = "Sub2API"
	legacySiteSubtitle     = "Subscription to API Conversion Platform"
	legacyHomeSiteSubtitle = "AI API Gateway Platform"
)

func normalizeSiteName(value string) string {
	trimmed := strings.TrimSpace(value)
	if trimmed == "" || trimmed == legacySiteName {
		return defaultSiteName
	}
	return trimmed
}

func normalizeSiteSubtitle(value string) string {
	trimmed := strings.TrimSpace(value)
	if trimmed == "" || trimmed == legacySiteSubtitle || trimmed == legacyHomeSiteSubtitle {
		return defaultSiteSubtitle
	}
	return trimmed
}
