let Email;

const Main = document.getElementById('Main');

document.getElementById('Go').addEventListener('click', () => {
    Email = document.getElementById('Email').value;

    fetch('http://127.0.0.1:1000/desktop/Go', {
        method:'POST',
        headers: {
            'Content-Type':'text/plain'
        },
        body: Email
    })
        .then(response => {
            if (response.ok) {
                Main.innerHTML = '<div class="white"> <H2>Введите код подтверждения</H1> <H4>Присланный Вам на почту</H3> </div> <input type="text" class="center" id="Code" placeholder="Код подтверждения"> <br><br> <button id="Confirm">Подтвердить</button>';

                document.getElementById('Confirm').addEventListener('click', () => {
                    fetch('http://127.0.0.1:1000/Confirm', {
                        method:'POST',
                        headers: {
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            Email: Email,
                            Code: document.getElementById('Code').value
                        })
                    })
                        .then(response => {});
                });
            }
            else {
                Main.innerHTML += '<H3 class="red">Неккоректная почта</H3>';
            }
        });
});