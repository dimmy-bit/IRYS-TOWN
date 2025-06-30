// Game State
const gameState = {
  currentLevel: 1,
  completedLevels: [],
  levelScores: {}
};

// Level configuration
const LEVELS = {
  1: { title: 'Level 1: Introduction to Irys', file: 'level1.html' },
  2: { title: 'Level 2: Basic Upload', file: 'level2.html' },
  3: { title: 'Level 3: Advanced Upload Function', file: 'level3.html' },
  4: { title: 'Level 4: Error Handling', file: 'level4.html' },
  5: { title: 'Level 5: Final Challenge', file: 'level5.html' }
};

// DOM Elements
const levelCards = document.querySelectorAll('.level-card');
const bgMusic = document.getElementById('bgMusic');

// Initialize the game
function initGame() {
  // Load saved progress if available
  loadProgress();
  
  // Set up event listeners for level cards
  levelCards.forEach(card => {
      const level = parseInt(card.dataset.level);
      
      card.addEventListener('click', () => {
          if (canPlayLevel(level)) {
              startLevel(level);
          }
      });
  });

  // Try to autoplay music (browsers may block this)
  const playMusic = () => {
      const promise = bgMusic.play();
      if (promise !== undefined) {
          promise.catch(error => {
              console.log("Autoplay prevented. User interaction required to play audio.");
          });
      }
  };

  // Try to play music on page load
  playMusic();
  
  // Also try to play music on first user interaction
  document.addEventListener('click', function enableAudio() {
      playMusic();
      document.removeEventListener('click', enableAudio);
  }, { once: true });
}

// Check if a level can be played
function canPlayLevel(level) {
  if (level === 1) return true;
  return gameState.completedLevels.includes(level - 1);
}

// Start a level
function startLevel(level) {
  switch(level) {
      case 1:
          window.location.href = 'level1.html';
          break;
      case 2:
          window.location.href = 'level2.html';
          break;
      case 3:
          window.location.href = 'level3.html';
          break;
      case 4:
          window.location.href = 'level4.html';
          break;
      case 5:
          window.location.href = 'level5.html';
          break;
      default:
          alert(`Level ${level} is coming soon!`);
  }
}

// Save game progress to localStorage
function saveProgress() {
  localStorage.setItem('irysTownProgress', JSON.stringify(gameState));
}

// Load game progress from localStorage
function loadProgress() {
  const savedProgress = localStorage.getItem('irysTownProgress');
  if (savedProgress) {
      Object.assign(gameState, JSON.parse(savedProgress));
      updateLevelVisibility();
  }
}

// Update which levels are visible/enabled based on progress
function updateLevelVisibility() {
  levelCards.forEach(card => {
      const level = parseInt(card.dataset.level);
      
      // Reset classes
      card.classList.remove('locked', 'completed');
      
      if (gameState.completedLevels.includes(level)) {
          // Level is completed
          card.classList.add('completed');
          const statusText = card.querySelector('p');
          if (statusText) {
              statusText.textContent = 'Completed!';
              statusText.style.color = 'var(--success-color)';
          }
          
          // Add checkmark
          if (!card.querySelector('.checkmark')) {
              const checkmark = document.createElement('span');
              checkmark.className = 'checkmark';
              checkmark.textContent = '✓';
              checkmark.style.position = 'absolute';
              checkmark.style.top = '10px';
              checkmark.style.right = '10px';
              checkmark.style.color = 'var(--success-color)';
              card.style.position = 'relative';
              card.appendChild(checkmark);
          }
      } else if (canPlayLevel(level)) {
          // Level is unlocked but not completed
          card.classList.remove('locked');
      } else {
          // Level is locked
          card.classList.add('locked');
      }
  });
}

// Complete a level
function completeLevel(level, score) {
  if (!gameState.completedLevels.includes(level)) {
    gameState.completedLevels.push(level);
  }
  
  gameState.levelScores[level] = Math.max(
    gameState.levelScores[level] || 0,
    score
  );
  
  gameState.currentLevel = Math.max(gameState.currentLevel, level + 1);
  saveProgress();
  updateLevelVisibility();
  
  // If all levels are completed, show completion message
  if (gameState.completedLevels.length === Object.keys(LEVELS).length) {
    showGameCompletion();
  }
  
  // Return the next level number or null if this was the last level
  return level < Object.keys(LEVELS).length ? level + 1 : null;
}

// Go to a specific level
function goToLevel(level) {
  if (level >= 1 && level <= Object.keys(LEVELS).length) {
    window.location.href = LEVELS[level].file;
  }
}

// Go to next level
function goToNextLevel() {
  const currentLevel = parseInt(window.location.pathname.split('level')[1]?.split('.')[0] || '1');
  const nextLevel = currentLevel + 1;
  
  if (nextLevel <= Object.keys(LEVELS).length) {
    window.location.href = LEVELS[nextLevel].file;
  }
}

// Show level completion in the UI
function showLevelCompleteUI(level, score) {
  const resultDiv = document.getElementById('result');
  const resultTitle = document.getElementById('result-title');
  const resultMessage = document.getElementById('result-message');
  const nextLevelBtn = document.getElementById('next-level-btn');
  
  if (resultDiv && resultTitle && resultMessage) {
    resultTitle.textContent = `🎉 Level ${level} Complete!`;
    resultMessage.textContent = `You scored ${score} points!`;
    
    // Show next level button if there is a next level
    if (nextLevelBtn) {
      nextLevelBtn.style.display = level < Object.keys(LEVELS).length ? 'inline-block' : 'none';
    }
    
    resultDiv.style.display = 'block';
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth' });
  }
}

// Show game completion message
function showGameCompletion() {
  const completionMsg = document.createElement('div');
  completionMsg.className = 'game-completion';
  completionMsg.style.textAlign = 'center';
  completionMsg.style.marginTop = '2rem';
  completionMsg.style.padding = '1.5rem';
  completionMsg.style.background = 'rgba(0, 212, 255, 0.1)';
  completionMsg.style.borderRadius = '10px';
  completionMsg.style.border = '1px solid var(--success-color)';
  completionMsg.style.animation = 'pulse 2s infinite';
  
  completionMsg.innerHTML = `
      <h2 style="color: var(--success-color); margin-bottom: 1rem;">🎉 Congratulations! 🎉</h2>
      <p>You've completed all levels of Irys Town!</p>
      <p>Thank you for learning about Irys and its capabilities.</p>
      <p style="margin-top: 1rem; font-size: 0.9em; opacity: 0.8;">
          Share your achievement on social media using #IrysTown
      </p>
  `;
  
  const main = document.querySelector('main');
  if (main) {
      main.appendChild(completionMsg);
  }
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initGame);