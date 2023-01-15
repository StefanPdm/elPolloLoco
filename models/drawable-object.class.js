class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 215;
  width = 100;
  height = 150;

  loadImage(path) {
    this.img = new Image(); //anzeigbares Bild erzeugen
    this.img.src = path; // dem anzeigbaren Bild einen Dateipfad/Quelle zuzweisen
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
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
}