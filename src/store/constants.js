
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
    },
    [NODE_TYPE.DISTORSION]: {
        label: 'Distorsion node',
        icon: 'assets/icons/input.svg',
        bgcolor: '#3b3f44',
        fcolor: 'orange',
    },
    [NODE_TYPE.DELAY]: {
        label: 'Delay node',
        icon: 'assets/icons/effect.svg',
        bgcolor: '#eedbc3',
        fcolor: 'blue',
    },
    [NODE_TYPE.FLANGER]: {
        label: 'Flanger node',
        icon: 'assets/icons/output.svg',
        bgcolor: '#b1428b',
        fcolor: 'black',
    }
}
