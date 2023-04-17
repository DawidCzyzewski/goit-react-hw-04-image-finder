import { useState, useEffect } from 'react';
import { fetchImages } from './Services/Api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { BallTriangle } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export const App = () => {
  const [images, setImages] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [searchedText, setSearchedText] = useState('');
  const [biggerImgUrl, setBiggerImgUrl] = useState('');
  const [isModalVisable, setIsModalVisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchForMore, setSearchForMore] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    const searchedPhrase = event.target[1].value.split(' ').join('+');

    setSearchedText(searchedPhrase);
  };

  const openModal = bigUrl => {
    setIsModalVisable(true);
    setBiggerImgUrl(bigUrl);
  };

  const closeModal = event => {
    if (event.target.nodeName !== 'IMG' || event.key === 'Escape') {
      setIsModalVisable(false);
      setBiggerImgUrl('');
    }
  };

  const clearState = () => {
    setImages([]);
  };

  const changePage = event => {
    event.preventDefault();
    setActualPage(prevActualPage => prevActualPage + 1);
  };

  const getInfoAbout = event => {
    const bigUrl = event.currentTarget.dataset.bigger;
    openModal(bigUrl);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      clearState();
      const response = await fetchImages(searchedText, actualPage);

      const newImages = response.data.hits.map(image => {
        return {
          id: image.id,
          tags: image.tags,
          previewUrl: image.webformatURL,
          biggerImg: image.largeImageURL,
        };
      });

      setImages(prevImages => [...prevImages, ...newImages]);
      setIsLoading(false);

      if (response.data.hits.length < 12) {
        setSearchForMore(false);
      } else {
        setSearchForMore(true);
      }
    };

    if (searchedText || actualPage > 1) {
      fetchData();
    }
  }, [searchedText, actualPage]);

  return (
    <div onClick={closeModal}>
      <Searchbar whenSubmit={handleSubmit} />
      {isLoading && <BallTriangle />}
      <Button
        searchForMore={searchForMore}
        nextPage={changePage}
        images={images}
        actualPage={actualPage}
      />
      <ImageGallery
        closeModal={closeModal}
        close={closeModal}
        isModalVisable={isModalVisable}
      >
        <ImageGalleryItem images={images} getInfoAbout={getInfoAbout} />
      </ImageGallery>
      {isModalVisable && (
        <Modal
          bigPhotoUrl={biggerImgUrl}
          closeModal={closeModal}
          tags={images.tags}
          isModalVisable={isModalVisable}
        />
      )}
      <Button
        searchForMore={searchForMore}
        nextPage={changePage}
        images={images}
        actualPage={actualPage}
      />
    </div>
  );
};

App.propTypes = {
  images: PropTypes.array,
  actualPage: PropTypes.number,
  searchedText: PropTypes.string,
  biggerImgUrl: PropTypes.string,
  isModalVisable: PropTypes.bool,
  isLoading: PropTypes.bool,
  searchForMore: PropTypes.bool,
};

// -------------------------func component code-----------------------------------------
// -------------------------UNCOMMENT ABROVE OR UNDER--------------------------
// -------------------------class component code-------------------------------------

// import { fetchImages } from './Services/Api';
// import { Searchbar } from './Searchbar/Searchbar';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
// import { Modal } from './Modal/Modal';
// import { Button } from './Button/Button';

// import { Component } from 'react';
// import { BallTriangle } from 'react-loader-spinner';
// import PropTypes from 'prop-types';

// export class App extends Component {
//   static propTypes = {
//     images: PropTypes.array,
// actualPage: PropTypes.number,
// searchedText: PropTypes.string,
// biggerImgUrl: PropTypes.string,
// isModalVisable: PropTypes.bool,
// isLoading: PropTypes.bool,
// searchForMore: PropTypes.bool,
//   };

//   state = {
//     images: [],
//     actualPage: 1,
//     searchedText: '',
//     biggerImgUrl: '',
//     isModalVisable: false,
//     isLoading: false,
//     searchForMore: false,
//   };

//   openModal = bigUrl => {
//     this.setState({ isModalVisable: true, biggerImgUrl: bigUrl });
//   };

//   closeModal = elem => {
//     // console.log(elem);
//     if (elem.target.nodeName !== 'IMG' || elem.key === 'Escape') {
//       this.setState({ isModalVisable: false, biggerImgUrl: '' });
//     }
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     const inputName = event.target[1].name;
//     const searchedPhrase = event.target[1].value.split(' ').join('+');

//     this.setState({ [inputName]: searchedPhrase });
//   };

//   clearState = () => {
//     this.setState({
//       images: [],
//     });
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.searchedText !== this.state.searchedText ||
//       prevState.actualPage !== this.state.actualPage
//     ) {
//       this.setState({ isLoading: true });

//       // this.clearState();

//       const response = await fetchImages(
//         this.state.searchedText,
//         this.state.actualPage
//       );

//       const newImages = response.data.hits.map(image => {
//         return {
//           id: image.id,
//           tags: image.tags,
//           previewUrl: image.webformatURL,
//           biggerImg: image.largeImageURL,
//         };
//       });

//       this.setState(prevState => {
//         return {
//           images: [...prevState.images, ...newImages],
//           isLoading: false,
//         };
//       });

//       if (response.data.hits.length < 12) {
//         this.setState({ searchForMore: false });
//         return;
//       } else {
//         this.setState({ searchForMore: true });
//       }
//     }
//   }

//   changePage = event => {
//     event.preventDefault();
//     this.setState(prevState => ({
//       actualPage: prevState.actualPage + 1,
//     }));
//   };

//   getInfoAbout = event => {
//     const bigUrl = event.currentTarget.dataset.bigger;
//     this.openModal(bigUrl);
//   };

//   render() {
//     return (
//       <div onClick={this.closeModal}>
//         <Searchbar whenSubmit={this.handleSubmit} />
//         {this.state.isLoading && <BallTriangle />}
//         <Button
//           searchForMore={this.state.searchForMore}
//           nextPage={this.changePage}
//           images={this.state.images}
//           actualPage={this.state.actualPage}
//         />
//         <ImageGallery
//           closeModal={this.closeModal}
//           close={this.closeModal}
//           isModalVisable={this.state.isModalVisable}
//         >
//           <ImageGalleryItem
//             images={this.state.images}
//             getInfoAbout={this.getInfoAbout}
//           />
//         </ImageGallery>
//         {this.state.isModalVisable && (
//           <Modal
//             bigPhotoUrl={this.state.biggerImgUrl}
//             closeModal={this.closeModal}
//             tags={this.state.tags}
//             isModalVisable={this.state.isModalVisable}
//           />
//         )}
//         <Button
//           searchForMore={this.state.searchForMore}
//           nextPage={this.changePage}
//           images={this.state.images}
//           actualPage={this.state.actualPage}
//         />
//       </div>
//     );
//   }
// }
