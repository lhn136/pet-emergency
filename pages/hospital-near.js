import { gql } from '@apollo/client';
import client from '../apollo-client';
import Hospitals from '../components/Hospitals';
import styles from '../styles/Home.module.css';
import instructionImage from '../public/instructions.png';
import Image from 'next/image';
import { isNonEmptyArray } from '@apollo/client/utilities';
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

  const { data, error } = await client.query({ query: QUERY });

  if (error) {
    return error;
  }

  const hospitalData = await data.search.business;
  console.log('THIS DA DATA');
  console.log({ data: hospitalData });
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
        <div className={styles.CPRInstructions}>
          <h2>Choking and CPR</h2>
          <h3>For</h3>
          <div
            className={styles.NearestScrollable + ' ' + styles.buttons}
            styles={{ overflow: 'hidden' }}
          >
            <button className={styles.navigate}>cat</button>

            <button className={styles.navigate}>dog</button>
          </div>
          {/* <div className={styles.PictureContainer}>
            <Image src={instructionImage} width="500px" height="600px" layout="fixed"></Image>
          </div> */}
        </div>

        <div className={styles.NearestHospitals}>
          <h2>
            Nearest emergency animal hospitals
            {/* <i class="far fa-compass"></i> */}
            {/* <i class="fas fa-sync-alt"></i> */}
            <button
              className={'fas fa-sync-alt ' + styles.refreshButton}
              // style={{
              //   border: 'none',
              //   background: 'transparent',
              //   color: '#0070f3',
              //   marginLeft: '.5em',
              //   marginBottom: '.5em',
              // }}
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
