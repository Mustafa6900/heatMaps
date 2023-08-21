# HeatMap Projesi

## Açıklama
HeatMap projesi, kullanıcıların uygulamaya kaydolabileceği veya giriş yapabileceği, kullanıcıların yoğun olarak bulunduğu lokasyonları gösteren bir mobil uygulamadır. 
Redux kullanarak kullanıcının oturumunun yönetilmesi sağlanır, böylece kullanıcı verileri uygulama genelinde kullanılabilir hale gelir. 
Profil bölümünde kullanıcının kişisel bilgileri görüntülenebilir. Isı haritası bölümünde ise kullanıcının konumuna bağlı olarak bir ısı haritası oluşturulur. 
Kullanıcıların konum bilgileri her 10 saniyede bir alınarak firebase'de tutulur, kullanıcı yoğunluğunun en yüksek olduğu alanlar tespit edilir. Uygulama aynı zamanda arkaplanda'da lokasyan bilgilerini almaktadır.

## İçindekiler
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Özellikler](#özellikler)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
- [Ekran Görüntüleri](#ekran-görüntüleri)

## Kurulum
1. Bu depoyu klonlayın: `git clone https://github.com/Mustafa6900/heatMaps.git`
2. Proje dizinine gidin: `cd heatMaps`
3. Gerekli bağımlılıkları yükleyin: `npm install` veya `yarn install`

## Kullanım
1. Geliştirme sunucusunu başlatın: `npm start` veya `yarn start`
2. Uygulamayı bir web tarayıcısında veya emülatörde açın.

## Özellikler
- Kullanıcı Kaydı ve Girişi
- Redux ile Oturum Yönetimi
- Kullanıcı Profili Görüntüleme
- Konuma Bağlı Isı Haritası Oluşturma

## Kullanılan Teknolojiler
- React Native
- Redux
- Firebase Firestore
- Expo


## Ekran Görüntüleri

https://github.com/Mustafa6900/heatMaps/assets/58307398/4cb342ae-b709-4870-ab0a-5ea737b378b0


![zyro-image (5)](https://github.com/Mustafa6900/heatMaps/assets/58307398/0a66c453-477d-44df-a085-71af481e036b)     ![kayıt](https://github.com/Mustafa6900/heatMaps/assets/58307398/6c39df3f-645c-43fd-88d0-d30532e1e341)



![zyro-image (7)](https://github.com/Mustafa6900/heatMaps/assets/58307398/cfd2464d-d5cb-4116-a688-c47ac2c0c7a9)      ![zyro-image (8)](https://github.com/Mustafa6900/heatMaps/assets/58307398/d16ed055-1029-437d-bf2c-9de4c2618f6a)


![image](https://github.com/Mustafa6900/heatMaps/assets/58307398/230b1c80-d0bf-4279-bd2f-4f36a0f9e245)

