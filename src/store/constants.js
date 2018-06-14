
export const PEDAL_TYPE = {
    VOLUME: 'VOLUME',
    DISTORSION: 'DISTORSION',
    DELAY: 'DELAY',
    FLANGER: 'FLANGER'
};


export const PEDAL_PROPERTIES = {

    [PEDAL_TYPE.VOLUME]: {
        name: 'volume',
        icon: 'assets/icons/volume.svg',
        bgcolor: '#688c4b',
        fcolor: 'black',
        settingsList: [
            {
                name: 'level',
                min:0,
                max:1,
                initialValue: 0.5,
                correctionFactor: 1,
                color: 'lightskyblue',
            },
        ]
    },
    [PEDAL_TYPE.DISTORSION]: {
        name: 'distortion',
        icon: 'assets/icons/distorsion.svg',
        bgcolor: '#3b3f44',
        fcolor: 'orange',
        settingsList: [
            {
                name: 'gain',
                min:0,
                max:100,
                initialValue: 50,
                correctionFactor: 1,
                color: 'lightskyblue'
            },
            {
                name: 'intensity',
                min:0,
                max:100,
                initialValue: 80,
                correctionFactor: 1,
                color: 'lightslategray'
            },
            // {
            //     name: 'drive',
            //     min:0,
            //     max:100,
            //     initialValue: 80,
            //     color: 'lightseagreen'
            // },
        ]
    },
    [PEDAL_TYPE.DELAY]: {
        name: 'delay',
        icon: 'assets/icons/delay.svg',
        bgcolor: '#eedbc3',
        fcolor: 'blue',
        settingsList: [
            {
                name: 'wet',
                min:0,
                max:100,
                initialValue: 1,
                correctionFactor: 1,
                color: 'lightskyblue'
            },
            {
                name: 'speed',
                min:0,
                max:10,
                initialValue: 5, //0.5 0->1,
                correctionFactor: 10,
                color: 'lightslategray'
            },
            {
                name: 'duration',
                min:0,
                max:10,
                initialValue: 4, //0.4 0->1,
                correctionFactor: 10,
                color: 'lightseagreen'
            },
        ]
    },
    [PEDAL_TYPE.FLANGER]: {
        name: 'flanger',
        icon: 'assets/icons/flanger.svg',
        bgcolor: '#b1428b',
        fcolor: 'black',
        settingsList: [
            {
                name: 'delay',
                min:0,
                max:0.1,
                initialValue: 5, //0.005 0->0.1?,
                correctionFactor: 1,
                color: 'lightslategray'
            },
            {
                name: 'depth',
                min:0,
                max:100,
                initialValue: 2, //0.002 0->0.1,
                correctionFactor: 1000,
                color: 'lightseagreen'
            },
            {
                name: 'feedback',
                min:0,
                max:100,
                initialValue: 5, //0.5 0->1,
                correctionFactor: 100,               
                color: 'lightskyblue'
            },
            {
                name: 'speed',
                min:0,
                max:100,
                initialValue: 25, // 0.25 0->1,
                correctionFactor: 100,                
                color: 'lightseagreen'
            }
        ]
    }
}
