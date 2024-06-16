import Image from "apps/website/components/Image.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { Section } from "deco/mod.ts";
import Button from "../components/ui/Button.tsx";

export interface Props {
  sections: Section[] | null;
  /**
   *  @hide
   * @readonly
   */
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
    <div class="">
      {sections.map((section, index) => {
        const { Component, props } = section;
        const isActive = index === productIndex;

        return isActive
          ? (
            <div class="flex items-center flex-wrap container">
              <div class="flex-1">
                <Component {...props} />
              </div>
              <div class="group">
                <p>{message}</p>
                <div class="max-w-full overflow-hidden">
                  <Image
                    src={image}
                    alt="cat image"
                    width={300}
                    height={300}
                    class={"group-hover:scale-110 transition-transform duration-300 ease-in-out"}
                  />
                </div>

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
  );
}

export default PartialProductAd;
