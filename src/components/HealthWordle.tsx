
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { HelpCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Health-related terms for the wordle game
const HEALTH_WORDS = [
  "PULSE", "BLOOD", "HEART", "LUNGS", "BRACE", 
  "VIRUS", "FEVER", "BRAIN", "ANKLE", "CHEST",
  "SPINE", "JOINT", "WOUND", "ECZEMA", "NASAL",
  "LIVER", "GLAND", "VENOM", "TOXIN", "SPASM"
];

// Instructions for the game
const INSTRUCTIONS = [
  "Guess the 5-letter health word in 6 tries",
  "Each guess must be a valid 5-letter word",
  "The color of the tiles will change to show how close your guess was:",
  "- Green: Letter is in the correct spot",
  "- Yellow: Letter is in the word but in the wrong spot",
  "- Gray: Letter is not in the word"
];

// Game definitions for health terms
const HEALTH_DEFINITIONS: Record<string, string> = {
  "PULSE": "The rhythmic expansion of an artery that can be felt as blood is pumped through it.",
  "BLOOD": "The red fluid that circulates through the heart, arteries, and veins, carrying oxygen and nutrients.",
  "HEART": "The muscular organ that pumps blood through the circulatory system.",
  "LUNGS": "The pair of breathing organs located in the chest that remove carbon dioxide and provide oxygen.",
  "BRACE": "A device that supports or aligns a body part to help proper healing or correct alignment.",
  "VIRUS": "A microscopic infectious agent that can only replicate inside living cells of an organism.",
  "FEVER": "An abnormally high body temperature, usually a sign that the body is fighting an infection.",
  "BRAIN": "The organ inside the skull that controls thought, memory, feelings, and activity.",
  "ANKLE": "The joint connecting the foot to the leg, allowing movement in multiple directions.",
  "CHEST": "The front part of the body between the neck and abdomen, containing the heart and lungs.",
  "SPINE": "The series of vertebrae extending from the base of the skull to the tailbone.",
  "JOINT": "A connection between two bones that allows for movement and flexibility.",
  "WOUND": "An injury to living tissue, typically involving a cut or break in the skin.",
  "ECZEMA": "A skin condition causing areas of skin to become itchy, red, cracked, and rough.",
  "NASAL": "Relating to the nose, its cavities, or the airway passages connecting to it.",
  "LIVER": "A large organ that processes nutrients, filters toxins from blood, and produces proteins.",
  "GLAND": "An organ that produces and releases substances for use elsewhere in the body.",
  "VENOM": "A toxic substance produced by animals like snakes that is injected into prey or predators.",
  "TOXIN": "A poisonous substance produced by living cells or organisms.",
  "SPASM": "A sudden, involuntary contraction of a muscle or group of muscles."
};

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
];

