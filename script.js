var characterIdleAnimationId = 0;
var characterRunAnimationId = 0;
var characterJumpAnimationId = 0;
var scoreCountAnimationId = 0;
var BoxAnimationId = 0;
var BoxAnimationId2 = 0;

var isRunning = false;
var isJumping = false;

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
		if (!isRunning) {
			// Start run animation
			isRunning = true;
			characterRunAnimationId = setInterval(characterRunAnimation, 100);

			// Hide Text
			var startText = document.getElementById('gameStartText');
			startText.style.visibility = 'hidden';

			// Start Score Count
			scoreCountAnimationId = setInterval(countScore, 200);

			// Start Creating Boxes
			BoxAnimationId = setInterval(generateRandomBoxes, 1000);
			// setInterval(boxAnimation, 100);
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

	if (characterJumpImageNo > 10) {
		characterJumpImageNo = 1;
	} else if (characterJumpImageNo == 10) {
		isJumping = false;
		clearInterval(characterJumpAnimationId);
		characterRunAnimationId = setInterval(characterRunAnimation, 100);
	}

	if (characterJumpImageNo > 1 && characterJumpImageNo < 10) {
		currentMarginTop = window.getComputedStyle(characterImageId).marginTop;
		characterMarginTop = parseInt(currentMarginTop) - 15;
		characterImageId.style.marginTop = characterMarginTop + 'px';
	} else if (characterJumpImageNo == 10) {
		characterImageId.style.marginTop = '150px';
	}

	characterJumpImageNo += 1;
}

// Generate Boxes
var boxId = 1;
var randomMarginLeft = 0;
function generateRandomBoxes() {
	// Generate a random value
	var randomNo2 = Math.floor(Math.random() * 100);
	var randomNo = Math.floor(Math.random() * 1000) + 100;

	if (randomMarginLeft < randomNo) {
		randomMarginLeft = randomNo;
	} else {
		randomMarginLeft += randomNo;
	}

	// Create a div
	var body = document.body;
	var box = document.createElement('div');
	box.className = 'box';
	box.id = 'box' + boxId;
	box.style.marginLeft = randomMarginLeft + 'px';

	// Appending the created box
	body.appendChild(box);

	BoxAnimationId2 = setInterval(animateBoxes, 200, 'box' + boxId);

	// Increment BoxId
	boxId += 1;
}

// Box Animation
function animateBoxes(id) {
	var div = document.getElementById(id);
	var CurrentMarginLeft = window.getComputedStyle(div).marginLeft;
	var divMarginLeft = parseInt(CurrentMarginLeft) - 10;

	if (divMarginLeft > 0) {
		div.style.marginLeft = divMarginLeft + 'px';
	} else {
		div.style.display = 'none';
	}

	// Check For Out
	var characterImageId = document.getElementById('characterImageId');
	var characterMarginTop = window.getComputedStyle(characterImageId).marginTop;

	if (divMarginLeft < 210 && divMarginLeft > 190) {
		if (characterMarginTop == '150px') {
			window.location = 'index.html';
		}
	}
}

// Pause Game
function clearAllAnimations() {
	var startText = document.getElementById('gameStartText');
	clearInterval(characterIdleAnimationId);
	clearInterval(characterRunAnimationId);
	clearInterval(characterJumpAnimationId);
	clearInterval(scoreCountAnimationId);
	clearInterval(BoxAnimationId);
	clearInterval(BoxAnimationId2);
	startText.style.visibility = 'visible';
	isRunning = false;
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
