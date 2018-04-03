
export const NODE_TYPE = {
    VOLUME: 'VOLUME',
    DISTORSION: 'DISTORSION',
    DELAY: 'DELAY',
    FLANGER: 'FLANGER'
};


export const NODE_PROPERTIES = {

    [NODE_TYPE.VOLUME]: {
        label: 'Volume node',
        icon: 'assets/icons/input.svg',
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
    [NODE_TYPE.DISTORSION]: {
        label: 'Distorsion node',
        icon: 'assets/icons/input.svg',
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
    [NODE_TYPE.DELAY]: {
        label: 'Delay node',
        icon: 'assets/icons/effect.svg',
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
    [NODE_TYPE.FLANGER]: {
        label: 'Flanger node',
        icon: 'assets/icons/output.svg',
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
