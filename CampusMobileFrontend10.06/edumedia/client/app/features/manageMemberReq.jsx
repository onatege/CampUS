import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { firebase } from '../../utils/firebaseConfig';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import List from '../../shared/list';
import RequestItem from '../../components/listItems/requestItem';
import { TextTitle } from '../../components/Texts';
import Loader from '../../shared/Loader';

const renderItem = ({ item, index }) => {
  return (
    < >
      {item ?
        <RequestItem key={index} item={item} />
        :
        <Loader />
      }
    </>
  );
};

function ManageRequests() {
  const db = firebase.firestore();
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db.collection('requests').where('status', '==', 'pending').onSnapshot((snapshot) => {
      const fetchedRequests = snapshot.docs.map((doc) => ({
        ...doc.data(),
        _id: doc.id,
      }));
      setRequests(fetchedRequests);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader backgrounColor={'gray'} />;
  }

  return (
    <View style={{ backgroundColor: 'transparent', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <TextTitle color={'black'}>Club Membership Requests</TextTitle>
      <View style={{ width: '100%', height: '90%' }}>
        {
          requests.length > 0 ?
            <List data={requests} renderItem={renderItem} />
            :
            <TextBody color={'gray'}>There is no pending request</TextBody>
        }
      </View>
    </View >
  );
}

export default ManageRequests;
