import moment from "moment";
import Calendar from "react-calendar";
import Entry from "../components/entry";
import { useJournal } from "../context/journalContext";
import { useTheme } from "../context/themeContext";

const CalendarPage = () => {

    const { outline } = useTheme(),
        { journalEntries } = useJournal();

    const group = journalEntries.reduce((group, entry) => {

        entry.map(e => {
            const date = moment.unix(e.time).utc().format('MMM DD');
    
            if (!group[date]) {
                group[date] = [];
            }
            group[date].push(e);
        })

        return group;
    }, {});

    console.log(Object.entries(group))
    return (
        <>
            <Calendar />


            {Object.entries(group).map(item => {

                const date = item[0],
                    entries = item[1]


                return (
                    <>
                        <h2>{date}</h2>
                        <div className={`item-card ${outline ? 'outline' : 'no-outline'}`}>
                            {entries.map(entry => {
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