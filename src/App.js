import React, { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import imagesApi from "../src/services/apiService";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import Loader from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: "",
    isLoading: false,
    showModal: false,
    largeImageURL: "",
    imageAlt: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeQuery = (query) => {
    this.setState({ searchQuery: query, currentPage: 1, images: [] });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    imagesApi(options)
      .then((images) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  imageHandler = (largeImageURL) => {
    this.toggleModal();
    this.setState({ largeImageURL: largeImageURL });
  };

  render() {
    const { images, showModal, largeImageURL, imageAlt, isLoading } =
      this.state;

    return (
      <>
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery images={images} onClick={this.imageHandler} />
        {isLoading && (
          <Loader
            type="Oval"
            color="#3f51b5"
            height={80}
            width={80}
            radius={100}
            timeout={7000}
            className="Loader"
          />
        )}
        {images.length > 0 && <Button onClick={this.fetchImages} />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              src={largeImageURL}
              alt={imageAlt}
              onClick={this.imageHandler}
            />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
