import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ClientOnly from '../components/ClientOnly';
import Hospitals from '../components/Hospitals';
import { useRouter } from 'next/router';
import instructionImage from '../public/instructions.png';
import locationRequestImage from '../public/location-request.svg';
import Image from 'next/image';

{
  /* <button
  onClick={() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      if (position.coords.latitude && position.coords.longitude) {
        Router.push({
          pathname: `/hospital-near`,
          query: {
            latitude: `${position.coords.latitude}`,
            longitude: `${position.coords.longitude}`,
          },
        });
      }
    });
  }}
>
  Send me Location
</button>; */
}

export default function Home(hospitalData) {
  const Router = useRouter();

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <h1 className={styles.appName} style={{ borderBottom: '1px solid black' }}>
        <span style={{ color: '#0070f3' }}>Pet</span> Emergency
      </h1>
      <h1 className={styles.titleText}>
        Keep{' '}
        <span style={{ color: '#0070f3' }}>
          <strong>calm</strong>
        </span>
        . We are here to help.
      </h1>
      <div className={styles.container}>
        <div className={styles.CPRInstructions}>
          <h2>Choking and CPR</h2>
          <div className={styles.PictureContainer}>
            <Image src={instructionImage} width="500px" height="600px" layout="fixed"></Image>
          </div>
        </div>

        <div className={styles.NearestHospitals}>
          <h2>Nearest emergency animal hospitals</h2>
          <div className={styles.NearestScrollable} style={{ overflow: 'hidden' }}>
            <ClientOnly>
              <div className={`${styles.hospitalCard} ${styles.card}`}>
                <div className={styles.distance_ratings}>
                  <Image src={locationRequestImage}></Image>
                </div>
                <div className={styles.details}>
                  <div className={styles.name}>Location Service</div>
                  <div className={styles.address}>
                    We need to know where you are in order to find nearby emergency pet hospitals
                  </div>

                  <div className={styles.buttons}>
                    <button
                      className={styles.navigate}
                      onClick={() => {
                        navigator.geolocation.getCurrentPosition(function (position) {
                          if (position.coords.latitude && position.coords.longitude) {
                            Router.push({
                              pathname: `/hospital-near`,
                              query: {
                                latitude: `${position.coords.latitude}`,
                                longitude: `${position.coords.longitude}`,
                              },
                            });
                          }
                        });
                      }}
                    >
                      Enable Location Service
                    </button>
                  </div>
                </div>
              </div>
            </ClientOnly>
          </div>
        </div>
      </div>
    </>
  );
}
