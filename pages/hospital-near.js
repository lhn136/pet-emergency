import { gql } from '@apollo/client';
import client from '../apollo-client';
import Hospitals from '../components/Hospitals';

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
  return <Hospitals hospitalData={hospitalData} />;
}
