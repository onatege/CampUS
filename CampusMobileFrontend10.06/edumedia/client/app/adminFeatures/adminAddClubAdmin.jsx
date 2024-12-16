import { TextInput, View } from "react-native";
import { Image } from "expo-image";
import { useState } from "react";
import { TextBody } from "../../components/Texts";
import SearchInput from "../../shared/SearchInput";
import { useLocalSearchParams, useRouter } from 'expo-router';
import AdminClubAdminSearchItem from "../../components/listItems/adminClubAdminSearchItem";

const renderItem = ({ item, index , clubId}) => {
    return (
        < >
            {item ?
                <AdminClubAdminSearchItem key={index} item={item} clubId={clubId} />
                :
                <Text>Yükleniyor...</Text>
            }
        </>
    );
};

function AdminAddClubAdmin() {
    const { clubId } = useLocalSearchParams();
    const [value, setValue] = useState("")

    return (
        <View style={{ width: '100%', height: '100%' }}>

            <View style={{ width: '100%', height: 'auto', paddingVertical: 8, flexDirection: 'column', gap: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: 50, borderRadius: 10, borderWidth: 0.4, borderColor: 'white', padding: 4 }}>
                    <Image
                        style={{ width: 26, height: 26 }}
                        tintColor={'gray'}
                        source={require('../../assets/icons/search.svg')}
                    />
                    <TextInput onChangeText={setValue} placeholderTextColor={'gray'} placeholder={"Search"} style={{ width: '100%', height: '100%', color: 'gray' }} />
                </View >
            </View>
            {
                value !== "" ?
                    <SearchInput text={value} renderItem={({item , index}) => renderItem({item ,index, clubId})} type={"User"} />
                    :
                    <TextBody color={'black'}>Search Something</TextBody>

            }
        </View>
    )
}

export default AdminAddClubAdmin