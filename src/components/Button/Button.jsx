import styles from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ images, nextPage, searchForMore }) => {
  return (
    <>
      {searchForMore && images.length > 0 ? (
        <button className={styles.loadMoreBtn} onClick={e => nextPage(e)}>
          Load more
        </button>
      ) : null}
    </>
  );
};

Button.propTypes = {
  images: PropTypes.array.isRequired,
  nextPage: PropTypes.func,
  searchForMore: PropTypes.bool,
};

// -------------------------func component code-----------------------------------------
// -------------------------UNCOMMENT ABROVE OR UNDER--------------------------
// -------------------------class component code-------------------------------------

// import { Component } from 'react';
// import styles from './Button.module.css';
// import PropTypes from 'prop-types';

// export class Button extends Component {
//   static propTypes = {
//     images: PropTypes.array.isRequired,
//     nextPage: PropTypes.func,
//     searchForMore: PropTypes.bool,
//   };

//   render() {
//     const { nextPage, searchForMore, images } = this.props;
//     return (
//       <>
//         {searchForMore && images.length > 0 ? (
//           <button className={styles.loadMoreBtn} onClick={e => nextPage(e)}>
//             Load more
//           </button>
//         ) : null}
//       </>
//     );
//   }
// }
