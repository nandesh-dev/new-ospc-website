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

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.set(0, 0, 50);

    this.renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor("white", 0);

    this.phoenix = new Phoenix();
    this.scene.add(this.phoenix.object3D);

    loadWireframeModel("/assets/models/scene.glb").then(([gltf, model]) => {
      this.scene.add(model);

      model.traverse((object) => {
        if (object.name == "Phoenix_Pointer") {
          this.phoenixPointer = object;
        }
      });

      this.animationMixer = new AnimationMixer(model);
      const action = this.animationMixer.clipAction(gltf.animations[0]);
      action.play();
    });

    this.lastRenderTimestamp = Date.now();
    this.render();
  }

  private render() {
    requestAnimationFrame(() => this.render());
    const currentTimestamp = Date.now();
    const delta = currentTimestamp - this.lastRenderTimestamp;
    this.lastRenderTimestamp = currentTimestamp;

    console.log(this.phoenixPointer);

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
