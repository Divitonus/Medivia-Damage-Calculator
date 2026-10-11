import { build } from 'vite'
import type { Rollup } from 'vite'
import { describe, expect, it } from 'vitest'

describe('production build', () => {
  it('references its assets under the GitHub Pages repo path', async () => {
    const result = (await build({
      logLevel: 'silent',
      build: { write: false },
    })) as Rollup.RollupOutput
    const html = result.output.find((o) => o.fileName === 'index.html')

    expect(html?.type).toBe('asset')
    expect(String(html && 'source' in html ? html.source : '')).toContain(
      '/Medivia-Damage-Calculator/assets/',
    )
  })
})
