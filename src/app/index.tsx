/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import VideoPreviewScreen from '../screens/VideoPreviewScreen';
import {genericStyles} from '../theme';

const App: React.FC = () => {
  return (
    <SafeAreaView style={genericStyles.bgBlack}>
      <VideoPreviewScreen />
    </SafeAreaView>
  );
};

export default App;
