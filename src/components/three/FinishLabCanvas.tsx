"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, PresentationControls, RoundedBox } from "@react-three/drei";
import { drawBack, drawFront, drawLogoMask, drawNameMask, drawNoise, type CardText } from "./cardArt";

export type LabPaper = "matte" | "gloss" | "velvet" | "kraft";
export type LabFinish = "spotUv" | "goldFoil" | "emboss" | "rounded";

type SceneProps = { paper: LabPaper; finishes: LabFinish[]; text: CardText; onActivity: () => void };

const W = 3.5;
const H = 2;
const D = 0.045;

function roundedRectShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** ShapeGeometry with UVs normalised to 0–1 so canvas textures map edge to edge. */
function faceGeometry(r: number) {
  const geo = new THREE.ShapeGeometry(roundedRectShape(W, H, r), 12);
  const pos = geo.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = pos.getX(i) / W + 0.5;
    uv[i * 2 + 1] = pos.getY(i) / H + 0.5;
  }
  geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return geo;
}

function makeTexture(source: HTMLCanvasElement, srgb = true) {
  const t = new THREE.CanvasTexture(source);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Dispose GPU textures when they are replaced or the scene unmounts. */
function useDisposable(...items: { dispose: () => void }[]) {
  useEffect(() => () => items.forEach((item) => item.dispose()), items); // eslint-disable-line react-hooks/exhaustive-deps
}

function Card({ paper, finishes, text }: Omit<SceneProps, "onActivity">) {
  const rounded = finishes.includes("rounded");
  const foil = finishes.includes("goldFoil");
  const spot = finishes.includes("spotUv");
  const emboss = finishes.includes("emboss");
  const kraft = paper === "kraft";

  const front = useMemo(() => makeTexture(drawFront(text, { kraft, foilName: foil })), [text, kraft, foil]);
  const back = useMemo(() => makeTexture(drawBack(text)), [text]);
  const logoMask = useMemo(() => makeTexture(drawLogoMask(text.brand), false), [text.brand]);
  const nameMask = useMemo(() => makeTexture(drawNameMask(text), false), [text]);
  const noise = useMemo(() => makeTexture(drawNoise(), false), []);
  useDisposable(front, back, logoMask, nameMask, noise);

  const sharpFace = useMemo(() => faceGeometry(0.02), []);
  const roundFace = useMemo(() => faceGeometry(0.12), []);
  const roundBody = useMemo(
    () => new THREE.ExtrudeGeometry(roundedRectShape(W, H, 0.12), { depth: D, bevelEnabled: false, curveSegments: 12 }).translate(0, 0, -D / 2),
    [],
  );
  useEffect(
    () => () => {
      sharpFace.dispose();
      roundFace.dispose();
      roundBody.dispose();
    },
    [sharpFace, roundFace, roundBody],
  );

  // Crossfade between square and rounded corners.
  const sharpGroup = useRef<THREE.Group>(null);
  const roundGroup = useRef<THREE.Group>(null);
  const fade = useRef(rounded ? 1 : 0);
  useFrame((_, delta) => {
    fade.current = THREE.MathUtils.damp(fade.current, rounded ? 1 : 0, 10, delta);
    const apply = (group: THREE.Group | null, opacity: number) => {
      if (!group) return;
      group.visible = opacity > 0.01;
      group.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        const mat = mesh.material as THREE.Material | undefined;
        // Materials are created transparent; only opacity changes, so alpha maps keep working.
        if (mat && "opacity" in mat) mat.opacity = opacity * ((mat.userData.baseOpacity as number | undefined) ?? 1);
      });
    };
    apply(sharpGroup.current, 1 - fade.current);
    apply(roundGroup.current, fade.current);
  });

  const edgeColor = kraft ? "#B8966A" : "#EDE8DE";

  const faceMaterial = (key: string) => {
    const common = { map: front, bumpMap: emboss ? logoMask : null, bumpScale: emboss ? 6 : 0, transparent: true };
    switch (paper) {
      case "gloss":
        return <meshPhysicalMaterial key={key} {...common} roughness={0.15} clearcoat={1} clearcoatRoughness={0.08} />;
      case "velvet":
        return <meshPhysicalMaterial key={key} {...common} roughness={0.8} sheen={1} sheenRoughness={0.8} sheenColor="#ffffff" />;
      case "kraft":
        return <meshStandardMaterial key={key} {...common} color="#ffffff" roughness={1} roughnessMap={noise} />;
      default:
        return <meshStandardMaterial key={key} {...common} roughness={0.9} />;
    }
  };

  const layers = (geo: THREE.ShapeGeometry, key: string) => (
    <>
      <mesh geometry={geo} position={[0, 0, D / 2 + 0.0005]}>
        {faceMaterial(`${key}-${paper}`)}
      </mesh>
      <mesh geometry={geo} position={[0, 0, -D / 2 - 0.0005]} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial map={back} roughness={0.7} transparent />
      </mesh>
      {spot ? (
        <mesh geometry={geo} position={[0, 0, D / 2 + 0.0015]}>
          <meshPhysicalMaterial
            color="#111"
            transparent
            alphaMap={logoMask}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0}
            opacity={0.9}
            userData={{ baseOpacity: 0.9 }}
          />
        </mesh>
      ) : null}
      {foil ? (
        <mesh geometry={geo} position={[0, 0, D / 2 + 0.002]}>
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.25} transparent alphaMap={nameMask} />
        </mesh>
      ) : null}
    </>
  );

  return (
    <group>
      <group ref={sharpGroup}>
        <RoundedBox args={[W, H, D]} radius={0.02} smoothness={2}>
          <meshStandardMaterial color={edgeColor} roughness={0.9} transparent />
        </RoundedBox>
        {layers(sharpFace, "sharp")}
      </group>
      <group ref={roundGroup} visible={false}>
        <mesh geometry={roundBody}>
          <meshStandardMaterial color={edgeColor} roughness={0.9} transparent />
        </mesh>
        {layers(roundFace, "round")}
      </group>
    </group>
  );
}

