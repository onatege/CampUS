import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextLabel } from '../Texts';
import { useAddMutate } from '../../hooks/useGenericMutateHook';
import { firebase } from '../../utils/firebaseConfig';

function RequestItem({ item }) {
    const { mutate } = useAddMutate();

    const handleAddMember = async (e) => {
        e.preventDefault();
        const postData = {
            endpoint: `/api/Club/AddMember?clubId=${item?.relatedClub_id}`,
            key: [`${item?.relatedClub_id}Club`],
            data: {
                username: item?.requestOwnerName,
            },
        };
        mutate(postData);
        await updateRequestStatus(item._id, 'success');
    };

    const handleDeclineMember = async (e) => {
        e.preventDefault();
        await updateRequestStatus(item._id, 'declined');
    };

    const updateRequestStatus = async (requestId, status) => {
        try {
            await firebase.firestore().collection('requests').doc(requestId).update({ status });
        } catch (error) {
            console.error('Error updating request status: ', error);
        }
    };

    return (
        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'column', gap: 4 }}>
            <TextLabel color={'black'}>Request Owner Name: {item.requestOwnerName}</TextLabel>
            <TextLabel color={'black'}>Related Club Name: {item.clubName}</TextLabel>
            <TextLabel color={'black'}>Status: {item.status}</TextLabel>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity style={{ borderWidth: 0.4, padding: 4, borderRadius: 10, borderColor: 'gray' }} onPress={(e) => handleAddMember(e)}>
                    <TextLabel color={'green'}>Accept</TextLabel>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderWidth: 0.4, padding: 4, borderRadius: 10, borderColor: 'gray' }} onPress={(e) => handleDeclineMember(e)}>
                    <TextLabel color={'red'}>Decline</TextLabel>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default RequestItem;
