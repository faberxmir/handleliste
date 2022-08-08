import {useUserContext} from '../hooks/useUserContext'
const Navbar = () => {
    const {user, setUser} = useUserContext()

    if(user){   
        return (
            <div className="navbar">
                
                <h1>{user}'s Handleliste</h1>
                <ul>
                    <li>Åpne lister</li>
                    <li>Fullførte lister</li>
                </ul>
                
            </div>
        )
    } else {
        return (
            <div className="navbar">
                <h1>Logg inn for å se dine handlelister</h1>
            </div>
        )
    }
}

export default Navbar