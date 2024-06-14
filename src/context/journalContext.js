import moment from 'moment';
import React, { createContext, useContext, useState } from 'react';

const JournalContext = createContext();

const data = [
  {
    "id": "1e9d2e2d-4b5a-4a0a-9570-0c15d07f08ea",
    "time": '2024-06-11T17:31:00.000Z',
    "blocks": [
      {
        "type": "header",
        "data": {
          "text": "First Entry",
          "level": 1
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "This is the content of the first entry."
        }
      }
    ],
    "createdAt": '2024-06-11T17:31:00.000Z'
  },
  {
    "id": "4e5f3d2d-7b8a-4c1a-8580-2e35d09f0b1f",
    "time": '2024-06-11T18:00:00.000Z',
    "blocks": [
      {
        "type": "header",
        "data": {
          "text": "Rainy Day",
          "level": 1
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "July 25 was a rainy day. The skies were overcast, and gentle raindrops pattered against the windowpanes."
        }
      },
      {
        "type": "image",
        "data": {
          "url": "https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=0&k=20&c=lNvbIw1wReb-owe7_rMgW8lZz1zElqs5BOY1AZhyRXs=",
          "caption": "Raindrops on the window",
          "withBorder": false,
          "stretched": false,
          "withBackground": false
        }
      },
      {
        "type": "header",
        "data": {
          "text": "Morning Thoughts",
          "level": 2
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "In the morning, the rain brought a sense of calmness and coziness. It was the perfect weather for staying indoors with a cup of hot tea."
        }
      },
      {
        "type": "header",
        "data": {
          "text": "Afternoon Adventure",
          "level": 2
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Later in the afternoon, I ventured out with an umbrella. The streets were glistening with rainwater, and the air was filled with the refreshing scent of petrichor."
        }
      },
      {
        "type": "image",
        "data": {
          "url": "https://t4.ftcdn.net/jpg/01/75/78/75/360_F_175787501_Xm9Bjt2byTYJKPaNMHXiDgfjbTkKUAxs.jpg",
          "caption": "Rainy day streets",
          "withBorder": false,
          "stretched": false,
          "withBackground": false
        }
      },
      {
        "type": "header",
        "data": {
          "text": "Evening Reflections",
          "level": 2
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "As evening approached, the rain gradually subsided, leaving behind a peaceful atmosphere. Watching the raindrops on the window as dusk settled in was a serene end to the day."
        }
      }
    ],
    "createdAt": '2024-06-11T18:00:00.000Z'
  },
  {
    "id": "2c3e9e2d-3a4c-4b0b-9470-0d15e07f09eb",
    "time": '2024-06-11T00:45:00.000Z',
    "blocks": [
      {
        "type": "header",
        "data": {
          "text": "Second Entry",
          "level": 2
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "This is the content of the second entry."
        }
      }
    ],
    "createdAt": '2024-06-11T00:45:00.000Z'
  }
];

const sorted = data.sort(function (a, b) {
  return -a.time.localeCompare(b.time)
})

export const useJournal = () => useContext(JournalContext);

export const JournalProvider = ({ children }) => {
  const [journalEntries, setJournalEntries] = useState(sorted);

  const addJournalEntry = (newEntry) => {
    setJournalEntries((prevEntries) => {

      const newData = [...prevEntries, newEntry];

      return newData.sort(function (a, b) {
        return -a.time.localeCompare(b.time)
      })

    });
  };

  return (
    <JournalContext.Provider value={{ journalEntries, addJournalEntry }}>
      {children}
    </JournalContext.Provider>
  );
};
