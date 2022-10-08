function previewPhoto() {
  var preview = document.querySelector('#previewPhoto');
  var file = document.querySelector('input#Photo[type=file]').files[0];
  var reader = new FileReader();

  reader.onloadend = function() {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

function Binar()
{
    var canvas = document.getElementById("cancan");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("previewPhoto");

	canvas.height = img.height;
	canvas.width = img.width;
    ctx.drawImage(img, 0, 0, img.width, img.height);
	
	const processedImageData = canvas.getContext('2d').getImageData(0,0,canvas.width, canvas.height);
	thresholdFilter(processedImageData.data, level=0.4);
	ctx.putImageData(processedImageData,0,0);
		window.onresize = function() {
		Binar();
    };
}

function thresholdFilter(pixels, level) 
{
    if (level === undefined) 
	{
      level = 0.5;
    }
    const thresh = Math.floor(level * 255);
    for (let i = 0; i < pixels.length; i += 4) 
	{
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      let val;
      if (gray >= thresh) {
        val = 255;
      } else {
        val = 0;
      }
      pixels[i] = pixels[i + 1] = pixels[i + 2] = val;
    }
}