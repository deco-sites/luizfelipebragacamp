import Image from "apps/website/components/Image.tsx";
import Button from "../components/ui/Button.tsx";

export interface Props {
  // productPage: ProductDetailsPage | null;
  product: {
    title: string;
    description?: string;
    price: string;
    imageSrc: string;
  };
  adDescription?: string;
}

export default function ProductAd(props: Props) {
  const { product, adDescription } = props;
  const description = adDescription ?? product.description;

  return (
    <div class="p-4 flex items-center lg:items-baseline">
      <Image src={product.imageSrc} height={400} width={600} />
      <div>
        <h3>{product.title}</h3>
        <p>{description}</p>
        <span>{product.price}</span>
        <div>
          <Button>Save</Button>
        </div>
        <div class="flex flex-row items-center gap-4">
          <Button>Mais Detalhes</Button>
          <Button>Comprar</Button>
        </div>
      </div>
    </div>
  );
}
