import React, {useState, useEffect} from 'react';
import { Animated } from 'react-native';

import { Small, Original } from './styles';

const AnimetedOriginal = Animated.createAnimatedComponent(Original);

export default function LazyImage({
    smallSource,
    source,
    ratio,
    shouldLoad,
}) {

    const [loaded, setLoaded] = useState(false);
    const opacity = new Animated.Value(0);

    useEffect(() => {
        if(shouldLoad){
            setTimeout(() => {
                setLoaded(true)
            }, 500);
        }
    }, [shouldLoad]);

    function handleAnimate(){
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    return (
      <Small 
        source={smallSource} 
        ratio={ratio} 
        resizeMode="contain" 
        blurRadius={0.75}
      >
    {
        loaded &&
        <AnimetedOriginal 
            style={{opacity}}
            source={source}
            ratio={ratio}
            resizeMode="contain"
            onLoadEnd={handleAnimate}
        />
    }
      </Small>

    );
}
