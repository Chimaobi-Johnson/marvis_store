const showMenuDropdown = (menu) => {
    const result = document.getElementById(menu).style.transform;
    if(result === 'scaleY(0)') {
        document.getElementById(menu).style.transform = 'scaleY(1)'
    } else {
        document.getElementById(menu).style.transform = 'scaleY(0)'
    }
}