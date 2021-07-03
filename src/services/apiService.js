import axios from "axios";

const KEY = "21376741-4642603aeb6d51fadff9a1e81";

const fetchImages = ({ searchQuery = "", currentPage = 1, pageSize = 12 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${pageSize}`
    )
    .then((response) => response.data.hits);
};

export default fetchImages;
