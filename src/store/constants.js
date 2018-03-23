
export const NODE_TYPE = {
    INPUT: 'INPUT',
    FILTER: 'FILTER',
    OUTPUT: 'OUTPUT',
};


export const NODE_SUBTYPE = {
    [NODE_TYPE.INPUT]: 
        {
            MEDIA_STREAM: { 
                value: 'MEDIA_STREAM', 
                label: 'Media Stream Input',
                icon: "assets/icons/input.svg",
                icon2: "assets/icons/icons8-led-diode-filled-50.png"
            }
        }
    ,
    [NODE_TYPE.FILTER]: 
        {
            DELAY_NODE: { 
                value: 'DELAY_NODE', 
                label: 'Delay',
                icon: "assets/icons/effect.svg"
            }
    }
    ,
    [NODE_TYPE.OUTPUT]: 
        {
            AUDIO_DESTINATION_NODE: { 
                value: 'AUDIO_DESTINATION_NODE', 
                label: 'Destination output',
                icon: "assets/icons/output.svg"
        }
    }
    ,
};

