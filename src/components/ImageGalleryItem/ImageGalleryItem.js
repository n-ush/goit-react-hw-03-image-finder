import React from "react";
import styles from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ id, src, alt, largeImageURL, onClick }) => (
  <li
    key={id}
    onClick={() => onClick(largeImageURL, alt)}
    className={styles.ImageGalleryItem}
  >
    <img src={src} alt={alt} className={styles.ImageGalleryItemImage} />
  </li>
);

ImageGalleryItem.propTypes = {
  id: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
