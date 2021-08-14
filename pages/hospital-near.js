import { gql } from '@apollo/client';
import client from '../apollo-client';

import Hospitals from '../components/Hospitals';
import Instructions from '../components/Instructions';
import styles from '../styles/Home.module.css';

import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  let { latitude, longitude } = context.query;
  const QUERY = gql`
    query getHospitals {
      search(
        categories: "emergencypethospital"
        latitude: ${latitude}
        longitude: ${longitude}
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

  let hospitalData, error;
  try {
    const { data } = await client.query({ query: QUERY });

    hospitalData = data.search.business;
  } catch (e) {
    error = e.message;
    return error;
  }
  // Pass data to the page via props

  return { props: { hospitalData } };
}

export default function HospitalNear({ hospitalData }) {
  const Router = useRouter();
  return (
    <>
      <h1 className={styles.appName}>
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
        <Instructions />

        <div className={styles.NearestHospitals}>
          <h2>
            Nearest emergency animal hospitals
            <button
              className={'fas fa-sync-alt ' + styles.refreshButton}
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
            ></button>
          </h2>
          <Hospitals hospitalData={hospitalData} />
        </div>
      </div>
    </>
  );
}
