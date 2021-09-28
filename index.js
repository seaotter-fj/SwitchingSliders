let target = document.getElementById("target");

let sliderItems = document.querySelectorAll(
  "#target .slider-data .slider-item"
);

let sliderShow = document.createElement("div");
let main = document.createElement("div");
let extra = document.createElement("div");

sliderShow.classList.add("col-12", "d-flex", "flex-nowrap", "overflow-hiddens");
main.classList.add("expand-animation");
extra.classList.add("deplete-animation");

// appendコーナー
main.append(sliderItems[0]);
sliderShow.append(main);
sliderShow.append(extra);
target.append(sliderShow);

// ボタンを作成していきます。
let controls = document.createElement("div");
controls.classList.add("offset-5", "mt-2");

let leftBtn = document.createElement("button");
leftBtn.classList.add("btn", "btn-light");
leftBtn.innerHTML = "<";

let rightBtn = document.createElement("button");
rightBtn.classList.add("btn", "btn-light");
rightBtn.innerHTML = ">";

// appendコーナー
controls.append(leftBtn);
controls.append(rightBtn);
target.append(controls);

// main(expand)の方にindexの初期値を設定
main.setAttribute("data-index", "0");

// btnの(1)or(-1)に反応して次の要素を決定するslideJumpを定義
const slideJump = (steps, animationType) => {
  let index = Number(main.getAttribute("data-index"));
  let currentElement = sliderItems.item(index);

  index += steps;

  if (index < 0) index = sliderItems.length - 1;
  else if (index >= sliderItems.length) index = 0;

  let nextElement = sliderItems.item(index);

  main.setAttribute("data-index", String(index));

  animateMain(currentElement, nextElement, animationType);
};

// 現在の要素と次の要素と方向を元に右方向から出てくるアニメーションする関数:
const animateMain = (currentElement, nextElement, animationType) => {
  extra.innerHTML = "";
  extra.append(currentElement);

  main.innerHTML = "";
  main.append(nextElement);

  main.classList.add("expand-animation");
  extra.classList.add("deplete-animation");

  if (animationType === "right") {
    sliderShow.innerHTML = "";
    sliderShow.append(extra);
    sliderShow.append(main);
  } else if (animationType === "left") {
    sliderShow.innerHTML = "";
    sliderShow.append(main);
    sliderShow.append(extra);
  }
};

leftBtn.addEventListener("click", () => {
  slideJump(-1, "left");
});
rightBtn.addEventListener("click", () => {
  slideJump(+1, "right");
});
