import React, { createContext, useContext, useState } from 'react';

const JournalContext = createContext();

const data = [
  [
    {
      "id": "1e9d2e2d-4b5a-4a0a-9570-0c15d07f08ea",
      "time": 1723238000,
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
      "version": "2.19.0",
      "createdAt": 1723238000,
      "updatedAt": 1723238000
    },
    {
      "id": "4e5f3d2d-7b8a-4c1a-8580-2e35d09f0b1f",
      "time": 1728268800,
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
            "file": {
              "url": "https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=0&k=20&c=lNvbIw1wReb-owe7_rMgW8lZz1zElqs5BOY1AZhyRXs="
            },
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
            "file": {
              "url": "https://t4.ftcdn.net/jpg/01/75/78/75/360_F_175787501_Xm9Bjt2byTYJKPaNMHXiDgfjbTkKUAxs.jpg"
            },
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
      "version": "2.19.0",
      "createdAt": 1728268800,
      "updatedAt": 1728268800
    },
    {
      "id": "2c3e9e2d-3a4c-4b0b-9470-0d15e07f09eb",
      "time": 1720128000,
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
      "version": "2.19.0",
      "createdAt": 1720128000,
      "updatedAt": 1720128000
    },
    {
      "id": "3d2f2e3d-5b6a-4c0c-8580-1e26f08f0a9d",
      "time": 1720128000,
      "blocks": [
        {
          "type": "header",
          "data": {
            "text": "Third Entry",
            "level": 3
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "This is the content of the third entry."
          }
        },
        {
          "type": "image",
          "data": {
            "file": {
              "url": '/'
              // "url": "https://scontent.fmnl17-4.fna.fbcdn.net/v/t39.30808-6/448107032_7690351327713139_5416629552265986340_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=IiRLwo7YQX0Q7kNvgHukO3y&_nc_ht=scontent.fmnl17-4.fna&oh=00_AYC5Vn8ZQQaa7uZdJr8qr0cpG7_WUn7TM6TWie51xxRP2Q&oe=6671998A"
            },
            "caption": "",
            "withBorder": false,
            "stretched": true,
            "withBackground": false
          }
        }
      ],
      "version": "2.19.0",
      "createdAt": 1720128000,
      "updatedAt": 1720128000
    }
  ]

];

const sorted = data.sort(function (a, b) {
  return -a.date.localeCompare(b.date)
})

export const useJournal = () => useContext(JournalContext);

export const JournalProvider = ({ children }) => {
  const [journalEntries, setJournalEntries] = useState(sorted);

  const addJournalEntry = (newEntry) => {
    setJournalEntries((prevEntries) => {

      const newData = [...prevEntries, newEntry];

      return newData.sort(function (a, b) {
        return -a.date.localeCompare(b.date)
      })

    });
  };

  return (
    <JournalContext.Provider value={{ journalEntries, addJournalEntry }}>
      {children}
    </JournalContext.Provider>
  );
};
