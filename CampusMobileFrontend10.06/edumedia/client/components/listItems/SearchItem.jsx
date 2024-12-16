import { TouchableOpacity, View } from "react-native"
import { TextBody } from "../Texts";
import { useRouter } from "expo-router";


function SearchItem({ item, index }) {
    const router = useRouter()
    return (
        <TouchableOpacity onPress={() => { router.push({ pathname: 'features/taggedFeed', params: { tag: item?.id, tagName:item?.name } }) }} style={{ padding: 8, display: 'flex', flexDirection: 'row', gap: 8, height: 'auto' }}>
            <View style={{ width: '10%', height: '100%', padding: 4 }}>
                <TextBody>#{index + 1}</TextBody>
            </View>
            <View style={{ width: '90%', height: '100%', padding: 4, flexDirection: 'column', gap: 4 }}>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                    <TextBody>
                        Trending
                    </TextBody>
                    <TextBody>
                        *
                    </TextBody>
                    <TextBody color={'gray'}>
                        Entertainment
                    </TextBody>
                </View>
                <View>
                    <TextBody>
                        {item?.name}
                    </TextBody>
                </View>
                <View style={{ width: '100%', height: 'auto' }}>
                    <TextBody color={'gray'}>
                        {item?.postCount} Posts
                    </TextBody>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SearchItem