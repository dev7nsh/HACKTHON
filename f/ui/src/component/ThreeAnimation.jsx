import React, { useRef, useEffect } from "react";

// This component renders the animated 3D geometry using Three.js inside an iframe
const ThreeAnimation = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    // No need to do anything here, animation is handled inside iframe srcDoc
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title="3D Animation"
      style={{
        width: "1000px",
        height: "800px",
        border: "none",
        background: "transparent",
        overflow: "hidden"
      }}
      srcDoc={`
        <html>
          <head>
            <style>
              html, body { margin: 0; padding: 0; background: #fff; }
              body { display: flex; justify-content: center; align-items: center; background: #fff; }
            </style>
          </head>
          <body>
            <script src="https://unpkg.com/three@0.148.0/build/three.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.min.js"></script>
            <script>
              let scene, camera, renderer, outerLine, innerLine;
              let time = 0;
              const nodes = [];
              const simplex = new SimplexNoise();

              init();
              animate();

              function init() {
                scene = new THREE.Scene();
                scene.background = new THREE.Color(0xffffff);

                camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);

                renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                renderer.setSize(window.innerWidth, window.innerHeight);
                document.body.appendChild(renderer.domElement);

                const outerGeometry = new THREE.IcosahedronGeometry(0.33, 3);
                const outerEdges = new THREE.EdgesGeometry(outerGeometry);
                const outerMaterial = new THREE.LineDashedMaterial({ color: 0x000000, linewidth: 2, dashSize: 0.005, gapSize: 0.025, opacity: 1, transparent: true });
                outerLine = new THREE.LineSegments(outerEdges, outerMaterial);
                outerLine.computeLineDistances();
                scene.add(outerLine);

                const innerGeometry = new THREE.DodecahedronGeometry(0.75, 0);
                const innerEdges = new THREE.EdgesGeometry(innerGeometry);
                const innerMaterial = new THREE.LineDashedMaterial({ color: 0x000000, linewidth: 2, dashSize: 0.0125, gapSize: 0.05, opacity: 1, transparent: true });
                innerLine = new THREE.LineSegments(innerEdges, innerMaterial);
                scene.add(innerLine);

                const nodeCount = 3000;
                const radius = 2;
                const nodeGeometry = new THREE.SphereGeometry(0.005, 8, 8);
                const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.5, transparent: true });

                for (let i = 0; i < nodeCount; i++) {
                  const angle = Math.random() * Math.PI * 2;
                  const y = Math.cos(angle) * radius * Math.random();
                  const x = Math.cos(angle) * radius * Math.random();
                  const z = Math.sin(angle) * radius * Math.random();

                  const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
                  node.position.set(x, y, z);
                  scene.add(node);
                  nodes.push({ mesh: node, basePos: node.position.clone() });
                }

                camera.position.z = 7;

                window.addEventListener('resize', onWindowResize);
              }

              function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
              }

              function animate() {
                requestAnimationFrame(animate);
                time += 0.002;

                scene.rotation.y += 0.002;
                scene.rotation.x += 0.002;
                scene.rotation.z += 0.002;

                nodes.forEach((nodeObj) => {
                  let pos = nodeObj.mesh.position;
                  const nx = simplex.noise4D(pos.x * 0.5, pos.y * 0.5, pos.z * 0.5, time);
                  const ny = simplex.noise4D(pos.y * 0.5, pos.z * 0.5, pos.x * 0.5, time);
                  const nz = simplex.noise4D(pos.z * 0.5, pos.x * 0.5, pos.y * 0.5, time);

                  pos.x += nx * 0.002;
                  pos.y += ny * 0.002;
                  pos.z += nz * 0.002;

                  const maxRadius = 1.75;
                  const len = Math.sqrt(pos.x * pos.x + pos.y * pos.y + pos.z * pos.z);
                  if (len > maxRadius) {
                    pos.x = (pos.x / len) * maxRadius;
                    pos.y = (pos.y / len) * maxRadius;
                    pos.z = (pos.z / len) * maxRadius;
                  }
                });

                renderer.render(scene, camera);
              }
            </script>
          </body>
        </html>
      `}
    />
  );
};

export default ThreeAnimation;