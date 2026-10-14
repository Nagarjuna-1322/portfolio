import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroBackground3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 9;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      // The CSS orbital illustration remains visible when WebGL is unavailable.
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);
    const group = new THREE.Group();
    scene.add(group);
    const geometry = new THREE.TorusKnotGeometry(1.35, 0.38, 160, 24, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({ color: 0x36cbd8, metalness: 0.65, roughness: 0.22, clearcoat: 1 });
    const core = new THREE.Mesh(geometry, material);
    group.add(core);
    const ringGeometry = new THREE.TorusGeometry(2.3, 0.009, 8, 128);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x77dce8, transparent: true, opacity: 0.4 });
    const rings = [0, 1, 2].map(i => {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.set(Math.PI / 3 + i * 0.6, i * 0.8, i * 0.5);
      group.add(ring);
      return ring;
    });
    scene.add(new THREE.AmbientLight(0xb2d7ff, 2));
    const light = new THREE.DirectionalLight(0xa5ffff, 5);
    light.position.set(3, 4, 5);
    scene.add(light);
    const rim = new THREE.DirectionalLight(0x8970ff, 6);
    rim.position.set(-4, -2, 1);
    scene.add(rim);
    let targetX = 0, targetY = 0, frame = 0, lastTime = 0, elapsed = 0;
    let visible = false;
    const resize = () => {
      const { clientWidth: width, clientHeight: height } = container;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.render(scene, camera);
    };
    const pointerMove = (event: PointerEvent) => {
      if (preference.matches || event.pointerType === 'touch') return;
      const rect = container.getBoundingClientRect();
      targetY = ((event.clientX - rect.left) / rect.width - 0.5) * 0.5;
      targetX = ((event.clientY - rect.top) / rect.height - 0.5) * 0.3;
    };
    const pointerLeave = () => { targetX = targetY = 0; };
    const animate = (time: number) => {
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
      lastTime = time;
      elapsed += delta;
      core.rotation.set(elapsed * 0.12, elapsed * 0.18, 0.2);
      group.rotation.x += (targetX - group.rotation.x) * (1 - Math.exp(-delta * 5));
      group.rotation.y += (targetY - group.rotation.y) * (1 - Math.exp(-delta * 5));
      group.position.y = Math.sin(elapsed * 0.7) * 0.1;
      rings.forEach((ring, i) => { ring.rotation.z = elapsed * 0.06 * (i + 1); });
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    const syncAnimation = () => {
      cancelAnimationFrame(frame);
      lastTime = 0;
      if (visible && !document.hidden && !preference.matches) frame = requestAnimationFrame(animate);
      else renderer.render(scene, camera);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncAnimation(); });
    observer.observe(container);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    preference.addEventListener('change', syncAnimation);
    document.addEventListener('visibilitychange', syncAnimation);
    container.addEventListener('pointermove', pointerMove);
    container.addEventListener('pointerleave', pointerLeave);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      preference.removeEventListener('change', syncAnimation);
      document.removeEventListener('visibilitychange', syncAnimation);
      container.removeEventListener('pointermove', pointerMove);
      container.removeEventListener('pointerleave', pointerLeave);
      geometry.dispose(); ringGeometry.dispose(); material.dispose(); ringMaterial.dispose();
      renderer.dispose(); renderer.domElement.remove();
    };
  }, []);
  return <div ref={mountRef} id="hero-3d-canvas-container" className="hero-canvas" aria-hidden="true" />;
};
