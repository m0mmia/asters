import * as PIXI from "pixi.js";
import { getIsMobile } from "../../../../utils";
import { SVG } from "pixi-svg";
import { clamp } from "ramda";
import { gsap, TweenMax } from "gsap";

export default class Sections {
  constructor(app, height, paddingTop, order) {
    this.order = order;
    this.app = app;
    this.height = height;
    this.paddingTop = paddingTop;
    this.absolutey = 0;
    this.parentcontainer = new PIXI.Container();
    this.container = new PIXI.Container();
    this.parentcontainer.addChild(this.container);
    this.borderContainer = new PIXI.Container();
    this.imageContainer = new PIXI.Container();
    this.scale = 1;
    this.visibility = 0;
    this.centeronscreen = 0;
    this.bottomonscreen = 0;
    this.toponscreen = 0;
    this.basePoint = 240; // (1920 - 1440) / 2;
    this.linkedObjects = {};
    this.linkedObjectLinks = [];
    this.absolutex = 0;
    this.scaleFactor = 0;
    this.rendering = false;

    this.DefineFiles();
  }

  addLinkedObject(htmlkey, pixiobject) {
    this.linkedObjectLinks.push({ h: htmlkey, p: pixiobject });
  }

  positionLinkedObjects() {
    //todo: is this supposed to run every time?
    if (this.linkedObjectLinks.length > 1) {
    }
    for (var i = 0; i < this.linkedObjectLinks.length; i++) {
      let link = this.linkedObjectLinks[i];
      if (
        this.linkedObjects[link.h] &&
        link.p &&
        this.linkedObjects[link.h].current
      ) {
        let posy = -this.absolutey * this.scale + link.p.y * this.scale;
        let posx =
          link.p.x * this.scale + this.absolutex * (1 / this.scaleFactor);

        this.linkedObjects[link.h].current.style.transform =
          "translate(" + posx + "px, " + posy + "px)";
        //gsap.set( this.linkedObjects[link.h].current,{y:posy,x:posx});
      }
    }
  }

  addObject(key, val) {
    this.linkedObjects[key] = val;
  }

  AddBackground(color) {
    var graphics = new PIXI.Graphics();
    graphics.beginFill(color);
    graphics.drawRect(0, 0, 1920, this.height);
    graphics.endFill();

    this.imageContainer.addChild(graphics);

    this.container.addChild(this.imageContainer);
  }

  fromBottom(bottom) {
    return this.height - bottom;
  }

  Render() {}

  SetX(xpos) {
    this.absolutex = xpos;
  }

  GetScrollPosition() {
    let posy = this.parentcontainer.position.y * this.scale;
    return posy;
  }

  SetScrollPosition(containerpos) {
    this.containerpos = containerpos;
    let absolutepos = containerpos - this.parentcontainer.y;
    if (this.absolutey != absolutepos) {
      this.absolutey = absolutepos;
    }
    let range = window.innerHeight / this.scale;
    let top = -absolutepos;
    let bottom = -(absolutepos - this.height);
    top = clamp(-1, 1, top / range);
    bottom = clamp(-1, 1, bottom / range);
    this.top = top;
    this.bottom = bottom;
    this.range = range;
    let vis = (1 - (top + bottom) + 1) / 3;
    this.absolutevisibility = vis;
    vis = clamp(-1, 1, vis);
    this.visibility = vis;
    let centertoppos = -(absolutepos - this.height / 2);
    this.centeronscreen = (centertoppos + range / 2) / range - 1;
    this.toponscreen = 0 - absolutepos / range;
    this.bottomonscreen = 0 - (absolutepos + this.height) / range;
    if (this.absolutevisibility <= 0) {
      if (this.rendering == true) {
        this.SetRendering(false);
        this.rendering = false;
      }
    } else if (this.absolutevisibility > 1) {
      if (this.rendering == true) {
        this.SetRendering(false);
        this.rendering = false;
      }
    } else {
      if (this.rendering == false) {
        this.SetRendering(true);
        this.rendering = true;
      }
    }
  }

  SetRendering(mustrender) {
    if (mustrender) {
      this.parentcontainer.visible = true;
      for (var i = 0; i < this.linkedObjectLinks.length; i++) {
        let link = this.linkedObjectLinks[i];
        if (
          this.linkedObjects[link.h] &&
          this.linkedObjects[link.h].current &&
          link.p
        ) {
          this.linkedObjects[link.h].current.style.display = "block";
        }
      }
    } else {
      this.parentcontainer.visible = false;
      for (var i = 0; i < this.linkedObjectLinks.length; i++) {
        let link = this.linkedObjectLinks[i];
        if (
          this.linkedObjects[link.h] &&
          this.linkedObjects[link.h].current &&
          link.p
        ) {
          this.linkedObjects[link.h].current.style.display = "none";
        }
      }
    }
  }

  SetScale(scale, scaleFactor) {
    this.scale = scale;
    this.scaleFactor = scaleFactor;
  }

  DefineFiles() {
    console.log("define files in parent class!");
  }
  GetSvg(svg) {
    //  console.log("getsvg ", svg);
    const ding = new SVG(svg);

    return ding;
  }
  GetImage(key) {
    if (this.app.loader.resources[key]) {
      return new PIXI.Sprite(this.app.loader.resources[key].texture);
    } else {
      console.log("key ", key, "not found");
    }
  }

  Build() {
    console.log("build");
  }

  GetHeight() {
    return this.height;
  }

  GetContainer() {
    return this.parentcontainer;
  }
}
