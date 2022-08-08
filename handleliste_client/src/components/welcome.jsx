import {useState, useEffect} from 'react';
import ShoppingList from './shoppingList';
import {useUserContext} from '../hooks/useUserContext'

function Welcome(){
    const {dispatch} = useUserContext();
    const [user, setUser] = useState(null);
    const [component, setComponent] = useState(null);

    useEffect(() => {
        if(user === null){
            fetch('/api/getuser')
                .then(res =>  res.json())
                .then(data => {
                    const feedback = data.message !== 'undefined' ? data.message.toLowerCase(): null;
                    const notauthorized = "not authorized";
                
                    if(feedback && feedback !== notauthorized) {
                        //console.log(data.user);
                        setUser(data.user);
                    } else {
                        setComponent(pleaseLogIn())
                    }
                })
                .catch(err => console.error(err))
                .finally(() => {
                    if(!user){
                        setComponent(pleaseLogIn())
                    }
                })
            } else {
                setComponent(welcomeUser())
                //dispatch({type: 'AUTHORIZED', payload: user})
            }
    }, [user]);

    function welcomeUser(){
        console.log(`welcomeuser ${user}`);

        return (
            <div className='loggedIn'>
                <ShoppingList />
                <a href="http://localhost:3000/logout">log out</a>
            </div>
        )
    }

    function pleaseLogIn(){
        return (
            <div className="welcome">
                <h1>HandlelisteAPPen</h1>
                <p>
                    Du kan bruke denne siden til å lage og dele handleliste med noen du kjenner.
                </p>
                <a href="http://localhost:3000/auth/google">log in</a>
            </div>
        )
    }
    return component;
}

export default Welcome;