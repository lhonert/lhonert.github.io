import moment from "moment"
import { useTheme } from "../context/themeContext"
import { useJournal } from "../context/journalContext";
import { useNavigate } from "react-router";



const NewEntry = () => {

    const { outline } = useTheme(),
    { addJournalEntry} = useJournal(),
    navigate = useNavigate();

    const addNewEntry = (e) => {
        e.preventDefault()

        const data = {
            title: e.target.title.value,
            subtitle: e.target.title.value,
            notes: e.target.notes.value.split('\n').filter(el => el),
            date: moment().toISOString()
        }

        addJournalEntry(data);
        navigate('/');
    }

    return (
        <>
            <h1>How's your day?</h1>
            <h2>{moment().format('MMM DD')}</h2>
            <form onSubmit={(e) => addNewEntry(e)}>
                <div class='form-input'>
                    <input class={`${outline ? 'outline' : 'no-outline'}`} type='text' name='title' placeholder="Title"></input>
                </div>
                <div class='form-input'>
                    <input class={`${outline ? 'outline' : 'no-outline'}`} type='text' name='subtitle' placeholder="Topic"></input>
                </div>
                <div class='form-input'>
                    <textarea class={`${outline ? 'outline' : 'no-outline'}`} name='notes' placeholder="Write your entry here."></textarea>
                </div>
                <button type='submit' class={`${outline ? 'outline' : 'no-outline'}`}>Submit</button>
            </form>
        </>
    )

}

export default NewEntry