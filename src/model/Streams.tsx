import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import BasketBall from "../assets/image/basketBall.png";
import SoccerBall from "../assets/image/soccer-ball-svgrepo-com.png";
import VolleyBall from "../assets/image/volleyball.png";
import BaseBall from "../assets/image/baseball-svgrepo-com.png";
import AmericanFootBall from "../assets/image/american-football-svgrepo-com.png";
import LCKLogo from "../assets/image/LCK_logo.png";
import LWCLogo from "../assets/image/LWC.png";
import LPLLogo from "../assets/image/LPL_logo.png";
import Hockey from "../assets/image/hockey-ice-hockey-svgrepo-com.png";
import ChzzkLogo from "../assets/image/chzzk_logo.png";
import SOOPLogo from "../assets/image/soop_logo.png";
import AnyCastLogo from "../assets/image/anyCast-logo.png";

export const tagSelector = (
  url: string,
  type: SPORTS_TYPE,
  subType: string,
) => {
  if (url.includes("chzzk")) {
    return ChzzkLogo;
  } else if (url.includes("soop")) {
    return SOOPLogo;
  }

  switch (type) {
    case "SOCCER":
      return SoccerBall;
    case "BASKETBALL":
      return BasketBall;
    case "BASEBALL":
      return BaseBall;
    case "VOLLEYBALL":
      return VolleyBall;
    case "HOCKEY":
      return Hockey;
    case "FOOTBALL":
      return AmericanFootBall;
    case "ESPORTS":
      if (subType === "LCK") {
        return LCKLogo;
      } else if (subType === "LPL") {
        return LPLLogo;
      } else if (subType === "LWC") {
        return LWCLogo;
      }
      return AnyCastLogo;
    default:
      return AnyCastLogo;
  }
};

export const SPORTS_ICON_LIST = [
  { type: "SOCCER", icon: <SportsSoccerIcon /> },
  { type: "BASEBALL", icon: <SportsBaseballIcon /> },
  { type: "BASKETBALL", icon: <SportsBasketballIcon /> },
  { type: "VOLLEYBALL", icon: <SportsVolleyballIcon /> },
  { type: "HOCKEY", icon: <SportsHockeyIcon /> },
  { type: "FOOTBALL", icon: <SportsFootballIcon /> },
  { type: "ESPORTS", icon: <SportsEsportsIcon /> },
  { type: "ETC", icon: <MoreHorizIcon /> },
];

export type SPORTS_TYPE =
  | "ALL"
  | "SOCCER"
  | "BASEBALL"
  | "BASKETBALL"
  | "VOLLEYBALL"
  | "HOCKEY"
  | "FOOTBALL"
  | "ESPORTS"
  | "TENNIS"
  | "UFC"
  | "ETC";

export const SPORTS_TYPE_LIST = [
  "ALL",
  "SOCCER",
  "BASEBALL",
  "BASKETBALL",
  "VOLLEYBALL",
  "HOCKEY",
  "FOOTBALL",
  "ESPORTS",
  "TENNIS",
  "UFC",
  "ETC",
];

export interface MiniGameStreamListType {
  name: string;
  streamSrc: string;
  game: string;
  type: string;
}

export interface SportsLeagueType {
  id?: number;
  channelName: string;
  liveTitle: string;
  thumbnailUrl: string;
  sportsType: SPORTS_TYPE;
  sportsTypeSub: string;
  leagueName: string;
  streamUrl: string;
  streamUrlSub: string;
  leagueDate: string;
  homeName: string;
  awayName: string;
  important: boolean;
  bettingList?: SportsLeagueBettingType[];
}

export interface SportsLeagueBettingType {
  id?: number;
  sportsLeagueId: number;
  bettingType: string;
  bettingName: string;
  homeOddsName: string;
  homeOdds: number;
  awayOddsName: string;
  awayOdds: number;
}

export interface ESportsStreamType {
  liveTitle: string;
  hlsPath: string;
}

export interface SportsBettingRecordType {
  id?: number;
  leagueName: string;
  bettingType: string;
  betName: string;
  odds: number;
}

export interface ESportsErrorCodeType {
  liveTitle?: "Error" | null;
  hlsPath?: "Error" | null;
}

export const STREAMS_ERROR_CODE = "Error";
export const STREAMS_ERROR_TITLE = "채널명이 다르거나 방송이 중단되었습니다.";
