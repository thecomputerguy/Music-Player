import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import audioBookPlaylist from "../data/data";
import { Audio } from "expo-av";
import Controls from "./Controls";
import Header from "./Header";

import AlbumArt from "./AlbumArt";
import TrackDetails from "./TrackDetails";
import SeekBar from "./SeekBar";

let initialState = {
  isPlaying: false,
  playbackInstance: null,
  currentIndex: 0,
  volume: 1.0,
  isBuffering: false,
  trackLength: 1,
  currentPosition: 0,
};

const setAudioMode = async () => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: true,
    });
  } catch (error) {
    console.error(error);
  }
};

const MediaPlayer = () => {
  const [playerState, setPlayerState] = useState(initialState);

  const onSlidingStart = useCallback(() => {
    setPlayerState((previousState) => ({
      ...previousState,
      isPlaying: !previousState.isPlaying,
    }));
  }, [playerState]);

  const onSeek = useCallback(
    async (millis) => {
      const { playbackInstance } = playerState;
      await playbackInstance.setStatusAsync({
        shouldPlay: true,
        positionMillis: millis,
      });
    },
    [playerState]
  );

  const handlePlayPause = useCallback(async () => {
    const { isPlaying, playbackInstance } = playerState;
    console.log("Playback Instance is ", playbackInstance);
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();
    setPlayerState((currentState) => ({
      ...currentState,
      isPlaying: !currentState.isPlaying,
    }));
  }, [playerState]);

  const handlePreviousTrack = useCallback(async () => {
    const { playbackInstance, currentIndex } = playerState;

    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      const newIndex =
        currentIndex < audioBookPlaylist.length && currentIndex > 0
          ? currentIndex - 1
          : 0;
      setPlayerState((currentState) => ({
        ...currentState,
        currentIndex: newIndex,
      }));
      loadAudio();
    }
  }, [playerState]);

  const handleNextTrack = useCallback(async () => {
    const { playbackInstance, currentIndex } = playerState;

    if (playbackInstance) {
      await playbackInstance.unloadAsync();

      const newIndex =
        currentIndex < audioBookPlaylist.length - 1 ? currentIndex + 1 : 0;
      console.log("playerstate: ", playerState);
      console.log("currentIndex: ", currentIndex, " newIndex : ", newIndex);
      setPlayerState((currentState) => ({
        ...currentState,
        currentIndex: newIndex,
      }));
      console.log("playerState after index update: ", playerState);
      loadAudio();
    }
  }, [playerState]);

  const onPlaybackStatusUpdate = useCallback(
    (status) => {
      console.log("Status : ", status);
      setPlayerState((currentState) => ({
        ...currentState,
        isBuffering: status.isBuffering,
        trackLength: Math.floor(status.durationMillis),
        currentPosition: Math.floor(status.positionMillis),
      }));
    },
    [playerState]
  );

  const loadAudio = useCallback(async () => {
    const { currentIndex, isPlaying, volume } = playerState;

    try {
      const playbackInstance = new Audio.Sound();
      const source = {
        uri: audioBookPlaylist[currentIndex].uri,
      };

      const status = {
        shouldPlay: isPlaying,
        volume,
      };

      playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      setPlayerState((currentState) => ({
        ...currentState,
        playbackInstance: playbackInstance,
      }));
    } catch (error) {
      console.error(error);
    }
  }, [playerState]);

  useEffect(() => {
    setAudioMode();
    loadAudio();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        message="Playing from charts"
        onDownPress={() => {}}
        onQueuePress={() => {}}
        onMessagePress={() => {}}
      />
      {/* <MediaPlayer /> */}
      <AlbumArt
        url={audioBookPlaylist[playerState.currentIndex].imageSource}
        onPress={() => {}}
      />
      <TrackDetails
        title={audioBookPlaylist[0].title}
        artist={audioBookPlaylist[0].author}
        onAddPress={() => {}}
        onMorePress={() => {}}
        onTitlePress={() => {}}
        onArtistPress={() => {}}
      />
      {playerState.trackLength ? (
        <SeekBar
          currentPosition={playerState.currentPosition}
          trackLength={playerState.trackLength}
          onSlidingStart={onSlidingStart}
          onSeek={onSeek}
        />
      ) : null}
      <Controls
        paused={!playerState.isPlaying}
        shuffleOn={true}
        repeatOn={true}
        onPressPlay={handlePlayPause}
        onPressPause={handlePlayPause}
        onBack={handlePreviousTrack}
        onForward={handleNextTrack}
        onPressShuffle={() => {}}
        onPressRepeat={() => {}}
        forwardDisabled={false}
      />
    </View>
  );
};

export default MediaPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
