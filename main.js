import API from "./scripts/api.js";
import UI from "./scripts/ui.js";

//class ın bir örneğini oluşturma
const api = new API();
const ui = new UI();

//sayfanın yüklenme olayını izle
document.addEventListener("DOMContentLoaded", async () => {
  // 1 ekrana yüklenme gifi yükle
  ui.renderLoader();

  // 2 api istek at
  await api.getPopular();

  //3 gelen verileri ekrana bas
  ui.renderCards(api.songs);
});

//formun gönderilme olayını izle
ui.form.addEventListener("submit", async (e) => {
  //sayfayı yenilemeyi engelle
  e.preventDefault();

  //aratılan kelimeye eriş
  const query = e.target[0].value; // inputa name verip e.target.inputname.value gibi

  //boşsa uyarı gönder
  if (!query.trim())
    // (query === "") olarak ta kullanabiliriz.trim boşluk bırakmayı engeller
    return alert("Lütfen aratılacak kelimeyi giriniz...");

  //ekrana yükleniyor bas
  ui.renderLoader();

  //başlığı güncelle
  ui.changeTitle(query + " İçin Sonuçlar");

  //api den şarkıları al
  await api.searchMusic(query);

  //şarkıları ekrana
  ui.renderCards(api.songs);
});

//cartların alanına tıklanma olayını izleme
ui.list.addEventListener("click", (e) => {
  //tıklanan eleman playBtn ise oynat
  if (e.target.id === "play-btn") {
    //tıklanılan karttaki şarkının bilgilrini al
    const song = e.target.closest(".card").dataset; //closest parent yerine kullanıldı.en yakın karta git...

    //şarkıyı oynatma kısmını ekrana bas
    ui.renderPlayingInfo(song);
  }
});

//kullanıcı projeye girdiğinde bir kez çalışır
//localden mode verisini al
const mode = localStorage.getItem("mode");

document.body.className = mode === "true" ? "dark" : "light";

ui.checkbox.checked = mode === "true";

//checkbox değer değişimi izle
ui.checkbox.addEventListener("change", (e) => {
  //false açk mod
  //true kapalı mod
  const isDarkMode = e.target.checked;

  //kullanıcının seçtiği değeri kaybetmemek için localde tutacağız
  localStorage.setItem("mode", isDarkMode);

  document.body.className = isDarkMode ? "dark" : "light";
});
