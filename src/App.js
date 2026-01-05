import React, { createContext, useContext, useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, RotateCcw, Lightbulb, Target } from 'lucide-react';

// Enhanced Checkout Logic with Backup Routes
const checkoutLogic = {
  // Primary optimal routes with backup considerations
  optimalRoutes: {
    170: { primary: ['T20', 'T20', 'Bull'], backups: { afterFirst: ['T19', 'T18'], afterSecond: ['D20', 'D19'] } },
    167: { primary: ['T20', 'T19', 'Bull'], backups: { afterFirst: ['T19', 'T18'], afterSecond: ['Bull', 'D20'] } },
    164: { primary: ['T20', 'T18', 'Bull'], backups: { afterFirst: ['T19', 'T17'], afterSecond: ['Bull', 'D19'] } },
    161: { primary: ['T20', 'T17', 'Bull'], backups: { afterFirst: ['T19', 'T16'], afterSecond: ['Bull', 'D18'] } },
    160: { primary: ['T20', 'T20', 'D20'], backups: { afterFirst: ['T20', 'T19'], afterSecond: ['D20', 'D19', 'D18'] } },
    158: { primary: ['T20', 'T20', 'D19'], backups: { afterFirst: ['T20', 'T19'], afterSecond: ['D19', 'D18'] } },
    157: { primary: ['T20', 'T19', 'D20'], backups: { afterFirst: ['T19', 'T18'], afterSecond: ['D20', 'D19'] } },
    156: { primary: ['T20', 'T20', 'D18'], backups: { afterFirst: ['T20', 'T19'], afterSecond: ['D18', 'D17'] } },
    155: { primary: ['T20', 'T19', 'D19'], backups: { afterFirst: ['T19', 'T18'], afterSecond: ['D19', 'D18'] } },
    154: { primary: ['T20', 'T18', 'D20'], backups: { afterFirst: ['T19', 'T17'], afterSecond: ['D20', 'D19'] } },
    153: { primary: ['T20', 'T19', 'D18'], backups: { afterFirst: ['T19', 'T18'], afterSecond: ['D18', 'D17'] } },
    152: { primary: ['T20', 'T20', 'D16'], backups: { afterFirst: ['T20', 'T19'], afterSecond: ['D16', 'D15'] } },
    151: { primary: ['T20', 'T17', 'D20'], backups: { afterFirst: ['T19', 'T16'], afterSecond: ['D20', 'D19'] } },
    150: { primary: ['T20', 'T18', 'D18'], backups: { afterFirst: ['T19', 'T17'], afterSecond: ['D18', 'D17'] } },
    149: { primary: ['T20', 'T19', 'D16'], backups: { afterFirst: ['T19', 'T18'], afterSecond: ['D16', 'D15'] } },
    148: { primary: ['T20', 'T20', 'D14'], backups: { afterFirst: ['T20', 'T19'], afterSecond: ['D14', 'D13'] } },
    147: { primary: ['T20', 'T17', 'D18'], backups: { afterFirst: ['T19', 'T16'], afterSecond: ['D18', 'D17'] } },
    146: { primary: ['T20', 'T18', 'D16'], backups: { afterFirst: ['T19', 'T17'], afterSecond: ['D16', 'D15'] } },
    145: { primary: ['T20', 'T19', 'D14'], backups: { afterFirst: ['T19', 'T18'], afterSecond: ['D14', 'D13'] } },
    144: { primary: ['T20', 'T20', 'D12'], backups: { afterFirst: ['T20', 'T19'], afterSecond: ['D12', 'D11'] } },
    143: { primary: ['T20', 'T17', 'D16'], backups: { afterFirst: ['T19', 'T16'], afterSecond: ['D16', 'D15'] } },
    142: { primary: ['T20', 'T14', 'D20'], backups: { afterFirst: ['T19', 'T13'], afterSecond: ['D20', 'D19'] } },
    141: { primary: ['T20', 'T19', 'D12'], backups: { afterFirst: ['T19', 'T18'], afterSecond: ['D12', 'D11'] } },
    140: { primary: ['T20', 'T20', 'D10'], backups: { afterFirst: ['T20', 'T19'], afterSecond: ['D10', 'D9'] } },
    139: { primary: ['T20', 'T13', 'D20'], backups: { afterFirst: ['T19', 'T12'], afterSecond: ['D20', 'D19'] } },
    138: { primary: ['T20', 'T18', 'D12'], backups: { afterFirst: ['T19', 'T17'], afterSecond: ['D12', 'D11'] } },
    137: { primary: ['T20', 'T19', 'D10'], backups: { afterFirst: ['T19', 'T18'], afterSecond: ['D10', 'D9'] } },
    136: { primary: ['T20', 'T20', 'D8'], backups: { afterFirst: ['T20', 'T19'], afterSecond: ['D8', 'D7'] } },
    135: { primary: ['T20', 'T17', 'D12'], backups: { afterFirst: ['T19', 'T16'], afterSecond: ['D12', 'D11'] } },
    134: { primary: ['T20', 'T14', 'D16'], backups: { afterFirst: ['T19', 'T13'], afterSecond: ['D16', 'D15'] } },
    133: { primary: ['T20', 'T19', 'D8'], backups: { afterFirst: ['T19', 'T18'], afterSecond: ['D8', 'D7'] } },
    132: { primary: ['T20', 'T16', 'D12'], backups: { afterFirst: ['T19', 'T15'], afterSecond: ['D12', 'D11'] } },
    131: { primary: ['T20', 'T13', 'D16'], backups: { afterFirst: ['T19', 'T12'], afterSecond: ['D16', 'D15'] } },
    130: { primary: ['T20', 'T20', 'D5'], backups: { afterFirst: ['T20', 'T19'], afterSecond: ['D5'] } },
    121: { primary: ['T20', 'T11', 'D14'], backups: { afterFirst: ['T19', 'T10'], afterSecond: ['D14', 'D13'] } },
    120: { primary: ['T20', 'S20', 'D20'], backups: { afterFirst: ['T19', 'S19'], afterSecond: ['D20', 'D19'] } },
    110: { primary: ['T20', 'S18', 'D16'], backups: { afterFirst: ['T19', 'S17'], afterSecond: ['D16', 'D15'] } },
    100: { primary: ['T20', 'D20'], backups: { afterFirst: ['T19', 'T18'], afterSecond: ['D20', 'D19', 'D18'] } },
    98: { primary: ['T20', 'D19'], backups: { afterFirst: ['T19', 'T18'], afterSecond: ['D19', 'D18'] } },
    97: { primary: ['T19', 'D20'], backups: { afterFirst: ['T20', 'T18'], afterSecond: ['D20', 'D19'] } },
    96: { primary: ['T20', 'D18'], backups: { afterFirst: ['T19', 'T18'], afterSecond: ['D18', 'D17'] } },
    92: { primary: ['T20', 'D16'], backups: { afterFirst: ['T19', 'T18'], afterSecond: ['D16', 'D15'] } },
    90: { primary: ['T18', 'D18'], backups: { afterFirst: ['T20', 'T17'], afterSecond: ['D18', 'D17'] } },
    84: { primary: ['T20', 'D12'], backups: { afterFirst: ['T19', 'T18'], afterSecond: ['D12', 'D11'] } },
    80: { primary: ['T20', 'D10'], backups: { afterFirst: ['T19', 'T18'], afterSecond: ['D10', 'D9'] } },
    76: { primary: ['T20', 'D8'], backups: { afterFirst: ['T19', 'T18'], afterSecond: ['D8', 'D7'] } },
    72: { primary: ['T16', 'D12'], backups: { afterFirst: ['T20', 'T15'], afterSecond: ['D12', 'D11', 'D10'] } },
    70: { primary: ['T18', 'D8'], backups: { afterFirst: ['T20', 'T17'], afterSecond: ['D8', 'D7'] } },
    68: { primary: ['T20', 'D4'], backups: { afterFirst: ['T19', 'T18'], afterSecond: ['D4'] } },
    64: { primary: ['T16', 'D8'], backups: { afterFirst: ['T20', 'T15'], afterSecond: ['D8', 'D7', 'D6'] } },
    60: { primary: ['S20', 'D20'], backups: { afterFirst: ['S19', 'S18'], afterSecond: ['D20', 'D19', 'D18'] } },
    59: { primary: ['S19', 'D20'], backups: { afterFirst: ['S20', 'S18'], afterSecond: ['D20', 'D19'] } },
    58: { primary: ['S18', 'D20'], backups: { afterFirst: ['S19', 'S17'], afterSecond: ['D20', 'D19'] } },
    56: { primary: ['T16', 'D4'], backups: { afterFirst: ['S20', 'S19'], afterSecond: ['D4', 'D8'] } },
    50: { primary: ['S10', 'D20'], backups: { afterFirst: ['S18', 'S9'], afterSecond: ['D20', 'D16'] } },
    48: { primary: ['S16', 'D16'], backups: { afterFirst: ['S8'], afterSecond: ['D20', 'D16'] }, missStrategy: 'If you miss 16 to 8, you have D20 left' },
    40: { primary: ['D20'], backups: { afterFirst: [], afterSecond: ['D20', 'D19', 'D18'] } },
  },

  // Common miss scenarios and their backups
  missScenarios: {
    'T20_miss_S20': { leaves: -40, backup: 'Still on double' },
    'T20_miss_S1': { leaves: +59, backup: 'Difficult but recoverable' },
    'T20_miss_S5': { leaves: +55, backup: 'Recoverable with 15-D20' },
    'S16_miss_S8': { leaves: 40, backup: 'D20 available' },
    'D16_miss_S16': { leaves: 16, backup: 'D8 available' },
  },

  parseTarget: (target) => {
    // Handle bullseye cases
    if (target === '25') {
      return {
        multiplier: 1,
        value: 25,
        score: 25,
        notation: '25'
      };
    }
    if (target === 'Bull' || target === '50') {
      return {
        multiplier: 2,
        value: 25,
        score: 50,
        notation: 'Bull'
      };
    }
    
    const match = target.match(/^([STD])(\d+)$/);
    if (!match) return null;
    const [, multiplier, number] = match;
    const multiplierMap = { S: 1, D: 2, T: 3 };
    const value = parseInt(number);
    return {
      multiplier: multiplierMap[multiplier],
      value,
      score: multiplierMap[multiplier] * value,
      notation: target
    };
  },

  // Check if a route considers good backup options
  hasGoodBackups: (startScore, sequence) => {
    let score = startScore;
    const route = checkoutLogic.optimalRoutes[startScore];
    
    if (!route) return false;

    // Simulate common misses for each dart
    for (let i = 0; i < sequence.length - 1; i++) {
      const dart = checkoutLogic.parseTarget(sequence[i]);
      if (!dart) return false;
      
      score -= dart.score;

      // Check if this leaves a checkout with good backup doubles
      const hasBackup = checkoutLogic.hasViableBackupDouble(score);
      if (!hasBackup && i < sequence.length - 1) {
        return false; // Route doesn't leave good backups
      }
    }
    
    return true;
  },

  // Check if a score has viable backup doubles nearby
  hasViableBackupDouble: (score) => {
    // Scores with multiple good double options
    const goodBackupScores = [40, 32, 36, 48, 60, 64, 80, 96, 100];
    return goodBackupScores.includes(score);
  },

  evaluateSequence: (startScore, sequence) => {
    if (sequence.length < 2) return { valid: false, message: 'Select at least 2 darts' };

    let remaining = startScore;
    const lastDartIndex = sequence.length - 1;
    const route = checkoutLogic.optimalRoutes[startScore];

    for (let i = 0; i < sequence.length; i++) {
      const dart = checkoutLogic.parseTarget(sequence[i]);
      if (!dart) return { valid: false, message: 'Invalid dart format' };
      
      remaining -= dart.score;

      if (remaining < 0 || remaining === 1) {
        return {
          valid: false,
          grade: 'C',
          gradeName: 'WRONG',
          message: `Bust! Cannot finish on ${remaining < 0 ? 'negative' : '1'}`,
          optimalPath: route?.primary,
          backupInfo: route?.backups,
          missStrategy: route?.missStrategy,
          icon: XCircle,
          color: 'text-red-500',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500'
        };
      }

      if (i === lastDartIndex && remaining === 0) {
        if (dart.multiplier !== 2 && !(sequence[i] === 'DBull')) {
          return {
            valid: false,
            grade: 'C',
            gradeName: 'WRONG',
            message: 'Must finish on a double!',
            optimalPath: route?.primary,
            backupInfo: route?.backups,
            missStrategy: route?.missStrategy,
            icon: XCircle,
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500'
          };
        }
      }
    }

    if (remaining === 0) {
      const optimal = route?.primary;
      if (optimal && JSON.stringify(optimal) === JSON.stringify(sequence)) {
        return {
          valid: true,
          grade: 'A',
          gradeName: 'OPTIMAL',
          message: `Perfect ${sequence.length}-dart checkout! 🎯`,
          backupInfo: route?.backups,
          missStrategy: route?.missStrategy,
          icon: CheckCircle2,
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500'
        };
      } else {
        // Check if route has good backups even if not optimal
        const hasBackups = checkoutLogic.hasGoodBackups(startScore, sequence);
        
        return {
          valid: true,
          grade: 'B',
          gradeName: 'CORRECT BUT SUBOPTIMAL',
          message: hasBackups 
            ? `Valid ${sequence.length}-dart checkout with decent backups, but not the safest route`
            : `Valid ${sequence.length}-dart checkout, but risky with poor backup options`,
          optimalPath: optimal,
          backupInfo: route?.backups,
          missStrategy: route?.missStrategy,
          icon: AlertTriangle,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500'
        };
      }
    }

    if (remaining > 1) {
      return {
        valid: false,
        grade: 'C',
        gradeName: 'WRONG',
        message: `Failed to checkout. ${remaining} remaining`,
        optimalPath: route?.primary,
        backupInfo: route?.backups,
        missStrategy: route?.missStrategy,
        icon: XCircle,
        color: 'text-red-500',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500'
      };
    }

    return {
      valid: false,
      grade: 'C',
      gradeName: 'WRONG',
      message: 'Invalid sequence',
      optimalPath: route?.primary,
      backupInfo: route?.backups,
      missStrategy: route?.missStrategy,
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500'
    };
  }
};

