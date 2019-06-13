
export const PEDAL_TYPE = {
  // VOLUME: 'volume',
  DISTORTION: 'distortion',
  DELAY: 'delay',
  FLANGER: 'flanger',
  REVERB: 'reverb',
};
export const AMP_COMPONENT_TYPE = {
  VOLUME: 'volume',
  EQUALIZER: 'equalizer',
  PRESENCE: 'presence',
};
export const AMP_COMPONENT_PROPERTIES = {
  [AMP_COMPONENT_TYPE.VOLUME]: {
    name: 'volume',
    type: AMP_COMPONENT_TYPE.VOLUME,
    settingsList: [
      {
        name: 'level',
        min: 0,
        max: 1,
        value: 4,
        type: 'knob',
        correctionFactor: 1,
        color: 'lightskyblue',
      },
    ],
  },
  [AMP_COMPONENT_TYPE.EQUALIZER]: {
    name: 'equalizer',
    type: AMP_COMPONENT_TYPE.EQUALIZER,
    settingsList: [
      {
        name: 'trebbleGain',
        min: 0,
        max: 100,
        value: 5,
        type: 'knob',
        correctionFactor: 10,
        color: 'lightskyblue',
      },
      {
        name: 'middleGain',
        min: 0,
        max: 100,
        value: 1,
        type: 'knob',
        correctionFactor: 10,
        color: 'lightskyblue',
      },
      {
        name: 'bassGain',
        min: 0,
        max: 100,
        value: 1,
        type: 'knob',
        correctionFactor: 10,
        color: 'lightskyblue',
      },
    ],
  },
  [AMP_COMPONENT_TYPE.PRESENCE]: {
    name: 'presence',
    type: AMP_COMPONENT_TYPE.PRESENCE,
    settingsList: [
      {
        name: 'gain',
        min: 0,
        max: 100,
        value: 4,
        type: 'knob',
        correctionFactor: 10,
        color: 'lightskyblue',
      },
    ],
  },
};


export const PEDAL_PROPERTIES = {
  [PEDAL_TYPE.DISTORTION]: {
    name: 'distortion',
    zoomIn: false,
    icon: 'assets/icons/distortion.svg',
    bgcolor: '#3b3f44',
    fcolor: 'orange',
    settingsList: [
      {
        name: 'gain',
        min: 0,
        max: 100,
        value: 50,
        correctionFactor: 1,
        color: 'lightskyblue',
      },
      {
        name: 'intensity',
        min: 0,
        max: 100,
        value: 80,
        correctionFactor: 1,
        color: 'lightslategray',
      },
      // {
      //     name: 'drive',
      //     min:0,
      //     max:100,
      //     value: 80,
      //     color: 'lightseagreen'
      // },
    ],
  },
  [PEDAL_TYPE.DELAY]: {
    name: 'delay',
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
  [PEDAL_TYPE.FLANGER]: {
    name: 'flanger',
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
  [PEDAL_TYPE.REVERB]: {
    name: 'reverb',
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
