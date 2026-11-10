/**
 * Web Audio API synthesizer for handwriting sounds (pen/pencil gliding on paper).
 * Synthesizes natural friction across paper fibers with microscopic grain texture,
 * dual-band acoustic filtering, nib-contact presence, and stroke-duration tracking.
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
 * Play a synthesized pen-on-paper handwriting stroke sound.
 * @param {Object} [options]
 * @param {number} [options.duration=0.09] - Stroke drawing duration in seconds
 * @param {boolean} [options.isDot=false] - Short dot/punctuation mark tap
 * @param {boolean} [options.isSpace=false] - Word transition pause (softer lift)
 * @param {boolean} [options.isPunctuation=false] - Comma/period tap
 * @param {number} [options.volume=0.22] - Master volume (0.0 to 1.0)
 */
export function playWritingStroke({
  duration = 0.09,
  isDot = false,
  isSpace = false,
  isPunctuation = false,
  volume = 0.22,
} = {}) {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }
    if (ctx.state !== 'running') return

    const now = ctx.currentTime

    // Calculate effective scratch duration matching the visual drawing
    const isShortTap = isDot || isPunctuation || duration < 0.02
    const strokeDur = isShortTap
      ? 0.035
      : Math.max(0.045, Math.min(duration * 1.05, 0.26))

    // 1. Paper texture friction noise buffer
    const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * strokeDur))
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const channelData = noiseBuffer.getChannelData(0)

    // Fill with textured noise (with microscopic grain modulation simulating paper tooth)
    for (let i = 0; i < bufferSize; i++) {
      const flutter = 0.85 + 0.15 * Math.sin(i * 0.04)
      channelData[i] = (Math.random() * 2 - 1) * flutter
    }

    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = noiseBuffer

    // 2. Dual-stage paper friction filter
    // Bandpass centered at pen nib resonance (~2100Hz - 3400Hz)
    const bandFilter = ctx.createBiquadFilter()
    bandFilter.type = 'bandpass'
    const centerFreq = isShortTap
      ? 2600 + Math.random() * 400
      : 2100 + Math.random() * 600
    bandFilter.frequency.setValueAtTime(centerFreq, now)
    bandFilter.Q.setValueAtTime(isShortTap ? 2.2 : 1.7, now)

    // High shelf to gently soften harsh highs for a warm, realistic paper scratch
    const shelfFilter = ctx.createBiquadFilter()
    shelfFilter.type = 'highshelf'
    shelfFilter.frequency.setValueAtTime(5500, now)
    shelfFilter.gain.setValueAtTime(-6, now)

    // 3. Natural pen stroke gain envelope (attack -> sustain -> smooth paper lift decay)
    const strokeGain = ctx.createGain()
    const strokeVol = volume * (isShortTap ? 0.65 : 0.9) * (0.9 + Math.random() * 0.2)
    const attackTime = isShortTap ? 0.006 : 0.012
    const decayTime = isShortTap ? 0.02 : 0.025

    strokeGain.gain.setValueAtTime(0.0001, now)
    strokeGain.gain.linearRampToValueAtTime(strokeVol, now + attackTime)

    // Sustain across the stroke duration, then fade out as pen lifts off paper
    const releaseStart = Math.max(now + attackTime, now + strokeDur - decayTime)
    strokeGain.gain.setValueAtTime(strokeVol, releaseStart)
    strokeGain.gain.exponentialRampToValueAtTime(0.0001, now + strokeDur)

    // Connect noise pipeline
    noiseSource.connect(bandFilter)
    bandFilter.connect(shelfFilter)
    shelfFilter.connect(strokeGain)
    strokeGain.connect(ctx.destination)
    noiseSource.start(now)
    noiseSource.stop(now + strokeDur + 0.01)

    // 4. Subtle low-frequency nib contact presence (~280Hz, very soft, 8ms)
    const tapOsc = ctx.createOscillator()
    const tapGain = ctx.createGain()
    tapOsc.type = 'sine'
    tapOsc.frequency.setValueAtTime(isShortTap ? 340 : 280, now)
    tapOsc.frequency.exponentialRampToValueAtTime(160, now + 0.01)

    const tapVol = volume * 0.28 * (0.85 + Math.random() * 0.3)
    tapGain.gain.setValueAtTime(tapVol, now)
    tapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012)

    tapOsc.connect(tapGain)
    tapGain.connect(ctx.destination)
    tapOsc.start(now)
    tapOsc.stop(now + 0.015)
  } catch {
    // Gracefully ignore audio errors (e.g. autoplay restricted or headless)
  }
}

/**
 * Backward compatibility alias for key stroke calls.
 */
export function playKeyStroke(options = {}) {
  return playWritingStroke(options)
}
