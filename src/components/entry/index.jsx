import { useTheme } from "../../context/themeContext";

const Entry = (data) => {

    const { title, subtitle, notes, time } = data.data;
    const { outline } = useTheme()

    return (
        <div className='entry'>

            <div className='side'>
                <div className={`icon ${outline ? 'outline' : 'no-outline'}`}></div>
                <div className='line' style={outline ? { background: 'var(--text)' } : {}}></div>
            </div>

            <div className='content'>
                <sub>{title ? subtitle : ''}</sub>
                <h2>{title ? title : subtitle }</h2>
                {notes.map(note => {
                    return <p>{note}</p>
                })}
                <p className='timestamp'>{time}</p>
            </div>

        </div>
    )

}

export default Entry