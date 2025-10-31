import { icons } from '@/constants';
import { useAppSelector } from '@/hooks/useAppSelector';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Video from "react-native-video";

const { width } = Dimensions.get('window');
const RED_COLOR = '#A40000';

interface VideoSliderProps {
    videos: Array<{ id: string; uri: string; thumbnail: string }>;
}

export const VideoSlider: React.FC<VideoSliderProps> = ({ videos }) => {
    const appLanguage = useAppSelector(state => state.generalSettings.language);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef(null);

    const currentVideo = videos[currentIndex];

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    };

    return (
        <View style={styles.bannerContainer}>
            {!isPlaying ? (
                <>
                    {/* Thumbnail with overlay controls */}
                    <Image
                        source={{ uri: currentVideo.thumbnail }}
                        style={styles.video}
                    />
                    
                    {/* Overlay for thumbnail state */}
                    <View style={styles.overlay}>
                        <View style={styles.sideControls}>
                            <TouchableOpacity onPress={handlePrev} style={styles.sideButton}>
                                <Image source={icons.videoPrev} style={[styles.icon, appLanguage === 'ar' && { transform: [{ rotate: '180deg' }] }, { tintColor: RED_COLOR }]} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleNext} style={styles.sideButton}>
                                <Image source={icons.videoNext} style={[styles.icon, appLanguage === 'ar' && { transform: [{ rotate: '180deg' }] }, { tintColor: RED_COLOR }]} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.bottomControls}>
                            <TouchableOpacity onPress={handlePlayPause} style={styles.centerButton}>
                                <Image source={icons.videoPause} style={[styles.icon, { tintColor: RED_COLOR }]} />
                            </TouchableOpacity>

                            {/* <Text style={styles.videoCounter}>
                                {currentIndex + 1} / {videos.length}
                            </Text> */}

                            <TouchableOpacity style={{position: "absolute", bottom: 10, right: 0}} onPress={() => setIsMuted(!isMuted)}>
                                <Image
                                    source={isMuted ? icons.videoMute : icons.videoUnmute}
                                    style={[styles.icon, { tintColor: RED_COLOR }]}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            ) : (
                <>
                    <Video
                        ref={videoRef}
                        source={{ uri: currentVideo.uri }}
                        style={styles.video}
                        resizeMode="cover"
                        paused={!isPlaying}
                        muted={isMuted}
                        repeat
                    />

                    {/* Controls overlay during playback */}
                    <View style={styles.overlay}>
                        <View style={styles.sideControls}>
                            <TouchableOpacity onPress={handlePrev} style={styles.sideButton}>
                                <Image source={icons.videoPrev} style={[styles.icon, { tintColor: RED_COLOR }]} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleNext} style={styles.sideButton}>
                                <Image source={icons.videoNext} style={[styles.icon, { tintColor: RED_COLOR }]} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.bottomControls}>
                            <TouchableOpacity onPress={handlePlayPause} style={styles.centerButton}>
                                <Image source={icons.videoPlay} style={[styles.icon, { tintColor: RED_COLOR }]} />
                            </TouchableOpacity>

                            {/* <Text style={styles.videoCounter}>
                                {currentIndex + 1} / {videos.length}
                            </Text> */}

                            <TouchableOpacity style={{position: "absolute", bottom: 10, right: 0}} onPress={() => setIsMuted(!isMuted)}>
                                <Image
                                    source={isMuted ? icons.videoMute : icons.videoUnmute}
                                    style={[styles.icon, { tintColor: RED_COLOR }]}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    bannerContainer: {
        width,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    icon: {
        width: 30,
        height: 30,
    },
    sideIcon: {
        width: 40,
        height: 40,
    },
    largeIcon: {
        width: 50,
        height: 50,
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        // backgroundColor: 'rgba(0, 0, 0, 0.2)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    sideControls: {
        width: width * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
    },
    sideButton: {
        padding: 10,
    },
    bottomControls: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
    },
    centerButton: {
        padding: 10,
    },
    videoCounter: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
});