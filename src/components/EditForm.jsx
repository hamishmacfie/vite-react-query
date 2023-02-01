import { useRef, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editNote } from "../api/Notes.Api";

const EditForm = ({ id, title, details, showForm }) => {
  const queryClient = useQueryClient();
  const [notice, setNotice] = useState("");

  const updatedTitle = useRef();
  const updatedDetails = useRef();

  const updateNote = useMutation({
    mutationFn: editNote,
    onSuccess: (data, id) => {
      queryClient.setQueryData(["notes", { id }], data);
      queryClient.invalidateQueries("notes");
      setNotice(data.data.message);
      showForm(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNote.mutate({
      id,
      title: updatedTitle.current.value,
      details: updatedDetails.current.value,
    });
  };

  return (
    <>
      {notice ? <span className="notice success">{notice}</span> : null}
      <form className="edit-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input ref={updatedTitle} type="text" id="title" defaultValue={title} />

        <label htmlFor="details">Details</label>
        <input
          ref={updatedDetails}
          type="text"
          id="details"
          defaultValue={details}
        />
        <button className="btn update">Update</button>
      </form>
    </>
  );
};

export default EditForm;
