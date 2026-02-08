<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref(null)
const wrapRef = ref(null)

let ctx = null
let rafId = null
let lastTs = 0

// Game state
let started = false
let gameOver = false
let score = 0
let hiScore = 0

// Physics & tuning
const GRAVITY = 2400 // px/s^2
const JUMP_VEL = 850 // px/s
const GROUND_H = 54
const BASE_SPEED = 420 // px/s
const SPEED_GROWTH = 0.02 // per second
const OBSTACLE_GAP_MIN = 280
const OBSTACLE_GAP_MAX = 520

// Canvas size
let W = 900
let H = 260
let DPR = 1

// Entities
const dino = {
    x: 80,
    y: 0, // top
    w: 44,
    h: 50,
    vy: 0,
    onGround: true,
    ducking: false,
}

let obstacles = [] // {x,w,h}
let nextObstacleIn = 380
let speed = BASE_SPEED

// Ground dots
let dots = []
function resetDots() {
    dots = Array.from({ length: 90 }).map(() => ({
        x: Math.random() * W,
        y: H - GROUND_H + (Math.random() * 20),
        r: Math.random() * 1.6 + 0.3,
    }))
}

// Helpers
const clamp = (n, a, b) => Math.max(a, Math.min(b, n))

function setCanvasSize() {
    const canvas = canvasRef.value
    const wrap = wrapRef.value
    if (!canvas || !wrap) return

    const rect = wrap.getBoundingClientRect()
    W = Math.max(320, Math.floor(rect.width))
    H = 260

    DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1))

    canvas.width = W * DPR
    canvas.height = H * DPR
    canvas.style.width = `${W}px`
    canvas.style.height = `${H}px`

    ctx = canvas.getContext('2d')
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0)

    resetDots()
}

function resetGame() {
    started = false
    gameOver = false
    score = 0
    speed = BASE_SPEED

    dino.y = H - GROUND_H - dino.h
    dino.vy = 0
    dino.onGround = true
    dino.ducking = false

    obstacles = []
    nextObstacleIn = 300 + Math.random() * 250
    resetDots()
}

function start() {
    if (!started) started = true
    if (gameOver) {
        resetGame()
        started = true
    }
}

function jump() {
    if (!started) start()
    if (gameOver) return
    if (dino.onGround) {
        dino.vy = -JUMP_VEL
        dino.onGround = false
    }
}

function setDuck(v) {
    if (gameOver) return
    dino.ducking = v
}

function spawnObstacle() {
    // cactus-like obstacles: varying heights
    const tall = Math.random() < 0.45
    const w = tall ? 18 + Math.random() * 8 : 14 + Math.random() * 8
    const h = tall ? 48 + Math.random() * 18 : 28 + Math.random() * 14
    obstacles.push({
        x: W + 30,
        w,
        h,
    })
    nextObstacleIn = OBSTACLE_GAP_MIN + Math.random() * (OBSTACLE_GAP_MAX - OBSTACLE_GAP_MIN)
}

function aabb(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by
}

function update(dt) {
    if (!started || gameOver) return

    // speed ramps slowly over time
    speed += speed * SPEED_GROWTH * dt

    // score
    score += dt * 12
    hiScore = Math.max(hiScore, Math.floor(score))

    // dino size adjusts when ducking
    const targetH = dino.ducking ? 32 : 50
    const oldH = dino.h
    dino.h = targetH
    if (dino.onGround && oldH !== targetH) {
        // keep feet on ground when toggling duck
        dino.y = H - GROUND_H - dino.h
    }

    // gravity
    dino.vy += GRAVITY * dt
    dino.y += dino.vy * dt

    const groundY = H - GROUND_H - dino.h
    if (dino.y >= groundY) {
        dino.y = groundY
        dino.vy = 0
        dino.onGround = true
    }

    // obstacles
    nextObstacleIn -= speed * dt
    if (nextObstacleIn <= 0) spawnObstacle()

    obstacles.forEach(o => {
        o.x -= speed * dt
    })
    obstacles = obstacles.filter(o => o.x + o.w > -30)

    // collision
    const dx = dino.x
    const dy = dino.y
    const dw = dino.w
    const dh = dino.h

    for (const o of obstacles) {
        const ox = o.x
        const oy = H - GROUND_H - o.h
        if (aabb(dx, dy, dw, dh, ox, oy, o.w, o.h)) {
            gameOver = true
            started = true
            break
        }
    }

    // ground dots
    dots.forEach(d => {
        d.x -= speed * dt * 0.35
        if (d.x < -5) d.x = W + Math.random() * 60
    })
}

