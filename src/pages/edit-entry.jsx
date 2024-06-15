import moment from "moment";
import { useNavigate, useParams } from "react-router";
import { useJournal } from "../context/journalContext";

import EditorJS from '@editorjs/editorjs';
import { useEffect } from "react";

import Header from '@editorjs/header';
import SimpleImage from "@editorjs/simple-image";
import toast from "react-hot-toast";
import Sticker from "../components/sticker";

const EditEntry = () => {

    const { id } = useParams(),
        { journalEntries, editJournalEntry, deleteJournalEntry } = useJournal(),
        navigate = useNavigate();

    const entryData = journalEntries.find(entry => entry.id == id)

    useEffect(() => {

        const editor = new EditorJS({
            holder: 'EditMode',
            data: { blocks: entryData.blocks },
            tools: {
                header: { class: Header },
                image: { class: SimpleImage }
            }
        });

        function UpdateEntry() {
            editor.save().then((output) => {

                const { blocks, time } = output

                let data = {
                    id,
                    blocks,
                    time: moment(time).toISOString(),
                    createdAt: entryData.createdAt //ensures the createdAt is the same number
                };

                editJournalEntry(data);
                toast.success('Edited succesfully!')
                navigate('/');

            }).catch((error) => {
                console.log('Saving failed: ', error)
            });
        }

        function DeleteEntry(id) {

            if (window.confirm('Are you sure you want to delete this entry?')) {
                deleteJournalEntry(id);
                toast.success('Deleted succesfully!')
                navigate('/');
            }

        }

        document.querySelector('#submit').addEventListener('click', UpdateEntry)
        document.querySelector('#delete').addEventListener('click', () => DeleteEntry(entryData.id))

        // Clean up function
        return () => {
            if (editor.current) {
                editor.current.destroy();
            }
        };

    }, [])

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <p style={{ margin: 0 }}>Editing</p>
                    <h2 style={{ margin: 0 }}>{moment(entryData.createdAt).format('MMMM DD, YYYY')}</h2>
                </div>
                <p id='delete' style={{ textDecoration: 'underline' }}>Delete</p>
                <button id='submit' style={{ flex: '0 1 30%' }}>Save</button>
            </div>
            <Sticker />
            <div id='EditMode'></div>
        </>
    )

}

export default EditEntry

