import { ApiEndPoints } from '../config/Endpoints';
import api from '../config/api';

export async function GetMovieService(payload) {
  const response = await api.get(
    `${ApiEndPoints.getMovie}?search=${payload?.search}&year=${payload.year}&plot=${payload.plot}`,
  );
  return response;
}

export async function SaveSearchService(payload) {
  const response = await api.post(`${ApiEndPoints.search}`, payload);
  return response;
}
export async function GetSaveSearchService(payload) {
  const response = await api.get(`${ApiEndPoints.search}?query=${payload.query}`);
  return response;
}
