import React from "react";

/**
 * 
 * @param {function} addToListCallback => a function that will be called when the user presses
 * the add item button with one argument that will be added to the list. The argument will be a string
 * @returns a from that can handle input of some text, and a submit button.
 */
function AddGroceryItem(props){

    const [input, setInput] = React.useState("");

    function handleChange(event){
        setInput(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(`handling submit ${typeof(props.addToListCallback)}`)
        if(typeof(props.addToListCallback) !== 'undefined') {
            console.log("submitting");
            props.addToListCallback(input);
        }
        setInput("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={input} onChange={handleChange} placeholder="hva trenger du?"></input>
            <input type="submit" value="+"/>
        </form>
    )
}

export default AddGroceryItem;