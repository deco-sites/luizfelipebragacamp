import { useSignal } from "@preact/signals";
import { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { invoke } from "../../runtime.ts";
import Button from "../ui/Button.tsx";
import Modal from "../ui/Modal.tsx";

export interface Props {
  product: Product;
}

export default function ProductAdModal(props: Props) {
  const isOpen = useSignal<boolean>(false);
  const obsInput = useSignal("");

  const { product } = props;

  const [front] = product.image ?? [];

  const handleClick = async () => {
    const data = {
      productId: product.productID,
      comment: obsInput.value,
    };

    await invoke.site.actions.createProductComment(data);
  };

  return (
    <>
      <Button onClick={() => isOpen.value = true}>Save</Button>

      <Modal
        loading="lazy"
        open={isOpen.value}
        onClose={() => isOpen.value = false}
      >
        <div class="modal-box max-w-7xl w-full flex gap-4">
          <Image
            src={front.url!}
            width={600}
            height={400}
            style={{ aspectRatio: "600/400" }}
          />
          <div class="w-full">
            <h3>{product.name} - {product.productID}</h3>
            <div class="flex flex-col">
              <label id="obs" name="obs">Observacoes</label>
              <textarea
                style={{ resize: "none" }}
                id="obs"
                name="obs"
                type="text"
                rows={4}
                cols={50}
                class="border border-solid border-black p-4"
                onInput={(e) => {
                  const value = e.currentTarget.value;

                  obsInput.value = value;
                }}
              />
            </div>
            <div class="flex justify-end items-center gap-4 mt-4">
              <Button onClick={() => isOpen.value = false}>Cancelar</Button>
              <Button onClick={handleClick}>Publicar</Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
