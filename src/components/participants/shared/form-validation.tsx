import { Participant } from "./participants";

export const validateForm = (participant: Partial<Participant>) => {
  let isValid = true;
  const errors: any = {};
  const phoneRegex = /^\+?[0-9]{8,14}$/;

  const { name, email, age, phoneNumber } = participant;

  if (!name?.trim()) {
    errors.name = "Please enter a name.";
    isValid = false;
  }

  if (!email?.trim()) {
    errors.email = "Please enter an email address.";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Please enter a valid email address.";
    isValid = false;
  }

  if (!age) {
    errors.age = "Please enter an age.";
    isValid = false;
  } else {
    const ageNumber = parseInt(age.toString(), 10);
    if (ageNumber < 18 || ageNumber > 100) {
      errors.age = "Age must be between 18 and 100.";
      isValid = false;
    }
  }

  if (!phoneNumber?.trim()) {
    errors.phoneNumber = "Please enter a phone number.";
    isValid = false;
  } else if (!phoneRegex.test(phoneNumber)) {
    errors.phoneNumber = "Please enter a valid phone number.";
    isValid = false;
  }

  return { isValid, errors };
};
