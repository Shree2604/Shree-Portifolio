
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const ImmersiveExperience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameRef = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Mouse position for parallax effect
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;
    
    // Create renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Create directional light
    const directionalLight = new THREE.DirectionalLight(0x0ea5e9, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    
    // Create brain silhouette particles
    const particleCount = 5000;
    const particles = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Create a brain-like shape using parametric equations
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      
      // Brain shape parameters
      const radius = 10;
      const brainFactor = Math.sin(phi * 4) * Math.cos(theta * 3) * 0.3;
      
      // Position particles in a brain-like shape
      particles[i3] = radius * Math.sin(theta) * Math.cos(phi) * (1 + brainFactor);
      particles[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi) * (1 + brainFactor);
      particles[i3 + 2] = radius * Math.cos(theta) * (1 + brainFactor);
      
      // Color gradient based on position (from blue to teal)
      colors[i3] = 0.05 + Math.sin(phi) * 0.05; // R
      colors[i3 + 1] = 0.4 + Math.cos(theta) * 0.2; // G
      colors[i3 + 2] = 0.8 + Math.sin(theta + phi) * 0.2; // B
      
      // Randomize particle sizes
      sizes[i] = Math.random() * 0.5 + 0.5;
    }
    
    // Create geometry and material for particles
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Custom shader material for better looking particles
    const material = new THREE.PointsMaterial({
      size: 0.2,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });
    
    // Create points mesh and add to scene
    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    particlesRef.current = particleSystem;
    
    // Add neural connection lines
    for (let i = 0; i < 200; i++) {
      // Choose two random particles to connect
      const idx1 = Math.floor(Math.random() * particleCount);
      const idx2 = Math.floor(Math.random() * particleCount);
      
      // Create line geometry
      const lineGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array([
        particles[idx1 * 3], particles[idx1 * 3 + 1], particles[idx1 * 3 + 2],
        particles[idx2 * 3], particles[idx2 * 3 + 1], particles[idx2 * 3 + 2]
      ]);
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      // Create line material
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: new THREE.Color(0x0ea5e9),
        transparent: true,
        opacity: 0.1 + Math.random() * 0.2
      });
      
      // Create line and add to scene
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
    }
    
    // Handle mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      if (particlesRef.current) {
        // Rotate the brain shape
        particlesRef.current.rotation.y += 0.002;
        particlesRef.current.rotation.x += 0.001;
        
        // Parallax effect based on mouse position
        particlesRef.current.position.x = mousePosition.current.x * 3;
        particlesRef.current.position.y = mousePosition.current.y * 2;
        
        // Pulsating effect
        const time = Date.now() * 0.001;
        particlesRef.current.scale.x = 1 + Math.sin(time * 0.7) * 0.05;
        particlesRef.current.scale.y = 1 + Math.sin(time * 0.7) * 0.05;
        particlesRef.current.scale.z = 1 + Math.sin(time * 0.7) * 0.05;
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    // Start animation
    animate();
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Show component after a short delay
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose geometries and materials
      if (particlesRef.current) {
        if (particlesRef.current.geometry) particlesRef.current.geometry.dispose();
        if (particlesRef.current.material) {
          (particlesRef.current.material as THREE.Material).dispose();
        }
      }
    };
  }, []);
  
  return (
    <motion.div 
      ref={containerRef}
      className="absolute inset-0 z-10 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
    />
  );
};

export default ImmersiveExperience;
