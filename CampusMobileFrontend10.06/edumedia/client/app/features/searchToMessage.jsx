import { TextInput, View } from "react-native";
import SkeletonDiv from "../../components/SkeletonDiv"
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
import {  TextBody } from "../../components/Texts";
import SearchInput from "../../shared/SearchInput";
import SearchToMessageItem from "../../components/listItems/SearchToMessageItem";
SearchToMessageItem

const renderItem = ({ item, index }) => {
    return (
        < >
            {item ?
                <SearchToMessageItem key={index} item={item} />
                :
                <Text>Yükleniyor...</Text>
            }
        </>
    );
};

function searchToMessage() {
    const [value, setValue] = useState("")

    return (
        <SkeletonDiv>
            <View style={{ width: '100%', height: 'auto', paddingVertical: 8, flexDirection: 'column', gap: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: 50, borderRadius: 10, borderWidth: 0.4, borderColor: 'white', padding: 4 }}>
                    <Image
                        style={{ width: 26, height: 26 }}
                        tintColor={'gray'}
                        source={require('../../assets/icons/search.svg')}
                    />
                    <TextInput onChangeText={setValue} placeholderTextColor={'gray'} placeholder={"Search"} style={{ width: '100%', height: '100%', color: 'white' }} />
                </View >
            </View>
            {
                value !== "" ?
                <SearchInput text={value} renderItem={renderItem} type={"User"} />
                :
                <TextBody>Search Something</TextBody>

            }
            <LinearGradient
                colors={['transparent', '#141218']}
                style={{
                    height: '10%',
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 10
                }}
            />
        </SkeletonDiv>
    )
}

export default searchToMessage