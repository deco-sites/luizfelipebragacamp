import { MatchContext } from "deco/blocks/matcher.ts";

export interface Props {
  campanhas: string[];
}

export default function UtmCampaign(props: Props, ctx: MatchContext) {
  function getQueryParam(url: string, param: string): string | null {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get(param);
  }

  const utmCampaign = getQueryParam(ctx.request.url, 'utm_campaign');

  if (!utmCampaign) {
    return false;
  }

  function isCampaignMatch(campaign: string, value: string): boolean {
    if (campaign.endsWith('_')) {
      const base = campaign.slice(0, -1);
      return value.startsWith(base);
    }
    return campaign === value;
  }

  const isCampaignAvailable = props.campanhas.some((campanha) => isCampaignMatch(campanha, utmCampaign));

  return isCampaignAvailable;
}