import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../api/Notes.Api";
import CreateNote from "./CreateNote";
import NoteItem from "./NoteItem";

const Notes = () => {
  const [showCreateNote, setShowCreateNote] = useState(false);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  if (isLoading) return <h2>Loading.....</h2>;
  if (isError) return <h2>Sorry, there was and error: {error.message}</h2>;

  return (
    <>
      <div className="title-heading">
        <h2>Notes</h2>
        <span>
          <button
            className={showCreateNote ? "btn close" : "btn create"}
            onClick={() => setShowCreateNote(!showCreateNote)}
          >
            {showCreateNote ? "Close" : "Create Note"}
          </button>
        </span>
      </div>
      {showCreateNote && <CreateNote state={setShowCreateNote} />}
      {data.map((note) => (
        <div key={note.id} className="notes-layout">
          <NoteItem id={note.id} title={note.title} details={note.details} />
        </div>
      ))}
    </>
  );
};

export default Notes;
