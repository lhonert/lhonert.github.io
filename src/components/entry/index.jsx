import moment from "moment";
import { useTheme } from "../../context/themeContext";
import { useEffect } from "react";
import { Edit } from "../icons";
import { Link } from "react-router-dom";

const Entry = (data) => {

    const entry = data.data;
    const { outline } = useTheme()

    function createElement(type, text = '', attributes = {}) {
        const element = document.createElement(type);
        if (text) {
            element.textContent = text;
        }
        for (let attr in attributes) {
            element.setAttribute(attr, attributes[attr]);
        }
        return element;
    }

    function renderBlocks() {
        const blocksContainer = document.getElementById(`${entry.id}-${createdAt.format('MMM-DD')}`);
        blocksContainer.innerHTML = '';

        const blockDiv = document.createElement('div');
        let innerHtmlContent = '';

        // NOTE: DO NOT USE IN PRODUCTION. Or sanitize/purify html or find another method to render rich text formatting
        // However, Editor.js has already probably done it anyway
        entry.blocks.forEach(block => {
            switch (block.type) {
                case 'header':
                    innerHtmlContent += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
                    break;
                case 'paragraph':
                    innerHtmlContent += `<p>${block.data.text}</p>`;
                    break;
                case 'image':
                    innerHtmlContent += `<img src="${block.data.url}" alt="${block.data.caption}" class="entry-image">`;
                    break;
                default:
                    innerHtmlContent += `<div>Unsupported block type: ${block.type}</div>`;
            }
        });

        // Add the timestamp
        innerHtmlContent += `<div class="timestamp">${createdAt.format('hh:mm A')}</div>`;

        // Set the innerHTML
        blockDiv.innerHTML = innerHtmlContent;

        // Append to the container
        blocksContainer.appendChild(blockDiv);

    }

    const createdAt = moment(entry.createdAt)

    useEffect(() => {
        renderBlocks();
    }, [])

    return (
        <div className={`item-card entry ${outline ? 'outline' : 'no-outline'}`}>
            <div className="edit-entry">
                <Link to={`/edit/${entry.id}`}><Edit /></Link>
            </div>
            <div id={`${entry.id}-${createdAt.format('MMM-DD')}`} className='content'></div>
        </div>
    )

}

export default Entry