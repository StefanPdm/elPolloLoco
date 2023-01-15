class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 215;
  width = 100;
  height = 150;
  parallax = 0;

  loadImage(path) {
    this.img = new Image(); //anzeigbares Bild erzeugen
    this.img.src = path; // dem anzeigbaren Bild einen Dateipfad/Quelle zuzweisen
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof CollectableObject) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  loadAllImages(arr) {  // Bilder Array erstellen für Animationen
    arr.forEach((path) => {   //For Scheife für jedes Element aus dem übergebenen arr (Array)
      let img = new Image(); //leeres anzeigbares Bild erzeugen
      img.src = path;  //dem anzeigbaren Bild eine Bildquelle zuweisen
      this.imageCache[path] = img; //dem oben definierten JSON Array imageCache
    });                           //ein anzeigbares Bild hinzufügen, der path ist der key
    //und das img ist der Value     
  }

  playAnimation(images) {
    ///////// Walk Animation
    // Modulo % erzeugt Werte von 0-5 (5=IMAGES_WALKING.length)
    let i = this.currentImage % images.length; //Modulo
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
    // if (i == 5) { this.currentImage = 0 }; <-- nicht mehr nötig, da Modulo Fkt. oben
  }

  isColliding(obj) {
    // console.log('Collision check', obj);
    // console.log('this.x', this.x);
    // console.log('this.width', this.width);
    return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
      (this.y + this.height) >= obj.y &&
      (this.y) <= (obj.y + obj.height);
    // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    // && obj.onCollisionCourse;
  }
}