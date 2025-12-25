import Images from "./Images";

const ImageComponent = ({
  src,
  alt = "image",
  className = "defaultImgStyle",
  width,
  height,
  loading = "lazy",
  onClick,
}) => {
  return (
    <img
      src={Images[src]}
      alt={alt}
      className={`${className} img-fluid`}
      width={width}
      height={height}
      loading={loading}
      onClick={onClick}
    />
  );
};

export default ImageComponent;
