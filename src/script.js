import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const geometry = new THREE.BufferGeometry()
const verts = []
const outerR = 2, innerR = 1.6, seg = 60

for (let i = 0; i <= seg; i++) {
  const a = (i / seg) * Math.PI * 2
  const xo = Math.cos(a) * outerR
  const yo = Math.sin(a) * outerR
  const xi = Math.cos(a) * innerR + 0.5
  const yi = Math.sin(a) * innerR
  verts.push(xo, yo, 0, xi, yi, 0)
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
const material = new THREE.MeshBasicMaterial({ color: 0xffff66, side: THREE.DoubleSide })
const moon = new THREE.Mesh(geometry, material)
scene.add(moon)


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()