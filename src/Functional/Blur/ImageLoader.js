function ImageLoader({ setCurrentImage, applyBlur }) {
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setCurrentImage(file);
        applyBlur();
      }
    };
  
    return (
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    );
}

export default ImageLoader;