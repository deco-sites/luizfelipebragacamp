import { Temperature } from "apps/weather/loaders/temperature.ts";

export interface Props {
  temperature: Temperature | null;
  locationDescription: string;
}

export default function Lugar(props: Props) {
  return (
    <div class="text-center">
      <h3>Temperatura Agora: {props.temperature?.celsius}</h3>
      <p>{props.locationDescription}</p>
    </div>
  );
}