const HealthWordle: React.FC = () => {
  const navigate = useNavigate();
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showDefinition, setShowDefinition] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState<Record<string, string>>({});
  
  // Initialize the game with a random word
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomWord = HEALTH_WORDS[Math.floor(Math.random() * HEALTH_WORDS.length)];
    setTargetWord(randomWord);
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setShowDefinition(false);
    setKeyboardStatus({});
  };

  // Handle keyboard key presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;
      
      if (e.key === 'Enter') {
        submitGuess();
      } else if (e.key === 'Backspace') {
        setCurrentGuess(prev => prev.slice(0, -1));
      } else if (/^[A-Za-z]$/.test(e.key) && currentGuess.length < 5) {
        setCurrentGuess(prev => (prev + e.key).toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentGuess, gameOver]);

  // Handle virtual keyboard clicks
  const handleKeyClick = (key: string) => {
    if (gameOver) return;
    
    if (key === 'ENTER') {
      submitGuess();
    } else if (key === 'DELETE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
  };

  // Submit the current guess
  const submitGuess = () => {
    if (currentGuess.length !== 5) return;
    
    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    
    // Update keyboard status
    updateKeyboardStatus(currentGuess);
    
    // Check if the guess is correct
    if (currentGuess === targetWord) {
      setGameOver(true);
      setShowDefinition(true);
      toast({
        title: "Excellent!",
        description: "You've guessed the health word correctly!",
      });
    } else if (newGuesses.length >= 6) {
      setGameOver(true);
      setShowDefinition(true);
      toast({
        title: "Game Over",
        description: `The word was ${targetWord}`,
        variant: "destructive",
      });
    }
    
    setCurrentGuess('');
  };

  // Update keyboard keys with colors based on guesses
  const updateKeyboardStatus = (guess: string) => {
    const newStatus = { ...keyboardStatus };
    
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      
      if (letter === targetWord[i]) {
        // Correct position
        newStatus[letter] = 'correct';
      } else if (targetWord.includes(letter) && newStatus[letter] !== 'correct') {
        // In word but wrong position, only if not already marked correct
        newStatus[letter] = 'present';
      } else if (!targetWord.includes(letter)) {
        // Not in word
        newStatus[letter] = 'absent';
      }
    }
    
    setKeyboardStatus(newStatus);
  };

  // Get the tile color based on the guess and position
  const getTileColor = (letter: string, index: number, guess: string) => {
    if (letter === targetWord[index]) {
      return 'bg-[#538d4e] text-white border-[#538d4e]'; // Green - correct position
    } else if (targetWord.includes(letter)) {
      return 'bg-[#b59f3b] text-white border-[#b59f3b]'; // Yellow - in word but wrong position
    } else {
      return 'bg-[#3a3a3c] text-white border-[#3a3a3c]'; // Gray - not in word
    }
  };

  // Get the keyboard key color
  const getKeyColor = (key: string) => {
    switch (keyboardStatus[key]) {
      case 'correct':
        return 'bg-[#538d4e] text-white';
      case 'present':
        return 'bg-[#b59f3b] text-white';
      case 'absent':
        return 'bg-[#3a3a3c] text-white';
      default:
        return 'bg-[#818384] text-white';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#121213] text-white">
      {/* Header */}
      <header className="w-full max-w-lg p-4 border-b border-gray-700 flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white"
          onClick={() => setShowInstructions(!showInstructions)}
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
        
        <h1 className="text-3xl font-bold">WORDLE</h1>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white"
          onClick={startNewGame}
        >
          <RefreshCw className="h-6 w-6" />
        </Button>
      </header>

      <div className="w-full max-w-lg flex-1 flex flex-col items-center p-4">
        {/* Instructions Popup */}
        {showInstructions && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-[#121213] border border-gray-700 rounded-lg max-w-md w-full p-6">
              <h2 className="text-xl font-bold mb-4">How to Play</h2>
              <ul className="space-y-2 mb-4">
                {INSTRUCTIONS.map((instruction, index) => (
                  <li key={index} className="text-sm text-gray-300">{instruction}</li>
                ))}
              </ul>
              <div className="flex justify-end">
                <Button 
                  onClick={() => setShowInstructions(false)}
                  className="bg-[#538d4e] hover:bg-[#478242] text-white"
                >
                  Got it
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Game Board */}
        <div className="grid grid-rows-6 gap-1 w-full max-w-xs mx-auto my-4">
          {/* Render guesses */}
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5 gap-1">
              {Array.from({ length: 5 }).map((_, colIndex) => {
                // Get the letter from the guesses array or current guess
                const guessedLetter = guesses[rowIndex]?.[colIndex] || '';
                const isCurrentRow = rowIndex === guesses.length;
                const currentLetter = isCurrentRow && colIndex < currentGuess.length ? currentGuess[colIndex] : '';
                const letter = guessedLetter || currentLetter;
                
                // Determine the tile styling
                let tileClass = "w-14 h-14 flex items-center justify-center text-2xl font-bold border-2 ";
                
                if (guessedLetter) {
                  // Completed guess - apply color based on correctness
                  tileClass += getTileColor(guessedLetter, colIndex, guesses[rowIndex]);
                } else if (currentLetter) {
                  // Current guess - show filled but not evaluated
                  tileClass += "border-gray-600 bg-transparent text-white";
                } else {
                  // Empty tile
                  tileClass += "border-gray-600 bg-transparent";
                }
                
                return (
                  <div key={colIndex} className={tileClass}>
                    {letter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Health Term Definition */}
        {showDefinition && (
          <div className="w-full bg-[#121213] border border-gray-700 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-xl mb-2 text-[#538d4e]">{targetWord}</h3>
            <p className="text-gray-300">{HEALTH_DEFINITIONS[targetWord]}</p>
          </div>
        )}

        {/* Virtual Keyboard */}
        <div className="w-full max-w-md mt-auto">
          {KEYBOARD_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1 mb-2">
              {row.map((key) => {
                let keyClass = "flex items-center justify-center rounded font-bold ";
                
                // Adjust width for special keys
                if (key === 'ENTER' || key === 'DELETE') {
                  keyClass += "text-xs px-2 py-4 min-w-14 ";
                } else {
                  keyClass += "text-sm w-10 h-14 ";
                }
                
                // Apply color based on key status
                keyClass += getKeyColor(key);
                
                return (
                  <button
                    key={key}
                    className={keyClass}
                    onClick={() => handleKeyClick(key)}
                  >
                    {key === 'DELETE' ? '⌫' : key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="w-full mt-6 flex justify-center">
          <Button 
            variant="outline" 
            className="text-gray-300 border-gray-700 hover:bg-gray-800"
            onClick={() => navigate('/mission-health')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Mission Health
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HealthWordle;
