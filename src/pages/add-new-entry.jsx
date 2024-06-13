import moment from "moment"
import { useTheme } from "../context/themeContext"
import { useJournal } from "../context/journalContext";
import { useNavigate } from "react-router";

import EditorJS from '@editorjs/editorjs';
import { useEffect } from "react";

import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import SimpleImage from "@editorjs/simple-image";

const NewEntry = () => {

    const { outline } = useTheme(),
        { addJournalEntry } = useJournal(),
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

    useEffect(() => {
        const editor = new EditorJS({
            holder: 'Editor',
            tools: {
                header: { class: Header },
                image: { class: SimpleImage }
            }
        });
    })

    return (
        <>
            <h1>How's your day?</h1>
            <h2>{moment().format('MMM DD')}</h2>
            <hr />
            <div id='Editor'></div>
        </>
    )

}

export default NewEntry

