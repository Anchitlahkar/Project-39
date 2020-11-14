class Box{
  constructor(x,width,height) {
    var options = {
        isStatic: true,
        'restitution':0.8,
        'friction':1.0,
        'density':10.0
    }
    this.body = Bodies.rectangle(x,windowHeight/2+130,width,height,options);
    this.width = width;
    this.height = height;
    this.image = loadImage("images/box.png")
    World.add(world, this.body);
  }
  display(){
    var angle = this.body.angle;
      push();
      translate(this.body.position.x, this.body.position.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.image, 0, 0, this.width, this.height);
      pop();
    }
}