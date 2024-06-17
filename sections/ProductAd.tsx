import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { SectionProps } from "deco/types.ts";
import { AppContext } from "../apps/site.ts";
import Button from "../components/ui/Button.tsx";
import ProductAdModal from "../islands/ProductAdModal.tsx";

export interface DecoEventProps {
  product: string;
  comments: string[];
}

export interface ProductProps {
  id?: string;
  title?: string;
  description?: string;
  price?: string;
  imageSrc?: string;
}

export interface Props {
  // productPage: ProductDetailsPage | null;
  page: ProductDetailsPage | null;
  adDescription?: string;
  vertical?: boolean;
  animateImage?: boolean;
  hightlight?: boolean;
}

const errorValues = {
  title: "Feijao",
  imageSrc:
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10598/adfce616-525e-437d-bcb4-3c106e8aef09",
  description: "Feijao é um prato brasileiro",
};

export default function ProductAd(props: SectionProps<typeof loader>) {
  const {
    page,
    adDescription,
    vertical,
    animateImage,
    events,
    hightlight = true,
  } = props;
  if (page === null) return;

  const { product } = page;

  const description = adDescription ?? product.description;
  const eventsLenght = events.comments.length;

  const [front, back] = product.image ?? [];

  console.log({ events, eventsLenght });

  return (
    <div class={`p-4 flex ${vertical ? "flex-col" : "flex-row"}`}>
      <div class="relative max-w-full overflow-hidden">
        {eventsLenght >= 3 && hightlight && (
          <div class="bg-green-400 text-black absolute right-0 top-2">
            Destaque
          </div>
        )}

        <Image
          src={front.url!}
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
            <h3>{product.name}</h3>
            <p>{description}</p>
          </div>

          <ProductAdModal {...page} />
        </div>

        <div>
          <span>R$ {product.offers?.highPrice ?? 0}</span>
          <div class="flex flex-row items-center gap-4">
            <Button>
              Mais Detalhes
            </Button>
            <Button>Comprar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const loader = async (
  props: Props,
  _req: Request,
  _ctx: AppContext,
) => {
  const response = await fetch(
    `https://camp-api.deco.cx/event/${props.page?.product.productID}`,
    {
      method: "GET",
      headers: {
        "x-api-key": "luizfelipebragacamp",
      },
    },
  ).then((response) => response.json());

  return {
    ...props,
    events: response,
  };
};

export function LoadingFallback() {
  return (
    <div>
      <h3>loading</h3>
      <Image
        height={400}
        width={600}
        src={"https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10598/81b68986-43ff-47e6-914d-84dddb2ea9c3"}
      />
    </div>
  );
}

export function ErrorFallback() {
  return (
    <div>
      <h3>error</h3>
      <Image
        height={400}
        width={600}
        src={"https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/10598/81b68986-43ff-47e6-914d-84dddb2ea9c3"}
      />
    </div>
  );
}
