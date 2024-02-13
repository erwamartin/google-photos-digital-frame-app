import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import styles from './styles';
import { styleHelpers } from 'styles';

type PropsType = {
  navigation: any,
}

function SlideshowSettings({ navigation }: PropsType) {
  
  function openTimingSettings() {
    
  }

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.titleText}>Slideshow Settings</Text>

      <View
        style={styles.timingSettingsContainer}
      >
        <Image
          source={require('@assets/icons/timer-icon.png')}
          resizeMode='contain'
          style={styles.timerIcon}
        />
        <View
          style={styles.settingsTextContainer}
        >
          <Text style={styleHelpers.merge(styles.text, styles.timingText)}>Timing</Text>
          <Text style={styles.text}>Time between slides</Text>
        </View>
        <Pressable
          onPress={openTimingSettings}
          style={styles.rightContainer}
        >
          <Text style={styleHelpers.merge(styles.text, styles.timingValueText)}>5s</Text>
          <Image
            source={require('@assets/icons/arrow-drop-down-icon.png')}
            resizeMode='contain'
            style={styles.dropDownIcon}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default SlideshowSettings;