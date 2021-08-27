var characterIdleAnimationId = 0;
var characterRunAnimationId = 0;
var characterJumpAnimationId = 0;
var characterDeadAnimationId = 0;
var scoreCountAnimationId = 0;
var BoxAnimationId = 0;
var BoxAnimationId2 = [];

var isRunning = false;
var isJumping = false;
var isDead = false;
var gameOver = false;

// Onload Animation
function onLoadAnimation() {
	characterIdleAnimationId = setInterval(characterIdleAnimation, 100);
}

// Idle Animation
var characterIdleImageNo = 2;

function characterIdleAnimation() {
	var characterImageId = document.getElementById('characterImageId');
	characterImageId.src = 'img/Idle (' + characterIdleImageNo + ').png';
	characterIdleImageNo += 1;

	if (characterIdleImageNo > 10) {
		characterIdleImageNo = 1;
	}
}

// OnKeyUp Animation
function onKeyUpAnimation(event) {
	var key = event.which;

	if (key == 13) {
		if (!isRunning && !gameOver) {
			// Start run animation
			isRunning = true;
			characterRunAnimationId = setInterval(characterRunAnimation, 100);

			// Hide Text
			var startText = document.getElementById('gameStartText');
			startText.style.visibility = 'hidden';

			// Start Score Count
			scoreCountAnimationId = setInterval(countScore, 100);

			// Start Creating Boxes
			BoxAnimationId = setInterval(generateRandomBoxes, 1000);
			// setInterval(boxAnimation, 100);
		} else if (gameOver) {
			window.location = 'index.html';
		}
	} else if (key == 27) {
		clearAllAnimations();
	} else if (key == 32 && isRunning && !isJumping) {
		isJumping = true;
		characterJumpAnimationId = setInterval(characterJumpAnimation, 100);
	}
}

// Run Animation
var characterRunImageNo = 1;

function characterRunAnimation() {
	clearInterval(characterIdleAnimationId);
	var characterImageId = document.getElementById('characterImageId');
	characterImageId.src = 'img/Run (' + characterRunImageNo + ').png';
	characterRunImageNo += 1;

	if (characterRunImageNo > 8) {
		characterRunImageNo = 1;
	}
}

// Jump Animation
var characterJumpImageNo = 1;

function characterJumpAnimation() {
	clearInterval(characterRunAnimationId);
	clearInterval(characterIdleAnimationId);
	var characterImageId = document.getElementById('characterImageId');
	characterImageId.src = 'img/Jump (' + characterJumpImageNo + ').png';

	if (characterJumpImageNo > 1 && characterJumpImageNo < 9) {
		currentMarginTop = window.getComputedStyle(characterImageId).marginTop;
		currentMarginLeft = window.getComputedStyle(characterImageId).marginLeft;
		characterMarginTop = parseInt(currentMarginTop) - 15;
		characterImageId.style.marginTop = characterMarginTop + 'px';
	} else if (characterJumpImageNo == 9) {
		characterImageId.style.marginTop = '150px';
	}

	if (characterJumpImageNo > 9) {
		characterJumpImageNo = 1;
	} else if (characterJumpImageNo == 9) {
		isJumping = false;
		clearInterval(characterJumpAnimationId);
		characterRunAnimationId = setInterval(characterRunAnimation, 100);
	}

	characterJumpImageNo += 1;
}

// Dead Animation
var characterDeadImageNo = 1;

function characterDeadAnimation() {
	var characterImageId = document.getElementById('characterImageId');
	characterImageId.src = 'img/Dead (' + characterDeadImageNo + ').png';
	characterImageId.className = 'character character_dead';

	if (characterDeadImageNo == 10) {
		characterDeadImageNo = 1;

		clearInterval(characterDeadAnimationId);
		isDead = true;
	}

	characterDeadImageNo += 1;
}

// Generate Boxes
var boxId = 1;
var randomMarginLeft = 0;

function generateRandomBoxes() {
	// Generate a random value
	var randomNo2 = Math.floor(Math.random() * 100);
	var randomNo = Math.floor(Math.random() * 1000) + 200;

	if (randomMarginLeft < randomNo) {
		randomMarginLeft = randomNo;
	} else {
		randomMarginLeft += randomNo;
	}

	// Create a div
	var gameArea = document.getElementById('gameArea');
	var box = document.createElement('img');
	box.src = './img/barrier.png';
	box.className = 'img';
	box.id = 'box' + boxId;
	box.style.marginLeft = randomMarginLeft + 'px';

	// Appending the created box
	gameArea.appendChild(box);

	BoxAnimationId2.push(setInterval(animateBoxes, 100, 'box' + boxId));

	// Increment BoxId
	boxId += 1;
}

// Box Animation
function animateBoxes(id) {
	var div = document.getElementById(id);
	var CurrentMarginLeft = window.getComputedStyle(div).marginLeft;
	var divMarginLeft = parseInt(CurrentMarginLeft) - 20;

	if (divMarginLeft > 0) {
		div.style.marginLeft = divMarginLeft + 'px';
	} else {
		div.remove();
	}

	// Check For Out
	var characterImageId = document.getElementById('characterImageId');
	var characterMarginTop = window.getComputedStyle(characterImageId).marginTop;

	if (divMarginLeft < 210 && divMarginLeft > 190) {
		if (characterMarginTop == '150px') {
			// window.location = 'index.html';
			gameOver = true;
			var gameArea = document.getElementById('gameArea');
			gameArea.style.display = 'none';

			characterDeadAnimationId = setInterval(characterDeadAnimation, 100);
			isDead = true;

			var startText = document.getElementById('gameStartText');
			startText.innerHTML = 'Game Over!';
			startText.style.visibility = 'visible';

			var finalScore = document.getElementById('finalScore');
			finalScore.innerHTML = 'Your Score is ' + score;

			clearAllAnimations();
			isRunning = false;
		}
	}
}

// Pause Game
function clearAllAnimations() {
	isRunning = false;

	clearInterval(characterIdleAnimationId);
	clearInterval(characterRunAnimationId);
	clearInterval(characterJumpAnimationId);
	clearInterval(scoreCountAnimationId);
	BoxAnimationId2.forEach(element => {
		clearInterval(element);
	});
	clearInterval(BoxAnimationId);
}

// Reload Game
function reloadGame() {
	window.location = 'index.html';
}

// Count Score
var score = 0;

function countScore() {
	var scoreDisplay = document.getElementById('scoreDisplay');
	score += 1;
	scoreDisplay.innerHTML = score;
}
