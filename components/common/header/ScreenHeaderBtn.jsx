import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

import styles from './screenheader.style'

import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress, GoBack }) => {
  
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={GoBack ? handleGoBack : handlePress}>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn