import { TextInput, View, TouchableOpacity, Text } from 'react-native'
import SkeletonDiv from '../../components/SkeletonDiv'
import { Image } from 'expo-image';
import { TextTitle } from '../../components/Texts';
import List from '../../shared/list';
import SearchItem from '../../components/listItems/SearchItem';
import { useGenericQueryHook } from '../../hooks/useGenericQueryHook';
import Loader from '../../shared/Loader';
import { useEffect, useState } from 'react';
import SearchInput from '../../shared/SearchInput';

const renderItem = ({ item, index }) => {
  return (
    < >
      {item ?
        <SearchItem key={index} item={item} index={index}/>
        :
        <Text>Yükleniyor...</Text>
      }
    </>
  );
};

function explore() {
  const [value, setValue] = useState("")
  const [adjustedData, setAdjustedData] = useState([])
  const { data: trendingTags, isLoading } = useGenericQueryHook("/api/Tag/GetTrendingTags", "trendingtags")

  useEffect(() => {
    if (!isLoading && trendingTags) {
      // Post sayısına göre sıralama işlemi
      const sortedData = [...trendingTags.data.data].sort((a, b) => b.postCount - a.postCount);
      setAdjustedData(sortedData);
    }
  }, [isLoading, trendingTags]);

  if (isLoading) {
    return <Loader />
  }


  return (
    <SkeletonDiv>
      <View />
      <View />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: 50, borderRadius: 10, borderWidth: 0.4, borderColor: 'white', padding: 4 }}>
        <Image
          style={{ width: 26, height: 26 }}
          tintColor={'gray'}
          source={require('../../assets/icons/search.svg')}
        />
        <TextInput onChangeText={setValue} placeholderTextColor={'gray'} placeholder='Search' style={{ width: '100%', height: '100%', color: 'white' }} />
      </View >
      {
        value === "" ?
          <>
            <TextTitle>Happening Today 👀</TextTitle>
            <List data={adjustedData} renderItem={renderItem} />
          </>
          :
          <>
            <SearchInput text={value} renderItem={renderItem} type={"All"} />
          </>
      }

    </SkeletonDiv>
  )
}

export default explore