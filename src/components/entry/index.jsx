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

        const blockDiv = createElement('div');

        entry.blocks.forEach(block => {

            switch (block.type) {
                case 'header':
                    blockDiv.appendChild(createElement(`h${block.data.level}`, block.data.text));
                    break;
                case 'paragraph':
                    blockDiv.appendChild(createElement('p', block.data.text));
                    break;
                case 'image':
                    const img = createElement('img', '', { src: block.data.url, alt: block.data.caption, class: 'entry-image' });
                    blockDiv.appendChild(img);
                    break;
                default:
                    blockDiv.appendChild(createElement('div', `Unsupported block type: ${block.type}`));
            }

            blocksContainer.appendChild(blockDiv);
        });

        blockDiv.appendChild(createElement('div', createdAt.format('HH:mm A'), {class: 'timestamp'}))

    }

    const createdAt = moment.unix(entry.createdAt).utc()

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