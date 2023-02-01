import { useRef } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createNewNote } from "../api/Notes.Api";

const CreateNote = ({ state }) => {
  const queryClient = useQueryClient();

  const title = useRef();
  const details = useRef();

  const createaNote = useMutation(createNewNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: title.current.value,
      details: details.current.value,
    };
    createaNote.mutate(data);
    e.target.reset();
    state(false);
  };
  return (
    <div>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input autoFocus className="w-25" type="text" id="title" ref={title} />

        <label htmlFor="details">Details</label>
        <input className="w-50" type="text" id="details" ref={details} />
        <button className="btn create">Create</button>
      </form>
    </div>
  );
};

export default CreateNote;
