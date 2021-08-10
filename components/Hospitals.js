import { useQuery, gql } from '@apollo/client';
import styles from '../styles/Home.module.css';
// import testData from './testData.json';

const QUERY = gql`
  query getHospitals {
    search(
      categories: "emergencypethospital"
      latitude: 33.7313
      longitude: -117.9123
      open_now: true
      sort_by: "distance"
    ) {
      business {
        name
        rating
        display_phone
        distance
        hours {
          open {
            start
            end
          }
        }
        location {
          formatted_address
        }
      }
    }
  }
`;

export default function Hospitals({ hospitalData }) {
  //   const { data, loading, error } = useQuery(QUERY);
  //   console.log('Hi');
  //   console.log({ hospitalData });
  const data = hospitalData;
  let loading, error;
  let sortedData;
  if (loading) {
    return (
      <h2>
        <a href="#loading" aria-hidden="true" class="aal_anchor" id="loading">
          <svg
            aria-hidden="true"
            class="aal_svg"
            height="16"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fill-rule="evenodd"
              d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            ></path>
          </svg>
        </a>
        Loading...
      </h2>
    );
  }

  if (error) {
    console.error(error);
    return null;
  }
  if (data) {
    sortedData = data.slice().sort((a, b) => {
      a.distance - b.distance;
    });
    // console.log({ sortedData });
    //     1: "display_phone"
    // ​​
    // 2: "distance"
    // ​​
    // 3: "name"
    // ​​
    // 4: "rating"'
    // let lat, long;
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   lat = position.coords.latitude;
    //   long = position.coords.longitude;

    //   console.log(lat, long);
    // });
  }

  return (
    <div>
      {sortedData &&
        sortedData.map(
          ({ id, display_phone, address, distance, name, rating, location }, index) => {
            return (
              <div className={styles.hospitalCard} key={id}>
                <div className={styles.distance_ratings}>
                  <span>{Math.round(distance * 0.000621371 * 100) / 100} miles </span>
                  <span>{rating} stars</span>
                </div>
                <div className={styles.details}>
                  <div className={styles.name}>{name}</div>
                  <div className={styles.address}>{location.formatted_address}</div>
                  <div className={styles.phone}>{display_phone}</div>
                </div>
              </div>
            );
          }
        )}
    </div>
  );
}
