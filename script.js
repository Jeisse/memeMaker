(function (document, Image, FileReader) {
	
	var e = {}, // A container for DOM elements
	reader = new FileReader(),
	image = new Image(),
	ctxt = null, // For canvas' 2d context
	writeMeme = null,
	renderMeme = null, 
	get = function (id) {
		return document.getElementById(id);
	};

	// Get elements (by id)
	e.box1 = get("box1");
	e.box2 = get("box2");
	e.file = get("file");
	e.canvas = get("canvas");
	e.topline = get("topline");
	e.bottomline = get("bottomline");
	e.downloadLink = get("downloadLink");
	ctxt = e.canvas.getContext("2d");


	// Function to write text onto canvas:
	writeMeme = function (text, x, y, fontSize) {
		for (fontSize; fontSize >= 0; fontSize -= 1) {
			ctxt.font = "bold " + fontSize + "pt Impact, Charcoal, sans-serif";
			if (ctxt.measureText(text).width < e.canvas.width - 10) {
				ctxt.fillText(text, x, y);
				ctxt.strokeText(text, x, y);
				break;
			}
		}
	};

	// Function for rendering memes:
	renderMeme = function () {
		ctxt.drawImage(image, 0, 0, e.canvas.width, e.canvas.height);
		writeMeme(e.topline.value, e.canvas.width / 2, 50, 40);
		writeMeme(e.bottomline.value, e.canvas.width / 2, e.canvas.height - 20, 20);
	};

	// Event handlers:
	e.file.onchange = function () {
		reader.readAsDataURL(e.file.files[0]);
			reader.onload = function () {
				image.src = reader.result;
				image.onload = function () {
					// Canvas settings:
					if (image.width < e.box1.clientWidth) {
					e.canvas.width = image.width;
					e.canvas.height = image.height;
				} else {
					e.canvas.width = e.box1.clientWidth;
					e.canvas.height = image.height * (e.box1.clientWidth / image.width);
				}
				ctxt.textAlign = "center";
				ctxt.fillStyle = "white";
				ctxt.strokeStyle = "black";
				ctxt.lineWidth = 3;
				renderMeme();
				//e.box1.style.display = "none";
				e.box2.style.display = "";
			};
		};
	};

	e.topline.onkeyup = renderMeme;
	e.bottomline.onkeyup = renderMeme;

	e.downloadLink.onclick = function () {
		e.downloadLink.href = e.canvas.toDataURL();
		e.downloadLink.download = "MemeMaker.png";
	};

}(this.document, this.Image, this.FileReader));