interface IImage {
  src: string
}

export const Image: React.FC<IImage> = ({src}) => {

  const isVideo = src.includes("vid");

  if (isVideo) {
    return <video autoPlay muted>
      <source src={src} type="video/mp4" />
      <source src={src} type="video/ogg" />
      Questo video non è compatibile con HTML
    </video>
  }

  return <img src={src} />;
}