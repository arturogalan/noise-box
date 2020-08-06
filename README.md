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
Add clean presets somewhat
when only standby pressed...maybe some help?
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

Los knobs normalizan y denormalizan para mostrar 1-100 pero setean los efectos 1-10....revisar el efecto volumen para ponerlo 1-10 y revisar los knobs de volumen
Para los inputs outputs habra que hacer lo mismo y normalizar-denormalizar en la ui para que llegue 1-10
La definicion de amp esta 1-10