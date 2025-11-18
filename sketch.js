let spriteSheet1;
let spriteSheet2;
let frameIndex1 = 0;
let frameIndex2 = 0;
let frameWidth1;
let frameHeight1;
let frameWidth2;
let frameHeight2;
let animationSpeed = 0.1;
let isAnimating = false;
let isLooping1 = true;  // 角色1是否循環
let isLooping2 = true;  // 角色2是否循環

function preload() {
  spriteSheet1 = loadImage('all.png');
  spriteSheet2 = loadImage('3_all.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 第一個角色：235×52，5張圖
  frameWidth1 = 35;
  frameHeight1 = 52;
  
  // 第二個角色：37×64，9張圖
  frameWidth2 = 37;
  frameHeight2 = 64;
}

function draw() {
  background('#faedcd');
  
  // 只有在動畫開啟時才更新幀索引
  if (isAnimating) {
    frameIndex1 += animationSpeed;
    frameIndex2 += animationSpeed;
    
    // 角色1：完成5幀後停止在最後一幀
    if (frameIndex1 >= 5 && isLooping1) {
      frameIndex1 = 0;  // 如果循環，重新開始
    } else if (frameIndex1 >= 5) {
      frameIndex1 = 4.99;  // 停止在最後一幀
    }
    
    // 角色2：完成9幀後停止在最後一幀
    if (frameIndex2 >= 9 && isLooping2) {
      frameIndex2 = 0;  // 如果循環，重新開始
    } else if (frameIndex2 >= 9) {
      frameIndex2 = 8.99;  // 停止在最後一幀
    }
  }
  
  // 計算當前幀的索引
  let currentFrame1 = floor(frameIndex1);
  let currentFrame2 = floor(frameIndex2);
  
  // 計算源圖片的x座標
  let sourceX1 = currentFrame1 * 47;  // 原始幀寬度 (235/5)
  let sourceX2 = currentFrame2 * 37;  // 第二個角色幀寬度
  
  // 第一個角色在視窗中心左邊（固定位置）
  let centerX1 = width / 2 - 100;
  let centerY = height / 2;
  
  // 第二個角色在第一個角色的右邊（固定位置）
  let centerX2 = width / 2 + 100;
  
  // 繪製第一個角色（站在固定位置，只做動作變化）
  image(
    spriteSheet1,
    centerX1 - frameWidth1 / 2,
    centerY - frameHeight1 / 2,
    frameWidth1,
    frameHeight1,
    sourceX1,
    0,
    frameWidth1,
    frameHeight1
  );
  
  // 繪製第二個角色（站在固定位置，只做動作變化）
  image(
    spriteSheet2,
    centerX2 - frameWidth2 / 2,
    centerY - frameHeight2 / 2,
    frameWidth2,
    frameHeight2,
    sourceX2,
    0,
    frameWidth2,
    frameHeight2
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  // 按下滑鼠切換動畫開關
  if (!isAnimating) {
    // 開始動畫前重置幀索引
    frameIndex1 = 0;
    frameIndex2 = 0;
    isAnimating = true;
  } else {
    // 停止動畫
    isAnimating = false;
  }
}
