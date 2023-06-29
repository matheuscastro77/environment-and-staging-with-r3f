import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  BakeShadows,
  OrbitControls,
  useHelper,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
  Stage,
} from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import { useControls } from "leva";

export default function Experience() {
  const cube = useRef();
  const directionLight = useRef();
  useHelper(directionLight, THREE.DirectionalLightHelper, 1);

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
    // const time = state.clock.elapsedTime
    // cube.current.position.x = 2 + Math.sin(time)
  });

  const { color, opacity, blur } = useControls("contact shadows", {
    color: "#4b2709",
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 },
  });

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("environment map", {
      envMapIntensity: { value: 3.5, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 28, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    });

  return (
    <>
      {/* <Environment
        // background
        preset="sunset"
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
        resolution={3244}
        // files={[
        //   "./environmentMaps/1/px.jpg",
        //   "./environmentMaps/1/nx.jpg",
        //   "./environmentMaps/1/py.jpg",
        //   "./environmentMaps/1/ny.jpg",
        //   "./environmentMaps/1/pz.jpg",
        //   "./environmentMaps/1/nz.jpg",
        // ]}
        // files={ './environmentMaps/the_sky_is_on_fire_2k.hdr'}
      > */}
      {/* <color args={ ['#000000']} attach="background"/> */}
      {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[10, 0, 0]} />
        </mesh> */}
      {/* <Lightformer position-z={- 5} scale={10} color={"red"} intensity={10} form={"ring"}/> */}
      {/* </Environment> */}

      {/* <BakeShadows /> */}

      {/* <SoftShadows 
      frustum= {3.75}
      size= {0.005}
      near= {9.5}
      samples= {17}
      rings= {11}
      /> */}

      {/* <color args={["ivory"]} attach="background" /> */}

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          position={[1, 2, 3]}
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          bias={0.001}
        />
      </AccumulativeShadows> */}

      {/* <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        // frames={1}
      /> */}

      {/* <directionalLight
        ref={directionLight}
        position={sunPosition}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      /> */}

      {/* <ambientLight intensity={0.5} /> */}

      {/* <Sky sunPosition={sunPosition}/> */}

      <Stage
        shadows={{ type: "contact", opacity: 0.2, blur: 3 }}
        environment={"sunset"}
        preset={"portrait"}
        intensity={2}
      >
        <mesh position-y={1} position-x={-2} castShadow>
          <sphereGeometry />
          <meshStandardMaterial
            color="orange"
            envMapIntensity={envMapIntensity}
          />
        </mesh>

        <mesh ref={cube} position-y={1} position-x={2} scale={1.5} castShadow>
          <boxGeometry />
          <meshStandardMaterial
            color="mediumpurple"
            envMapIntensity={envMapIntensity}
          />
        </mesh>
      </Stage>
      {/* <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial
          color="greenyellow"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}
    </>
  );
}
