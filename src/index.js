
document.getElementById('Go').addEventListener('click', () => {
    fetch('http://127.0.0.1:1000/desktop/Go', {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({})
    });
});