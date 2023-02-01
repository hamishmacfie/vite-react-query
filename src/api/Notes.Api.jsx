import axios from "axios";

const notesAPI = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
});

export const getNotes = async () => {
  const response = await notesAPI.get("/notes");
  return response.data;
};

export const createNewNote = async (data) => {
  const response = await notesAPI.post(`/notes`, data);
  return response;
};

export const editNote = async (data) => {
  const { id } = data;
  const response = await notesAPI.put(`/notes/${id}`, data);
  return response;
};

export const deleteNote = async (id) => {
  const response = await notesAPI.delete(`/notes/${id}`);
  return response;
};
