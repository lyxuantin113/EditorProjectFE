import './BlurImage.css';
import { useState, useEffect } from 'react';
import ImageLoader from './ImageLoader';
import BlurSlider from './BlurSlider';
import ProcessImage from './ProcessImage';

function Blur() {
  const [currentImage, setCurrentImage] = useState(null);
  const [blurValue, setBlurValue] = useState(5);
  const [processedImage, setProcessedImage] = useState(null);

  const applyBlur = async () => {
    if (!currentImage) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", currentImage);
    formData.append("kernel_size", blurValue);

    try {
      const response = await fetch("http://127.0.0.1:8000/smooth-image/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.image) {
        setProcessedImage(`data:image/png;base64,${hexToBase64(data.image)}`);
      } else {
        alert(data.error || "Failed to process image.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while processing the image.");
    }
  };

  const hexToBase64 = (hex) => {
    const binary = hex
      .match(/.{1,2}/g)
      .map((byte) => String.fromCharCode(parseInt(byte, 16)))
      .join("");
    return btoa(binary);
  };

  // Gọi applyBlur khi currentImage thay đổi
  useEffect(() => {
    if (currentImage) {
      applyBlur();
    }
  }, [currentImage]);

  return (
    <div className="container">
      <h1>Gaussian Blur with Real-time Update</h1>
      <ImageLoader setCurrentImage={setCurrentImage} />
      <BlurSlider blurValue={blurValue} setBlurValue={setBlurValue} applyBlur={applyBlur} />
      <ProcessImage processedImage={processedImage} />
    </div>
  );
}

export default Blur;
