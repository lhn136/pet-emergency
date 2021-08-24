import styles from '../styles/Home.module.css';
// import testData from './testData.json';

export default function Hospitals({ hospitalData }) {
  const data = hospitalData;
  // const data = testData.data.search.business;

  let sortedData;

  if (data) {
    sortedData = data.slice().sort((a, b) => {
      a.distance - b.distance;
    });
  }
  const isOpen24Hours = (hours) => {
    let Open24HoursBool = true;
    if (hours) {
      hours.map((hour) => {
        if (Number(hour.start) + Number(hour.start) !== 0) {
          Open24HoursBool = false;
          return;
        }
      });
    }

    return Open24HoursBool;
  };
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };
  const handleNavigateWithGoogleMap = (address) => {
    if (address) {
      // console.log({ address });
      let query = address.replace(/\s/g, '+').replace(',', '');
      let baseURL = 'https://www.google.com/maps/place/';
      // open URL in a new tab
      window.open(baseURL + query, '_blank');
    }
  };
  return (
    <>
      {sortedData &&
        sortedData.map(({ id, display_phone, distance, name, rating, location, hours }, index) => {
          if (index < 5) {
            return (
              <div
                className={`${styles.hospitalCard} ${styles.card}`}
                key={String(id) + String(index)}
              >
                <div className={styles.distance_ratings}>
                  <span className={styles.distance}>
                    {Math.round(distance * 0.000621371 * 100) / 100} mi
                  </span>
                  <span className={styles.ratings}>⭐ {rating}</span>
                </div>
                <div className={styles.details}>
                  <div className={styles.name}>
                    {index + 1}. {name}
                  </div>
                  <div className={styles.address}>{location.formatted_address}</div>
                  <div className={styles.phone_open}>
                    <div className={styles.phone}>{display_phone} </div>
                    {isOpen24Hours(hours[0].open) && (
                      <div className={styles.open}> Open 24 hours</div>
                    )}
                  </div>

                  <div className={styles.buttons}>
                    <button
                      className={styles.navigate}
                      onClick={() => {
                        // console.log(location.formatted_address);
                        handleNavigateWithGoogleMap(location.formatted_address);
                      }}
                    >
                      Navigate
                    </button>

                    <button
                      className={styles.copy}
                      onClick={() => {
                        handleCopy(location.formatted_address);
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </>
  );
}
