import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { gql } from '@apollo/client';
import client from '../apollo-client';

import ClientOnly from '../components/ClientOnly';
import Hospitals from '../components/Hospitals';
import Instructions from '../components/Instructions';
import LocationServiceCard from '../components/LocationServiceCard';
import RefreshButton from '../components/RefreshButton';
import NavBar from '../components/NavBar';

import styles from '../styles/Home.module.css';
import locationRequestImage from '../public/location-request.svg';

export async function getServerSideProps(context) {
  let { latitude, longitude } = context.query;
  if (!latitude && !longitude) {
    return { props: { hospitalData: {} } };
  }

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

export default function Home({ hospitalData }) {
  // console.log({ hospitalData });
  // console.log(Object.keys(hospitalData).length);
  const Router = useRouter();

  const getLocation = () => {
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
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <NavBar getLocation={getLocation} />
      <h1 className={styles.titleText}>
        Keep{' '}
        <span style={{ color: 'var(--main-blue-color)' }}>
          <strong>calm</strong>
        </span>
        . We are here to help.
      </h1>
      <div className={styles.container}>
        <Instructions />

        <div className={styles.NearestHospitals}>
          <div className={styles.sectionTitle}>
            <h2>Nearest open emergency pet hospitals</h2>
            {Object.keys(hospitalData).length ? <RefreshButton getLocation={getLocation} /> : ''}
          </div>
          <div className={styles.NearestScrollable} style={{ overflow: 'hidden' }}>
            {Object.keys(hospitalData).length ? (
              <Hospitals hospitalData={hospitalData} />
            ) : (
              <LocationServiceCard />
            )}
            {/* <LocationServiceCard /> */}
          </div>
        </div>
      </div>
    </>
  );
}
