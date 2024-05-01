export interface Participant {
  id: number;
  name: string;
  age: number;
  email: string;
  phoneNumber: string;
}

export const generateParticipants = (count: number): Participant[] => {
  const participants: Participant[] = [];
  for (let i = 1; i <= count; i++) {
    participants.push({
      id: i,
      name: `Participant ${i}`,
      age: Math.floor(Math.random() * 50) + 20,
      email: `participant${i}@example.com`,
      phoneNumber: `+123456789${i.toString().padStart(2, "0")}`,
    });
  }
  return participants;
};
