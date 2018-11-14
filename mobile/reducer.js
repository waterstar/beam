export const GET_SCOOTERS= 'GET_SCOOTERS';
export const GET_SCOOTERS_SUCCESS= 'GET_SCOOTERS_SUCCESS';
export const GET_TRIPS= 'GET_TRIPS';
export const GET_TRIPS_SUCCESS= 'GET_TRIPS_SUCCESS';

const initialState = { 
    scooters: [],
    trips: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SCOOTERS_SUCCESS:
      return { ...state, scooters: action.payload.data };
    case GET_TRIPS_SUCCESS:
      return { ...state, trips: action.payload.data };
    default:
      return state;
  }
}

export function getScooters() {
  return {
    type: GET_SCOOTERS,
    payload: {
      request: {
        url: `/scooters`
      }
    }
  };
}

export function getTrips() {
  return {
    type: GET_TRIPS,
    payload: {
      request: {
        url: `/trips`
      }
    }
  };
}
