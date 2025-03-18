
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { BookOpen, RefreshCw, HelpCircle, ArrowLeft } from 'lucide-react';
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

const HealthWordle: React.FC = () => {
  const navigate = useNavigate();
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [definition, setDefinition] = useState('');
  const [showDefinition, setShowDefinition] = useState(false);
  
  // Game definitions for health terms
  const healthDefinitions: Record<string, string> = {
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
  };

  // Handle keyboard input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (gameOver) return;
    
    if (e.key === 'Enter' && currentGuess.length === 5) {
      submitGuess();
    } else if (e.key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (/^[A-Za-z]$/.test(e.key) && currentGuess.length < 5) {
      setCurrentGuess(prev => (prev + e.key).toUpperCase());
    }
  };

  // Submit the current guess
  const submitGuess = () => {
    if (currentGuess.length !== 5) return;
    
    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess('');
    
    // Check if the guess is correct
    if (currentGuess === targetWord) {
      setGameOver(true);
      setDefinition(healthDefinitions[targetWord] || "Definition not available.");
      setShowDefinition(true);
      toast({
        title: "Excellent!",
        description: "You've guessed the health word correctly!",
      });
    } else if (newGuesses.length >= 6) {
      setGameOver(true);
      setDefinition(healthDefinitions[targetWord] || "Definition not available.");
      setShowDefinition(true);
      toast({
        title: "Game Over",
        description: `The word was ${targetWord}`,
        variant: "destructive",
      });
    }
  };

  // Get the tile color based on the guess and position
  const getTileColor = (letter: string, index: number, word: string) => {
    if (letter === word[index]) {
      return 'bg-green-500 text-white'; // Correct letter and position
    } else if (word.includes(letter)) {
      return 'bg-yellow-500 text-white'; // Correct letter but wrong position
    } else {
      return 'bg-gray-400 text-white'; // Letter not in word
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => navigate('/mission-health')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-center text-green-700">Health Wordle</h1>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => setShowInstructions(!showInstructions)}
          >
            <HelpCircle className="h-4 w-4" />
            Help
          </Button>
        </div>
        
        {showInstructions && (
          <Card className="mb-6 bg-blue-50">
            <CardContent className="pt-4">
              <h2 className="text-lg font-bold mb-2">How to Play</h2>
              <ul className="list-disc pl-5 space-y-1">
                {INSTRUCTIONS.map((instruction, index) => (
                  <li key={index} className="text-sm">{instruction}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
        
        {/* Display previous guesses */}
        <div className="space-y-2 mb-4">
          {guesses.map((guess, guessIndex) => (
            <div key={guessIndex} className="flex justify-center gap-2">
              {guess.split('').map((letter, letterIndex) => (
                <div 
                  key={letterIndex} 
                  className={`flex items-center justify-center w-12 h-12 border-2 font-bold text-lg ${getTileColor(letter, letterIndex, targetWord)}`}
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {/* Current guess */}
        {!gameOver && (
          <div className="flex justify-center gap-2 mb-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-center w-12 h-12 border-2 border-gray-300 font-bold text-lg ${index < currentGuess.length ? 'bg-gray-200' : ''}`}
              >
                {index < currentGuess.length ? currentGuess[index] : ''}
              </div>
            ))}
          </div>
        )}
        
        {/* Virtual keyboard or game controls */}
        <div className="flex justify-center gap-3 mb-6">
          {!gameOver ? (
            <>
              <Button 
                onClick={() => setCurrentGuess(prev => prev.slice(0, -1))}
                variant="outline"
                disabled={currentGuess.length === 0}
              >
                Delete
              </Button>
              <Button 
                onClick={submitGuess}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={currentGuess.length !== 5}
              >
                Submit
              </Button>
            </>
          ) : (
            <Button 
              onClick={startNewGame}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <RefreshCw className="h-4 w-4" />
              New Word
            </Button>
          )}
        </div>
        
        {/* Health term definition card */}
        {showDefinition && (
          <Card className="mb-6 bg-green-50 animate-fade-in">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-bold text-green-700">Health Word Definition</h2>
              </div>
              <p className="text-gray-700">{targetWord}: {definition}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HealthWordle;
