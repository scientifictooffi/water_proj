import { create } from 'zustand'
import { characters, scenes, START_SCENE, type Character, type Choice, type GameState } from '../data/scenario'

type Step = { sceneId: string; choice: string; water: number }

type Store = {
  character: Character | null
  state: GameState
  sceneId: string
  log: string[]
  steps: Step[]
  flash: 'none' | 'dry'
  start: (c: Character) => void
  choose: (c: Choice) => void
  reset: () => void
}

const clamp = (n: number) => Math.max(0, Math.min(100, n))

let flashTimer: ReturnType<typeof setTimeout> | undefined
const clearFlashTimer = () => {
  if (flashTimer !== undefined) clearTimeout(flashTimer)
  flashTimer = undefined
}

export const useGame = create<Store>((set, get) => ({
  character: null,
  state: { ...characters[0].start },
  sceneId: START_SCENE,
  log: [],
  steps: [],
  flash: 'none',
  start: (c) => {
    clearFlashTimer()
    set({ character: c, state: { ...c.start }, sceneId: START_SCENE, log: [START_SCENE], steps: [], flash: 'none' })
  },
  choose: (c) => {
    const { state, sceneId, log, steps } = get()
    const scene = scenes[sceneId]
    // ignore choices that don't belong to the current scene or fail their requirement
    if (!scene || !scene.choices.includes(c)) return
    if (c.requires && !c.requires(state)) return
    const next: GameState = {
      water: Math.round((state.water + c.effects.water) * 10) / 10,
      health: clamp(state.health + (c.effects.health ?? 0)),
      social: clamp(state.social + (c.effects.social ?? 0)),
      money: state.money + (c.effects.money ?? 0),
    }
    const nextScene = scenes[c.next] ? c.next : 'night'
    set({
      state: next,
      sceneId: nextScene,
      log: [...log, nextScene],
      steps: [...steps, { sceneId, choice: c.label, water: c.effects.water }],
      flash: c.effects.water < 0 ? 'dry' : 'none',
    })
    clearFlashTimer()
    if (c.effects.water < 0) flashTimer = setTimeout(() => { flashTimer = undefined; set({ flash: 'none' }) }, 350)
  },
  reset: () => {
    clearFlashTimer()
    set({ character: null, state: { ...characters[0].start }, sceneId: START_SCENE, log: [], steps: [], flash: 'none' })
  },
}))

export function saveResult(r: { character: string; ending: string; water: number }) {
  try {
    const prev = JSON.parse(localStorage.getItem('kaplya:results') ?? '[]')
    localStorage.setItem('kaplya:results', JSON.stringify([...prev, { ...r, at: Date.now() }].slice(-20)))
  } catch { /* storage unavailable */ }
}

export function loadResults(): { character: string; ending: string; water: number; at: number }[] {
  try { return JSON.parse(localStorage.getItem('kaplya:results') ?? '[]') } catch { return [] }
}
