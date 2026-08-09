import {
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from 'react';

import styles from './HeroKinetic.module.css';

const TAU = Math.PI * 2;
const FULL_STRIP_TURN = TAU * 2;
const INK = '17 17 15';
const MAX_FRAME_DELTA = 1 / 30;
const POINTER_SPRING = { damping: 8.5, stiffness: 22 } as const;
const PRESENCE_SPRING = { damping: 7.5, stiffness: 14 } as const;
const SURFACE_SPRING = { damping: 9.5, stiffness: 26 } as const;

type Point3D = {
  readonly x: number;
  readonly y: number;
  readonly z: number;
};

type ProjectedPoint = {
  readonly x: number;
  readonly y: number;
  readonly depth: number;
  readonly scale: number;
};

type ProjectedCenterlinePoint = {
  readonly u: number;
  readonly x: number;
  readonly y: number;
};

type Rotation = {
  readonly x: number;
  readonly y: number;
  readonly z: number;
};

type SurfaceCell = {
  readonly boundaryLower: boolean;
  readonly boundaryUpper: boolean;
  readonly crossLine: boolean;
  readonly depth: number;
  readonly lineAlpha: number;
  readonly points: readonly [
    ProjectedPoint,
    ProjectedPoint,
    ProjectedPoint,
    ProjectedPoint,
  ];
  readonly sweep: number;
  readonly tone: number;
  readonly type: 'surface';
};

type SignalParticle = {
  readonly alpha: number;
  readonly depth: number;
  readonly point: ProjectedPoint;
  readonly radius: number;
  readonly ring: boolean;
  readonly type: 'signal';
};

type RenderItem = SurfaceCell | SignalParticle;

type Pulse = {
  readonly startedAt: number;
  readonly u: number;
  readonly x: number;
  readonly y: number;
};

type Interaction = {
  readonly strength: number;
  readonly u: number;
};

type Viewport = {
  width: number;
  height: number;
  dpr: number;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function shortestAngle(value: number) {
  return Math.atan2(Math.sin(value), Math.cos(value));
}

function advanceSpring(
  value: number,
  velocity: number,
  target: number,
  delta: number,
  stiffness: number,
  damping: number,
) {
  if (delta <= 0) return { value, velocity };

  const acceleration = (target - value) * stiffness;
  const nextVelocity =
    (velocity + acceleration * delta) * Math.exp(-damping * delta);

  return {
    value: value + nextVelocity * delta,
    velocity: nextVelocity,
  };
}

function nearestCenterlinePoint(
  points: readonly ProjectedCenterlinePoint[],
  x: number,
  y: number,
) {
  return points.reduce<ProjectedCenterlinePoint | undefined>((nearest, point) => {
    if (!nearest) return point;

    const pointDistance = Math.hypot(point.x - x, point.y - y);
    const nearestDistance = Math.hypot(nearest.x - x, nearest.y - y);

    return pointDistance < nearestDistance ? point : nearest;
  }, undefined);
}

function pointOnStrip(
  u: number,
  v: number,
  elapsed: number,
  pulses: readonly Pulse[],
  interaction: Interaction,
): Point3D {
  const halfAngle = u * 0.5 + 0.16;
  const ambientWave =
    Math.sin(u * 3 + elapsed * 0.00072) * 0.018 +
    Math.cos(u * 5 - elapsed * 0.00046) * 0.008;

  let pulseWave = 0;

  for (const pulse of pulses) {
    const age = (elapsed - pulse.startedAt) / 1000;

    if (age < 0 || age > 2.8) continue;

    const waveFront = shortestAngle(u - pulse.u) - age * 1.85;
    pulseWave +=
      Math.sin(waveFront * 8.5) *
      Math.exp(-Math.abs(waveFront) * 3.4) *
      Math.exp(-age * 0.72) *
      0.3;
  }

  const center = {
    x: Math.sin(u) * 1.18,
    y: -Math.sin(u * 2) * 0.5,
    z: Math.cos(u) * 0.22,
  };
  const tangentRaw = {
    x: Math.cos(u) * 1.18,
    y: -Math.cos(u * 2),
    z: -Math.sin(u) * 0.22,
  };
  const tangentLength = Math.hypot(
    tangentRaw.x,
    tangentRaw.y,
    tangentRaw.z,
  );
  const tangent = {
    x: tangentRaw.x / tangentLength,
    y: tangentRaw.y / tangentLength,
    z: tangentRaw.z / tangentLength,
  };
  const sideLength = Math.hypot(tangent.x, tangent.y);
  const side = {
    x: -tangent.y / sideLength,
    y: tangent.x / sideLength,
    z: 0,
  };
  const up = {
    x: -tangent.z * side.y,
    y: tangent.z * side.x,
    z: tangent.x * side.y - tangent.y * side.x,
  };
  const ribbonDirection = {
    x: side.x * Math.cos(halfAngle) + up.x * Math.sin(halfAngle),
    y: side.y * Math.cos(halfAngle) + up.y * Math.sin(halfAngle),
    z: side.z * Math.cos(halfAngle) + up.z * Math.sin(halfAngle),
  };
  const ribbonWidth = v * 0.33;
  const ripple = pulseWave * (1 - Math.abs(v) * 0.32);
  const pointerDistance = shortestAngle(u - interaction.u);
  const magneticLift =
    Math.exp(-pointerDistance * pointerDistance * 3.8) *
    interaction.strength *
    (1 - Math.abs(v) * 0.2) *
    0.22;

  const normalLift = ambientWave + ripple + magneticLift;

  return {
    x: center.x + ribbonDirection.x * ribbonWidth + up.x * normalLift,
    y: center.y + ribbonDirection.y * ribbonWidth + up.y * normalLift,
    z: center.z + ribbonDirection.z * ribbonWidth + up.z * normalLift,
  };
}

function rotatePoint(point: Point3D, rotation: Rotation): Point3D {
  const cosX = Math.cos(rotation.x);
  const sinX = Math.sin(rotation.x);
  const cosY = Math.cos(rotation.y);
  const sinY = Math.sin(rotation.y);
  const cosZ = Math.cos(rotation.z);
  const sinZ = Math.sin(rotation.z);

  const yAfterX = point.y * cosX - point.z * sinX;
  const zAfterX = point.y * sinX + point.z * cosX;
  const xAfterY = point.x * cosY + zAfterX * sinY;
  const zAfterY = -point.x * sinY + zAfterX * cosY;

  return {
    x: xAfterY * cosZ - yAfterX * sinZ,
    y: xAfterY * sinZ + yAfterX * cosZ,
    z: zAfterY,
  };
}

function projectPoint(
  point: Point3D,
  rotation: Rotation,
  viewport: Viewport,
): ProjectedPoint {
  const rotated = rotatePoint(point, rotation);
  const focalLength = 3.6;
  const perspective = focalLength / (focalLength - rotated.z);
  const unit = Math.min(viewport.width, viewport.height) * 0.32;

  return {
    x: viewport.width * 0.5 + rotated.x * unit * perspective,
    y: viewport.height * 0.5 + rotated.y * unit * perspective * 0.88,
    depth: rotated.z,
    scale: perspective,
  };
}

function alphaForDepth(depth: number, minimum: number, maximum: number) {
  const normalized = clamp((depth + 1.45) / 2.9, 0, 1);
  return minimum + (maximum - minimum) * normalized;
}

export function HeroKinetic() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const centerlineRef = useRef<ProjectedCenterlinePoint[]>([]);
  const interactionUTargetRef = useRef(0);
  const interactionUCurrentRef = useRef(0);
  const interactionUVelocityRef = useRef(0);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });
  const pointerVelocityRef = useRef({ x: 0, y: 0 });
  const pointerPresenceTargetRef = useRef(0);
  const pointerPresenceCurrentRef = useRef(0);
  const pointerPresenceVelocityRef = useRef(0);
  const pulsesRef = useRef<Pulse[]>([]);
  const elapsedRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;

    if (!root || !canvas || typeof ResizeObserver === 'undefined') return;

    const context = canvas.getContext('2d');

    if (!context) return;

    const viewport: Viewport = { width: 0, height: 0, dpr: 1 };
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let startTime = performance.now();
    let previousElapsed = 0;
    let frameCount = 0;

    const draw = (elapsed: number) => {
      if (viewport.width <= 0 || viewport.height <= 0) return;

      const frameDelta = clamp(
        (elapsed - previousElapsed) / 1000,
        0,
        MAX_FRAME_DELTA,
      );
      previousElapsed = elapsed;
      elapsedRef.current = elapsed;
      pulsesRef.current = pulsesRef.current.filter(
        (pulse) => elapsed - pulse.startedAt <= 2800,
      );

      const pointerX = advanceSpring(
        pointerCurrentRef.current.x,
        pointerVelocityRef.current.x,
        pointerTargetRef.current.x,
        frameDelta,
        POINTER_SPRING.stiffness,
        POINTER_SPRING.damping,
      );
      const pointerY = advanceSpring(
        pointerCurrentRef.current.y,
        pointerVelocityRef.current.y,
        pointerTargetRef.current.y,
        frameDelta,
        POINTER_SPRING.stiffness,
        POINTER_SPRING.damping,
      );
      const pointerPresence = advanceSpring(
        pointerPresenceCurrentRef.current,
        pointerPresenceVelocityRef.current,
        pointerPresenceTargetRef.current,
        frameDelta,
        PRESENCE_SPRING.stiffness,
        PRESENCE_SPRING.damping,
      );
      const interactionUTarget =
        interactionUCurrentRef.current +
        shortestAngle(
          interactionUTargetRef.current - interactionUCurrentRef.current,
        );
      const interactionU = advanceSpring(
        interactionUCurrentRef.current,
        interactionUVelocityRef.current,
        interactionUTarget,
        frameDelta,
        SURFACE_SPRING.stiffness,
        SURFACE_SPRING.damping,
      );

      pointerCurrentRef.current = { x: pointerX.value, y: pointerY.value };
      pointerVelocityRef.current = {
        x: pointerX.velocity,
        y: pointerY.velocity,
      };
      pointerPresenceCurrentRef.current = pointerPresence.value;
      pointerPresenceVelocityRef.current = pointerPresence.velocity;
      interactionUCurrentRef.current = interactionU.value;
      interactionUVelocityRef.current = interactionU.velocity;

      const autoOrbit = elapsed * 0.00105;
      const rotation: Rotation = {
        x:
          0.336 +
          Math.sin(autoOrbit * 0.72) * 0.064 +
          pointerCurrentRef.current.y * 0.24,
        y:
          -0.12 +
          Math.sin(autoOrbit) * 0.24 +
          pointerCurrentRef.current.x * 0.34,
        z:
          -0.02 +
          Math.cos(autoOrbit * 0.58) * 0.025 +
          pointerCurrentRef.current.x * 0.06,
      };

      const interaction: Interaction = {
        strength: clamp(pointerPresenceCurrentRef.current, 0, 1),
        u: interactionUCurrentRef.current,
      };
      const stripPoint = (u: number, v: number) =>
        pointOnStrip(u, v, elapsed, pulsesRef.current, interaction);
      const sweepPosition = (elapsed * 0.00042) % TAU;

      context.clearRect(0, 0, viewport.width, viewport.height);
      context.lineCap = 'round';
      context.lineJoin = 'round';

      const renderItems: RenderItem[] = [];
      const orbitSteps = 48;
      const widthSteps = 7;
      const projectedGrid: ProjectedPoint[][] = [];

      for (let orbitIndex = 0; orbitIndex <= orbitSteps; orbitIndex += 1) {
        const u = (orbitIndex / orbitSteps) * TAU;
        const row: ProjectedPoint[] = [];

        for (let widthIndex = 0; widthIndex <= widthSteps; widthIndex += 1) {
          const v = -1 + (widthIndex / widthSteps) * 2;
          row.push(projectPoint(stripPoint(u, v), rotation, viewport));
        }

        projectedGrid.push(row);
      }

      centerlineRef.current = Array.from(
        { length: orbitSteps + 1 },
        (_, orbitIndex) => {
          const u = (orbitIndex / orbitSteps) * TAU;
          const point = projectPoint(stripPoint(u, 0), rotation, viewport);

          return { u, x: point.x, y: point.y };
        },
      );

      const gridPoint = (orbitIndex: number, widthIndex: number) => {
        const point = projectedGrid[orbitIndex]?.[widthIndex];

        if (!point) {
          throw new RangeError('Möbius projection grid is incomplete.');
        }

        return point;
      };

      for (let orbitIndex = 0; orbitIndex < orbitSteps; orbitIndex += 1) {
        const uStart = (orbitIndex / orbitSteps) * TAU;
        const uEnd = ((orbitIndex + 1) / orbitSteps) * TAU;
        const sweepDistance = shortestAngle(
          (uStart + uEnd) * 0.5 - sweepPosition,
        );
        const sweep = Math.exp(-sweepDistance * sweepDistance * 11);

        for (let widthIndex = 0; widthIndex < widthSteps; widthIndex += 1) {
          const points = [
            gridPoint(orbitIndex, widthIndex),
            gridPoint(orbitIndex + 1, widthIndex),
            gridPoint(orbitIndex + 1, widthIndex + 1),
            gridPoint(orbitIndex, widthIndex + 1),
          ] as const;
          const [lowerStart, lowerEnd, upperEnd, upperStart] = points;
          const depth =
            points.reduce((total, point) => total + point.depth, 0) /
            points.length;
          const signedArea =
            lowerStart.x * lowerEnd.y - lowerEnd.x * lowerStart.y +
            lowerEnd.x * upperEnd.y - upperEnd.x * lowerEnd.y +
            upperEnd.x * upperStart.y - upperStart.x * upperEnd.y +
            upperStart.x * lowerStart.y - lowerStart.x * upperStart.y;
          const facing = Math.tanh(signedArea * 0.012);
          const depthTone = clamp((depth + 1.45) / 2.9, 0, 1);
          const tone = Math.round(
            245 - (facing + 1) * 3.5 - depthTone * 2.5 - sweep * 15,
          );

          renderItems.push({
            boundaryLower: widthIndex === 0,
            boundaryUpper: widthIndex === widthSteps - 1,
            crossLine: orbitIndex % 2 === 0,
            depth,
            lineAlpha: clamp(
              alphaForDepth(depth, 0.045, 0.22) + sweep * 0.42,
              0,
              0.78,
            ),
            points,
            sweep,
            tone,
            type: 'surface',
          });
        }
      }

      const signalTracks = [
        { offset: 0.4, speed: 0.00034, v: -0.62 },
        { offset: 4.1, speed: 0.00027, v: 0.06 },
        { offset: 8.2, speed: 0.00031, v: 0.68 },
      ] as const;

      for (const track of signalTracks) {
        const currentU = (elapsed * track.speed + track.offset) % FULL_STRIP_TURN;
        const trailLength = 15;

        for (let trailIndex = trailLength; trailIndex >= 0; trailIndex -= 1) {
          const progress = 1 - trailIndex / trailLength;
          const point = projectPoint(
            stripPoint(currentU - trailIndex * 0.035, track.v),
            rotation,
            viewport,
          );
          const alpha = progress * alphaForDepth(point.depth, 0.08, 0.78);
          const radius = 0.65 + progress * 2.25 * point.scale;

          renderItems.push({
            alpha,
            depth: point.depth + 0.006,
            point,
            radius,
            ring: false,
            type: 'signal',
          });
        }

        const signal = projectPoint(
          stripPoint(currentU, track.v),
          rotation,
          viewport,
        );
        renderItems.push({
          alpha: alphaForDepth(signal.depth, 0.16, 0.58),
          depth: signal.depth + 0.008,
          point: signal,
          radius: 7.2 * signal.scale,
          ring: true,
          type: 'signal',
        });
      }

      renderItems.sort((left, right) => {
        const depthDifference = left.depth - right.depth;

        if (Math.abs(depthDifference) > 0.003) return depthDifference;
        if (left.type === right.type) return 0;
        return left.type === 'surface' ? -1 : 1;
      });

      for (const item of renderItems) {
        if (item.type === 'signal') {
          context.beginPath();
          context.arc(
            item.point.x,
            item.point.y,
            item.radius,
            0,
            TAU,
          );
          context.lineWidth = 1;

          if (item.ring) {
            context.strokeStyle = `rgb(${INK} / ${item.alpha})`;
            context.stroke();
          } else {
            context.fillStyle = `rgb(${INK} / ${item.alpha})`;
            context.fill();
          }

          continue;
        }

        const [lowerStart, lowerEnd, upperEnd, upperStart] = item.points;
        context.beginPath();
        context.moveTo(lowerStart.x, lowerStart.y);
        context.lineTo(lowerEnd.x, lowerEnd.y);
        context.lineTo(upperEnd.x, upperEnd.y);
        context.lineTo(upperStart.x, upperStart.y);
        context.closePath();
        context.fillStyle = `rgb(${item.tone} ${item.tone - 1} ${item.tone - 5})`;
        context.fill();

        context.beginPath();
        context.moveTo(lowerStart.x, lowerStart.y);
        context.lineTo(lowerEnd.x, lowerEnd.y);
        context.lineWidth = 0.62 + item.sweep * 0.88;
        context.strokeStyle = `rgb(${INK} / ${item.lineAlpha})`;
        context.stroke();

        if (item.boundaryUpper) {
          context.beginPath();
          context.moveTo(upperStart.x, upperStart.y);
          context.lineTo(upperEnd.x, upperEnd.y);
          context.lineWidth = 1.12 + item.sweep;
          context.strokeStyle = `rgb(${INK} / ${clamp(item.lineAlpha + 0.2, 0, 0.88)})`;
          context.stroke();
        }

        if (item.boundaryLower) {
          context.beginPath();
          context.moveTo(lowerStart.x, lowerStart.y);
          context.lineTo(lowerEnd.x, lowerEnd.y);
          context.lineWidth = 1.12 + item.sweep;
          context.strokeStyle = `rgb(${INK} / ${clamp(item.lineAlpha + 0.2, 0, 0.88)})`;
          context.stroke();
        }

        if (item.crossLine) {
          context.beginPath();
          context.moveTo(lowerStart.x, lowerStart.y);
          context.lineTo(upperStart.x, upperStart.y);
          context.lineWidth = 0.72 + item.sweep;
          context.strokeStyle = `rgb(${INK} / ${clamp(item.lineAlpha + 0.05, 0, 0.82)})`;
          context.stroke();

          context.beginPath();
          context.arc(
            lowerStart.x,
            lowerStart.y,
            0.7 + lowerStart.scale * 0.42,
            0,
            TAU,
          );
          context.fillStyle = `rgb(${INK} / ${clamp(item.lineAlpha + 0.18, 0, 0.78)})`;
          context.fill();
        }
      }

      for (const pulse of pulsesRef.current) {
        const age = (elapsed - pulse.startedAt) / 1000;
        const baseRadius = 18 + age * 72;

        for (let ring = 0; ring < 2; ring += 1) {
          const alpha = Math.max(0, (1 - age / 2.2) * (0.24 - ring * 0.08));
          context.beginPath();
          context.arc(
            pulse.x * viewport.width,
            pulse.y * viewport.height,
            baseRadius + ring * 16,
            0,
            TAU,
          );
          context.strokeStyle = `rgb(${INK} / ${alpha})`;
          context.lineWidth = 1;
          context.stroke();
        }
      }

      frameCount += 1;

      if (frameCount % 12 === 0) {
        root.dataset.motionFrame = String(frameCount);
        root.dataset.orbitPhase = autoOrbit.toFixed(3);
      }

      if (frameCount % 4 === 0) {
        root.dataset.interactionStrength = clamp(
          pointerPresenceCurrentRef.current,
          0,
          1,
        ).toFixed(3);
        root.dataset.interactionUCurrent = (
          ((interactionUCurrentRef.current % TAU) + TAU) %
          TAU
        ).toFixed(3);
      }
    };

    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      draw(elapsed);
      animationFrame = window.requestAnimationFrame(animate);
    };

    const restartMotion = () => {
      window.cancelAnimationFrame(animationFrame);
      startTime = performance.now() - elapsedRef.current;

      if (motionQuery.matches) {
        root.dataset.motionState = 'static';
        pointerCurrentRef.current = { x: 0, y: 0 };
        pointerVelocityRef.current = { x: 0, y: 0 };
        pointerPresenceCurrentRef.current = 0;
        pointerPresenceVelocityRef.current = 0;
        interactionUVelocityRef.current = 0;
        draw(elapsedRef.current);
      } else {
        root.dataset.motionState = 'running';
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry) return;

      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      viewport.width = width;
      viewport.height = height;
      viewport.dpr = dpr;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(elapsedRef.current);
    });

    resizeObserver.observe(root);
    motionQuery.addEventListener('change', restartMotion);
    restartMotion();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      motionQuery.removeEventListener('change', restartMotion);
    };
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    const normalizedX = clamp(
      (localX / bounds.width - 0.5) * 2,
      -1,
      1,
    );
    const normalizedY = clamp(
      (localY / bounds.height - 0.5) * 2,
      -1,
      1,
    );
    const nearestPoint = nearestCenterlinePoint(
      centerlineRef.current,
      localX,
      localY,
    );

    pointerTargetRef.current = { x: normalizedX, y: normalizedY };
    pointerPresenceTargetRef.current = 1;

    if (nearestPoint) {
      interactionUTargetRef.current = nearestPoint.u;
      event.currentTarget.dataset.interactionU = nearestPoint.u.toFixed(3);
    }

    event.currentTarget.dataset.pointer = `${normalizedX.toFixed(3)},${normalizedY.toFixed(3)}`;
  };

  const handlePointerLeave = () => {
    pointerTargetRef.current = { x: 0, y: 0 };
    pointerPresenceTargetRef.current = 0;
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
    const y = clamp((event.clientY - bounds.top) / bounds.height, 0, 1);
    const localX = x * bounds.width;
    const localY = y * bounds.height;
    const nearestPoint = nearestCenterlinePoint(
      centerlineRef.current,
      localX,
      localY,
    );
    const u = nearestPoint?.u ?? interactionUTargetRef.current;

    pulsesRef.current = [
      ...pulsesRef.current.slice(-2),
      { startedAt: elapsedRef.current, u, x, y },
    ];
    event.currentTarget.dataset.pulseCount = String(pulsesRef.current.length);
  };

  return (
    <div
      aria-hidden="true"
      className={styles.kinetic}
      data-auto-orbit-period-ms="5984"
      data-camera-pitch="0.336"
      data-geometry="mobius-ring"
      data-half-twists="1"
      data-hero-visual
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      ref={rootRef}
    >
      <canvas className={styles.canvas} data-kinetic-canvas ref={canvasRef} />
    </div>
  );
}
