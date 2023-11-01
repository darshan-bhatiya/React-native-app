import {useState} from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import Welcome from '../../components/home/welcome/Welcome';
import Popularjobs from '../../components/home/popular/Popularjobs';
import Nearbyjobs from '../../components/home/nearby/Nearbyjobs';

const HomeScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}>
          <Welcome
            navigation={navigation}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                navigation.push('job-search', {
                  searchTerm: searchTerm
                })
              }
            }}
          />
          <Popularjobs navigation={navigation} />
          <Nearbyjobs navigation={navigation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
