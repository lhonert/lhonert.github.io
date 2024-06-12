import Calendar from "react-calendar"
import Entry from "../components/entry"
import { useTheme } from "../context/themeContext";
import { useJournal } from "../context/journalContext";
import Moment from "react-moment";
import moment from "moment";

const CalendarPage = () => {

    const { outline } = useTheme(),
        { journalEntries, addJournalEntry } = useJournal();

    const group = journalEntries.reduce((group, entry) => {
        const date = moment(entry.date).format('MMM DD');
        if (!group[date]) {
            group[date] = [];
        }
        group[date].push(entry);
        return group;
    }, {});

    const newEntry = {
        'title': 'Test',
        'subtitle': 'Omoide Trigger 5th Anniversary',
        'notes': [
            "Last night, I had the most vivid dream. I was exploring a huge, ancient castle filled with hidden passageways and secret rooms."
        ],
        'date': '2024-12-25T11:00:00.000Z'
    }

    return (
        <>
            <Calendar />

            <p onClick={() => addJournalEntry(newEntry)}>new entry</p>

            {Object.entries(group).map(item => {

                console.log(moment(item[0]).format('MMM DD'))
                console.log(moment(item[0]).format('hh:mm A'))

                // const date = moment(item[0]).format('MMM DD')

                return (
                    <>
                        <h2>{item[0]}</h2>
                        <div className={`item-card ${outline ? 'outline' : 'no-outline'}`}>
                            {item[1].map(entry => {
                                return <Entry data={entry} />
                            })}
                        </div>
                    </>
                )
            })}

        </>
    )

}

export default CalendarPage