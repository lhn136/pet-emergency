import { useRouter } from 'next/router';

import styles from '../styles/Home.module.css';

const RefreshButton = ({ getLocation }) => {
  return (
    <button
      className={'fas fa-sync-alt ' + styles.refreshButton}
      onClick={() => getLocation()}
    ></button>
  );
};

export default RefreshButton;
