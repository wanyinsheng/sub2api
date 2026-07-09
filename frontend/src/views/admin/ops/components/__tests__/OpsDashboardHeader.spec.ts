import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import OpsDashboardHeader from '../OpsDashboardHeader.vue'
import type { OpsDashboardOverview } from '@/api/admin/ops'

vi.mock('@/api', () => ({
  adminAPI: {
    groups: {
      getAll: vi.fn().mockResolvedValue([]),
    },
  },
}))

vi.mock('@/api/admin/ops', () => ({
  opsAPI: {
    getRealtimeTrafficSummary: vi.fn().mockResolvedValue({
      summary: {
        window: '1min',
        start_time: '2026-07-09T07:00:00Z',
        end_time: '2026-07-09T07:01:00Z',
        platform: '',
        group_id: null,
        qps: { current: 0.1, peak: 0.1, avg: 0.1 },
        tps: { current: 8767.6, peak: 7809.2, avg: 8767.6 },
      },
    }),
  },
}))

vi.mock('@/stores', () => ({
  useAdminSettingsStore: () => ({
    opsRealtimeMonitoringEnabled: true,
    setOpsRealtimeMonitoringEnabledLocal: vi.fn(),
  }),
}))

vi.mock('vue-i18n', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue-i18n')>()
  return {
    ...actual,
    useI18n: () => ({
      t: (key: string) => key,
    }),
  }
})

const SelectStub = defineComponent({
  name: 'Select',
  props: {
    modelValue: { type: [String, Number, Boolean, null], default: null },
    options: { type: Array, default: () => [] },
  },
  emits: ['update:modelValue'],
  template: '<div class="select-stub" />',
})

const HelpTooltipStub = defineComponent({
  name: 'HelpTooltip',
  props: {
    content: { type: String, default: '' },
  },
  template: '<span class="help-tooltip-stub" />',
})

const BaseDialogStub = defineComponent({
  name: 'BaseDialog',
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
  template: '<div v-if="modelValue" class="base-dialog-stub"><slot /></div>',
})

const IconStub = defineComponent({
  name: 'Icon',
  template: '<span class="icon-stub" />',
})

function makeOverview(): OpsDashboardOverview {
  return {
    start_time: '2026-07-09T07:00:00Z',
    end_time: '2026-07-09T08:00:00Z',
    platform: '',
    group_id: null,
    health_score: 61,
    system_metrics: null,
    job_heartbeats: [],
    success_count: 783,
    error_count_total: 0,
    business_limited_count: 0,
    error_count_sla: 0,
    request_count_total: 783,
    request_count_sla: 783,
    token_consumed: 76780000,
    sla: 1,
    error_rate: 0,
    upstream_error_rate: 0,
    upstream_error_count_excl_429_529: 0,
    upstream_429_count: 0,
    upstream_529_count: 0,
    qps: { current: 0.1, peak: 0.1, avg: 0.2 },
    tps: { current: 8767.6, peak: 7809.2, avg: 21327.7 },
    duration: {
      p99_ms: 83855,
      p95_ms: 40189,
      p90_ms: 28615,
      p50_ms: 11280,
      avg_ms: 15381,
      max_ms: 198188,
    },
    ttft: {
      p99_ms: 21289,
      p95_ms: 8320,
      p90_ms: 5945,
      p50_ms: 2638,
      avg_ms: 3706,
      max_ms: 85512,
    },
  }
}

describe('OpsDashboardHeader', () => {
  it('在 TTFT 卡片同时展示 P99、P95 和 P90 首 Token 延迟', () => {
    const wrapper = mount(OpsDashboardHeader, {
      props: {
        overview: makeOverview(),
        platform: '',
        groupId: null,
        timeRange: '1h',
        queryMode: 'auto',
        loading: false,
        lastUpdated: new Date('2026-07-09T08:00:00Z'),
        thresholds: {
          ttft_p99_ms_max: 500,
        },
      },
      global: {
        stubs: {
          Select: SelectStub,
          HelpTooltip: HelpTooltipStub,
          BaseDialog: BaseDialogStub,
          Icon: IconStub,
        },
      },
    })

    const text = wrapper.text().replace(/\s+/g, ' ')

    expect(text).toContain('TTFT')
    expect(text).toMatch(/21289\s*ms\s+\(P99\)/)
    expect(text).toMatch(/P95:\s*8320\s*ms/)
    expect(text).toMatch(/P90:\s*5945\s*ms/)
  })
})
