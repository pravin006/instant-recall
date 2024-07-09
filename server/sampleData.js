export const decks = [
    {
      deckId: "1",
      deckName: "Math Deck",
      isActive: true,
      lastActive: new Date("2024-06-10T10:00:00Z")
    },
    {
      deckId: "2",
      deckName: "Science Deck",
      isActive: false,
      lastActive: new Date("2024-07-10T10:00:00Z")
    }
];
  
export const cards = [
    {
        cardId: "1",
        deckId: "1",
        question: "What is 2 + 2?",
        answer: "4",
        dueForReview: new Date("2024-07-10T10:00:00Z")
    },
    {
        cardId: "2",
        deckId: "1",
        question: "What is the square root of 16?",
        answer: "4",
        dueForReview: new Date("2024-07-11T10:00:00Z")
    },
    {
        cardId: "3",
        deckId: "2",
        question: "What planet is known as the Red Planet?",
        answer: "Mars",
        dueForReview: new Date("2024-07-12T10:00:00Z")
    },
    {
        cardId: "4",
        deckId: "2",
        question: "What is the chemical symbol for water?",
        answer: "H2O",
        dueForReview: new Date("2024-07-13T10:00:00Z")
    }
];
