import { useEffect } from "react";
import { useTheme } from "../context/themeContext";

const Settings = () => {

    const { theme, outline, setTheme, setOutline } = useTheme()

    const root = document.querySelector(':root'),
        themes = [
            'beby',
            'boyey',
            'manang',
            'manong'
        ],
        properties = [
            'primary',
            'secondary',
            'tertiary',
            'background',
            'text'
        ]

    let current_theme = theme;

    const changeTheme = (e) => {

        e.stopPropagation();

        const option = e.currentTarget.querySelector('input[name="theme"]'),
            theme = option.value;

        properties.forEach(property => {
            root.style.setProperty(`--${property}`, `var(--${theme}1-${property})`)
        })

        setTheme(theme);
        option.checked = true;
    }

    useEffect(() => {
        const themeOptions = document.querySelectorAll('.theme');

        themeOptions.forEach(option => {
            option.addEventListener('click', changeTheme);
        });

        return () => {
            themeOptions.forEach(option => {
                option.removeEventListener('click', changeTheme);
            }); //cleanup
        }
    });

    return (
        <>

            <h1>Settings</h1>
            <p>Select a theme</p>

            {themes.map(theme => {
                return (
                    <div className={`item-card flex ${outline ? 'outline' : 'no-outline'} theme`}>
                        <input type='radio' name='theme' value={theme}
                            defaultChecked={current_theme === theme}
                        /> <span style={{ textTransform: 'Capitalize' }}>{theme}</span>
                    </div>
                )
            })}

            <p>Borders</p>

            <div className={`item-card flex ${outline ? 'outline' : 'no-outline'}`} onClick={() => setOutline(!outline)}>
                <input type='checkbox' name='outline' checked={outline} />
                Outline
            </div>
        </>
    )
}

export default Settings