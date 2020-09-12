// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "черный", "weight": 22},
  {"kind": "Ананас", "color": "желтый", "weight": 80},
  {"kind": "Банан", "color": "желтый", "weight": 120},
  {"kind": "Кешью", "color": "белый", "weight": 2},
  {"kind": "Миниме", "color": "голубой", "weight": 8}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    var newLi = CreateFruitLi(i, fruits[i])

    fruitsList.appendChild(newLi);
  }
};

function CreateFruitLi(index, fruit) {
  var newLi = document.createElement('li');

  var newInfoDiv = document.createElement('div');
  newInfoDiv.className = "fruit__info";
  switch (fruit.color) {
    case "красный":
      newLi.className = "fruit__item fruit_red";
      break;
    case "оранжевый":
      newLi.className = "fruit__item fruit_orange";
      break;
    case "желтый":
      newLi.className = "fruit__item fruit_yellow";
      break;
    case "зеленый":
      newLi.className = "fruit__item fruit_green";
      break;
    case "голубой":
      newLi.className = "fruit__item fruit_cyan";
      break;
    case "синий":
      newLi.className = "fruit__item fruit_blue";
      break;
    case "фиолетовый":
      newLi.className = "fruit__item fruit_violet";
      break;
    case "белый":
      newLi.className = "fruit__item fruit_white";
      break;
    default:
      newLi.className = "fruit__item fruit_black";
      break;
  }
  newInfoDiv.innerHTML = `<div>index: ${index}</div><div>kind: ${fruit.kind}</div><div>color: ${fruit.color}</div><div>weight (кг): ${fruit.weight}</div>`;
  newLi.appendChild(newInfoDiv);
  return newLi;
}

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {

  for (let i = 0; i < fruits.length; i++) {
    let rnd1 = getRandomInt(0, fruits.length - 1);
    let rnd2 = getRandomInt(0, fruits.length - 1);
    [fruits[rnd1], fruits[rnd2]] = [fruits[rnd2], fruits[rnd1]];
  }
  display();
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  fruits.filter((item) => {
    // TODO: допишите функцию
  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  if (a.color > b.color) {
    return true;
  } else {
    return false;
  }
};

const comparationWeight = (a, b) => {
  if (a.weight > b.weight) {
    return true;
  } else {
    return false;
  }
};

function swap(items, firstIndex, secondIndex) {
  [items[firstIndex], items[secondIndex]] = [items[secondIndex], items[firstIndex]];
}

function partition(items, left, right) {
  var pivot = items[Math.floor((right + left) / 2)],
    i = left,
    j = right;
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
    }
  }
  return i;
}

const sortAPI = {
  bubbleSort(arr, comparation) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (comparation(arr[j], arr[j + 1])) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  if (sortKind == 'bubbleSort') {
    sortKind = 'quickSort';
  } else {
    sortKind = 'bubbleSort';
  }
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.innerHTML = "sorting...";
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationWeight);
  display();
  sortTimeLabel.innerHTML = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if (kindInput.value == "" || colorInput.value == "" || weightInput.value == "") {
    alert("Некорректные данные");
    return;
  }
  var newFruit = { "kind": kindInput.value, "color": colorInput.value, "weight": weightInput.value };
  var newLi = CreateFruitLi(fruits.length, newFruit);
  fruits.push(newFruit);
  fruitsList.appendChild(newLi);
  //display();
});
