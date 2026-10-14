import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const COLLECTIONS = [
  { title: 'Work', image: '/gallery/work.svg' },
  { title: 'AI', image: '/gallery/ai.svg' },
  { title: 'Journey', image: '/gallery/journey.jpeg' },
];
const TURN=Math.PI*2/3;
const wrap=(value:number)=>((value%3)+3)%3;
export function GalleryScene({index,overview,reduced,active,explode,onStep,onOpen}:{
  index:number;overview:boolean;reduced:boolean;active:boolean;explode:boolean;onStep:(step:number)=>void;onOpen:(index:number)=>void;
}) {
  const mount=useRef<HTMLDivElement>(null);
  const cursor=useRef<HTMLSpanElement>(null);
  const [fallback,setFallback]=useState(false);
  const state=useRef({index,overview,reduced,active,explode,onStep,onOpen});
  state.current={index,overview,reduced,active,explode,onStep,onOpen};
  const redraw=useRef(()=>{});
  useEffect(()=>{redraw.current();},[index,overview,reduced,active,explode]);
  useEffect(()=>{
    const host=mount.current;if(!host)return;
    let renderer:THREE.WebGLRenderer;
    try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}
    catch{setFallback(true);return;}
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));host.appendChild(renderer.domElement);
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(40,1,.1,100);
    camera.position.set(0,.65,11);camera.lookAt(0,-.2,0);
    const ring=new THREE.Group(), reflection=new THREE.Group();
    ring.position.y=.7;reflection.position.y=-2.04;reflection.scale.y=-1;scene.add(ring,reflection);
    const geometries:THREE.BufferGeometry[]=[],materials:THREE.MeshBasicMaterial[]=[],textures:THREE.CanvasTexture[]=[];
    const shatter={value:0}, ripple={value:0}, clock={value:0};
    let alive=true;
    COLLECTIONS.forEach((collection,i)=>{
      const canvas=document.createElement('canvas');canvas.width=1800;canvas.height=1000;
      const ctx=canvas.getContext('2d')!;
      const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
      texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());textures.push(texture);
      const draw=(image?:HTMLImageElement)=>{
        const gradient=ctx.createLinearGradient(0,0,1800,1000);
        gradient.addColorStop(0,['#c5d4cf','#aca8cc','#d3b69b'][i]);gradient.addColorStop(1,['#829e98','#cfc6df','#806b55'][i]);
        ctx.fillStyle=gradient;ctx.fillRect(0,0,1800,1000);
        if(image){
            const scale=Math.max(1800/image.width,1000/image.height);
            ctx.drawImage(image,(1800-image.width*scale)/2,(1000-image.height*scale)/2,image.width*scale,image.height*scale);
        }
        ctx.fillStyle=i===0?'#213b3440':'#110e1625';ctx.fillRect(0,0,1800,1000);
        ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='260px "Times New Roman"';
        ctx.shadowColor='#16101833';ctx.shadowBlur=3;ctx.fillStyle='#fffffff0';ctx.fillText(collection.title,900,i===2?760:505);ctx.shadowBlur=0;
        ctx.lineWidth=.8;ctx.strokeStyle='#ffffff88';ctx.strokeText(collection.title,900,i===2?760:505);
        texture.needsUpdate=true;redraw.current();
      };
      draw();const image=new Image();image.onload=()=>{if(alive)draw(image);};image.src=collection.image;
      const plane=new THREE.PlaneGeometry(1,2.7,32,3);
      const position=plane.attributes.position,uv=plane.attributes.uv;
      for(let j=0;j<position.count;j++){const angle=(uv.getX(j)-.5)*(TURN-.055)+i*TURN;position.setX(j,Math.sin(angle)*3);position.setZ(j,Math.cos(angle)*3);}
      plane.computeVertexNormals();const geometry=plane.toNonIndexed();plane.dispose();geometries.push(geometry);
      const p=geometry.attributes.position,centers=new Float32Array(p.count*3),directions=new Float32Array(p.count*3);
      for(let j=0;j<p.count;j+=3){
        const center=new THREE.Vector3();for(let k=0;k<3;k++)center.add(new THREE.Vector3().fromBufferAttribute(p,j+k));center.divideScalar(3);
        const noise=Math.sin(j*12.9898+i*78.233)*43758.5453;const seed=noise-Math.floor(noise);
        for(let k=0;k<3;k++){center.toArray(centers,(j+k)*3);directions.set([center.x*1.1+(seed-.5)*2,(center.y<0?-1:1)*(Math.abs(center.y)*1.3+seed+.5),center.z*.3+seed],(j+k)*3);}
      }
      geometry.setAttribute('aCenter',new THREE.BufferAttribute(centers,3));geometry.setAttribute('aDirection',new THREE.BufferAttribute(directions,3));
      const material=new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide});
      const reflected=new THREE.MeshBasicMaterial({map:texture,side:THREE.FrontSide,transparent:true,opacity:.4,depthWrite:true});
      for(const mat of [material,reflected]){
        mat.onBeforeCompile=shader=>{
          shader.uniforms.uShatter=shatter;shader.uniforms.uRipple=ripple;shader.uniforms.uClock=clock;
          shader.vertexShader='uniform float uShatter; uniform float uRipple; uniform float uClock; attribute vec3 aCenter; attribute vec3 aDirection;\n'+shader.vertexShader;
          shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`vec3 transformed = position;
            vec3 relative = position - aCenter;
            float angle = uShatter * (aDirection.z + 1.0);
            transformed.xy = aCenter.xy + mat2(cos(angle),-sin(angle),sin(angle),cos(angle))*relative.xy;
            transformed += aDirection * uShatter * 3.5;
            transformed.z += sin(position.x*5.0+uClock*1.8)*uRipple*.05;`);
          if(mat===reflected){
            shader.fragmentShader='uniform float uClock;\n'+shader.fragmentShader;
            shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#ifdef USE_MAP
              vec2 reflectionUv = vMapUv;
              reflectionUv.x += sin(reflectionUv.y*55.0+uClock*2.0)*.0025;
              vec4 sampledDiffuseColor = texture2D(map, reflectionUv);
              diffuseColor *= sampledDiffuseColor;
              diffuseColor.a *= pow(1.0-vMapUv.y,1.4);
            #endif`);
          }
        };
      }
      materials.push(material,reflected);const mesh=new THREE.Mesh(geometry,material);mesh.userData.index=i;ring.add(mesh);reflection.add(new THREE.Mesh(geometry,reflected));
    });
    let frame=0,previous=0,rotation=-state.current.index*TURN,tilt=0,burst=0,drag:number|null=null,downX=0,downY=0,downRotation=0,hoverX=0,sway=0,lastWheel=0,moved=false;
    const raycaster=new THREE.Raycaster();const pointer=new THREE.Vector2();
    const hit=(event:PointerEvent)=>{const r=host.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);raycaster.setFromCamera(pointer,camera);return raycaster.intersectObjects(ring.children)[0]?.object.userData.index as number|undefined;};
    const resize=()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.position.z=w<600?15.6:10.7;camera.updateProjectionMatrix();renderer.setSize(w,h);redraw.current();};
    const observer=new ResizeObserver(resize);observer.observe(host);resize();
    const render=(time:number)=>{
      frame=0;const s=state.current;if(document.hidden||!s.active)return;
      const dt=previous?Math.min((time-previous)/1000,.05):.016;previous=time;
      const target=drag!==null?downRotation+(drag-downX)/host.clientWidth*5:-s.index*TURN;
      const blend=s.reduced?1:1-Math.exp(-dt*(drag!==null?22:6));
      const velocity=target-rotation;rotation+=velocity*blend;
      const targetTilt=s.overview?Math.PI/2-.05:0;tilt+=(targetTilt-tilt)*blend;
      const targetBurst=s.explode?1:0;burst+=(targetBurst-burst)*(s.reduced?1:1-Math.exp(-dt*(targetBurst?5:14)));
      if(Math.abs(targetBurst-burst)<.002)burst=targetBurst;
      sway+=((s.reduced||s.overview?0:hoverX*.025)-sway)*blend;
      ring.rotation.set(tilt,rotation,sway);reflection.rotation.set(0,rotation,-sway);
      ring.position.y=s.overview?.15:.7;reflection.visible=tilt<.4;
      shatter.value=burst;ripple.value=s.reduced?0:Math.min(1,Math.abs(velocity));clock.value=s.reduced?0:time/1000;
      renderer.render(scene,camera);
      const unsettled=Math.abs(velocity)>.0002||Math.abs(targetTilt-tilt)>.0002||Math.abs(targetBurst-burst)>.0002||Math.abs((s.reduced?0:hoverX*.025)-sway)>.0002;
      if(unsettled||drag!==null)frame=requestAnimationFrame(render);
    };
    redraw.current=()=>{if(!frame&&!document.hidden&&state.current.active){previous=0;frame=requestAnimationFrame(render);}};
    document.addEventListener('visibilitychange',redraw.current);redraw.current();
    const down=(e:PointerEvent)=>{if(hit(e)===undefined||state.current.explode)return;downX=e.clientX;downY=e.clientY;downRotation=rotation;drag=e.clientX;moved=false;host.setPointerCapture(e.pointerId);redraw.current();};
    const move=(e:PointerEvent)=>{
      const rect=host.getBoundingClientRect();hoverX=(e.clientX-rect.left)/rect.width-.5;
      if(drag!==null){drag=e.clientX;moved ||= Math.abs(e.clientX-downX)>5||Math.abs(e.clientY-downY)>5;}
      const hovering=hit(e)!==undefined;
      host.style.cursor=drag!==null?'grabbing':hovering?'grab':'default';
      if(cursor.current){cursor.current.style.left=`${e.clientX-rect.left}px`;cursor.current.style.top=`${e.clientY-rect.top}px`;cursor.current.style.opacity=hovering&&e.pointerType!=='touch'?'1':'0';cursor.current.textContent=drag!==null?'DRAG':'VIEW';}
      redraw.current();
    };
    const finish=(e:PointerEvent,cancel=false)=>{
      if(drag===null)return;
      const targetRotation=downRotation+(drag-downX)/host.clientWidth*5;
      drag=null;
      if(host.hasPointerCapture(e.pointerId))host.releasePointerCapture(e.pointerId);
      if(!cancel&&!moved){const selected=hit(e);if(selected!==undefined)state.current.onOpen(selected);}
      else state.current.onStep(Math.round(-targetRotation/TURN)-state.current.index);
      redraw.current();
    };
    const up=(e:PointerEvent)=>finish(e);const cancel=(e:PointerEvent)=>finish(e,true);
    const leave=()=>{hoverX=0;if(cursor.current)cursor.current.style.opacity='0';redraw.current();};
    const wheel=(e:WheelEvent)=>{e.preventDefault();if(performance.now()-lastWheel<700||Math.abs(e.deltaY)+Math.abs(e.deltaX)<8)return;lastWheel=performance.now();state.current.onStep(e.deltaY+e.deltaX>0?1:-1);};
    host.addEventListener('pointerdown',down);host.addEventListener('pointermove',move);host.addEventListener('pointerup',up);host.addEventListener('pointercancel',cancel);host.addEventListener('pointerleave',leave);host.addEventListener('wheel',wheel,{passive:false});
    return()=>{alive=false;cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener('visibilitychange',redraw.current);redraw.current=()=>{};host.removeEventListener('pointerdown',down);host.removeEventListener('pointermove',move);host.removeEventListener('pointerup',up);host.removeEventListener('pointercancel',cancel);host.removeEventListener('pointerleave',leave);host.removeEventListener('wheel',wheel);geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();renderer.domElement.remove();};
  },[]);
  const selected=COLLECTIONS[wrap(index)];
  return <div className="gallery-stage"><div ref={mount} className="gallery-canvas" aria-hidden="true"/><span ref={cursor} className="gallery-cursor" aria-hidden="true">VIEW</span>{fallback&&<button className="gallery-fallback" onClick={()=>onOpen(wrap(index))} style={{backgroundImage:`url(${selected.image})`}}><span>{selected.title}</span></button>}<div className="reflection-fade" aria-hidden="true"/></div>;
}
