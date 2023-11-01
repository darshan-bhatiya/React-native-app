import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {RADPID_API_KEY} from "react-native-dotenv";
import {NearbyJobCard} from '../../components';
import axios from 'axios';
import { COLORS, SIZES, icons } from '../../constants';
import styles from '../../styles/search';

const JobSearch = ({route, navigation}) => {
  const {searchTerm} = route.params;

  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);

  const repidApiKey = RADPID_API_KEY.split(',');

  const handleSearch = async () => {
    setSearchLoader(true);
    setSearchResult([]);
    let lastError = null;

    for (const key of repidApiKey) {
    try {
      const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/search`,
        headers: {
          'X-RapidAPI-Key': key,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
        params: {
          query: searchTerm,
          page: page.toString(),
        },
      };

      const response = await axios.request(options);
      setSearchResult(response.data.data);
      setSearchLoader(false);
      return;
    } catch (error) {
      lastError = error;
    }
  }

  setSearchError(lastError);
  setSearchLoader(false);
};

  const handlePagination = direction => {
    if (direction === 'left' && page > 1) {
      setPage(page - 1);
      handleSearch();
    } else if (direction === 'right') {
      setPage(page + 1);
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <FlatList
        data={searchResult}
        renderItem={({item}) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => navigation.
              push('job-details', {
                jobId: item.job_id
              })
            }
          />
        )}
        keyExtractor={item => item.job_id}
        contentContainerStyle={{padding: SIZES.medium, rowGap: SIZES.medium}}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{searchTerm}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {searchLoader ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                searchError && <Text>Oops something went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination('left')}>
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination('right')}>
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default JobSearch;