// Game Context
const GameContext = createContext();

const GameProvider = ({ children }) => {
  const generateRandomScore = (excludeScore = null) => {
    const scores = Object.keys(checkoutLogic.optimalRoutes).map(Number);
    let availableScores = scores;
    
    // If we have a score to exclude and there are other options, filter it out
    if (excludeScore !== null && scores.length > 1) {
      availableScores = scores.filter(s => s !== excludeScore);
    }
    
    return availableScores[Math.floor(Math.random() * availableScores.length)];
  };

  const [currentScore, setCurrentScore] = useState(() => generateRandomScore());
  const [userSequence, setUserSequence] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [gradeStats, setGradeStats] = useState({ A: 0, B: 0, C: 0 });
  const [showHint, setShowHint] = useState(false);
  const [showBackups, setShowBackups] = useState(false);
  const [inputMode, setInputMode] = useState('keypad'); // 'board' or 'keypad'
  const [currentPage, setCurrentPage] = useState('game'); // 'game' or 'reference'

  const generateNewPuzzle = () => {
    const newScore = generateRandomScore(currentScore);
    setCurrentScore(newScore);
    setUserSequence([]);
    setFeedback(null);
    setShowHint(false);
    setShowBackups(false);
  };

  const addDart = (dart) => {
    if (userSequence.length < 3 && !feedback) {
      const newSequence = [...userSequence, dart];
      setUserSequence(newSequence);

      // Only evaluate after 3 darts, unless it's a valid 2-dart checkout
      if (newSequence.length === 3) {
        const result = checkoutLogic.evaluateSequence(currentScore, newSequence);
        
        if (result.grade) {
          setFeedback(result);
          if (result.grade === 'A' || result.grade === 'B' || result.grade === 'C') {
            setGradeStats(prev => ({
              ...prev,
              [result.grade]: prev[result.grade] + 1
            }));
          }
        }
      } else if (newSequence.length === 2) {
        // Check if it's a valid 2-dart checkout
        const result = checkoutLogic.evaluateSequence(currentScore, newSequence);
        
        // Only show feedback if it's a successful checkout or a bust
        if (result.grade && (result.valid || result.type === 'bust' || result.type === 'no-double')) {
          setFeedback(result);
          if (result.grade === 'A' || result.grade === 'B' || result.grade === 'C') {
            setGradeStats(prev => ({
              ...prev,
              [result.grade]: prev[result.grade] + 1
            }));
          }
        }
      }
    }
  };

  const removeDart = () => {
    if (userSequence.length > 0 && !feedback) {
      setUserSequence(prev => prev.slice(0, -1));
    }
  };

  const reset = () => {
    setUserSequence([]);
    setFeedback(null);
    setShowHint(false);
    setShowBackups(false);
  };

  const getHint = () => {
    const route = checkoutLogic.optimalRoutes[currentScore];
    if (route && userSequence.length < 3) {
      setShowHint(true);
    }
  };

  const toggleBackups = () => {
    setShowBackups(prev => !prev);
  };

  const toggleInputMode = () => {
    setInputMode(prev => prev === 'board' ? 'keypad' : 'board');
  };

  const switchPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <GameContext.Provider value={{
      currentScore,
      userSequence,
      feedback,
      gradeStats,
      showHint,
      showBackups,
      inputMode,
      currentPage,
      addDart,
      removeDart,
      reset,
      generateNewPuzzle,
      getHint,
      toggleBackups,
      toggleInputMode,
      switchPage
    }}>
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => useContext(GameContext);

// Keypad Component
const Keypad = () => {
  const { addDart, userSequence, feedback } = useGame();
  const [modifier, setModifier] = useState('S'); // S, D, or T
  const disabled = userSequence.length >= 3 || feedback;

  const numbers = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20]
  ];

  const handleNumberClick = (num) => {
    if (disabled) return;
    addDart(`${modifier}${num}`);
  };

  const handleBullClick = (isBull) => {
    if (disabled) return;
    addDart(isBull ? 'Bull' : '25');
  };

  const modifierButtons = [
    { value: 'S', label: 'Single', color: 'bg-blue-600' },
    { value: 'D', label: 'Double', color: 'bg-green-600' },
    { value: 'T', label: 'Triple', color: 'bg-red-600' }
  ];

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700">
      <div className="space-y-4">
        {/* Modifier Selection */}
        <div>
          <div className="text-xs text-slate-400 font-medium mb-2 text-center">Modifier</div>
          <div className="flex gap-2">
            {modifierButtons.map(btn => (
              <button
                key={btn.value}
                onClick={() => setModifier(btn.value)}
                disabled={disabled}
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                  modifier === btn.value
                    ? `${btn.color} text-white shadow-lg scale-105`
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Number Grid */}
        <div>
          <div className="text-xs text-slate-400 font-medium mb-2 text-center">Number</div>
          <div className="space-y-2">
            {numbers.map((row, i) => (
              <div key={i} className="flex gap-2">
                {row.map(num => (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num)}
                    disabled={disabled}
                    className={`flex-1 h-12 rounded-lg font-bold text-white transition-all ${
                      disabled
                        ? 'bg-slate-800 opacity-50 cursor-not-allowed'
                        : 'bg-slate-700 hover:bg-slate-600 active:scale-95'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bullseye Buttons */}
        <div>
          <div className="text-xs text-slate-400 font-medium mb-2 text-center">Bullseye</div>
          <div className="flex gap-2">
            <button
              onClick={() => handleBullClick(false)}
              disabled={disabled}
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                disabled
                  ? 'bg-slate-800 text-slate-400 opacity-50 cursor-not-allowed'
                  : 'bg-green-700 hover:bg-green-600 text-white active:scale-95'
              }`}
            >
              25 (Outer)
            </button>
            <button
              onClick={() => handleBullClick(true)}
              disabled={disabled}
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                disabled
                  ? 'bg-slate-800 text-slate-400 opacity-50 cursor-not-allowed'
                  : 'bg-red-700 hover:bg-red-600 text-white active:scale-95'
              }`}
            >
              Bull (Center)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dartboard Component
const Dartboard = () => {
  const { addDart, userSequence, feedback } = useGame();
  const disabled = userSequence.length >= 3 || feedback;

  const numbers = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
  
  const handleSegmentClick = (number, zone) => {
    if (disabled) return;
    
    let multiplier = 'S';
    if (zone === 'double') multiplier = 'D';
    if (zone === 'triple') multiplier = 'T';
    
    addDart(`${multiplier}${number}`);
  };

  const handleBullClick = (isDouble) => {
    if (disabled) return;
    addDart(isDouble ? 'Bull' : '25');
  };

  const centerX = 250;
  const centerY = 250;
  const doubleOuterRadius = 170;
  const doubleInnerRadius = 162;
  const tripleOuterRadius = 107;
  const tripleInnerRadius = 99;
  const bullRadius = 6.35;
  const outerBullRadius = 15.9;

  const createSegmentPath = (index, innerR, outerR) => {
    const angleStep = (Math.PI * 2) / 20;
    const startAngle = angleStep * index - angleStep / 2 - Math.PI / 2;
    const endAngle = startAngle + angleStep;

    const x1 = centerX + Math.cos(startAngle) * innerR;
    const y1 = centerY + Math.sin(startAngle) * innerR;
    const x2 = centerX + Math.cos(startAngle) * outerR;
    const y2 = centerY + Math.sin(startAngle) * outerR;
    const x3 = centerX + Math.cos(endAngle) * outerR;
    const y3 = centerY + Math.sin(endAngle) * outerR;
    const x4 = centerX + Math.cos(endAngle) * innerR;
    const y4 = centerY + Math.sin(endAngle) * innerR;

    return `M ${x1} ${y1} L ${x2} ${y2} A ${outerR} ${outerR} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerR} ${innerR} 0 0 0 ${x1} ${y1} Z`;
  };

  const getNumberPosition = (index) => {
    const angleStep = (Math.PI * 2) / 20;
    const angle = angleStep * index - Math.PI / 2;
    const radius = 210;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    };
  };

  const getSegmentColors = (index) => {
    const isBlackSegment = index % 2 === 0;
    return {
      single: isBlackSegment ? '#000000' : '#EFE5CE'
    };
  };

  const getRingColors = (index) => {
    const isBlackSegment = index % 2 === 0;
    return {
      double: isBlackSegment ? '#E31E24' : '#00843D',
      triple: isBlackSegment ? '#E31E24' : '#00843D'
    };
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700">
      <svg viewBox="0 0 500 500" className="w-full max-w-lg mx-auto">
        <circle cx={centerX} cy={centerY} r={240} fill="#000000" />
        <circle cx={centerX} cy={centerY} r={190} fill="#1a1a1a" />
        <circle cx={centerX} cy={centerY} r={doubleOuterRadius} fill="#2a2a2a" />

        {numbers.map((num, i) => {
          const segmentColors = getSegmentColors(i);
          const ringColors = getRingColors(i);

          return (
            <g key={num}>
              <path
                d={createSegmentPath(i, doubleInnerRadius, doubleOuterRadius)}
                fill={ringColors.double}
                stroke="#D3D3D3"
                strokeWidth="0.5"
                className={`cursor-pointer transition-all ${disabled ? 'opacity-50' : 'hover:brightness-125'}`}
                onClick={() => handleSegmentClick(num, 'double')}
              />
              
              <path
                d={createSegmentPath(i, tripleOuterRadius, doubleInnerRadius)}
                fill={segmentColors.single}
                stroke="#D3D3D3"
                strokeWidth="0.3"
                className={`cursor-pointer transition-all ${disabled ? 'opacity-50' : 'hover:brightness-125'}`}
                onClick={() => handleSegmentClick(num, 'single')}
              />
              
              <path
                d={createSegmentPath(i, tripleInnerRadius, tripleOuterRadius)}
                fill={ringColors.triple}
                stroke="#D3D3D3"
                strokeWidth="0.5"
                className={`cursor-pointer transition-all ${disabled ? 'opacity-50' : 'hover:brightness-125'}`}
                onClick={() => handleSegmentClick(num, 'triple')}
              />
              
              <path
                d={createSegmentPath(i, outerBullRadius, tripleInnerRadius)}
                fill={segmentColors.single}
                stroke="#D3D3D3"
                strokeWidth="0.3"
                className={`cursor-pointer transition-all ${disabled ? 'opacity-50' : 'hover:brightness-125'}`}
                onClick={() => handleSegmentClick(num, 'single')}
              />
            </g>
          );
        })}

        <circle
          cx={centerX}
          cy={centerY}
          r={outerBullRadius}
          fill="#00843D"
          stroke="#D3D3D3"
          strokeWidth="0.5"
          className={`cursor-pointer transition-all ${disabled ? 'opacity-50' : 'hover:brightness-125'}`}
          onClick={() => handleBullClick(false)}
        />

        <circle
          cx={centerX}
          cy={centerY}
          r={bullRadius}
          fill="#E31E24"
          stroke="#D3D3D3"
          strokeWidth="0.5"
          className={`cursor-pointer transition-all ${disabled ? 'opacity-50' : 'hover:brightness-125'}`}
          onClick={() => handleBullClick(true)}
        />

        {numbers.map((num, i) => {
          const pos = getNumberPosition(i);
          return (
            <text
              key={`num-${num}`}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white font-bold pointer-events-none select-none"
              style={{ 
                fontSize: '28px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.9), -1px -1px 2px rgba(0,0,0,0.9)'
              }}
            >
              {num}
            </text>
          );
        })}
      </svg>

      <div className="text-center text-xs text-slate-400 mt-4">
        Tap segments to select your darts
      </div>
    </div>
  );
};

const ScoreDisplay = () => {
  const { currentScore, gradeStats, showBackups, toggleBackups, inputMode, toggleInputMode } = useGame();
  const route = checkoutLogic.optimalRoutes[currentScore];
  
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700">
      <div className="text-center mb-4">
        <div className="text-sm text-slate-400 font-medium mb-1">Remaining Score</div>
        <div className="text-7xl font-bold text-white tracking-tight">
          {currentScore}
        </div>
      </div>
      
      {/* Input Mode Toggle */}
      <div className="mb-4 flex items-center justify-center gap-3 py-2 px-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <span className="text-xs text-slate-400 font-medium">Input:</span>
        <button
          onClick={toggleInputMode}
          className={`px-3 py-1 rounded text-xs font-bold transition-all ${
            inputMode === 'board'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
          }`}
        >
          Board
        </button>
        <button
          onClick={toggleInputMode}
          className={`px-3 py-1 rounded text-xs font-bold transition-all ${
            inputMode === 'keypad'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
          }`}
        >
          Keypad
        </button>
      </div>
      
      {route?.missStrategy && (
        <button
          onClick={toggleBackups}
          className="w-full mb-4 py-2 px-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/50 rounded-lg transition-all flex items-center justify-center gap-2 text-purple-300 text-sm"
        >
          <Target className="w-4 h-4" />
          {showBackups ? 'Hide' : 'Show'} Backup Strategy
        </button>
      )}
      
      {showBackups && route?.missStrategy && (
        <div className="mb-4 p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
          <div className="text-xs text-purple-300 font-bold mb-1">MISS STRATEGY:</div>
          <div className="text-xs text-purple-200">{route.missStrategy}</div>
        </div>
      )}
      
      <div className="flex justify-around pt-4 border-t border-slate-700">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{gradeStats.A}</div>
          <div className="text-xs text-slate-400">Optimal</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">{gradeStats.B}</div>
          <div className="text-xs text-slate-400">Suboptimal</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-400">{gradeStats.C}</div>
          <div className="text-xs text-slate-400">Wrong</div>
        </div>
      </div>
    </div>
  );
};

const DartSequence = () => {
  const { userSequence, showHint, currentScore, removeDart, feedback } = useGame();
  const route = checkoutLogic.optimalRoutes[currentScore];
  const optimal = route?.primary;

  const handleDartClick = (index) => {
    // Only allow removing if this dart exists and no feedback yet
    if (userSequence[index] && !feedback) {
      // Remove this dart and all subsequent darts
      const dartsBefore = userSequence.slice(0, index);
      // Update the sequence by removing from this position onwards
      while (userSequence.length > index) {
        removeDart();
      }
    }
  };

  const renderDart = (index) => {
    const dart = userSequence[index];
    const hintDart = showHint && optimal ? optimal[index] : null;
    const isClickable = dart && !feedback;

    return (
      <div className="flex-1 flex flex-col items-center gap-2">
        <div className="text-xs text-slate-400 font-medium">Dart {index + 1}</div>
        <div 
          className={`w-20 h-20 rounded-xl flex items-center justify-center text-lg font-bold transition-all ${
            dart 
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg' 
              : 'bg-slate-800 text-slate-600 border-2 border-dashed border-slate-700'
          } ${isClickable ? 'cursor-pointer hover:brightness-110 active:scale-95' : ''}`}
          onClick={() => handleDartClick(index)}
          title={isClickable ? 'Click to remove this dart' : ''}
        >
          {dart || '?'}
        </div>
        {/* Fixed height container for hint to prevent layout shift */}
        <div className="h-5 flex items-center justify-center">
          {hintDart && !dart && (
            <div className="text-xs text-amber-400 font-medium animate-pulse">
              💡 {hintDart}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700">
      <div className="flex justify-around">
        {renderDart(0)}
        {renderDart(1)}
        {renderDart(2)}
      </div>
      {/* Fixed height container for helper text to prevent layout shift */}
      <div className="h-6 flex items-center justify-center mt-3">
        {userSequence.length > 0 && !feedback && (
          <div className="text-center text-xs text-slate-400">
            Tap a dart to remove it
          </div>
        )}
      </div>
    </div>
  );
};

const FeedbackDisplay = () => {
  const { feedback } = useGame();

  // Always render container with fixed minimum height to prevent layout shift
  if (!feedback) {
    return <div className="min-h-[200px]"></div>;
  }

  const Icon = feedback.icon;

  return (
    <div className="min-h-[200px]">
      <div className={`rounded-xl p-6 shadow-lg border-2 ${feedback.bgColor} ${feedback.borderColor}`}>
        <div className="flex items-start gap-4">
          <Icon className={`w-10 h-10 ${feedback.color} flex-shrink-0`} />
          <div className="flex-1">
            <div className={`font-black text-3xl mb-2 ${feedback.color}`}>
              {feedback.gradeName}
            </div>
            <div className="text-slate-300 text-sm mb-3">
              {feedback.message}
            </div>
            
            {feedback.optimalPath && (
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-3">
                <div className="text-amber-400 font-bold text-sm mb-2">
                  Best Route:
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                  {feedback.optimalPath.map((dart, i) => (
                    <React.Fragment key={i}>
                      <div className="bg-slate-700 px-3 py-2 rounded font-mono text-white font-bold">
                        {dart}
                      </div>
                      {i < feedback.optimalPath.length - 1 && (
                        <span className="text-slate-500">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {feedback.backupInfo && (
              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/30">
                <div className="text-purple-300 font-bold text-sm mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Backup Options:
                </div>
                {feedback.backupInfo.afterFirst && feedback.backupInfo.afterFirst.length > 0 && (
                  <div className="text-xs text-purple-200 mb-2">
                    <span className="font-semibold">If you miss 1st dart:</span> Aim for {feedback.backupInfo.afterFirst.join(' or ')}
                  </div>
                )}
                {feedback.backupInfo.afterSecond && feedback.backupInfo.afterSecond.length > 0 && (
                  <div className="text-xs text-purple-200">
                    <span className="font-semibold">Backup doubles:</span> {feedback.backupInfo.afterSecond.join(', ')}
                  </div>
                )}
                {feedback.missStrategy && (
                  <div className="text-xs text-purple-100 mt-2 pt-2 border-t border-purple-500/30">
                    💡 {feedback.missStrategy}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButtons = () => {
  const { reset, generateNewPuzzle, feedback, getHint, showHint, removeDart, userSequence } = useGame();

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <button
          onClick={getHint}
          disabled={showHint || feedback}
          className="flex-1 py-4 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:opacity-40 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <Lightbulb className="w-5 h-5" />
          Hint
        </button>
        <button
          onClick={reset}
          className="flex-1 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>
      
      {!feedback && userSequence.length > 0 && (
        <button
          onClick={removeDart}
          className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-all"
        >
          ← Remove Last Dart
        </button>
      )}
      
      {feedback && (
        <button
          onClick={generateNewPuzzle}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all active:scale-95"
        >
          Next Puzzle
        </button>
      )}
    </div>
  );
};

// Reference Page Component
const ReferencePage = () => {
  const { switchPage } = useGame();
  const scores = Object.keys(checkoutLogic.optimalRoutes)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="max-w-4xl mx-auto py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">📚 Checkout Reference</h1>
            <p className="text-slate-400 text-sm">Complete guide to all checkouts & backup routes</p>
          </div>
          <button
            onClick={() => switchPage('game')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-all active:scale-95"
          >
            ← Back to Game
          </button>
        </div>

        <div className="space-y-4">
          {scores.map(score => {
            const route = checkoutLogic.optimalRoutes[score];
            if (!route) return null;

            return (
              <div key={score} className="bg-slate-900 rounded-xl p-6 shadow-xl border border-slate-700">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-4xl font-bold text-white mb-1">{score}</div>
                    <div className="text-xs text-slate-400">Target Score</div>
                  </div>
                  <div className="bg-green-600/20 border border-green-500/50 rounded-lg px-3 py-1">
                    <div className="text-xs text-green-300 font-bold">OPTIMAL ROUTE</div>
                  </div>
                </div>

                {/* Primary Route */}
                <div className="mb-4">
                  <div className="flex gap-2 items-center flex-wrap">
                    {route.primary.map((dart, i) => (
                      <React.Fragment key={i}>
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-4 py-2 rounded-lg font-mono text-white font-bold text-lg shadow-lg">
                          {dart}
                        </div>
                        {i < route.primary.length - 1 && (
                          <span className="text-slate-500 text-xl">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Backup Information */}
                {(route.backups?.afterFirst?.length > 0 || route.backups?.afterSecond?.length > 0 || route.missStrategy) && (
                  <div className="space-y-3">
                    <div className="text-sm font-bold text-purple-300 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Backup Strategies
                    </div>

                    {route.backups?.afterFirst?.length > 0 && (
                      <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                        <div className="text-xs text-purple-300 font-bold mb-2">
                          If you miss the 1st dart:
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {route.backups.afterFirst.map((backup, i) => (
                            <div key={i} className="bg-slate-700 px-3 py-1 rounded font-mono text-slate-200 text-sm">
                              {backup}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {route.backups?.afterSecond?.length > 0 && (
                      <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                        <div className="text-xs text-purple-300 font-bold mb-2">
                          Backup double options:
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {route.backups.afterSecond.map((backup, i) => (
                            <div key={i} className="bg-slate-700 px-3 py-1 rounded font-mono text-slate-200 text-sm">
                              {backup}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {route.missStrategy && (
                      <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                        <div className="text-xs text-amber-300 font-bold mb-2">
                          💡 Pro Tip:
                        </div>
                        <div className="text-sm text-amber-100">
                          {route.missStrategy}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

const GameContent = () => {
  const { currentPage, switchPage, inputMode } = useGame();

  if (currentPage === 'reference') {
    return <ReferencePage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="max-w-md mx-auto py-6 space-y-6">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-white mb-2">🎯 Darts Checkout</h1>
          <p className="text-slate-400 text-sm mb-3">Master your finishing game</p>
          <button
            onClick={() => switchPage('reference')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold transition-all active:scale-95"
          >
            📚 View Reference Guide
          </button>
        </div>

        <ScoreDisplay />
        <DartSequence />
        <FeedbackDisplay />
        {inputMode === 'keypad' ? <Keypad /> : <Dartboard />}
        <ActionButtons />
      </div>
    </div>
  );
};

export default App;