function draw() {
    if (!ctx) return
    ctx.clearRect(0, 0, W, H)

    // ground line
    ctx.strokeStyle = 'rgba(0,0,0,0.55)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, H - GROUND_H + 18)
    ctx.lineTo(W, H - GROUND_H + 18)
    ctx.stroke()

    // ground dots
    ctx.fillStyle = 'rgba(0,0,0,0.25)'
    for (const d of dots) {
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
    }

    // obstacles (cactus blocks)
    ctx.fillStyle = 'rgba(0,0,0,0.70)'
    obstacles.forEach(o => {
        const oy = H - GROUND_H - o.h
        ctx.fillRect(o.x, oy, o.w, o.h)
        // tiny arms for cactus vibe
        if (o.h > 38) {
            ctx.fillRect(o.x - 8, oy + 14, 10, 6)
            ctx.fillRect(o.x + o.w - 2, oy + 22, 10, 6)
        }
    })

    // dino (simple silhouette)
    ctx.fillStyle = 'rgba(0,0,0,0.80)'
    ctx.fillRect(dino.x, dino.y, dino.w, dino.h)
    // eye
    ctx.fillStyle = '#fff'
    ctx.fillRect(dino.x + dino.w - 12, dino.y + 10, 4, 4)

    // score
    ctx.fillStyle = 'rgba(0,0,0,0.55)'
    ctx.font = '16px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    const s = String(Math.floor(score)).padStart(5, '0')
    const hs = String(hiScore).padStart(5, '0')
    ctx.fillText(`HI ${hs}  ${s}`, W - 170, 28)

    // overlay instructions
    if (!started) {
        drawOverlay('Press Space / Tap to start', '↑ Space to jump · ↓ to duck')
    } else if (gameOver) {
        drawOverlay('GAME OVER', 'Press Space / Tap to restart')
        // restart icon
        ctx.strokeStyle = 'rgba(0,0,0,0.55)'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(W / 2, H / 2 + 32, 16, Math.PI * 0.2, Math.PI * 1.6)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(W / 2 + 10, H / 2 + 18)
        ctx.lineTo(W / 2 + 20, H / 2 + 22)
        ctx.lineTo(W / 2 + 12, H / 2 + 30)
        ctx.closePath()
        ctx.fillStyle = 'rgba(0,0,0,0.55)'
        ctx.fill()
    }
}

function drawOverlay(title, subtitle) {
    ctx.fillStyle = 'rgba(255,255,255,0.75)'
    ctx.fillRect(0, 0, W, H)

    ctx.fillStyle = 'rgba(0,0,0,0.85)'
    ctx.font = '700 26px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial'
    ctx.textAlign = 'center'
    ctx.fillText(title, W / 2, H / 2 - 10)

    ctx.fillStyle = 'rgba(0,0,0,0.60)'
    ctx.font = '14px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial'
    ctx.fillText(subtitle, W / 2, H / 2 + 18)
    ctx.textAlign = 'start'
}

function loop(ts) {
    if (!lastTs) lastTs = ts
    const dt = clamp((ts - lastTs) / 1000, 0, 0.033)
    lastTs = ts

    update(dt)
    draw()
    rafId = requestAnimationFrame(loop)
}

// Input
function onKeyDown(e) {
    const k = e.key
    if (k === ' ' || k === 'Spacebar') {
        e.preventDefault()
        if (!started || gameOver) start()
        else jump()
    } else if (k === 'ArrowUp') {
        e.preventDefault()
        jump()
    } else if (k === 'ArrowDown') {
        e.preventDefault()
        setDuck(true)
    }
}

function onKeyUp(e) {
    if (e.key === 'ArrowDown') setDuck(false)
}

function onPointerDown() {
    // Tap = start/jump/restart
    if (!started || gameOver) start()
    else jump()
}

onMounted(() => {
    // load hi score from localStorage (optional)
    try {
        const saved = Number(localStorage.getItem('meraki_dino_hiscore') || 0)
        if (!Number.isNaN(saved)) hiScore = saved
    } catch { }

    setCanvasSize()
    resetGame()
    rafId = requestAnimationFrame(loop)

    window.addEventListener('keydown', onKeyDown, { passive: false })
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('resize', setCanvasSize)
})

onBeforeUnmount(() => {
    if (rafId) cancelAnimationFrame(rafId)
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('keyup', onKeyUp)
    window.removeEventListener('resize', setCanvasSize)

    try {
        localStorage.setItem('meraki_dino_hiscore', String(hiScore))
    } catch { }
})
</script>

<template>
    <div ref="wrapRef" class="free-game">
        <div class="free-game__head">
            <div class="free-game__title">T-Rex Dinosaur</div>
            <div class="free-game__desc">
                Press <b>Space</b> to start & jump. Use <b>↓</b> to duck.
            </div>
        </div>

        <div class="free-game__canvasWrap" @pointerdown="onPointerDown">
            <canvas ref="canvasRef" class="free-game__canvas" />
        </div>
    </div>
</template>

<style scoped>
.free-game {
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
}

.free-game__head {
    text-align: center;
    margin-bottom: 12px;
}

.free-game__title {
    font-size: clamp(26px, 3vw, 44px);
    font-weight: 900;
    color: #111;
    letter-spacing: -0.02em;
}

.free-game__desc {
    margin-top: 6px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
}

 .free-game__canvasWrap {
    border-radius: 18px;
    border: 1px solid rgba(0, 0, 0, 0.10);
    overflow: hidden;
    background: transparent;
    box-shadow: none;
    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
}

.free-game__canvas {
    display: block;
    width: 100%;
    height: 260px;
}
</style>