import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ListParticipants from "./components/participants/list-participants/list-participants.component";

describe("ListParticipants component", () => {
  test("renders the component correctly", () => {
    const { getByText } = render(<ListParticipants />);
    const addButton = getByText("Add Participant");
    expect(addButton).toBeInTheDocument();
  });

  test("allows adding a new participant", async () => {
    const { getByText, getByLabelText } = render(<ListParticipants />);
    const addButton = getByText("Add Participant");
    fireEvent.click(addButton);

    const nameInput = getByLabelText("Name:");
    const ageInput = getByLabelText("Age:");
    const emailInput = getByLabelText("Email:");
    const phoneNumberInput = getByLabelText("Phone Number:");
    const addButtonInModal = getByText("Add");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(ageInput, { target: { value: "30" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(phoneNumberInput, { target: { value: "+1234567890" } });

    fireEvent.click(addButtonInModal);

    await waitFor(() => {
      expect(getByText("John Doe")).toBeInTheDocument();
    });
  });

  test("allows removing a participant", async () => {
    const { getByText, getAllByText } = render(<ListParticipants />);
    const removeButtons = getAllByText("Remove");
    const firstRemoveButton = removeButtons[0];
    fireEvent.click(firstRemoveButton);

    await waitFor(() => {
      expect(getByText("Participant 2")).toBeInTheDocument(); // Assuming Participant 1 is removed
    });
  });
});
