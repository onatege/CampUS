import React, { useState, useEffect } from 'react'
import SkeletonDiv from '../../components/SkeletonDiv'
import { TouchableOpacity, View, Text } from 'react-native'
import { Image } from 'expo-image';
import List from '../../shared/list';
import { useRouter } from 'expo-router';
import ChatItem from '../../components/listItems/ChatItem';
import Loader from '../../shared/Loader';
import { useSelector } from 'react-redux';
import { firebase } from '../../utils/firebaseConfig';
import { TextBody } from '../../components/Texts';

const renderItem = ({ item, index }) => {
  return (
    < >
      {item ?
        <ChatItem key={index} item={item} />
        :
        <Text>Loading...</Text>
      }
    </>
  );
};

function chat() {
  const db = firebase.firestore();
  const { user } = useSelector(state => state.user);

  const router = useRouter();
  const [messages, setMessages] = useState(null);

  useEffect(() => {
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
      filteredMessages.forEach((message) => {
        // Create a key based on the receiver and negotiater ids, ordered
        const ids = [message.receiver_id, message.negotiater_id].sort();
        const key = `${ids[0]}-${ids[1]}`;

        // If the key already exists and the new message is newer, update it
        if (!groupedMessages[key] || message.createdAt > groupedMessages[key].createdAt) {
          groupedMessages[key] = message;
        }
      });

      const newMessages = Object.values(groupedMessages);

      console.log(newMessages);
      setMessages(newMessages);
    })
  }, []);

  return (
    <SkeletonDiv>
      <View />
      <View />
      <TouchableOpacity onPress={() => { router.push("features/searchToMessage") }} style={{ width: 50, height: 50, borderRadius: 10, backgroundColor: '#2B2930', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 88, right: 16, zIndex: 50 }}>
        <Image
          style={{ width: 26, height: 26 }}
          tintColor={'#ffffff'}
          source={require('../../assets/icons/createMessage.svg')}
        />
      </TouchableOpacity>
      {
        messages ?
        messages?.length > 0 ?
          <List data={messages} renderItem={renderItem} />
          :
          <TextBody color={'gray'}>There is no messages yet, lets start to talk with someone</TextBody>
          :
          <Loader />
      }
    </SkeletonDiv>
  )
}

export default chat
