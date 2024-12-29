function ProcessImage({ processedImage }) {
    return (
      <div id="result">
        <h3>Result:</h3>
        {processedImage ? (
          <img src={processedImage} alt="Processed Image" />
        ) : (
          <p>No image processed yet.</p>
        )}
      </div>
    );
}

export default ProcessImage; 