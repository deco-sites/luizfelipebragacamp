export interface Props {
  cupomCode: string;
  cupomDescription: string;
}

export default function Cupom(props: Props) {
  return (
    <div class="text-center">
      <h3>{props.cupomCode}</h3>
      <p>{props.cupomDescription}</p>
    </div>
  );
}
