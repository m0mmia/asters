import { assetUrl } from "../../../../../utils";
import * as PIXI from "pixi.js";
import Sections from "../Sections";
import { gsap, TweenMax } from "gsap";


import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default class ThreeDShoe extends Sections {

    setThreeD(){
        var scene_3D = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera( 25, this.width / this.height, 1, 10000 );
        camera.position.set( 0, 0, 700);
        
        var canvas_3D = new THREE.WebGLRenderer( { antialias: true } );
        canvas_3D.setSize( this.width, this.height );
        //document.body.appendChild( canvas_3D.domElement );
        
        //-------------------------------------------------------------------------------------
        // 2D UI canvas
        //-------------------------------------------------------------------------------------
        var opts = {transparent:false, antialias: true, resolution: window.devicePixelRatio}
        var scene_2D = new PIXI.Container();
        var canvas_2D = PIXI.autoDetectRenderer(this.width, this.height, opts);
        canvas_2D.backgroundColor = 0xFF66CC
        document.body.appendChild( canvas_2D.view );
        
        //-------------------------------------------------------------------------------------
        // Map 3D canvas to 2D Canvas
        //-------------------------------------------------------------------------------------

        var texture_3D = new PIXI.Texture.from(canvas_3D.domElement);
        var sprite_3D = new PIXI.Sprite(texture_3D);
        console.log("here", sprite_3D)
        scene_2D.addChild(sprite_3D);
        canvas_3D.render( scene_3D, camera ) 
        canvas_2D.render( scene_2D )
                
    }

    

  Build() {
    this.setThreeD()
  }
}


 

