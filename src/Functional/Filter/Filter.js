import React, { useEffect, useRef, useState } from 'react';
import {} from "../../asset/images/logo192.png"
function Filter() {
    const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [icons, setIcons] = useState(["https://www.pinterest.com/irisln5490/icon-cute/", "https://maihuong.photo/wp-content/uploads/2016/10/icon-6.jpg"]); // Đường dẫn icon
  const [icon, setIcon] = useState("");

  const sendFrameToAPI = async (frame) => {
    // if (!icon) return;

    try {
      const frameBase64 = frame.toDataURL("image/jpeg").split(",")[1]; // Chuyển canvas thành Base64
      const response = await fetch("http://127.0.0.1:8000/filter/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          frame_base64: frameBase64,
          icon_path: icon,
        }),
      });

    //   //////////////////
      console.log("Payload gửi đi:", {
        frame_base64: frameBase64,
        icon_path: icon,
      });

      console.log(typeof frameBase64);
      console.log(typeof icon);
    // 

      const data = await response.json();
      if (data.frame) {
        const img = new Image();
        img.src = `data:image/jpeg;base64,${data.frame}`;
        const ctx = canvasRef.current.getContext("2d");

        img.onload = () => {
          ctx.drawImage(img, 10, 10, canvasRef.current.width, canvasRef.current.height);
        };
      }
    } catch (error) {
      console.error("Error calling API: ", error);
    }
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        // Mở camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
            videoRef.current.srcObject = stream;
  
            // Đặt kích thước canvas dựa trên video
            videoRef.current.onloadedmetadata = () => {
              const videoWidth = videoRef.current.videoWidth;
              const videoHeight = videoRef.current.videoHeight;
  
              if (canvasRef.current) {
                canvasRef.current.width = videoWidth;
                canvasRef.current.height = videoHeight;
              }
            };
          }
      } catch (error) {
        console.error("Error accessing camera: ", error);
      }
    };

    startCamera();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        }    
    }
  }, []);

  useEffect(() => {
    // Lấy khung hình từ video và gửi đến API
    const applyFilter = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const video = videoRef.current;

      const drawFrame = () => {
        if (video && canvas) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // Vẽ video lên canvas
          sendFrameToAPI(canvas); // Gửi khung hình lên API
        }
        requestAnimationFrame(drawFrame);
      };

      drawFrame();
    };

    if (icon) {
      applyFilter();
    }
  }, [icon]);

  return (
    <div>
      <h1>Camera Stream with Filters</h1>
      <video ref={videoRef} autoPlay playsInline style={{ width: "70%", height: "auto", border: "1px solid black" }} />
      <canvas ref={canvasRef} />
      <div>
        <h3>Filters</h3>
        {icons.map((iconFilter, index) => (
          <img
            key={index}
            src={iconFilter}
            alt="Filter"
            style={{ cursor: "pointer", width: "50px", margin: "5px" }}
            onClick={() => setIcon(iconFilter)}
          />
        ))}
      </div>
    </div>
  );
}

export default Filter;