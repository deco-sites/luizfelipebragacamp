import { AppContext } from "../apps/site.ts";

export interface Props {
  productId: string;
}

export interface CommentProps {
  productId: string;
  comments: string[];
}

const action = async (props: Props, _req: Request, _ctx: AppContext) => {

  const response = await fetch(`https://camp-api.deco.cx/event/${props.productId}`, {
    method: "GET",
    headers: {
      "x-api-key": "luizfelipebragacamp",
    },
  });

  const data = await response.json() as CommentProps;
  return data;
}

export default action;