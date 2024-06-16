import Image from "apps/website/components/Image.tsx";
import Button from "../components/ui/Button.tsx";
import ProductAdModal from "../islands/ProductAdModal.tsx";

export interface Props {
  // productPage: ProductDetailsPage | null;
  product: {
    title?: string;
    description?: string;
    price?: string;
    imageSrc?: string;
  };
  adDescription?: string;
  vertical?: boolean;
  animateImage?: boolean;
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
  const { product, adDescription, vertical, animateImage } = props;
  const description = adDescription ?? product.description;

  return (
    <div class={`p-4 flex ${vertical ? "flex-col" : "flex-row"}`}>
      <div class="max-w-full overflow-hidden">
        <Image
          src={product.imageSrc!}
          height={400}
          width={600}
          class={`${
            animateImage
              ? "hover:scale-110 transition-transform duration-300 ease-in-out"
              : ""
          }`}
        />
      </div>
      <div class="flex flex-col flex-1 justify-between m-4">
        <div class="flex items-center justify-between">
          <div>
            <h3>{product.title}</h3>
            <p>{description}</p>
          </div>

          <ProductAdModal title={product.title!} image={product.imageSrc!} />
        </div>

        <div>
          <span>R$ {product.price ?? 0}</span>
          <div class="flex flex-row items-center gap-4">
            <Button>Mais Detalhes</Button>
            <Button>Comprar</Button>
          </div>
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
