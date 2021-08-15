import Link from 'next/Link';

import styles from '../styles/Home.module.css';

const Navbar = ({ getLocation }) => {
  return (
    <div className={styles.NavBar}>
      <Link href="/">
        <h2 className={styles.NavItem}>
          <span style={{ color: 'var(--main-blue-color)' }}>Pet</span> Emergency
        </h2>
      </Link>
      <Link href="/">
        <h2 className={styles.NavItem}>about us</h2>
      </Link>
    </div>
  );
};

export default Navbar;
