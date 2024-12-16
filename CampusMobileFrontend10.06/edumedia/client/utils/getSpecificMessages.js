import { useSelector } from 'react-redux';
import { firebase } from './firebaseConfig';

const db = firebase.firestore();

export const getSpecificMessages = async (setData) => {
  const { user } = useSelector(state => state.user);

  db.collection('messages').onSnapshot((snapshot) => {
    const filteredMessages = snapshot.docs
      .filter((doc) => {
        const messageData = doc.data();
        // Check if the current user is either the negotiater or the receiver
        return (
          messageData.negotiater_id == user?.id ||
          messageData.receiver_id == user?.id
        );
      })
      .map((doc) => {
        const messageData = doc.data();
        return {
          ...messageData,
          _id: doc.id,
          receiver_id: messageData.receiver_id || "",
          negotiater_id: messageData.negotiater_id || "",
        };
      });

    const groupedMessages = {};
    console.log(filteredMessages, "FILTERED");
    filteredMessages.forEach((message) => {
      // Create a key based on the receiver and negotiater ids
      const key = `${message.receiver_id}-${message.negotiater_id}`;

      // If the key already exists and the new message is newer, update it
      if (!groupedMessages[key] || message.createdAt > groupedMessages[key].createdAt) {
        groupedMessages[key] = message;
      }
    });

    const newMessages = Object.values(groupedMessages);

    console.log(newMessages);
    setData(newMessages);
  });
};
