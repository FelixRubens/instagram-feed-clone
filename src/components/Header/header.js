import React, { version } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconCamera from 'react-native-vector-icons/Feather';
import IconPaperPlane from 'react-native-vector-icons/SimpleLineIcons';
import { Image, View, StyleSheet } from 'react-native';

import logo from '../../../assets/instagram.png'
export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.camAndIcon}>
        <IconCamera name="camera" style={styles.camera} size={25} />
        <Image source={logo} style={styles.logo}/>
      </View>
      <IconPaperPlane name="paper-plane" style={styles.direct} size={25}/>
    </View>
  );
};

styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    width: 330,
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  
  camAndIcon: {
    flexDirection: 'row',
  },

  logo: {
    marginHorizontal: 10,
  }
})
