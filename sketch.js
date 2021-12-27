var song
var img
var fft
var particles = []

function preload() {
  song = loadSound('maintitles.mp3')
  img = loadImage('Game of Throne.jpg')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  imageMode(CENTER)
  rectMode(CENTER)
  fft = new p5.FFT(0.3)

  img.filter(BLUR, 0.5)

  noLoop()
}

function draw() {
  background(0)
  stroke(255)
  strokeWeight(5)
  noFill()

  translate(width / 2, height / 2)

  fft.analyze()
  amp = fft.getEnergy(10, 1000)

  push()
  if (amp > 10) {
    rotate(random(-0.5, 0.5))
  }
  var wave = fft.waveform()

  image(img, 0, 0, width+100, height+100)
  pop()

  
  for (var t = -1; t <= 1; t += 2){
    beginShape()
    for (var i = 0; i <=160; i +=0.5) {
      var index = floor(map(i, 0, 180, 0, wave.length-1))
   
      var r = map(wave[index], -0.5, 0.5, 150, 350)
  
      var x = r * sin(i)*t
      var y = r * cos(i)
      vertex(x, y)
    }
    endShape()
  }

  var p = new Particle()
  particles.push(p)


  for (var i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].edges()) {
      particles[i].update(amp > 230)
      particles[i].show()
    } else {
      particles.splice(i, 1)
    }
   
  }

}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause()
    noLoop()
  }else {
    song.play()
    loop()
  }
}

class Particle {
  constructor() {
    this.pos = p5. Vector. random2D().mult(250)
    this.vel = createVector(0, 0)
    this.acc = this.pos.copy().mult(random(0.0001, 0.000001))

    this.w = random(3, 5)

    this.color = [random(0, 255), random(0, 255), random(0, 255),]
  }
  update(cond) {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    if (cond) {
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
    }
  }
  edges() {
    if (this.pos.x < -width /2 || this.pos.x > width / 2 ||
    this.pos.y < - height / 2 || this.pos.y > height / 2) {
      return true
    } else
      return false

  }
  show() {
    noStroke()
    fill(255)
    ellipse(this.pos.x, this.pos.y, this.w)
  }
  }