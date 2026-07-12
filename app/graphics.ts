import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
import {
  AnimationMixer,
  Group,
  Material,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { createTimeline, Timeline } from "animejs";
import "animejs/adapters/three";

async function loadWireframeModel(url: string): Promise<[GLTF, Group]> {
  const gltf = await new GLTFLoader().loadAsync(url);
  const model = gltf.scene;

  const meshes: Mesh[] = [];
  model.traverse((child) => {
    if (child instanceof Mesh) {
      meshes.push(child);
    }
  });

  meshes.forEach((child) => {
    const baseMaterial = new MeshBasicMaterial({
      color: 0x181719,
    });

    const wireframeMat = new MeshBasicMaterial({
      color: (child.material as Material).name,
      wireframe: true,
    });

    const wireframeClone = child.clone();
    wireframeClone.material = wireframeMat;
    wireframeClone.children = [];
    child.add(wireframeClone);
    child.material = baseMaterial;
  });

  return [gltf, model];
}

class Globe {
  public object3D: Group;

  constructor() {
    this.object3D = new Group();

    loadWireframeModel("/assets/models/globe.glb").then(([_, model]) => {
      this.object3D.add(model);
    });
  }
}

class Phoenix {
  public object3D: Group;
  public animationMixer?: AnimationMixer;

  constructor() {
    this.object3D = new Group();

    loadWireframeModel("/assets/models/phoenix.glb").then(([gltf, model]) => {
      this.object3D.add(model);

      this.animationMixer = new AnimationMixer(model);
      const action = this.animationMixer.clipAction(gltf.animations[0]);
      action.play();
    });
  }
}

export class Graphics {
  private lastRenderTimestamp: number;
  private phoenix: Phoenix;
  private globe: Globe;

  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;

  private timeline: Timeline;
  private scrollPosition: number;

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.set(0, 0, 40);

    this.renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor("white", 0);

    this.phoenix = new Phoenix();
    this.scene.add(this.phoenix.object3D);

    this.globe = new Globe();
    this.scene.add(this.globe.object3D);

    this.phoenix.object3D.rotation.y = Math.PI;
    this.phoenix.object3D.position.x = 6;
    this.phoenix.object3D.position.y = -3;

    this.globe.object3D.position.set(-25, -13, -5);

    const container = document.getElementById("container") || undefined;

    this.scrollPosition = 0;
    this.timeline = createTimeline({
      autoplay: false,
    })
      .add(this.phoenix.object3D, {
        rotateZ: 0,
        x: 6,
        y: -3,
        ease: "inOutQuad",
        duration: 0.1,
      })
      .add(
        this.globe.object3D,
        {
          x: -25,
          y: -13,
          z: -5,
          duration: 0.1,
        },
        "-=0.1",
      )
      .add(this.phoenix.object3D, {
        rotateZ: -40,
        x: 16,
        y: 6,
        duration: 1,
      })
      .add(
        this.globe.object3D,
        {
          x: -20,
          y: -4,
          z: -5,
          duration: 1,
        },
        "-=1",
      )
      .add(
        this.phoenix.object3D,
        {
          rotateZ: 10,
          rotateX: 0,
          x: -20,
          y: -3,
          duration: 1,
        },
        "+=0.4",
      )
      .add(
        this.globe.object3D,
        {
          x: -20,
          y: 30,
          z: 50,
          duration: 1,
        },
        "-=1",
      )
      .add(
        this.phoenix.object3D,
        {
          rotateZ: 0,
          rotateX: 90,
          x: 0,
          y: 0,
          duration: 1,
        },
        "+=1",
      )
      .add(
        this.globe.object3D,
        {
          x: -20,
          y: 60,
          z: 50,
          duration: 1,
        },
        "-=1",
      );

    const updateTimeline = () => {
      if (!container) return;
      this.scrollPosition = container.scrollTop / window.innerHeight;
    };

    container?.addEventListener("scroll", updateTimeline, { passive: true });
    container?.addEventListener("resize", updateTimeline);

    this.lastRenderTimestamp = Date.now();
    this.render();
  }

  private render() {
    requestAnimationFrame(() => this.render());
    const currentTimestamp = Date.now();
    const delta = currentTimestamp - this.lastRenderTimestamp;
    this.lastRenderTimestamp = currentTimestamp;
    this.timeline.seek(
      Math.max(
        0,
        Math.min(
          this.timeline.currentTime +
            (this.scrollPosition - this.timeline.currentTime) * 0.04,
          this.timeline.duration,
        ),
      ),
    );

    this.phoenix.animationMixer?.update(delta / 1000);
    this.globe.object3D.rotation.y =
      -(currentTimestamp * 0.0001) % (2 * Math.PI);
    //this.animationMixer?.update(delta / 1000);
    this.renderer.render(this.scene, this.camera);
  }
}

/*
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
*/
