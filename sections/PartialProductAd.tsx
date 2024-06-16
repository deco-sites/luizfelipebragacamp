import Image from "apps/website/components/Image.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { Section } from "deco/mod.ts";
import Button from "../components/ui/Button.tsx";

export interface Props {
  sections: Section[] | null;
  /** @hide @readonly */
  productIndex: number;
  message: string;
  image: string;
  buttonTitle: string;
}

function PartialProductAd(
  { sections, productIndex = 0, message, image, buttonTitle }: Props,
) {
  if (sections === null) return;

  return (
    <div>
      {sections.map((section, index) => {
        const { Component, props } = section;
        const isActive = index === productIndex;

        return isActive
          ? (
            <div class="flex items-center">
              <Component {...props} />
              <div>
                <p>{message}</p>
                <Image src={image} alt="cat image" width={300} height={300} />
                <Button
                  class="btn"
                  {...usePartialSection({
                    props: { productIndex: productIndex + 1 },
                  })}
                >
                  {buttonTitle}
                </Button>
              </div>
            </div>
          )
          : null;
      })}
    </div>
    // <div class="flex">
    //
    // </div>
  );
}

export default PartialProductAd;
