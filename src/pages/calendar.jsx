import Calendar from "react-calendar"
import Entry from "../components/entry"
import { useTheme } from "../context/themeContext";
import { useJournal } from "../context/journalContext";

const CalendarPage = () => {

    const { outline } = useTheme(),
        { journalEntries } = useJournal();

    const group = journalEntries.reduce((group, entry) => {
        const { date } = entry;
        if (!group[date]) {
            group[date] = [];
        }
        group[date].push(entry);
        return group;
    }, {});

    return (
        <>
            <Calendar />



            {Object.entries(group).map(item => {

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