/** Keeps the frame loop running only while something is moving. */
function ActivityInvalidator({ active }: { active: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
  }, [active, invalidate]);
  return null;
}

export default function FinishLabCanvas({ paper, finishes, text, label }: Omit<SceneProps, "onActivity"> & { label: string }) {
  // Any material change or drag animates (crossfade, damping): keep frames flowing briefly,
  // then drop back to frameloop="demand".
  const key = `${paper}|${finishes.join(",")}`;
  const [activity, setActivity] = useState({ key, tick: 0, active: true });
  if (activity.key !== key) setActivity({ key, tick: activity.tick + 1, active: true });
  const active = activity.active;
  const wake = () => setActivity((a) => ({ ...a, tick: a.tick + 1, active: true }));

  useEffect(() => {
    if (!activity.active) return;
    const id = window.setTimeout(() => setActivity((a) => ({ ...a, active: false })), 2200);
    return () => window.clearTimeout(id);
  }, [activity.tick, activity.active]);

  return (
    <div className="relative h-full w-full" onPointerDown={wake} onPointerMove={(e) => e.buttons && wake()} data-cursor="Drag" role="img" aria-label={label}>
      <Canvas
        dpr={[1, 1.75]}
        frameloop={active ? "always" : "demand"}
        camera={{ position: [0, 0, 6.2], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          // Driver-level shader logs (e.g. ANGLE/D3D precision notes) are noise in production.
          gl.debug.checkShaderErrors = process.env.NODE_ENV !== "production";
        }}
      >
        <ActivityInvalidator active={active} />
        <ambientLight intensity={0.85} />
        <directionalLight position={[3, 4, 5]} intensity={2.1} />
        <Environment resolution={256} frames={1} environmentIntensity={1.3}>
          <Lightformer form="rect" intensity={3} position={[0, 4, 3]} scale={[8, 2, 1]} />
          <Lightformer form="rect" intensity={1.5} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[4, 3, 1]} />
          <Lightformer form="rect" intensity={1.5} color="#FFE7F4" position={[5, 0, 2]} rotation-y={-Math.PI / 2} scale={[4, 3, 1]} />
          <Lightformer form="ring" intensity={2} position={[2, 2, 5]} scale={1.5} />
        </Environment>
        <PresentationControls global={false} snap rotation={[0.18, -0.42, 0]} polar={[-0.6, 0.6]} azimuth={[-1.2, 1.2]} speed={1.4}>
          <group rotation={[0, 0, -0.04]}>
            <Card paper={paper} finishes={finishes} text={text} />
          </group>
        </PresentationControls>
        <ContactShadows position={[0, -1.45, 0]} opacity={0.35} scale={9} blur={2.6} far={3} frames={1} />
      </Canvas>
    </div>
  );
}
