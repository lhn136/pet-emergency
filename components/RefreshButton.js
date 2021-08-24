import { useRouter } from 'next/router';

import styles from '../styles/Home.module.css';

const RefreshButton = ({ getLocation }) => {
  return (
    <div style={{ display: 'flex' }}>
      <button
        className={'fas fa-sync-alt ' + styles.refreshButton}
        onClick={() => getLocation()}
      ></button>
    </div>
  );
};

export default RefreshButton;
