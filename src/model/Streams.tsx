import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";

import LolLogo from "../assets/image/lol_logo.png";
import PingPong from "../assets/image/pingpong.png";
import StarCraftLogo from "../assets/image/starcraft.webp";
import TennisBall from "../assets/image/tennisBall.png";
import BasketBall from "../assets/image/basketBall.png";
import HandBall from "../assets/image/handBall.png";
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
    case "HANDBALL":
      return HandBall;
    case "TENNIS":
      return TennisBall;
    case "PINGPONG":
      return PingPong;
    case "FOOTBALL":
      return AmericanFootBall;
    case "ESPORTS":
      if (subType === "LCK") {
        return LCKLogo;
      } else if (subType === "LPL") {
        return LPLLogo;
      } else if (subType === "LWC") {
        return LWCLogo;
      } else if (subType === "STARCRAFT") {
        return StarCraftLogo;
      } else {
        return LolLogo;
      }
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
  { type: "HANDBALL", icon: <SportsHandballIcon /> },
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
  | "PINGPONG"
  | "HANDBALL"
  | "UFC"
  | "ETC";

export const STREAMING_MENU_LIST = [
  { menu: "ALL", label: "ALL" },
  { menu: "ESPORTS", label: "이스포츠" },
  { menu: "SOCCER", label: "축구" },
  { menu: "BASKETBALL", label: "농구" },
  { menu: "BASEBALL", label: "야구" },
  { menu: "VOLLEYBALL", label: "배구" },
  { menu: "HOCKEY", label: "하키" },
  { menu: "FOOTBALL", label: "미식축구" },
  { menu: "HANDBALL", label: "핸드볼" },
  { menu: "UFC", label: "UFC" },
  { menu: "TENNIS", label: "테니스" },
  { menu: "PINGPONG", label: "탁구" },
];

export const SPORTS_TYPE_LIST = [
  "ALL",
  "SOCCER",
  "BASEBALL",
  "BASKETBALL",
  "VOLLEYBALL",
  "HOCKEY",
  "FOOTBALL",
  "ESPORTS",
  "HANDBALL",
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
  thumbnailUrl: string | null;
  sportsType: SPORTS_TYPE;
  sportsTypeSub: string;
  leagueName: string;
  streamUrl: string;
  streamUrlSub: string;
  leagueDate: string;
  homeName: string;
  awayName: string;
  important: boolean;
  live: boolean;
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
