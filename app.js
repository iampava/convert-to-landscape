const form = document.querySelector("form");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const downloadButton = document.querySelector("#downloadButton");

form.addEventListener("submit", onSubmit);
form.addEventListener("input", onInput);
downloadButton.addEventListener("click", downloadCanvas);

function onSubmit(e) {
  e.preventDefault();

  const color = form.color.value === 'white' ? '#fff' : '#000';
  const width = form.width.value || undefined;
  loadImageToCanvas(e.target.file.files[0], color, width);
}

function onInput(e) {
  if (!form.file.value) {
    return;
  }
  const color = form.color.value === 'white' ? '#fff' : '#000';
  const width = form.width.value || undefined;
  loadImageToCanvas(form.file.files[0], color, width);
}

function downloadCanvas(e) {
  const name = `landscape-${e.target.dataset.name}` || 'landscape.png';

  const link = document.createElement('a');
  link.download = name;
  link.href = canvas.toDataURL()
  link.click();
}

/*********************************** */
function loadImageToCanvas(file, color = '#000', finalWidth) {
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

      canvas.width = finalWidth || width;
      canvas.height = height;

      ctx.fillStyle = color;
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