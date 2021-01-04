
const showMenu = (menu) => {
    const result = document.getElementById(menu).style.display;
    if(result === 'block') {
        document.getElementById(menu).style.display = 'none'
    } else {
        document.getElementById(menu).style.display = 'block'
    }
}