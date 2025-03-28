import { getFromStreamingServer, postToStreamingServer } from "./base";
import {
  ESportsStreamType,
  SPORTS_TYPE,
  SportsLeagueType,
} from "../model/Streams";

export async function getChzzkHlsUrls(
  targetUrls: string[],
): Promise<ESportsStreamType[]> {
  const response = await postToStreamingServer("/fetch/stream/hls", targetUrls);

  return await response.data;
}

export async function getESportsStreams(
  type: SPORTS_TYPE,
  page: number,
  size: number,
): Promise<SportsLeagueType[]> {
  const response = await getFromStreamingServer(
    `/league/read/${type}?page=${page}&size=${size}`,
  );
  return await response.data;
}

export async function getAllLeague(page = 0): Promise<SportsLeagueType[]> {
  const response = await getFromStreamingServer(
    `/league/read/all/${page}/${20}`,
  );

  return await response.data;
}

export async function getAllLeagueBySportsTypeInfinite(
  type: SPORTS_TYPE,
  page: number,
): Promise<SportsLeagueType[]> {
  const response = await getFromStreamingServer(
    `/league/read/${type}?page=${page}&size=20`,
  );

  return await response.data;
}

export async function getAllImportantSportsStreams(): Promise<
  SportsLeagueType[]
> {
  const response = await getFromStreamingServer(
    "/league/read/all/by/important",
  );
  return await response.data;
}

export async function getSportsStreamsByType(
  type: SPORTS_TYPE,
  page: number,
  size: number,
): Promise<SportsLeagueType[]> {
  const response = await getFromStreamingServer(
    `/league/read/${type}?page=${page}&size=${size}`,
  );
  return await response.data;
}

export async function getSportsStreamById(
  id: number,
): Promise<SportsLeagueType> {
  const response = await getFromStreamingServer(`/league/read/by/${id}`);

  return await response.data;
}
