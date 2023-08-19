import { usePlaces } from "../../../Contexts/PlacesProvider";

function City() {
  const { lat, lng } = usePlaces();
  return <div>A city is clicked {lat}</div>;
}

export default City;
