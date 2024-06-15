import Moveable from "moveable";
import React, { useEffect, useRef, useState } from 'react';
import Selecto from 'selecto';
import Ed from '../../assets/img/shuckle.png';
import LTPH1 from '../../assets/img/01.png';
import LTPH2 from '../../assets/img/10.png';
import LTPH3 from '../../assets/img/11.png';
import LTPH4 from '../../assets/img/15.png';

const Sticker = () => {
    const containerRef = useRef(null);
    const moveableRef = useRef(null);
    const selectoRef = useRef(null);
    const targetsRef = useRef([]);
    const stickerArray = [Ed, LTPH1, LTPH2, LTPH3, LTPH4]
    const [stickerCount, setStickerCount] = useState(0);

    const Editable = {
        name: "editable",
        props: [],
        events: [],
        render(moveable, React) {
            const rect = moveable.getRect();
            const { pos2 } = moveable.state;

            const EditableViewer = moveable.useCSS("div", `
                position: absolute;
                left: 0px;
                top: 0px;
                will-change: transform;
                transform-origin: 0px 0px;
            `);

            return React.createElement(EditableViewer, {
                key: "editable-viewer",
                className: "moveable-editable",
                style: {
                    transform: `translate(${pos2[0]}px, ${pos2[1]}px) rotate(${rect.rotation}deg) translate(10px)`
                }
            }, [
                React.createElement("button", {
                    className: "custom-button",
                    onClick: (e) => {
                        e.stopPropagation()
                        deleteSticker()
                    }
                }, ['x'])
            ]);
        }
    };

    const deleteSticker = () => {

        if (moveableRef.current) {

            const target = targetsRef.current;

            const element = document.querySelector(`.${target[0].classList[1]}`)

            console.log(element)

            if (element) {
                element.remove()
                moveableRef.current.target = null;
                moveableRef.current.updateRect();
            }

        }
    };


    useEffect(() => {
        const selecto = new Selecto({
            container: containerRef.current,
            selectableTargets: ['.target'],
            selectByClick: true
        });

        const moveable = new Moveable(document.body, {
            target: targetsRef.current,
            keepRatio: true,
            individualGroupable: true,
            draggable: true,
            resizable: true,
            rotatable: true,
            pinchable: true,
            selectFromInside: true,
            continueSelect: true,
            hideDefaultLines: false,
            ables: [Editable],
            props: { editable: true }
        });

        selectoRef.current = selecto;
        moveableRef.current = moveable;

        selecto.on('select', ({ selected }) => {
            targetsRef.current = selected;
            moveable.target = selected;
            moveable.updateRect();
        });

        selecto.on('selectEnd', e => {
            console.log(e.inputEvent.target)
        })

        selecto.on('dragStart', (e) => {
            const target = e.inputEvent.target;
            if (moveable.isMoveableElement(target) || targetsRef.current.some(t => t === target || t.contains(target))) {
                e.stop();
            }
        });

        moveable.on('drag', ({ target, transform }) => {
            target.style.transform = transform;
        });

        moveable.on('resize', ({ target, width, height, drag }) => {
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.transform = drag.transform;
        });

        moveable.on('rotate', ({ target, drag }) => {
            target.style.transform = drag.transform;
        });

        return () => {
            selecto.destroy();
            moveable.destroy();
        };
    }, []);

    const addSticker = () => {
        const newStickerCount = stickerCount + 1;
        setStickerCount(newStickerCount);

        const img = document.createElement('img');
        img.src = stickerArray[Math.floor(Math.random() * stickerArray.length)];
        img.className = `target sticker-${newStickerCount}`;
        img.style.width = '100px';
        img.style.position = 'absolute';
        img.style.top = `300px`;

        containerRef.current.appendChild(img);
    };

    return (
        <div>
            <button onClick={addSticker}>Add random Sticker</button>
            <div ref={containerRef} className="sticker-container selecto-area"></div>
        </div>
    );
};

export default Sticker;
