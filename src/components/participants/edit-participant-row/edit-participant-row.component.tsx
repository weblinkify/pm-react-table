import React, { useState } from "react";
import { Participant } from "../shared/participants";
import { validateForm } from "../shared/form-validation";

interface EditParticipantRowProps {
  participant: Participant;
  onSubmit: (editedParticipant: Participant) => void;
  onCancel: () => void;
}

const EditParticipantRow: React.FC<EditParticipantRowProps> = ({
  participant,
  onSubmit,
  onCancel,
}) => {
  const [editedParticipant, setEditedParticipant] =
    useState<Participant>(participant);
  const [errors, setErrors] = useState<Partial<Participant>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedParticipant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: newErrors } = validateForm(editedParticipant); // Use validateForm function
    if (isValid) {
      onSubmit(editedParticipant as Participant);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="edit-participant-row">
      <div className="input-field">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={editedParticipant.name}
          onChange={handleChange}
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>
      <div className="input-field">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={editedParticipant.age}
          onChange={handleChange}
        />
        {errors.age && <div className="error-message">{errors.age}</div>}
      </div>
      <div className="input-field">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={editedParticipant.email}
          onChange={handleChange}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>
      <div className="input-field">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={editedParticipant.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && (
          <div className="error-message">{errors.phoneNumber}</div>
        )}
      </div>
      <div>
        <button type="submit" onClick={handleSubmit} className="action-button">
          Save
        </button>
        <button type="button" onClick={onCancel} className="action-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditParticipantRow;
