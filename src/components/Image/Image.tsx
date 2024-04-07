import styles from './Image.module.scss';

interface IImage {
  src: string,
  cover?: boolean
}

export const Image: React.FC<IImage> = ({ src, cover }) => {

  const isVideo = src.includes("vid");

  if (isVideo) {
    return <video className={`${styles.Image} ${cover ? styles.cover : ''}`} autoPlay muted loop>
      <source src={src} type="video/mp4" />
      <source src={src} type="video/ogg" />
      Questo video non è compatibile con HTML
    </video>
  }

  return <img className={styles.Image} src={src} />;
}