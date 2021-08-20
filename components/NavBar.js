import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/Home.module.css';

import logo from '../public/logo.svg';

const Navbar = ({ getLocation }) => {
  return (
    <div className={styles.NavBar}>
      <Link className={styles.companyLogo} href="/">
        <a className={styles.NavItem}>
          <h2>
            <Image
              alt="logo"
              src={logo}
              width="25px"
              height="25"
              layout="fixed"
              // className={styles.Picture}
              styles={{ paddingRight: '1em' }}
            ></Image>
            <span style={{ color: 'var(--main-blue-color)' }}>Pet</span> Emergency
          </h2>
        </a>
      </Link>
      <Link href="/">
        <a className={styles.NavItem}>
          <h2>about us</h2>
        </a>
      </Link>
    </div>
  );
};

export default Navbar;
