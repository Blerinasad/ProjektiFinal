import { useRef, useEffect, useState } from "react";
import { Button } from "@components/shared/Button/Button";

export const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => {
        setError("Kamera nuk u gjet ose aksesi u refuzua.");
      });
  }, []);

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx?.drawImage(videoRef.current, 0, 0);
    setPhoto(canvasRef.current.toDataURL("image/png"));
  };

  return (
    <div className="flex flex-col flex-1 max-h-full px-6 overflow-y-auto gap-3 py-4">
      <h1 className="w-full text-4xl font-bold text-left dark:text-white">Camera</h1>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="my-3 flex flex-col gap-y-3 flex-1 max-h-[400px] rounded-xl bg-slate-700 overflow-hidden">
          <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {photo && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold dark:text-white">Foto e kapur:</p>
          <img src={photo} alt="photo" className="rounded-xl max-h-[200px] object-cover" />
          <a href={photo} download="photo.png">
            <Button>Shkarko foton</Button>
          </a>
        </div>
      )}

      {!error && <Button onClick={takePhoto}>Take a picture</Button>}
    </div>
  );
};