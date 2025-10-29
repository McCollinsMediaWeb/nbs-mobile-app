import { icons } from '@/constants';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface VideoSliderProps {
    videos: Array<{ id: string; uri: string }>;
}

export const VideoSlider: React.FC<VideoSliderProps> = ({ videos }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef(null);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    };

    const currentVideo = videos[currentIndex];

    return (
        <View style={styles.bannerContainer}>
            {/* <Video
                ref={videoRef}
                source={{ uri: currentVideo.uri }}
                style={styles.imageBackground}
                resizeMode="cover"
                paused={!isPlaying}
                muted={isMuted}
                repeat
            /> */}

            <View style={styles.overlay}>
                <View style={styles.controlsContainer}>
                    {/* Left Arrow */}
                    <TouchableOpacity
                        onPress={handlePrev}
                        style={styles.arrowButton}
                    >
                        <Image source={icons.videoPrev} />
                    </TouchableOpacity>

                    {/* Center Controls */}
                    <View style={styles.centerControls}>
                        {/* Play/Pause */}
                        <TouchableOpacity
                            onPress={() => setIsPlaying(!isPlaying)}
                            style={styles.controlButton}
                        >
                            {isPlaying ? (
                                <Image source={icons.videoPause} />
                            ) : (
                                <Image source={icons.videoPlay} />
                            )}
                        </TouchableOpacity>

                        {/* Mute/Unmute */}
                        <TouchableOpacity
                            onPress={() => setIsMuted(!isMuted)}
                            style={styles.controlButton}
                        >
                            {isMuted ? (
                                <Image source={icons.videoMute} />
                            ) : (
                                <Image source={icons.videoUnmute} />
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Right Arrow */}
                    <TouchableOpacity
                        onPress={handleNext}
                        style={styles.arrowButton}
                    >
                        <Image source={icons.videoNext} />
                    </TouchableOpacity>
                </View>

                {/* Video Counter */}
                <Text style={styles.videoCounter}>
                    {currentIndex + 1} / {videos.length}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bannerContainer: {
        width: width,
        height: 300,
        overflow: 'hidden',
    },
    imageBackground: {
        width: '100%',
        height: 300,
        overflow: 'hidden',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 20,
        height: 300,
        justifyContent: 'space-between',
    },
    controlsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    arrowButton: {
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerControls: {
        flexDirection: 'row',
        gap: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlButton: {
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoCounter: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
        fontWeight: '600',
    },
});