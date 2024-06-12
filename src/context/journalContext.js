import React, { createContext, useContext, useState } from 'react';

const JournalContext = createContext();

const data = [
  {
    'title': 'Morning Run',
    'subtitle': 'Exercise',
    'notes': [
      "Today I decided to change up my routine and went for a long run around the neighborhood.",
      "The weather was perfect, slightly cool with a gentle breeze. It felt invigorating to breathe in the fresh air and clear my mind. I pushed myself to go a little further than usual, and by the time I got home, I felt both exhausted and accomplished.",
      "It’s amazing how much a good run can improve my mood."
    ],
    'date': 'June 12',
    'time': '10:32AM'
  },
  {
    'title': '',
    'subtitle': 'Travel',
    'notes': [
      "Just got back from a weekend trip to the mountains. The scenery was breathtaking, with towering pines and crisp, clean air.",
      "We hiked up to a beautiful waterfall where we spent a couple of hours just soaking in the natural beauty. At night, the stars were so bright and numerous that it felt like you could reach out and touch them.",
      "It was a refreshing break from the daily grind and a reminder of how important it is to connect with nature every now and then."
    ],
    'date': 'June 11',
    'time': '3:15PM'
  },
  {
    'title': 'Art Therapy',
    'subtitle': 'Hobby',
    'notes': [
      "I spent the afternoon working on my painting. I've been trying to capture the essence of a sunset over a serene lake.",
      "It's challenging but incredibly rewarding to see the colors blend and the scene come to life on the canvas. I lost track of time and spent hours adjusting the hues and shadows to get it just right.",
      "Art has always been my escape, and today was a perfect example of how therapeutic it can be."
    ],
    'date': 'June 11',
    'time': '1:47PM'
  },
  {
    'title': '',
    'subtitle': 'Work',
    'notes': [
      "Work was hectic today. We had a major project deadline, and everyone was on edge trying to get their parts finished on time.",
      "I had to juggle multiple tasks and coordinate with different departments to ensure everything came together smoothly. By the end of the day, we managed to submit the project just in time.",
      "It was stressful, but the sense of accomplishment once we were done was worth it. Now I can finally relax."
    ],
    'date': 'June 10',
    'time': '6:22PM'
  },
  {
    'title': 'Castle Dream',
    'subtitle': 'Dreams',
    'notes': [
      "Last night, I had the most vivid dream. I was exploring a huge, ancient castle filled with hidden passageways and secret rooms.",
      "Each room had its own unique theme, from a library with endless books to a ballroom frozen in time. I felt a sense of adventure and curiosity, like I was on a quest.",
      "It was one of those dreams that felt incredibly real, and I woke up feeling inspired to add more creativity and exploration to my everyday life."
    ],
    'date': 'June 10',
    'time': '7:05AM'
  }
];

export const useJournal = () => useContext(JournalContext);

export const JournalProvider = ({ children }) => {
  const [journalEntries, setJournalEntries] = useState(data);

  const addJournalEntry = (newEntry) => {
    setJournalEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  return (
    <JournalContext.Provider value={{ journalEntries, addJournalEntry }}>
      {children}
    </JournalContext.Provider>
  );
};
