
export const NODE_TYPE = {
    INPUT: {
        value: 'INPUT',
        label: 'Input node',
        icon: "assets/icons/input.svg",
    },
    FILTER: {
        value: 'FILTER',
        label: 'Filter node',
        icon: "assets/icons/effect.svg",
    },
    OUTPUT: {
        value: 'OUTPUT',
        label: 'Output node',
        icon: "assets/icons/output.svg",
    }
};


export const NODE_SUBTYPE = {
    [NODE_TYPE.INPUT.value]:
        {
            MEDIA_STREAM: {
                value: 'MEDIA_STREAM',
                label: 'Media Stream Input',
                icon: "assets/icons/input.svg",
            }
        }
    ,
    [NODE_TYPE.FILTER.value]:
        {
            DELAY_NODE: {
                value: 'DELAY_NODE',
                label: 'Delay',
                icon: "assets/icons/effect.svg",
            }
        }
    ,
    [NODE_TYPE.OUTPUT.value]:
        {
            AUDIO_DESTINATION_NODE: {
                value: 'AUDIO_DESTINATION_NODE',
                label: 'Destination output',
                icon: "assets/icons/output.svg",
            }
        }
    ,
};

