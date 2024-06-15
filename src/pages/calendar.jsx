import moment from "moment";
import Calendar from "react-calendar";
import Entry from "../components/entry";
import { useJournal } from "../context/journalContext";

const CalendarPage = () => {

    const { journalEntries } = useJournal();

    const group = journalEntries.reduce((group, entry) => {

        const date = moment(entry.createdAt).format('MMM DD');

        if (!group[date]) {
            group[date] = [];
        }
        group[date].push(entry);

        return group;
    }, {});

    return (
        <>
            {/* <Calendar /> */}

            {Object.entries(group).map(item => {

                const date = item[0],
                    entries = item[1]

                return (
                    <>
                        <h2 className="date">{date}</h2>
                        {entries.map(entry => {
                            return <Entry data={entry} />
                        })}

                    </>
                )
            })}

        </>
    )

}

export default CalendarPage