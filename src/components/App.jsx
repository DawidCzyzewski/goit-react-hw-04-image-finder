import { fetchImages } from './Services/Api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

import { Component } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export class App extends Component {
  static propTypes = {
    images: PropTypes.array,
    actualPage: PropTypes.number,
    searchedText: PropTypes.string,
    biggerImgUrl: PropTypes.string,
    isModalVisable: PropTypes.bool,
    isLoading: PropTypes.bool,
    searchForMore: PropTypes.bool,
  };

  state = {
    images: [],
    actualPage: 1,
    searchedText: '',
    biggerImgUrl: '',
    isModalVisable: false,
    isLoading: false,
    searchForMore: false,
  };

  openModal = bigUrl => {
    this.setState({ isModalVisable: true, biggerImgUrl: bigUrl });
  };

  closeModal = elem => {
    // console.log(elem);
    if (elem.target.nodeName !== 'IMG' || elem.key === 'Escape') {
      this.setState({ isModalVisable: false, biggerImgUrl: '' });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    const inputName = event.target[1].name;
    const searchedPhrase = event.target[1].value.split(' ').join('+');

    this.setState({ [inputName]: searchedPhrase });
  };

  clearState = () => {
    this.setState({
      images: [],
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchedText !== this.state.searchedText ||
      prevState.actualPage !== this.state.actualPage
    ) {
      this.setState({ isLoading: true });

      // this.clearState();

      const response = await fetchImages(
        this.state.searchedText,
        this.state.actualPage
      );

      const newImages = response.data.hits.map(image => {
        return {
          id: image.id,
          tags: image.tags,
          previewUrl: image.webformatURL,
          biggerImg: image.largeImageURL,
        };
      });

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...newImages],
          isLoading: false,
        };
      });

      if (response.data.hits.length < 12) {
        this.setState({ searchForMore: false });
        return;
      } else {
        this.setState({ searchForMore: true });
      }
    }
  }

  changePage = event => {
    event.preventDefault();
    this.setState(prevState => ({
      actualPage: prevState.actualPage + 1,
    }));
  };

  getInfoAbout = event => {
    const bigUrl = event.currentTarget.dataset.bigger;
    this.openModal(bigUrl);
  };

  render() {
    return (
      <div onClick={this.closeModal}>
        <Searchbar whenSubmit={this.handleSubmit} />
        {this.state.isLoading && <BallTriangle />}
        <Button
          searchForMore={this.state.searchForMore}
          nextPage={this.changePage}
          images={this.state.images}
          actualPage={this.state.actualPage}
        />
        <ImageGallery
          closeModal={this.closeModal}
          close={this.closeModal}
          isModalVisable={this.state.isModalVisable}
        >
          <ImageGalleryItem
            images={this.state.images}
            getInfoAbout={this.getInfoAbout}
          />
        </ImageGallery>
        {this.state.isModalVisable && (
          <Modal
            bigPhotoUrl={this.state.biggerImgUrl}
            closeModal={this.closeModal}
            tags={this.state.tags}
            isModalVisable={this.state.isModalVisable}
          />
        )}
        <Button
          searchForMore={this.state.searchForMore}
          nextPage={this.changePage}
          images={this.state.images}
          actualPage={this.state.actualPage}
        />
      </div>
    );
  }
}

// --------------------------------------Clear code up------------------------------
// --------------------------------------Uncomment one side-------------------------
// --------------------------------------Code with coments under and tests----------

// export class App extends Component {
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
//     // console.log('modal is opened');
//     this.setState({ isModalVisable: true, biggerImgUrl: bigUrl });
//   };

//   closeModal = () => {
//     // console.log('modal is closed');

//     this.setState({ isModalVisable: false, biggerImgUrl: '' });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     // console.log('event.target in handleSubmit in App: ', event.target);
//     // console.log(
//     //   'event.target[1].value in handleSubmit in App: ',
//     //   event.target[1].value
//     // );
//     // console.log(
//     //   'event.target[1].name in handleSubmit in App: ',
//     //   event.target[1].name
//     // );

//     const inputName = event.target[1].name;
//     const searchedPhrase = event.target[1].value.split(' ').join('+');

//     // console.log('searchedPhrase in handleSubmit', searchedPhrase);

//     this.setState({ [inputName]: searchedPhrase });
//   };

//   // clearing previous data
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

//       this.clearState();

//       const response = await fetchImages(
//         this.state.searchedText,
//         this.state.actualPage
//       );
//       // console.log(response.data.hits);

//       const newImages = response.data.hits.map(image => {
//         // console.log(image);

//         return {
//           id: image.id,
//           tags: image.tags,
//           previewUrl: image.webformatURL,
//           biggerImg: image.largeImageURL,
//         };
//       });
//       // console.log('newImages after map: ', newImages);

//       this.setState(prevState => {
//         return {
//           images: [...prevState.images, ...newImages],
//           isLoading: false,
//           // totalHits: totalHits,
//         };
//       });

//       // console.log('this.state after fetch: ', this.state);

//       // console.log('response in App: ', response);

//       // if (response.data.totalHits <= 12) {
//       //   this.setState({ searchForMore: false });
//       //   // console.log(
//       //   //   'response.data.hits.length <= 12, SearchForMore should be false: ',
//       //   //   this.state.searchForMore
//       //   // );
//       //   return;
//       // } else
//       if (response.data.hits.length < 12) {
//         this.setState({ searchForMore: false });
//         // console.log(
//         //   'response.data.hits.length <= 12, SearchForMore should be false: ',
//         //   this.state.searchForMore
//         // );
//         return;
//       } else {
//         this.setState({ searchForMore: true });
//         // console.log(
//         //   'response.data.hits.length > 12, so SearchForMore should be true: ',
//         //   this.state.searchForMore
//         // );
//       }
//     }
//   }

//   changePage = event => {
//     // this.clearState();
//     event.preventDefault();
//     this.setState(prevState => ({
//       actualPage: prevState.actualPage + 1,
//     }));
//   };

//   // Getting info about clicked image, need for example to modal (bigger photo url)
//   getInfoAbout = event => {
//     // event.stopPropagation();
//     // console.log(event.currentTarget.dataset.bigger);
//     const bigUrl = event.currentTarget.dataset.bigger;
//     // console.log(typeof bigUrl);
//     // console.log('bigUrl link: ', bigUrl);

//     this.openModal(bigUrl);
//     // console.log(this.state);
//   };

//   render() {
//     return (
//       <div>
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
//           isModalVisable={this.state.isModalVisable}>
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
