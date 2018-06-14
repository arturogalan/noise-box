
export const PEDAL_TYPE = {
    VOLUME: 'VOLUME',
    DISTORSION: 'DISTORSION',
    DELAY: 'DELAY',
    FLANGER: 'FLANGER'
};


export const PEDAL_PROPERTIES = {

    [PEDAL_TYPE.VOLUME]: {
        label: 'Volume node',
        icon: 'assets/icons/volume.svg',
        bgcolor: '#688c4b',
        fcolor: 'black',
        settingsList: [
            {
                name: 'volume',
                min:0,
                max:100,
                initialValue: 68,
                color: 'lightskyblue',
            },
        ]
    },
    [PEDAL_TYPE.DISTORSION]: {
        label: 'Distorsion node',
        icon: 'assets/icons/distorsion.svg',
        bgcolor: '#3b3f44',
        fcolor: 'orange',
        settingsList: [
            {
                name: 'level',
                min:0,
                max:100,
                initialValue: 68,
                color: 'lightskyblue'
            },
            {
                name: 'tone',
                min:0,
                max:100,
                initialValue: 40,
                color: 'lightslategray'
            },
            {
                name: 'drive',
                min:0,
                max:100,
                initialValue: 80,
                color: 'lightseagreen'
            },
        ]
    },
    [PEDAL_TYPE.DELAY]: {
        label: 'Delay node',
        icon: 'assets/icons/delay.svg',
        bgcolor: '#eedbc3',
        fcolor: 'blue',
        settingsList: [
            {
                name: 'level',
                min:0,
                max:100,
                initialValue: 20,
                color: 'lightskyblue'
            },
            {
                name: 'f.back',
                min:0,
                max:100,
                initialValue: 50,
                color: 'lightslategray'
            },
            {
                name: 'd.time',
                min:0,
                max:100,
                initialValue: 22,
                color: 'lightseagreen'
            },
        ]
    },
    [PEDAL_TYPE.FLANGER]: {
        label: 'Flanger node',
        icon: 'assets/icons/flanger.svg',
        bgcolor: '#b1428b',
        fcolor: 'black',
        settingsList: [
            {
                name: 'deph',
                min:0,
                max:100,
                initialValue: 60,
                color: 'lightslategray'
            },
            {
                name: 'rate',
                min:0,
                max:100,
                initialValue: 10,
                color: 'lightseagreen'
            }
        ]
    }
}
