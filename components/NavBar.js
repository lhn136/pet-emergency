import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/Home.module.css';

import logo from '../public/logo.svg';

const Navbar = ({ getLocation }) => {
  return (
    <div className={styles.NavBar}>
      <div className={styles.NavItem}>
        <Link href="/">
          <a>
            <div className={styles.Logo}>
              <Image
                alt="logo"
                src={logo}
                width="25px"
                height="25"
                layout="fixed"
                styles={{ paddingRight: '1em' }}
              ></Image>
            </div>

            <div className={styles.companyName}>
              <span style={{ color: 'var(--main-blue-color)' }}>Pet</span>Emergency
            </div>
          </a>
        </Link>
      </div>
      <div className={styles.NavItem}>
        <Link className={styles.NavItem} href="/">
          <a style={{ fontSize: '.8em' }}>about us</a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
