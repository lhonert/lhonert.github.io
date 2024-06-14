import moment from "moment";
import { useTheme } from "../../context/themeContext";
import { useEffect } from "react";

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
        <div className='entry'>

            <div className='side'>
                <div className={`icon ${outline ? 'outline' : 'no-outline'}`}></div>
                <div className='line' style={outline ? { background: 'var(--text)' } : {}}></div>
            </div>

            <div id={`${entry.id}-${createdAt.format('MMM-DD')}`} className='content'></div>

        </div>
    )

}

export default Entry