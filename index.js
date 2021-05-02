//Global Controllers
let widthDiv = "5px";
let speed = 20;
let arrayRandom = [];
let arraySize = 0;

// ===> Buttons
const bubbleSortingButton = document.getElementById("bubble_sort");
const selectingSortingButton = document.getElementById("selecting_sort");
const generateArrayButton = document.getElementById("generate");

// ===> Container
const getContainerChart = document.getElementById("container_charts");

// ===> Slider
const getSlider = document.getElementById("range");

// ===> Speed Input
const getSpeedInput = document.getElementById("speed");

// ===> Event Listeners

document.addEventListener("DOMContentLoaded", () => {
  getSlider.disabled = true;
});

getSpeedInput.addEventListener("change", (e) => {
  let value = parseInt(e.target.value);

  speed = value;
});

getSlider.addEventListener("change", (e) => {
  cleanContainer(getContainerChart);
  arraySize = e.target.value;

  arrayRandom = generateRandomArray(0, arraySize, 0, []);

  arrayRandom.forEach((x, idx) => {
    let h = (x * 5).toString();
    addDiv(getContainerChart, `${h}px`, widthDiv, String(x), idx);
  });
});

bubbleSortingButton.addEventListener("click", () => {
  arrayRandom = bubbleSorting([...arrayRandom]);
});
selectingSortingButton.addEventListener("click", () => {
  arrayRandom = selectionSorting([...arrayRandom]);
});

generateArrayButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (arraySize === 0) {
    arrayRandom = generateRandomArray(0, 100, 0, []);
    getSlider.value = 100;
  } else {
    arrayRandom = generateRandomArray(0, arraySize, 0, []);
  }

  cleanContainer(getContainerChart);
  arrayRandom.forEach((x, idx) => {
    let h = (x * 5).toString();
    addDiv(getContainerChart, `${h}px`, widthDiv, String(x), idx);
  });

  getSlider.disabled = false;
});

//Promise  => To Loop Waiting
const wait = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, parseInt(speed));
    console.log("Ciao");
  });
};

// Recursive => Generate Random Array
const generateRandomArray = (min = 0, max = 100, c = 0, arr = []) => {
  let counter = c;
  const array = arr;
  if (c >= max) {
    return array;
  }
  const random = Math.floor(Math.random() * (max - min) + min);

  if (!array.includes(random)) {
    array.push(random);
    counter++;
  }
  return generateRandomArray(min, max, counter, array);
};

//Add Lines
const addDiv = (container, h, w, value, id = 0) => {
  const line = document.createElement("div");
  line.style.height = h;
  line.style.width = w;
  line.id = id;
  line.style.border = "none";
  line.style.textAlign = "center";
  line.style.color = "#FFFFFF";
  line.style.fontSize = "10px";
  line.style.background = "#017BFE";
  container.appendChild(line);
};

// => Selecting Sort Algo
const selectionSorting = async (arr) => {
  let len = arr.length;

  for (let i = 0; i < len; i++) {
    let min = i;

    for (let j = i + 1; j < len; j++) {
      if (arr[min] > arr[j]) {
        min = j;
        animationDiv(arr[i], "background", `green`);
        animationDiv(arr[j], "background", `red`);
        animationDiv(arr[i], "height", `${arr[i] * 5}px`);
        await wait();
        animationDiv(arr[j], "height", `${arr[j] * 5}px`);
      }
    }
    if (min !== i) {
      let tmp = arr[i];
      arr[i] = arr[min];
      arr[min] = tmp;
    }
  }
  return arr;
};

const bubbleSorting = async (arr) => {
  let swapped = false;

  const a = [...arr];

  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;

    await wait();
    for (let j = 0; j < a.length - i; j++) {
      animationDiv(a[i], "height", `${a[i] * 5}px`);
      animationDiv(a[i], "background", `green`);
      animationDiv(a[j], "background", `red`);
      animationDiv(a[j], "height", `${a[j] * 5}px`);
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
        animationDiv(a[i], "background", `#017BFE`);
        animationDiv(a[j], "background", `#017BFE`);
      }
    }

    if (!swapped) {
      return a;
    }
  }

  return a;
};

/// => Utils
const cleanContainer = (container) => (container.textContent = "");

const animationDiv = (id, property, value) => {
  const div = getElementByIdAndReturn(id);
  giveStyleToElement(div, property, value);
};

const getElementByIdAndReturn = (id) => {
  const el = document.getElementById(id);
  return el;
};

const giveStyleToElement = (el, styleProp, value) => {
  el.style[styleProp] = value;
};
