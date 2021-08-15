import Image from 'next/image';

import styles from '../styles/Home.module.css';

export default function Instructions() {
  return (
    <div className={styles.CPRInstructions}>
      <h2>Choking and CPR</h2>
      <div className={styles.PictureContainer}>
        <Image
          loader={() => {
            return 'https://2mgq9d1askwg2mcs5o2x38iu-wpengine.netdna-ssl.com/wp-content/uploads/2020/01/CPR-Cats-and-Dogs.gif';
          }}
          src={'CPR-Cats-and-Dogs.gif'}
          width="500px"
          height="800px"
          layout="fixed"
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
