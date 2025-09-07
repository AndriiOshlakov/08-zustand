import axios from "axios";
import { NoteCreatePayload, Note, NoteTag } from "@/types/note";

const myPostsKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface PostsHttpResponse {
  notes: Note[];
  totalPages: number;
}

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const headers = { Authorization: `Bearer ${myPostsKey}` };

// fetchNotes виконує запит на сервер для отримання колекції нотатків
export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<PostsHttpResponse> => {
  const response = await axios.get<PostsHttpResponse>(BASE_URL, {
    headers,
    params: { page, perPage, search, tag },
  });
  return response.data;
};

// createNote виконує запит для створення нової нотатки на сервері

export const createNote = async (note: NoteCreatePayload): Promise<Note> => {
  const res = await axios.post<Note>(BASE_URL, note, { headers });
  return res.data;
};

// deleteNote виконує запит для видалення нотатки за заданим ідентифікатором
export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(`${BASE_URL}/${id}`, {
    headers,
  });
  return res.data;
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`${BASE_URL}/${id}`, {
    headers,
  });
  return res.data;
};
