import { SectionProps } from "deco/types.ts";
import { AppContext } from "../apps/site.ts";

export const loader = async (
  _props: unknown,
  _req: Request,
  _ctx: AppContext,
) => {
  const data = await fetch(`https://camp-api.deco.cx/events`, {
    method: "GET",
    headers: {
      "x-api-key": "luizfelipebragacamp",
    },
  }).then((response) => response.json());

  const totalEvents = data.total;

  return {
    totalEvents,
  };
};

export default function TotalEvents(
  { totalEvents }: SectionProps<typeof loader>,
) {
  return (
    <>
      <p>SITE SAVES: {totalEvents}</p>
    </>
  );
}
