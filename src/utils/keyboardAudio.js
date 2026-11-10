/**
 * Web Audio API synthesizer for tactile mechanical keyboard typing sounds.
 * Generates natural switch click transients and acoustic bottom-out "thock"
 * with subtle randomized pitch variation on every keystroke.
 * Zero external audio assets, zero latency, zero bundle overhead.
 */

let sharedAudioCtx = null

export function getAudioContext() {
  if (typeof window === 'undefined') return null
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return null
  if (!sharedAudioCtx) {
    sharedAudioCtx = new AudioCtx()
  }
  return sharedAudioCtx
}

export function resumeAudio() {
  const ctx = getAudioContext()
  if (ctx && ctx.state === 'suspended') {
    return ctx.resume().catch(() => {})
  }
  return Promise.resolve()
}

/**
 * Play a synthesized mechanical keyboard keypress sound.
 * @param {Object} [options]
 * @param {boolean} [options.isSpace=false] - Spacebar has a deeper acoustic resonance
 * @param {boolean} [options.isPunctuation=false] - Commas/periods have slightly different pitch
 * @param {number} [options.volume=0.15] - Master gain volume (0.0 to 1.0)
 */
export function playKeyStroke({ isSpace = false, isPunctuation = false, volume = 0.14 } = {}) {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    // Attempt to resume if suspended
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }
    if (ctx.state !== 'running') return

    const now = ctx.currentTime

    // 1. High-frequency transient click (switch leaf & keycap impact)
    const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * 0.01))
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }

    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = noiseBuffer

    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'bandpass'
    const clickFreq = isSpace ? 2800 : 3400 + (Math.random() * 600 - 300)
    noiseFilter.frequency.setValueAtTime(clickFreq, now)
    noiseFilter.Q.setValueAtTime(3.0, now)

    const noiseGain = ctx.createGain()
    const clickVol = volume * (isSpace ? 0.7 : 0.85) * (0.9 + Math.random() * 0.2)
    noiseGain.gain.setValueAtTime(clickVol, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.01)

    noiseSource.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noiseSource.start(now)

    // 2. Low-frequency acoustic "thock" (switch bottom-out plate resonance)
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()

    let baseFreq = 220
    if (isSpace) baseFreq = 145
    else if (isPunctuation) baseFreq = 180
    baseFreq += (Math.random() * 28 - 14) // subtle natural jitter

    const thockDuration = isSpace ? 0.045 : 0.032
    osc.type = isSpace ? 'sine' : 'triangle'
    osc.frequency.setValueAtTime(baseFreq, now)
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.6, now + thockDuration)

    const thockVol = volume * (isSpace ? 1.1 : 0.95) * (0.9 + Math.random() * 0.2)
    oscGain.gain.setValueAtTime(thockVol, now)
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + thockDuration)

    osc.connect(oscGain)
    oscGain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + thockDuration)
  } catch {
    // Gracefully ignore audio errors (e.g. if autoplay restricted or headless)
  }
}
