import Image from 'next/image';

import styles from '../styles/Home.module.css';

// import cprP1 from '../public/CPR-Cats-and-Dogs-P1.gif';

import cprP1 from '../public/CPR-Cats-and-Dogs.gif';

export default function Instructions() {
  return (
    <div className={styles.CPRInstructions}>
      <h2>Choking and CPR Instructions</h2>
      <div className={styles.PictureContainer}>
        <Image
          src={cprP1}
          alt="instructions"
          // layout="fixed"
          className={styles.Picture}
        ></Image>
      </div>
    </div>
  );
}

/* Other option
      
<div
className={styles.NearestScrollable + ' ' + styles.buttons}
styles={{ overflow: 'hidden' }}
>
<button className={styles.copy}>cat</button>

<button className={styles.copy} onClick={() => handleLink()}>
dog
</button>

<button className={styles.copy}>others</button>
</div> */
