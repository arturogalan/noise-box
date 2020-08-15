export const AMP_COMPONENT_TYPE = {
  VOLUME: 'volume',
  EQUALIZER: 'equalizer',
  PRESENCE: 'presence',
  DISTORTION: 'distortion',
}
// This order is the order the components appear in the amp header
export const AMP_COMPONENT_NAME = {
  DISTORTION: 'distortionStage2',
  EQUALIZER: 'equalizer',
  PRESENCE: 'presence',
  VOLUME: 'outputGain',
  MASTER: 'master',
}
export const AMP_SETTING_TYPE = {
  INPUT: 'input',
  OUTPUT: 'output',
  KNOB: 'knob',
  INTERNAL: 'internal',
  BOOLEAN: 'boolean',
  SELECT: 'select',
  CABINET: 'cabinet',
}
// Properties for each of the components added to the amp mapped by name
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
}

export const PEDAL_TYPE = {
  BOOST: 'boost',
  DELAY: 'delay',
  FLANGER: 'flanger',
  REVERB: 'reverb',
  TREMOLO: 'tremolo',
}
export const PEDAL_NAME = {
  BOOST: 'boost',
  DELAY: 'delay',
  FLANGER: 'flanger',
  REVERB: 'reverb',
  TREMOLO: 'tremolo',
}

export const PEDAL_PROPERTIES = {
  [PEDAL_NAME.BOOST]: {
    name: PEDAL_NAME.BOOST,
    type: PEDAL_TYPE.BOOST,
    zoomIn: false,
    icon: 'assets/icons/delay.svg',
    bgcolor: '#AAAAAA',
    fcolor: 'black',
    settingsList: [
      {
        name: 'gain',
        value: 1,
        color: 'lightskyblue',
      },
      {
        name: 'tone',
        value: 5,
        color: 'lightslategray',
      },
    ],
  },
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
        value: 3,
        color: 'lightskyblue',
      },
      {
        name: 'speed',
        value: 2,
        color: 'lightslategray',
      },
      {
        name: 'duration',
        value: 5,
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
        value: 5, // 0.005 0->0.1?,
        color: 'lightslategray',
      },
      {
        name: 'depth',
        value: 2, // 0.002 0->0.1,
        color: 'lightseagreen',
      },
      {
        name: 'feedback',
        value: 5, // 0.5 0->1,
        color: 'lightskyblue',
      },
      {
        name: 'speed',
        value: 5,
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
    fcolor: 'white',
    settingsList: [
      {
        name: 'wet',
        value: 1,
        color: 'lightslategray',
      },
      {
        name: 'level',
        value: 1,
        color: 'lightseagreen',
      },
    ],
  },
  [PEDAL_NAME.TREMOLO]: {
    name: PEDAL_NAME.TREMOLO,
    type: PEDAL_TYPE.TREMOLO,
    zoomIn: false,
    icon: 'assets/icons/flanger.svg',
    bgcolor: 'rgb(51,133,133)',
    fcolor: 'white',
    settingsList: [
      {
        name: 'speed',
        value: 5,
        color: 'brown',
      },
    ],
  },
}
