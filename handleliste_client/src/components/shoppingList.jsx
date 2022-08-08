import React, {useEffect, useState} from "react";
import GroceryDetails from "./GroceryDetails";
import AddGroceryItem from "./addGroceryItem";

function ShoppingList({name, email, listId}) {
    const [activeListID, setActiveListID] = useState(null);
    const [shoppingList, setShoppingList] = useState([]);
    const [listComponent, setListComponent] = useState(null);

    useEffect(() => {
        fetchShoppingList();

        if(shoppingList.length > 0) {
            setListComponent(renderList());
        } else {
            setListComponent(renderEmptyList());
        }
    }, [])
    
    function addToList(item) {
        shoppingList.push(item);
        setShoppingList(shoppingList);
        setListComponent(renderList());
    }
 
    function fetchShoppingList() {
        console.log('fetching list...');
        fetch('/api/getlist')
            .then(res => res.json)
            .then(data => {
                console.log(data.id);
            })
            .catch(err => console.error(err));
    }

    function renderList(){
        return (
            <ul>
                {shoppingList.map(item => <GroceryDetails item={item}/>)}
            </ul>
        )
    }

    function renderEmptyList() {
        return (<p> Denne listen er tom!</p>)
    }

    return (
        <div className="handleliste">
            <h1>Handleliste</h1>
            <AddGroceryItem addToListCallback={addToList} />
            {listComponent}
        </div>
    );
}

export default ShoppingList;