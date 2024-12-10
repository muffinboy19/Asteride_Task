import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, FlatList, View, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const API_URL = "https://jsonplaceholder.typicode.com/photos";

export default function App() {
  const [thumbnails, setThumbnails] = useState([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchThumbnails();
  }, []);

  const fetchThumbnails = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const thumbnailUrls = data.map(item => item.thumbnailUrl).slice(0, 10);
      setThumbnails(thumbnailUrls);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image 
        source={{ uri: item }} 
        style={styles.image} 
        resizeMode="cover"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={thumbnails}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecfff1',
  },
  carouselItem: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width - 40, // i know u said scren width but we need some padding
    height: 300, // said by sir
    borderRadius: 10,
  },
});

