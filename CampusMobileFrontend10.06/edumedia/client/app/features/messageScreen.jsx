import React, { useEffect, useState } from 'react'
import SkeletonDiv from '../../components/SkeletonDiv'
import { firebase } from '../../utils/firebaseConfig'
import { useLocalSearchParams } from 'expo-router';
import { GiftedChat } from 'react-native-gifted-chat';
import { View } from 'react-native';

function messageScreen() {
  const db = firebase.firestore();
  const [messages, setMessages] = useState([])
  const { receiverId , negotiaterId, userId } = useLocalSearchParams();

  useEffect(() => {
    const unsubscribe = db.collection('messages')
      .orderBy('createdAt', 'desc')  // Sıralama işlemi
      .onSnapshot((snapshot) => {
        const newMessages = snapshot.docs
          .filter((doc) => {
            const messageData = doc.data();
            // Eğer negotiaterId ve receiverId değerleri belge ile uyuşuyorsa true döner
            return (
              (messageData.negotiater_id === negotiaterId && 
                messageData.receiver_id === receiverId) ||
                (messageData.negotiater_id === receiverId && 
                messageData.receiver_id === negotiaterId)
            );
          })
          .map((doc) => {
            const messageData = doc.data();
            return {
              ...messageData,
              _id: doc.id,
              receiver_id: messageData.receiver_id || "",
              negotiater_id: messageData.negotiater_id || "",
              createdAt: messageData.createdAt ? messageData.createdAt.toDate() : null,
            };
          });

        setMessages(newMessages);
        handleMakeMessagesReaded(newMessages)
      });

      console.log(messages)

    return () => unsubscribe();
  }, [negotiaterId, receiverId]);

  const handleMakeMessagesReaded = async (data) => {
    data.forEach(element => {
      if (element.user._id === userId) {
        null
      } else {
       console.log("unread")

        db.collection('messages')
          .doc(element._id)
          .update({
            unread: "false"
          })
      }

    });
  }

  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    newMessages.forEach((message) => {
      db.collection('messages').add({
        ...message,
        receiver_id: receiverId,
        negotiater_id: negotiaterId,
        unread: "true",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    });
  };

    return (
        <SkeletonDiv>
          <View style={{ width:'100%', height:'100%', position:'relative'}}>
          <GiftedChat
                messagesContainerStyle={{ paddingVertical: 32, width: '100%' }}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userId,
                }}
                parsePatterns={(linkStyle) => [
                    {
                        pattern: /#(\w+)/,
                        style: linkStyle,
                        onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
                    },
                ]}
            />
          </View>
            
        </SkeletonDiv>
    )
}

export default messageScreen