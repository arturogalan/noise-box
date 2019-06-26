
export const PEDAL_TYPE = {
  DELAY: 'delay',
  FLANGER: 'flanger',
  REVERB: 'reverb',
};
export const PEDAL_NAME = {
  DELAY: 'delay',
  FLANGER: 'flanger',
  REVERB: 'reverb',
};
export const AMP_COMPONENT_TYPE = {
  VOLUME: 'volume',
  EQUALIZER: 'equalizer',
  PRESENCE: 'presence',
  DISTORTION: 'distortion',
};
export const AMP_COMPONENT_NAME = {
  VOLUME: 'volume',
  MASTER: 'master',
  EQUALIZER: 'equalizer',
  PRESENCE: 'presence',
  DISTORTION: 'distortion',
};
export const AMP_COMPONENT_PROPERTIES = {
  [AMP_COMPONENT_NAME.VOLUME]: {
    name: AMP_COMPONENT_NAME.VOLUME,
    type: AMP_COMPONENT_TYPE.VOLUME,
    settingsList: [
      {
        name: 'level',
        min: 0,
        max: 1,
        value: 30,
        type: 'knob',
        correctionFactor: 10,
        color: 'lightskyblue',
      },
    ],
  },
  [AMP_COMPONENT_NAME.MASTER]: {
    name: AMP_COMPONENT_NAME.MASTER,
    type: AMP_COMPONENT_TYPE.VOLUME,
    settingsList: [
      {
        name: 'level',
        min: 0,
        max: 1,
        value: 30,
        type: 'knob',
        correctionFactor: 10,
        color: 'lightskyblue',
      },
      {
        name: 'mute',
        value: false,
        type: 'boolean',
      },
    ],
  },
  [AMP_COMPONENT_NAME.EQUALIZER]: {
    name: AMP_COMPONENT_NAME.EQUALIZER,
    type: AMP_COMPONENT_TYPE.EQUALIZER,
    settingsList: [
      {
        name: 'trebbleGain',
        min: 0,
        max: 100,
        value: 40,
        type: 'knob',
        correctionFactor: 10,
        color: 'lightskyblue',
      },
      {
        name: 'middleGain',
        min: 0,
        max: 100,
        value: 60,
        type: 'knob',
        correctionFactor: 10,
        color: 'lightskyblue',
      },
      {
        name: 'bassGain',
        min: 0,
        max: 100,
        value: 30,
        type: 'knob',
        correctionFactor: 10,
        color: 'lightskyblue',
      },
    ],
  },
  [AMP_COMPONENT_NAME.PRESENCE]: {
    name: AMP_COMPONENT_NAME.PRESENCE,
    type: AMP_COMPONENT_TYPE.PRESENCE,
    settingsList: [
      {
        name: 'gain',
        min: 0,
        max: 100,
        value: 40,
        type: 'knob',
        correctionFactor: 10,
        color: 'lightskyblue',
      },
    ],
  },
  [AMP_COMPONENT_NAME.DISTORTION]: {
    name: AMP_COMPONENT_NAME.DISTORTION,
    type: AMP_COMPONENT_NAME.DISTORTION,
    zoomIn: false,
    settingsList: [
      {
        name: 'intensity',
        min: 0,
        max: 100,
        value: 80,
        type: 'knob',
        correctionFactor: 10,
        color: 'lightslategray',
      },
    ],
  },
};


export const PEDAL_PROPERTIES = {
  [PEDAL_NAME.DELAY]: {
    name: PEDAL_NAME.DELAY,
    type: PEDAL_TYPE.DELAY,
    zoomIn: false,
    icon: 'assets/icons/delay.svg',
    bgcolor: '#eedbc3',
    fcolor: 'blue',
    settingsList: [
      {
        name: 'wet',
        min: 0,
        max: 100,
        value: 1,
        correctionFactor: 1,
        color: 'lightskyblue',
      },
      {
        name: 'speed',
        min: 0,
        max: 10,
        value: 5, //0.5 0->1,
        correctionFactor: 10,
        color: 'lightslategray',
      },
      {
        name: 'duration',
        min: 0,
        max: 10,
        value: 4, //0.4 0->1,
        correctionFactor: 10,
        color: 'lightseagreen',
      },
    ],
  },
  [PEDAL_NAME.FLANGER]: {
    name: PEDAL_NAME.FLANGER,
    type: PEDAL_TYPE.FLANGER,
    zoomIn: false,
    icon: 'assets/icons/flanger.svg',
    bgcolor: '#b1428b',
    fcolor: 'black',
    settingsList: [
      {
        name: 'delay',
        min: 0,
        max: 0.1,
        value: 5, //0.005 0->0.1?,
        correctionFactor: 1,
        color: 'lightslategray',
      },
      {
        name: 'depth',
        min: 0,
        max: 100,
        value: 2, //0.002 0->0.1,
        correctionFactor: 1000,
        color: 'lightseagreen',
      },
      {
        name: 'feedback',
        min: 0,
        max: 100,
        value: 5, //0.5 0->1,
        correctionFactor: 100,
        color: 'lightskyblue',
      },
      {
        name: 'speed',
        min: 0,
        max: 100,
        value: 25, // 0.25 0->1,
        correctionFactor: 100,
        color: 'brown',
      },
    ],
  },
  [PEDAL_NAME.REVERB]: {
    name: PEDAL_NAME.REVERB,
    type: PEDAL_TYPE.REVERB,
    zoomIn: false,
    icon: 'assets/icons/flanger.svg',
    bgcolor: 'rgb(139,98,79)',
    fcolor: 'black',
    settingsList: [
      {
        name: 'wet',
        min: 0,
        max: 1,
        value: 1,
        correctionFactor: 1,
        color: 'lightslategray',
      },
      {
        name: 'level',
        min: 0,
        max: 1,
        value: 1,
        correctionFactor: 1,
        color: 'lightseagreen',
      },
    ],
  },
};
