//api isteği atan fonksiyonlar bu dosyada olacak

const options = {
  headers: {
    "X-RapidAPI-Key": "7864b53fd6msh9c19338752b3748p19a239jsn33d266d7665b",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};

//api işlemlerini yönetecek olan class
export default class API {
  //kurucu method
  constructor() {
    this.songs = [];
  }

  // türkiyedeki popüler müzikleri alır
  async getPopular() {
    //api isteği at
    const res = await fetch(
      "https://shazam.p.rapidapi.com/charts/track?listId=ip-country-chart-TR&locale=tr",
      options
    );
    //gelen veriyi işle
    const data = await res.json();

    //class ta tanımlanan songs değişkenine aktar
    this.songs = data.tracks;
  }

  //aratılan kelimeye uygun şarkıları al

  async searchMusic(query) {
    //api isteği at
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr`,
      options
    );

    //gelen cevabı işle
    const data = await res.json();

    //gelen cevabın formatını değiştir
    const formatted = data.tracks.hits.map((song) => {
      return song.track;
    });

    //gelen veriyi değişkene aktar
    this.songs = formatted;
  }
}
