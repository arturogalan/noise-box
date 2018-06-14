<template>
<div>
  <p>Custom range slider:</p>
<div class="slidecontainer">
  <input type="range" min="1" max="100" value="50" class="slider" orient="vertical" id="myRange">
  <!-- <input type="range" min="1" max="100" value="50" class="slider" orient="vertical" id="myRange">
  <input type="range" min="1" max="100" value="50" class="slider" orient="vertical" id="myRange">
  <input type="range" min="1" max="100" value="50" class="slider" orient="vertical" id="myRange"> -->

</div>
</div>

</template>
<script>
export default {
  template:'#vue-slider-nb'
}
</script>

<style>

.slidecontainer {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    margin-left: 15%;
}

.slider {
    width:300px;
   -webkit-appearance: none;
    height: 25%;
    transform: translateY(30px) rotate(90deg);
    transform-origin: 0;
    border-radius: 5px;   
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    background: lightskyblue;
}

/* .slider::-webkit-slider-runnable-track {
    background: yellow;  
    border: 1px solid black;  
}*/

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
}


/* .slider::-webkit-slider-thumb {
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%; 
    background: #4CAF50;
    cursor: pointer;
} */

/* .slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
    -webkit-appearance: slider-vertical;
} */
</style>
