import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ whenSubmit }) => {
  return (
    <header>
      <form className={styles.form} onSubmit={whenSubmit}>
        <button className={styles.button} type="submit">
          <span>Search</span>
        </button>
        <input
          className={styles.input}
          name="searchedText"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  whenSubmit: PropTypes.func,
};

// -------------------------func component code-----------------------------------------
// -------------------------UNCOMMENT ABROVE OR UNDER--------------------------
// -------------------------class component code-------------------------------------

// import { Component } from 'react';
// import styles from './Searchbar.module.css';
// import PropTypes from 'prop-types';

// export class Searchbar extends Component {
//   static propTypes = {
//     whenSubmit: PropTypes.func,
//   };
//   render() {
//     const { whenSubmit } = this.props;

//     return (
//       <header>
//         <form className={styles.form} onSubmit={whenSubmit}>
//           <button className={styles.button} type="submit">
//             <span>Search</span>
//           </button>
//           <input
//             className={styles.input}
//             name="searchedText"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }
