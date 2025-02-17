document.querySelector('.parent').addEventListener('mouseover', function (event) {
    if (event.target.tagName.toLowerCase() === 'lord-icon') {
        event.target.setAttribute('trigger', 'hover');
    }
});