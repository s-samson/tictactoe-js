let vakje=document.querySelector('#table');
vakje.addEventListener('click',handleClickTable);

function handleClicktable(event) {
    let vakje=event.target;

    vakje.innerHTML="X";

}