import { describe, expect, it } from 'vitest'
import { isProjectRepositoryUrl } from '@/utils/url'

describe('isProjectRepositoryUrl', () => {
  it('detects the project repository and its subpaths', () => {
    expect(isProjectRepositoryUrl('https://github.com/Wei-Shaw/sub2api')).toBe(true)
    expect(isProjectRepositoryUrl('https://github.com/Wei-Shaw/sub2api/blob/main/README.md')).toBe(true)
  })

  it('does not match unrelated urls', () => {
    expect(isProjectRepositoryUrl('https://docs.example.com/sub2api')).toBe(false)
    expect(isProjectRepositoryUrl('https://github.com/Wei-Shaw/sub2api-docs')).toBe(false)
    expect(isProjectRepositoryUrl('/docs')).toBe(false)
  })
})
