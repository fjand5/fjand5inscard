  const WIDTH = 960
  const HEIGHT = 960
  const WIDTH_CENTER = 470
  const HEIGHT_CENTER = 760
  var selectFile = document.getElementById('selectFile');
  selectFile.addEventListener('change', takeFile)
  var farmImg = new Image();

  farmImg.src = 'farm.png';



  function takeFile(event) {
      var files = event.target.files;
      var file = files[0];
      var fileReader = new FileReader();
      fileReader.onload = function(progressEvent) {
          var img = progressEvent.target.result;
          gotImageByDataURL(img);
      }
      fileReader.readAsDataURL(file);

  }

  function gotImageByDataURL(data) {
      var img = new Image();
      img.addEventListener("load", function() {
          var canvas = document.createElement("CANVAS");

          document.body.appendChild(canvas);
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 10, 10);

          var MAX_WIDTH = WIDTH;
          var MAX_HEIGHT = HEIGHT;
          var width = img.width;
          var height = img.height;

          if (width > height) {
              if (width > MAX_WIDTH) {
                  height *= MAX_WIDTH / width;
                  width = MAX_WIDTH;
              }
          } else {
              if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height;
                  height = MAX_HEIGHT;
              }
          }
          canvas.width = width;
          canvas.height = height;



          burImg(img, ctx, width, height);

          selectFile.style.display = 'none';


      });
      img.src = data;
  }

  function burImg(img, context, w, h) {
      var ret = new Image();
      try {
          var canvas = fx.canvas();
      } catch (e) {
          alert(e);
          return;
      }
      var texture = canvas.texture(img);
      ret.addEventListener("load", () => {
          context.drawImage(ret, 0, 0, w, h);
          drawCenterImg(img, context, w, h);
      })
      canvas.draw(texture).lensBlur(15, 1, 0).update();
      ret.src = canvas.toDataURL('image/png');
  }

  function drawCenterImg(img, ctx, w, h) {
      var centerImg = new Image(10, 20);
      centerImg.src = img.src
      ctx.save();
        roundedImage(ctx,(w - WIDTH_CENTER) / 2,(h - HEIGHT_CENTER) / 2,WIDTH_CENTER,HEIGHT_CENTER,30);
        ctx.clip();
        ctx.drawImage(centerImg,(w - WIDTH_CENTER) / 2,(h - HEIGHT_CENTER) / 2,WIDTH_CENTER,HEIGHT_CENTER);
        ctx.restore();
      // ctx.drawImage(centerImg, (w - WIDTH_CENTER) / 2, (h - HEIGHT_CENTER) / 2, WIDTH_CENTER, HEIGHT_CENTER);
      ctx.drawImage(farmImg, (w - farmImg.width) / 2, (h - farmImg.height) / 2, farmImg.width, farmImg.height);

  }
  function roundedImage(ctx,x,y,width,height,radius){
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }
