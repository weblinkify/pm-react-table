import React, { useState } from "react";
import { Participant } from "../shared/participants";
import { validateForm } from "../shared/form-validation";

interface AddParticipantRowProps {
  onSubmit: (newParticipant: Participant) => void;
  onCancel: () => void;
  participantsCount: number;
}

const AddParticipantRow: React.FC<AddParticipantRowProps> = ({
  onSubmit,
  onCancel,
  participantsCount,
}) => {
  const [newParticipant, setNewParticipant] = useState<Partial<Participant>>({
    id: participantsCount + 1,
    name: "",
    age: undefined,
    email: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<Partial<Participant>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewParticipant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: newErrors } = validateForm(newParticipant);
    if (isValid) {
      onSubmit(newParticipant as Participant);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="add-participant-row">
      <h2>Sign up</h2>
      <div className="input-field">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newParticipant.name || ""}
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
          value={newParticipant.age || ""}
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
          value={newParticipant.email || ""}
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
          value={newParticipant.phoneNumber || ""}
          onChange={handleChange}
        />
        {errors.phoneNumber && (
          <div className="error-message">{errors.phoneNumber}</div>
        )}
      </div>
      <div>
        <button type="submit" onClick={handleSubmit} className="action-button">
          Add
        </button>
        <button type="button" onClick={onCancel} className="action-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddParticipantRow;
