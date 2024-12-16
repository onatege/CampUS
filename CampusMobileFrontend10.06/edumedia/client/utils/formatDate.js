
export const FormatDate = async (apiDate) => {
     // Tarih ve saat bilgilerini al
     const year = apiDate.substring(0, 4);
     const month = apiDate.substring(5, 7);
     const day = apiDate.substring(8, 10);
     const hour = apiDate.substring(11, 13);
     const minute = apiDate.substring(14, 16);
     const second = apiDate.substring(17, 19);

     // Formatlı tarih bilgisini döndür
     return `${day}.${month}.${year} ${hour}:${minute}:${second}`;
}