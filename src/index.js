let Email;

const Main = document.getElementById('Main');

if (!localStorage.getItem('Email') || !localStorage.getItem('Login') || !localStorage.getItem('Password')) {
    Main.classList = 'center';
    Main.innerHTML = '<div id="Losung" class="white"> <H1>Sonara</H1> <H3>Ваш личный космос</H3> </div> <input type="email" class="center" id="Email" placeholder="Почта"> <br><br> <button id="Go">Продолжить</button>';
}
else {
    location.href = './Main/Main.html';
}

fetch('https://sonara-main-server.onrender.com');
fetch('https://sigmail-gic3.onrender.com');

document.getElementById('Go').addEventListener('click', () => {
    Email = document.getElementById('Email').value;

    setTimeout(() => {
        fetch('https://sonara-main-server.onrender.com/desktop/Go', {
            method:'POST',
            headers: {
                'Content-Type':'text/plain'
            },
            body: Email
        })
            .then(response => {
                if (response.ok) {
                    Main.innerHTML = '<div class="white"> <H2>Введите код подтверждения</H2> <H4>Присланный Вам на почту</H3> </div> <input type="text" class="center" id="Code" placeholder="Код подтверждения"> <br><br> <button id="Confirm">Подтвердить</button>';

                    document.getElementById('Confirm').addEventListener('click', () => {
                        fetch('https://sonara-main-server.onrender.com/Confirm', {
                            method:'POST',
                            headers: {
                                'Content-Type':'application/json'
                            },
                            body: JSON.stringify({
                                Email: Email,
                                Code: document.getElementById('Code').value
                            })
                        })
                            .then(response => response.text())
                            .then(data => {
                                if (data === 'Found') {
                                    Main.innerHTML = '<div class="white"> <H2>Осталось только войти</H2> </div> <input type="text" class="center" id="Login" placeholder="Логин"> <br><br> <input type="password" class="center" id="Pass" placeholder="Пароль"> <br><br> <button id="SignIn">Войти</button>';
                                }
                                else if (data === 'New') {
                                    Main.innerHTML = '<div class="white"> <H2>Регистрация</H2> </div> <input type="text" class="center" id="Login" placeholder="Логин"> <br><br> <input type="password" class="center" id="Pass" placeholder="Пароль"> <br><br> <button id="SignUp">Зарегестрироваться</button>';
                                }
                                else {
                                    Main.innerHTML += '<H3 class="red">Ошибка. Неверный код</H3>';
                                }

                                try {
                                document.getElementById('SignIn').addEventListener('click', () => {
                                    const Login = document.getElementById('Login').value;
                                    const Password = document.getElementById('Pass').value;

                                    fetch('https://sonara-main-server.onrender.com/SignIn', {
                                        method:'POST',
                                        headers: {
                                            'Content-Type':'application/json'
                                        },
                                        body: JSON.stringify({
                                            Email: Email,
                                            Login: Login,
                                            Password: Password
                                        })
                                    })
                                        .then(response => {
                                            if (response.ok) {
                                                localStorage.setItem('Email', Email);
                                                localStorage.setItem('Login', Login);
                                                localStorage.setItem('Password', Password);
                                            }
                                            else {
                                                Main.innerHTML += '<H3 class="red">Ошибка входа</H3>';
                                            }
                                        });
                                });
                                }
                                catch {}
                                try {
                                document.getElementById('SignUp').addEventListener('click', () => {
                                    const Login = document.getElementById('Login').value;
                                    const Password = document.getElementById('Pass').value;

                                    fetch('https://sonara-main-server.onrender.com/SignUp', {
                                        method:'POST',
                                        headers: {
                                            'Content-Type':'application/json'
                                        },
                                        body: JSON.stringify({
                                            Email: Email,
                                            Login: Login,
                                            Password: Password
                                        })
                                    })
                                        .then(response => {
                                            if (response.ok) {
                                                localStorage.setItem('Email', Email);
                                                localStorage.setItem('Login', Login);
                                                localStorage.setItem('Password', Password);
                                            }
                                            else {
                                                Main.innerHTML += '<H3 class="red">Ошибка регистрации</H3>';
                                            }
                                        });
                                });
                                }
                                catch {}
                            });
                    });
                }
                else {
                    Main.innerHTML += '<H3 class="red">Неккоректная почта</H3>';
                }
            });
    }, 5000);
});