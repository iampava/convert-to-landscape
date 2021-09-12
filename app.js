const form = document.querySelector("form");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const downloadButton = document.querySelector("#downloadButton");

form.addEventListener("submit", onSubmit);
form.addEventListener("input", onInput);
downloadButton.addEventListener("click", downloadCanvas);

function onSubmit(e) {
  e.preventDefault();
  loadImageToCanvas(e.target.file.files[0]);
}

function onInput(e) {
  loadImageToCanvas(e.target.files[0]);
}

function downloadCanvas(e) {
  const name = e.target.dataset.name || 'download.png';

  const link = document.createElement('a');
  link.download = name;
  link.href = canvas.toDataURL()
  link.click();
}

/*********************************** */
function loadImageToCanvas(file) {
  var reader = new FileReader();
  reader.onload = function (event) {
    var img = new Image();
    img.onload = function () {
      let { width, height } = img;
      const ratio = width / height;
      if (width > height) {
        alert("This is not in portrait!")
        return;
      }

      [width, height] = [height, width];

      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(
        img,
        canvas.width / 2 - (height * ratio) / 2,
        canvas.height / 2 - (width * ratio) / 2,
        // Height which is the old width
        height * ratio,
        // Width which is the old height
        width * ratio
      );

      downloadButton.dataset.name = file.name;
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(file);
}