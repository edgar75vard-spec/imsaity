document.addEventListener('DOMContentLoaded', () => {
    const changeBgBtn = document.getElementById('changeBgBtn');
    const loginBtn = document.getElementById('loginBtn');
    const backBtn = document.getElementById('backBtn');
    const registerSection = document.getElementById('registerSection');
    const loginSection = document.getElementById('loginSection');
    const regForm = document.getElementById('regForm');
    const loginForm = document.getElementById('loginForm');
    const regMessage = document.getElementById('regMessage');
    const loginMessage = document.getElementById('loginMessage');

    let isPurple = true;
    changeBgBtn.addEventListener('click', () => {
        document.body.style.backgroundColor = isPurple ? '#000' : '#8e44ad';
        isPurple = !isPurple;
    });

    loginBtn.addEventListener('click', () => {
        registerSection.classList.remove('active');
        loginSection.classList.add('active');
    });

    backBtn.addEventListener('click', () => {
        loginSection.classList.remove('active');
        registerSection.classList.add('active');
    });

    function getUsers() { return JSON.parse(localStorage.getItem('users') || '[]'); }
    function saveUsers(users) { localStorage.setItem('users', JSON.stringify(users)); }

    function showLoginForm(){ registerSection.classList.remove('active'); loginSection.classList.add('active'); }

    // Регистрация
    regForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = regForm.username.value.trim();
        const email = regForm.email.value.trim();
        const pass = regForm.password.value.trim();
        if(!/^[A-Za-z0-9!@#$%^&*()_+=-]{6,}$/.test(pass)){
            regMessage.style.color = '#e74c3c';
            regMessage.textContent = 'Пароль должен быть только на английском!';
            return;
        }
        let users = getUsers();
        const exists = users.some(u => u.email === email || u.name === name);
        if(exists){
            regMessage.style.color = '#e67e22';
            regMessage.textContent = 'Вы уже зарегистрированы! Войдите.';
            showLoginForm();
            return;
        }
        users.push({name,email,password:pass});
        saveUsers(users);
        regMessage.style.color = '#2ecc71';
        regMessage.textContent = 'Успешная регистрация! Перенаправление...';
        setTimeout(()=>{ window.location.href='https://www.twitch.tv/bezskils'; },2000);
    });

    // Логин
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = loginForm.loginEmail.value.trim();
        const pass = loginForm.loginPassword.value.trim();
        const users = getUsers();
        const user = users.find(u=>u.email===email && u.password===pass);
        if(!user){
            loginMessage.style.color='#e74c3c';
            loginMessage.textContent='Неверный email или пароль!';
            return;
        }
        loginMessage.style.color='#2ecc71';
        loginMessage.textContent='Успешный вход! Перенаправление...';
        setTimeout(()=>{ window.location.href='https://www.twitch.tv/bezskils'; },2000);
    });

    // Забыл пароль
    const forgotLink = document.getElementById('forgotLink');
    const forgotModal = document.getElementById('forgotModal');
    const closeModal = document.querySelector('.close');
    const recoverBtn = document.getElementById('recoverBtn');
    const forgotEmail = document.getElementById('forgotEmail');
    const recoverMessage = document.getElementById('recoverMessage');

    forgotLink.addEventListener('click', e=>{ e.preventDefault(); forgotModal.style.display='block'; });
    closeModal.addEventListener('click', ()=>{ forgotModal.style.display='none'; recoverMessage.textContent=''; forgotEmail.value=''; });

    recoverBtn.addEventListener('click', ()=>{
        const email = forgotEmail.value.trim();
        const users = getUsers();
        const user = users.find(u=>u.email===email);
        if(!user){ recoverMessage.style.color='#e74c3c'; recoverMessage.textContent='Пользователь не найден!'; return; }
        recoverMessage.style.color='#2ecc71';
        recoverMessage.textContent=`Ваш пароль: ${user.password}`;
    });
});
