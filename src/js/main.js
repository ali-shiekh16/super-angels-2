// import './style.scss';
// import '../scss/style.scss';
import camera, { updateCamera } from './camera';
import configs from './configuration';
import renderer, { isSmallScreen, updateRenderer } from './renderer';
import scene from './scene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/src/ScrollTrigger';
import Brain from './brain';
import Globe from './globe';
import Robot from './robot';
import Galaxy from './Galaxy';
import ParticleCloud from './particlesCloud';
import {
  MathUtils,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector2,
  Raycaster,
  Clock,
} from 'three';
// import slide from './slide';

// slide();

const { sizes } = configs;
const mouse = { x: 0, y: 0 };
let cloud = null;
let particles = null;

renderObjects().then(particleSys => {
  particles = particleSys;
  cloud = particleSys.cloud;

  animate(particleSys);
});

async function renderObjects() {
  const maxVertices = 48999;
  const galaxy = new Galaxy('/models/Galaxy2.glb', maxVertices);
  await galaxy.init();

  const globe = new Globe('/models/globe.glb', maxVertices);
  await globe.init();

  const brain = new Brain('/models/brain.glb', maxVertices);
  await brain.init();

  const robot = new Robot('/models/Robot.glb', maxVertices);
  await robot.init();

  const objects = [robot, brain, globe, galaxy];

  const particles = new ParticleCloud(objects);
  particles.cloud.position.x = isSmallScreen() ? 150 : 300;
  particles.cloud.rotation.y = Math.PI / 2.5;

  scene.add(particles.cloud);

  return particles;
}

function animate(particles) {
  const maxHorizontal = 150;
  gsap.registerPlugin(ScrollTrigger);
  const timeline = gsap.timeline({
    ease: 'slow',
    scrollTrigger: {
      trigger: '.wrapper',
      start: 'top top',
      end: '100% top',
      scrub: 4,
    },
  });

  timeline.to(particles.cloud.position, {
    x: -150,
  });

  timeline.to(
    particles.cloud.rotation,
    {
      y: Math.PI * 2.5,
    },
    '<'
  );

  timeline.to(particles.cloud.position, {
    x: 0,
  });

  timeline.to(particles.material.uniforms.uDestruction, {
    value: 1,
  });

  timeline.to(
    particles.cloud.position,
    {
      x: -150,
      y: -150,
    },
    '<'
  );

  timeline.to(particles.cloud.position, {
    x: 0,
    y: 0,
  });

  timeline.to(
    particles.material.uniforms.uDestruction,
    {
      value: 0,
      duration: 0.5,
    },
    '<'
  );

  timeline.to(
    particles.material.uniforms.uMorph2,
    {
      value: 1,
    },
    '<'
  );

  timeline.to(particles.cloud.rotation, {
    y: Math.PI * 3.5,
  });

  timeline.to(
    particles.cloud.position,
    {
      x: () => (isSmallScreen() ? -maxHorizontal : -350),
    },
    '<'
  );

  timeline.to(particles.cloud.position, {
    x: () => (isSmallScreen() ? maxHorizontal : 300),
  });

  timeline.to(particles.material.uniforms.uMorph3, {
    value: 1,
  });

  timeline.to(particles.cloud.position, {
    x: -150,
  });

  timeline.to(
    particles.cloud.rotation,
    {
      y: Math.PI * 4,
    },
    '<'
  );

  timeline.to(particles.material.uniforms.uDestruction, {
    value: 1,
  });

  timeline.to(
    particles.cloud.position,
    {
      x: -200,
    },
    '<'
  );

  timeline.to(particles.material.uniforms.uMorph4, {
    value: 1,
  });

  timeline.to(
    particles.material.uniforms.uDestruction,
    {
      value: 0,
    },
    '<'
  );

  timeline.to(particles.cloud.rotation, {
    z: Math.PI / 2,
  });

  timeline.to(
    particles.cloud.position,
    {
      x: 150,
    },
    '<'
  );

  timeline.to(particles.cloud.position, {
    x: Math.PI / 5,
  });
}

const planeSize = 800;
const plane = new Mesh(
  new PlaneGeometry(planeSize * 4, planeSize),
  new MeshBasicMaterial({ color: document.body.bgColor })
);
scene.add(plane);

const targetElement = document.body;
const observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList)
    if (mutation.type === 'attributes' && mutation.attributeName === 'style')
      if (mutation.target.style.background !== mutation.oldValue)
        plane.material.color.set(document.body.bgColor);
});
observer.observe(targetElement, { attributes: true, attributeOldValue: true });

const controls = new OrbitControls(camera, renderer.domElement);
renderer.render(scene, camera);

const pointer = new Vector2();
const raycaster = new Raycaster();

const clock = new Clock();
function tick() {
  const delta = clock.getElapsedTime();
  controls.update();

  raycaster.setFromCamera(pointer, camera);

  if (particles) {
    const intersectionData = raycaster.intersectObject(plane)[0];

    cloud.material.uniforms.uPoint.value = intersectionData.point;
  }

  if (cloud) animateCamera();

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

tick();

function animateCamera() {
  camera.rotation.y = MathUtils.lerp(
    camera.rotation.y,
    (mouse.x * Math.PI) / 20,
    0.1
  );
  camera.rotation.x = MathUtils.lerp(
    camera.rotation.x,
    (mouse.y * Math.PI) / 20,
    0.1
  );
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  updateCamera(sizes.width, sizes.height);
  updateRenderer(sizes.width, sizes.height);
  renderer.render(scene, camera);
});

window.addEventListener('mousemove', e => {
  mouse.x = 1 - 2 * (e.clientX / window.innerWidth);
  mouse.y = 1 - 2 * (e.clientY / window.innerHeight);

  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
});
