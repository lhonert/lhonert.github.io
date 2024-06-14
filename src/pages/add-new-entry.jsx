import moment from "moment";
import { useNavigate } from "react-router";
import { useJournal } from "../context/journalContext";

import EditorJS from '@editorjs/editorjs';
import { useEffect } from "react";

import Header from '@editorjs/header';
import SimpleImage from "@editorjs/simple-image";

const NewEntry = () => {

    const { addJournalEntry } = useJournal(),
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

        function SaveEntry() {
            editor.save().then((output) => {

                console.log(output)

            }).catch((error) => {
                console.log('Saving failed: ', error)
            });
        }

        document.querySelector('#submit').addEventListener('click', SaveEntry)

    }, [])

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1>{moment().format('MMM DD')}</h1>
                <button id='submit' style={{ flex: '0 1 30%' }}>Save</button>
            </div>
            <hr />
            <div id='Editor'></div>
        </>
    )

}

export default NewEntry

