import { Link, useLocation } from "react-router-dom"
import { Calendar, Report, Market, Settings, Plus } from "../icons"
import { useTheme } from "../../context/themeContext"

const Footer = () => {

    const { outline } = useTheme(),
        current = useLocation();

    return (
        <div className={`footer ${outline ? 'outline' : 'no-outline'}`}>
            <div className={`nav ${current.pathname === '/' ? 'active' : ''}`}>
                <Link to={'/'}>
                    <Calendar />
                </Link>
            </div>

            <div className={`nav ${current.pathname === '/summary' ? 'active' : ''}`}>
                <Link to={'/summary'}>
                    <Report />
                </Link></div>
            <div className={`nav addNew ${outline ? 'outline' : 'no-outline'}`}>
                <Link to={'/new'}>
                    <Plus />
                </Link>
            </div>
            <div className={`nav ${current.pathname === '/marketplace' ? 'active' : ''}`}>
                <Link to={'/marketplace'}>
                    <Market />
                </Link>
            </div>
            <div className={`nav ${current.pathname === '/settings' ? 'active' : ''}`}>
                <Link to={'/settings'}>
                    <Settings />
                </Link>
            </div>
        </div >
    )

}

export default Footer