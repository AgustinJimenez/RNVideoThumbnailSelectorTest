/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {View, ImageBackground} from 'react-native';
import Video, {OnLoadData} from 'react-native-video';
import styles from './styles';
import {Slider as RNSlider} from '@miblanchard/react-native-slider';
import {createThumbnail} from 'react-native-create-thumbnail';
import RNFS from 'react-native-fs';

const testVideoUrl =
  'https://player.vimeo.com/external/592772975.sd.mp4?s=1ace120228a4ecb52f623fb714b52ffb1339fac8&profile_id=165&oauth2_token_id=57447761';
const testVideoFilePath = `${RNFS.DocumentDirectoryPath}/tmp.mp4`;

const Track = ({videoDuration}: any) => {
  const [thumbnailImgUris, setThumbnailImgUris] = useState<string[]>([]);
  const numberOfThumbnails = 6;
  const videoDurationInMs = videoDuration * 1000;
  const thumbnailTimeRange = videoDurationInMs / numberOfThumbnails;

  const init = async () => {
    let uris = [];
    for (let t = 0; t < videoDurationInMs; t += thumbnailTimeRange) {
      const {path} = await createThumbnail({
        url: testVideoFilePath,
        timeStamp: +t,
      });
      uris.push(path);
    }

    setThumbnailImgUris(uris);
  };

  useEffect(() => {
    if (videoDuration) {
      init();
    }
  }, [videoDuration]);

  return (
    <>
      <View style={styles.trackContainer}>
        {thumbnailImgUris.map((thumbnail_uri, key) => (
          <ImageBackground
            key={key}
            resizeMethod="resize"
            source={{uri: thumbnail_uri}}
            style={styles.previewItmBg}
          />
        ))}
      </View>
    </>
  );
};

const SliderThumb = (videoProps: any) => {
  return (
    <View style={styles.thumbContainer}>
      <Video {...videoProps} style={[videoProps.style, styles.thumbVideo]} />
    </View>
  );
};

const Slider = ({
  videoDuration,
  onChangeVideoTime,
  videoTime,
  videoProps,
}: any) => {
  return (
    <>
      <RNSlider
        containerStyle={styles.sliderContainer}
        maximumValue={videoDuration}
        value={videoTime}
        thumbStyle={styles.thumbContainer}
        renderTrackMarkComponent={() => <Track videoDuration={videoDuration} />}
        minimumTrackTintColor="transparent"
        renderThumbComponent={() => <SliderThumb {...videoProps} />}
        onValueChange={(value: number | number[]) =>
          //@ts-ignore
          onChangeVideoTime(value[0])
        }
      />
    </>
  );
};

const VideoPreviewScreen: React.FC = ({}) => {
  const videoRef = useRef();
  const [videoIsLoad, setVideoIsLoad] = useState(false);
  const [videoInfo, setVideoInfo] = useState({
    currentTime: 0,
    playableDuration: 0,
    progress: 0,
  });

  const onLoad = (data: OnLoadData) =>
    setVideoInfo({
      ...videoInfo,
      playableDuration: data.duration,
    });

  const onChangeVideoTime = (newTime: number) => {
    (videoRef as any).current.seek(newTime);
    setVideoInfo({
      ...videoInfo,
      currentTime: newTime,
    });
  };

  const videoProps = {
    source: {uri: testVideoFilePath},
    currentTime: videoInfo.currentTime,
    style: styles.videoContainer,
    muted: true,
    paused: true,
    resizeMode: 'stretch',
    ref: videoRef,
  };

  const init = async () => {
    const file = await RNFS.exists(testVideoFilePath);
    if (!file) {
      await RNFS.downloadFile({
        fromUrl: testVideoUrl,
        toFile: testVideoFilePath,
      }).promise;
    }

    setVideoIsLoad(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!videoIsLoad) {
    return null;
  }

  return (
    <>
      <Video onLoad={onLoad} {...videoProps} />
      <Slider
        videoDuration={videoInfo.playableDuration}
        videoTime={videoInfo.currentTime}
        onChangeVideoTime={onChangeVideoTime}
        videoProps={videoProps}
      />
    </>
  );
};

export default VideoPreviewScreen;
