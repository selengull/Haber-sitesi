document.addEventListener("DOMContentLoaded", function () {
    const loginContainer = document.createElement("div");
    loginContainer.id = "loginContainer";
    loginContainer.innerHTML = `
        <h2>Giriş Yap</h2>
        <input type="text" id="username" placeholder="Kullanıcı Adı">
        <input type="password" id="password" placeholder="Şifre">
        <button id="loginButton">Giriş Yap</button>
        <p id="loginError" style="color: red; display: none;">Hatalı giriş bilgileri!</p>
    `;
    document.body.prepend(loginContainer); // Giriş formunu sayfanın başına ekle

    // HTML İçinde Kullanılacak Elemanları Seç
    const loginButton = document.getElementById("loginButton");
    const loginError = document.getElementById("loginError");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const contentContainer = document.getElementById("contentContainer");
    const newsContainer = document.getElementById("newsContainer");
    const logoutButton = document.getElementById("logout");

    // Örnek Kullanıcı Bilgileri (Gerçek bir sistemde backend ile değiştirilir)
    const validUser = { username: "admin", password: "12345" };

    // Giriş Kontrol Fonksiyonu
    function checkLogin() {
        if (sessionStorage.getItem("loggedIn")) {
            loginContainer.style.display = "none";
            contentContainer.style.display = "block";
            showNews("all"); // Giriş yapınca haberleri yükle
        } else {
            loginContainer.style.display = "block";
            contentContainer.style.display = "none";
        }
    }

    // Giriş Butonuna Basıldığında Çalışacak Kod
    loginButton.addEventListener("click", function () {
        const enteredUsername = usernameInput.value;
        const enteredPassword = passwordInput.value;

        if (enteredUsername === validUser.username && enteredPassword === validUser.password) {
            sessionStorage.setItem("loggedIn", "true");
            checkLogin();
        } else {
            loginError.style.display = "block";
        }
    });

    // Çıkış Yap Butonu
    logoutButton.addEventListener("click", function () {
        sessionStorage.removeItem("loggedIn");
        checkLogin();
    });

    // Giriş Kontrolü Yap
    checkLogin();

    // Haber Verileri
    const newsData = {
        guncel: [
            { title: "Türkiye Norveç'te adalara mı yerleşecek?", description: "Türkiye, Norveç'in egemenliğindeki Svalbard takımadalarına ilişkin anlaşmayı geçtiğimiz günlerde onayladı.", image: "norve.webp" },
            { title: "Trump Halilcan Sezmiş'i rehin aldı!", description: "Erzincan doğumlu Halilcan Sezmiş, korkunç bir operasyonla Amerika'ya götürüldü.", image: "trump.jpg" }
        ],
        spor: [
            { title: "Milli Takım büyük başarıya imza attı!", description: "Çeyrek finalde elendiler. Filenin Sultanlarını örnek alın beyler.", image: "e.jpg" }
        ],
        teknoloji: [
            { title: "Yapay Zeka devrim yaratıyor", description: "Namık Kemal Üniversitesi öğretim görevlisi Ercan Buluş, yapay zekanın mühendislerin işini elinden alacağını söyledi.", image: "8bf9af43_big.jpg" }
        ],
        iletisim: [
            { title: "İletişim Bilgileri", description: "habersitesi913@gmail.com mail adresinden ya da '0222 222 2222' numaradan bizlere ulaşabilirsiniz.", image:"ilet.png" }
        ]
    };

    const menuLinks = document.querySelectorAll(".menu a");

    // Haberleri Gösterme Fonksiyonu
    function showNews(category) {
        newsContainer.innerHTML = "";
        let newsToShow = [];

        if (category === "all") {
            Object.values(newsData).forEach(newsArray => {
                newsToShow = newsToShow.concat(newsArray);
            });
        } else if (newsData[category]) {
            newsToShow = newsData[category];
        }

        if (newsToShow.length > 0) {
            newsToShow.forEach(news => {
                const newsCard = document.createElement("div");
                newsCard.classList.add("news-card");
                newsCard.innerHTML = `
                    <img src="${news.image}" alt="${news.title}">
                    <div class="news-content">
                        <h2 class="news-title">${news.title}</h2>
                        <p class="news-description">${news.description}</p>
                    </div>
                `;
                newsContainer.appendChild(newsCard);
            });
        } else {
            newsContainer.innerHTML = "<p style='text-align: center;'>Bu kategori için haber bulunamadı.</p>";
        }
    }

    // Menü Tıklamalarını Yönet
    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const category = this.getAttribute("data-category");
            showNews(category);
        });
    });
});

