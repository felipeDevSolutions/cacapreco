// Cursor.jsx
import React, { useEffect, useRef } from 'react';
import './Cursor.css';

const Cursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Posição inicial (será atualizada imediatamente)
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const params = {
      pointsNumber: 25,
      widthFactor: 0.3,
      spring: 0.4,
      friction: 0.5,
    };


    const trail = Array(params.pointsNumber).fill(null).map(() => ({ x: pointer.x, y: pointer.y, dx: 0, dy: 0 }));

    const updateMousePosition = (e) => {
      pointer.x = e.clientX; 
      pointer.y = e.clientY;
    };

    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? params.spring * 0.4 : params.spring;

        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;

        // Centraliza o cursor no primeiro ponto
        if (pIdx === 0) {
          p.x = pointer.x - ctx.lineWidth /2; //centraliza
          p.y = pointer.y - ctx.lineWidth /2; //centraliza
        }
      });

      ctx.lineCap = 'round';
      ctx.strokeStyle = '#53deca';


      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);


      for (let i = 1; i < trail.length - 1; i++) {
        const xc = 0.5 * (trail[i].x + trail[i + 1].x);
        const yc = 0.5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
      }


      ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
      ctx.stroke();


      requestAnimationFrame(animate);
    };


    setupCanvas();
    animate();


    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('touchmove', (e) => updateMousePosition(e.touches[0]));
    window.addEventListener('resize', setupCanvas);


    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('touchmove', (e) => updateMousePosition(e.touches[0]));
      window.removeEventListener('resize', setupCanvas);

    };

  }, []);


  return <canvas ref={canvasRef} id="cursorCanvas" className="cursor-canvas" />;

};


export default Cursor;