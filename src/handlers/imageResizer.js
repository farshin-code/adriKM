export default function resizeImage(
  fileToResize,
  maxWidth,
  maxHeight,
  quality
) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;

      img.onload = function () {
        let newWidth, newHeight;

        if (img.width > img.height) {
          newWidth = maxWidth;
          newHeight = img.height * (maxWidth / img.width);
        } else {
          newHeight = maxHeight;
          newWidth = img.width * (maxHeight / img.height);
        }

        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to create resized image blob."));
            }
          },
          "image/jpeg",
          quality
        );
      };
    };

    reader.readAsDataURL(fileToResize);
  });
}
