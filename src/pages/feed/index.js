import React, {useState, useEffect, useCallback} from 'react';
import { View, FlatList } from 'react-native';
import LazyImage from '../../components/lazyImage'
import { Post, Header, Avatar, Name, Description, Loading } from './styles'

export default function feed() {
  const [feed, setFeed] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [viewble, setViewble] = useState([])

  async function refreshList(){
    setRefreshing(true)
      await loadPage(1, true)
    setRefreshing(false)
  }

  async function loadPage(number = pageNumber, shoudRefresh = false){

    if(shoudRefresh) setPageNumber(1)
    if(total && number > total) return;

    setLoading(true)

    const response = await fetch(
      `http://localhost:3000/feed?_expand=author&_limit=5&_page=${number}`)
    
    const data = await response.json()
    const backendTotal = response.headers.get('X-Total-Count')

    setTotal(Math.floor(backendTotal / 5))
    setFeed(shoudRefresh ? data : [...feed, ...data])
    setPageNumber(number + 1)

    setLoading(false)
  }

  useEffect(() => {
    loadPage();
  }, [])

  const handleViewChange = useCallback(({ changed }) => {
    setViewble(changed.map(({item}) => item.id))
  }, [])

  return (
    <View>
      <FlatList
        data={feed}
        keyExtractor={post => String(post.id)}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        refreshing={refreshing}
        onViewableItemsChanged={handleViewChange}

        ListFooterComponent={loading && <Loading />}
        renderItem={({item}) => (
          <Post>
            <Header>
              <Avatar source={{ uri: item.author.avatar }}/>
              <Name>{item.author.name}</Name>
            </Header>

            <LazyImage
              shouldLoad={viewble.includes(item.id)}
              ratio={item.aspectRatio} 
              smallSource={{ uri: item.small}}
              source={{uri: item.image}}/>
            <Description>
              <Name>{item.author.name}</Name> {item.description}
            </Description>
          </Post>
        )}
      />
    </View>
  );
}
