
export type actionProps = {
  productId: string;
  comment: string;
}

const action = async (data: actionProps) => {

  await fetch(
    `https://camp-api.deco.cx/event`,
    {
      method: "POST",
      headers: {
        "x-api-key": "luizfelipebragacamp",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    },
  );
}

export default action;