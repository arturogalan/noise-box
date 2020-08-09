# 🎸noise-box
> A Vue project to test WebAudio capabilites and deal with Vue/Vuex/css/html/javascript.
All the webaudio nodes creation and structures of different pedal effects and amp simulation relies on noisefy library.

## Project setup
```
Bug or new funcionalities to add? [Issues section](https://github.com/arturogalan/noise-box/issues)

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# generate icons
npm run build:icons
```
## TO-DO
When changin input/output maybe we need a reset?
Add clean presets somewhat
Watchers in chickenKnob to bind the preset value when selected, more presets  
Remove unnecessary Vue.set when setting vars
separete entities pedal and entities amp  
Disto advanced settings to make own distos by users.  
LocalStorage saving of user presets  
Tuner  
Noise gate
Curves graphs  
Midi 
Mixin for all the different knobs  

input 0-10 first gain node in the chain
volume 0-1 gain node just before equalizer
master 0-10 last gain node after equalizer
output 0-1 last gain node in the chain
