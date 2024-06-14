import moment from "moment";
import { useNavigate } from "react-router";
import { useJournal } from "../context/journalContext";

import EditorJS from '@editorjs/editorjs';
import { useEffect } from "react";

import Header from '@editorjs/header';
import SimpleImage from "@editorjs/simple-image";
import toast from "react-hot-toast";

const NewEntry = () => {

    const { addJournalEntry } = useJournal(),
        navigate = useNavigate();

    useEffect(() => {
        const editor = new EditorJS({
            holder: 'Editor',
            placeholder: 'How was your day?',
            tools: {
                header: { class: Header },
                image: { class: SimpleImage }
            }
        });

        function SaveEntry() {
            editor.save().then((output) => {

                let data = {
                    id: Math.random(),
                    blocks: output.blocks,
                    time: moment(output.time).toISOString(),
                    createdAt: moment(output.time).toISOString()
                };

                addJournalEntry(data);
                toast.success('Created a journal entry!')
                navigate('/');

            }).catch((error) => {
                console.log('Saving failed: ', error)
            });
        }

        document.querySelector('#submit').addEventListener('click', SaveEntry)

    }, [])

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <p style={{ margin: 0 }}>Today</p>
                    <h2 style={{ margin: 0 }}>{moment().format('MMMM DD, YYYY')}</h2>
                </div>
                <button id='submit' style={{ flex: '0 1 30%' }}>Save</button>
            </div>

            <div id='Editor'></div>
        </>
    )

}

export default NewEntry

