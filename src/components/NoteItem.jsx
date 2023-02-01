import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../api/Notes.Api";
import EditForm from "./EditForm";

const NoteItem = ({ id, title, details }) => {
  const queryClient = useQueryClient();

  const [showDetails, setShowDetails] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const deleteNoteById = useMutation(deleteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });

  const handleShowDetails = () => {
    setShowDetails(true);
    setShowEditForm(false);
  };

  const handleClose = () => {
    setShowDetails(false);
    setShowEditForm(false);
  };

  const handleEdit = () => {
    setShowDetails(false);
    setShowEditForm(true);
  };

  return (
    <div className="note-item">
      <div className="title">
        <h3>
          #{id} {title}
        </h3>
      </div>
      <div>
        {showDetails ? (
          <div>
            <button className="btn close" onClick={handleClose}>
              X
            </button>
            <button className="btn edit" onClick={handleEdit}>
              Edit
            </button>
            <button
              className="btn delete"
              onClick={() => deleteNoteById.mutate(id)}
            >
              Delete
            </button>
          </div>
        ) : (
          <button className="btn details" onClick={handleShowDetails}>
            Show Details
          </button>
        )}
      </div>
      <div>{showDetails ? <p>{details}</p> : null}</div>
      <div>
        {showEditForm ? (
          <EditForm
            id={id}
            title={title}
            details={details}
            showForm={setShowEditForm}
          />
        ) : null}
      </div>
    </div>
  );
};

export default NoteItem;
