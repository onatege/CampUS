import { firebase } from './firebaseConfig';

const db = firebase.firestore();


export const getAllMessages = async (setData) => {
  db.collection('messages').onSnapshot((snapshot) => {
    const filteredMessages = snapshot.docs
      .filter((doc) => {
        const messageData = doc.data();
        // Eğer receiver_id userId'ye eşit değilse false döner, yani bu mesajı filtreler
        return messageData;
      })
      .map((doc) => {
        const messageData = doc.data();
        return {
          ...messageData,
          _id: doc.id,
          receiver_id: messageData.receiver_id || "",
        };
      });

    // Filtrelenmiş mesajları gruplama için kullanılacak anahtarla grupla
    const groupedMessages = {};

    filteredMessages.forEach((message) => {
      // Gruplama için kullanılacak anahtar
      const key = `${message.receiver_id}-${message.negotiater_id}-${message.product_id}`;

      // Eğer bu anahtar zaten varsa ve mevcut belgedeki tarih daha eski değilse güncelleme yapma
      if (!groupedMessages[key] || message.createdAt > groupedMessages[key].createdAt) {
        groupedMessages[key] = message;
      }
    });

    // Object.values() kullanarak gruplanmış mesajları diziye dönüştürme
    const newMessages = Object.values(groupedMessages);

    console.log(newMessages);
    setData(newMessages);
  });
};
