import { describe, expect, it } from 'vitest'
import { characters, pickEnding, scenes, START_SCENE, type Choice, type GameState } from './scenario'

const clamp = (n: number) => Math.max(0, Math.min(100, n))
const apply = (s: GameState, c: Choice): GameState => ({
  water: Math.round((s.water + c.effects.water) * 10) / 10,
  health: clamp(s.health + (c.effects.health ?? 0)),
  social: clamp(s.social + (c.effects.social ?? 0)),
  money: s.money + (c.effects.money ?? 0),
})

type Result = { ending: string; water: number }
function enumerate(start: GameState): Result[] {
  const out: Result[] = []
  const walk = (s: GameState, sceneId: string, log: string[]) => {
    const scene = scenes[sceneId]
    if (!scene || scene.choices.length === 0) {
      out.push({ ending: pickEnding(s, log).id, water: s.water })
      return
    }
    for (const c of scene.choices) {
      if (c.requires && !c.requires(s)) continue
      const next = scenes[c.next] ? c.next : 'night'
      walk(apply(s, c), next, [...log, next])
    }
  }
  walk({ ...start }, START_SCENE, [START_SCENE])
  return out
}

const ENDINGS = ['dry', 'sick', 'bought', 'alone', 'balanced']

describe('scenario graph', () => {
  it('every choice points at an existing scene', () => {
    for (const scene of Object.values(scenes))
      for (const c of scene.choices) expect(scenes[c.next], `${scene.id} -> ${c.next}`).toBeDefined()
  })

  it('water hints match effects', () => {
    for (const scene of Object.values(scenes))
      for (const c of scene.choices) {
        if (!c.hint) continue
        const m = c.hint.match(/(−|-)?(\d+(?:,\d+)?) л/)
        if (!m) continue
        const litres = (m[1] ? -1 : 1) * Number(m[2].replace(',', '.'))
        expect(litres, `${scene.id}: "${c.label}"`).toBe(c.effects.water)
      }
  })
})

describe('balance', () => {
  it('all five endings are reachable', () => {
    const seen = new Set(characters.flatMap((c) => enumerate(c.start).map((r) => r.ending)))
    for (const e of ENDINGS) expect(seen.has(e), e).toBe(true)
  })

  it.each(characters.map((c) => [c.id, c.start] as const))('%s: balanced ending is rare but reachable', (_id, start) => {
    const res = enumerate(start)
    const share = res.filter((r) => r.ending === 'balanced').length / res.length
    expect(share).toBeGreaterThanOrEqual(0.05)
    expect(share).toBeLessThanOrEqual(0.2)
  })

  it.each(characters.map((c) => [c.id, c.start] as const))('%s: cannot hoard water, can run dry', (_id, start) => {
    const waters = enumerate(start).map((r) => r.water)
    expect(Math.max(...waters)).toBeLessThanOrEqual(6.5)
    expect(Math.min(...waters)).toBeLessThan(0)
  })
})
