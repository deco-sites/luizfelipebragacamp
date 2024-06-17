import { useSignal } from "@preact/signals";
import { invoke } from "../../runtime.ts";

export interface CommentProps {
  productId: string;
  comments: string[];
}

export default function ShowProductEvents() {
  const data = useSignal<CommentProps>({ productId: "", comments: [] });

  const handleFetch = async (value: string) => {
    const response = await invoke.site.actions.getProductComment({
      productId: value,
    });
    data.value = response;
  };

  return (
    <div>
      <div class="flex items-center gap-4">
        <span>PRODUCT</span>
        <input
          type="text"
          name="productId"
          id="productId"
          class="border"
          onInput={async (e) => {
            const value = e.currentTarget.value;
            await handleFetch(value);
          }}
        />
      </div>
      <ul class="m-4">
        Comments:
        {data.value.comments.map((comment, index) => {
          if (comment.length <= 4) return;
          return <li key={index}>- {comment}</li>;
        })}
      </ul>
      <span>TOTAL: 0 VOTES</span>
    </div>
  );
}
