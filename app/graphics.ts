import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
import {
  AnimationMixer,
  Group,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { animate, createTimeline, onScroll, Timeline } from "animejs";
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
      color: 0x000000,
    });

    const wireframeMat = new MeshBasicMaterial({
      color: 0xffffff,
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

  private phoenixPointer?: Object3D;
  private animationMixer?: AnimationMixer;

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

    loadWireframeModel("/assets/models/scene.glb").then(([gltf, model]) => {
      //this.scene.add(model);

      model.traverse((object) => {
        if (object.name == "Phoenix_Pointer") {
          this.phoenixPointer = object;
        }
      });

      this.animationMixer = new AnimationMixer(model);
      const action = this.animationMixer.clipAction(gltf.animations[0]);
      action.play();
    });

    this.phoenix.object3D.rotation.y = Math.PI;
    this.phoenix.object3D.position.y = -3;
    this.phoenix.object3D.position.x = 6;

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
      .add(this.phoenix.object3D, {
        rotateZ: -40,
        x: 16,
        y: 6,
        duration: 1,
      })
      .add(this.phoenix.object3D, {
        rotateZ: 10,
        rotateX: 0,
        x: -8,
        y: -2,
        duration: 1,
      })
      .add(this.phoenix.object3D, {
        rotateZ: 0,
        rotateX: 90,
        x: 0,
        y: 0,
        duration: 1,
      });

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
            (this.scrollPosition - this.timeline.currentTime) * 0.01,
          this.timeline.duration,
        ),
      ),
    );

    this.phoenix.animationMixer?.update(delta / 1000);
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
