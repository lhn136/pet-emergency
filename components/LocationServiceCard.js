import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from '../styles/Home.module.css';

import locationRequestImage from '../public/location-request.svg';

const LocationServiceCard = () => {
  const Router = useRouter();
  return (
    <div className={`${styles.hospitalCard} ${styles.card}`}>
      <div className={styles.distance_ratings}>
        <Image src={locationRequestImage} alt="location"></Image>
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
                    pathname: `/`,
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
  );
};

export default LocationServiceCard;
