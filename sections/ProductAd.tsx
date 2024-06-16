import Image from "apps/website/components/Image.tsx";
import Button from "../components/ui/Button.tsx";

export interface Props {
  // productPage: ProductDetailsPage | null;
  product: {
    title?: string;
    description?: string;
    price?: string;
    imageSrc?: string;
  };
  adDescription?: string;
}

const errorValues = {
  title: "Feijao",
  imageSrc:
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10598/adfce616-525e-437d-bcb4-3c106e8aef09",
  description: "Feijao é um prato brasileiro",
};

export function LoadingFallback() {
  return (
    <ProductAd
      product={{
        title: "loading",
        imageSrc:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10598/81b68986-43ff-47e6-914d-84dddb2ea9c3",
      }}
      adDescription="loading"
    />
  );
}

export default function ProductAd(props: Props) {
  const { product, adDescription } = props;
  const description = adDescription ?? product.description;

  return (
    <div class="p-4 flex items-center">
      <Image src={product.imageSrc!} height={400} width={600} />
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

export function ErrorFallback() {
  return (
    <>
      <ProductAd
        product={{ title: errorValues.title, imageSrc: errorValues.imageSrc }}
        adDescription={errorValues.description}
      />
      <a href="/culturas">
        <Button>para saber mais</Button>
      </a>
    </>
  );
}
