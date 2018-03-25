
export const NODE_TYPE = {
    VOLUME: 'VOLUME',
    DISTORSION: 'DISTORSION',
    DELAY: 'DELAY',
    FLANGER: 'FLANGER'
};


export const NODE_PROPERTIES = {

    [NODE_TYPE.VOLUME]: {
        label: 'Volume node',
        icon: "assets/icons/input.svg",
    },
    [NODE_TYPE.DISTORSION]: {
        label: 'Distorsion node',
        icon: "assets/icons/input.svg",
    },
    [NODE_TYPE.DELAY]: {
        label: 'Delay node',
        icon: "assets/icons/effect.svg",
    },
    [NODE_TYPE.FLANGER]: {
        label: 'Flanger node',
        icon: "assets/icons/output.svg",
    }
}
