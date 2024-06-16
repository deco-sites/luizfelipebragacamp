import { useSignal } from "@preact/signals";
import Image from "apps/website/components/Image.tsx";
import Button from "../ui/Button.tsx";
import Modal from "../ui/Modal.tsx";

export interface Props {
  image: string;
  title: string;
}

export default function ProductAdModal(props: Props) {
  const isOpen = useSignal<boolean>(false);
  const obsInput = useSignal("");

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
            src={props.image!}
            width={600}
            height={400}
            style={{ aspectRatio: "600/400" }}
          />
          <div class="w-full">
            <h3>{props.title}</h3>
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
                  console.log(obsInput.value);
                }}
              />
            </div>
            <div class="flex justify-end items-center gap-4 mt-4">
              <Button onClick={() => isOpen.value = false}>Cancelar</Button>
              <Button>Publicar</Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
