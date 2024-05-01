import React, { useState } from "react";
import "./list-participants.component.css";
import Modal from "../../modal/modal.component";
import EditParticipantRow from "../edit-participant-row/edit-participant-row.component";
import { Participant, generateParticipants } from "../shared/participants";
import AddParticipantRow from "../add-participant-row/add-participant-row.component";

const ListParticipants: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>(
    generateParticipants(20)
  );
  const [editingParticipant, setEditingParticipant] =
    useState<Participant | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Participant;
    direction: string;
  }>({ key: "id", direction: "" });
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const handleSort = (key: keyof Participant) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedParticipants = [...participants].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setParticipants(sortedParticipants);
  };

  const handleEdit = (participant: Participant) => {
    setEditingParticipant(participant);
    setShowModal(true);
    setModalMode("edit");
  };

  const handleRemove = (participant: Participant) => {
    setParticipants(participants.filter((p) => p.id !== participant.id));
  };

  const handleSubmitEdit = (editedParticipant: Participant) => {
    setParticipants(
      participants.map((p) =>
        p.id === editedParticipant.id ? editedParticipant : p
      )
    );
    setEditingParticipant(null);
    setShowModal(false);
  };

  const handleAddParticipant = () => {
    setEditingParticipant(null);
    setShowModal(true);
    setModalMode("add");
  };

  const handleFormSubmit = (newParticipant: Participant) => {
    setParticipants([...participants, newParticipant]);
    setShowModal(false);
  };

  return (
    <div className="table-container">
      <div className="add-participant">
        <button onClick={handleAddParticipant} className="action-button">
          Add Participant
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("age")}>Age</th>
            <th onClick={() => handleSort("email")}>Email</th>
            <th onClick={() => handleSort("phoneNumber")}>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.id}</td>
              <td>{participant.name}</td>
              <td>{participant.age}</td>
              <td>{participant.email}</td>
              <td>{participant.phoneNumber}</td>
              <td>
                <button
                  onClick={() => handleEdit(participant)}
                  className="action-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemove(participant)}
                  className="action-button"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {modalMode === "add" ? (
            <AddParticipantRow
              onSubmit={handleFormSubmit}
              onCancel={() => setShowModal(false)}
              participantsCount={participants.length}
            />
          ) : (
            <EditParticipantRow
              participant={editingParticipant!}
              onSubmit={handleSubmitEdit}
              onCancel={() => {
                setEditingParticipant(null);
                setShowModal(false);
              }}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default ListParticipants;
