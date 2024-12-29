function BlurSlider({ blurValue, setBlurValue, applyBlur }) {
    const handleSliderChange = (e) => {
      const value = e.target.value;
      setBlurValue(value);
      applyBlur();
    };
  
    return (
      <div className="slider-container">
        <label htmlFor="kernelSlider">Adjust Kernel Size (3 to 11):</label>
        <input
          type="range"
          id="kernelSlider"
          className="slider"
          min="0"
          max="15"
          step="1"
          value={blurValue}
          onChange={handleSliderChange}
        />
        <div className="slider-value">
          Kernel Size: <span>{blurValue}</span>
        </div>
      </div>
    );
}

export default BlurSlider;