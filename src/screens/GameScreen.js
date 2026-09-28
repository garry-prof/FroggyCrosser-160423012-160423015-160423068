import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import COLORS from '../constants/colors';
import { COLS, ROWS, TICK_MS, GAME_DURATION } from '../constants/gameConfig';
import { createInitialState, updateGame, moveFrog } from '../game/gameEngine';
import { getFlyPosition } from '../game/flyManager';
import { calculateScore, recordLastGame } from '../services/scoreService';
import { getCurrentUser } from '../services/authService';
import useGameLoop from '../hooks/useGameLoop';
import useSwipe from '../hooks/useSwipe';

import LaneBackground from '../components/game/LaneBackground';
import Frog from '../components/game/Frog';
import Vehicle from '../components/game/Vehicle';
import Log from '../components/game/Log';
import Fly from '../components/game/Fly';
import GameHUD from '../components/game/GameHUD';

const RESERVED_HEIGHT = 200;

export default function GameScreen({ navigation }) {
  const { width, height } = useWindowDimensions();

  const tileByWidth = Math.floor((width - 16) / COLS);
  const tileByHeight = Math.floor((height - RESERVED_HEIGHT) / ROWS);
  const tileSize = Math.min(tileByWidth, tileByHeight);
  const boardWidth = tileSize * COLS;
  const boardHeight = tileSize * ROWS;

  const [game, setGame] = useState(function () {
    return createInitialState(tileSize, boardWidth);
  });
  const [isPaused, setIsPaused] = useState(false);
  const hasFinished = useRef(false);

  const handleTick = useCallback(function (dt) {
    setGame(function (prev) {
      return updateGame(prev, dt);
    });
  }, []);

  useGameLoop(handleTick, !game.isOver && !isPaused, TICK_MS);

  const panHandlers = useSwipe(function (direction) {
    if (isPaused) return;
    setGame(function (prev) {
      return moveFrog(prev, direction);
    });
  });

  useEffect(function () {
    if (game.isOver && !hasFinished.current) {
      hasFinished.current = true;
      finishGame(game);
    }
  }, [game.isOver]);

  async function finishGame(finalState) {
    const score = calculateScore(finalState.frogsCrossed, finalState.bonusPoints);
    const username = await getCurrentUser();
    await recordLastGame(username, score, finalState.frogsCrossed);

    navigation.replace('Result', {
      score: score,
      frogs: finalState.frogsCrossed,
      flies: finalState.fliesCaught,
      bonus: finalState.bonusPoints,
    });
  }

  function handlePause() {
    setIsPaused(true);
    Alert.alert(
      'Permainan Dijeda',
      'Keluar sekarang? Skor ronde ini tidak akan disimpan.',
      [
        { text: 'Lanjut Main', onPress: function () { setIsPaused(false); } },
        { text: 'Keluar', style: 'destructive', onPress: function () { navigation.goBack(); } },
      ],
      { cancelable: false }
    );
  }

  const score = calculateScore(game.frogsCrossed, game.bonusPoints);
  const flyPosition = game.fly !== null ? getFlyPosition(game.fly, game.obstacles) : null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handlePause} style={styles.pauseButton}>
          <Text style={styles.pauseText}>⏸  Jeda</Text>
        </TouchableOpacity>
      </View>

      <GameHUD
        timeLeft={game.timeLeft}
        totalTime={GAME_DURATION}
        score={score}
        frogs={game.frogsCrossed}
        speed={game.speedMultiplier}
      />

      <View style={styles.playArea} {...panHandlers}>
        <View style={[styles.board, { width: boardWidth, height: boardHeight }]}>
          <LaneBackground tileSize={tileSize} />

          {game.obstacles.map(function (item) {
            if (item.type === 'log') {
              return <Log key={item.id} item={item} tileSize={tileSize} />;
            }
            return <Vehicle key={item.id} item={item} tileSize={tileSize} />;
          })}

          {flyPosition !== null ? (
            <Fly key={game.fly.id} x={flyPosition.x} row={flyPosition.row} tileSize={tileSize} />
          ) : null}

          <Frog x={game.frog.x} row={game.frog.row} tileSize={tileSize} hopCount={game.hopCount} />
        </View>

        {game.message !== '' ? (
          <View style={styles.toast}>
            <Text style={styles.toastText}>{game.message}</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.hint}>Swipe di mana saja untuk melompat</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primaryDark },
  topBar: { flexDirection: 'row', paddingHorizontal: 12, paddingTop: 4 },
  pauseButton: { backgroundColor: 'rgba(255,255,255,0.15)', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  pauseText: { color: COLORS.white, fontWeight: '700' },
  playArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  board: { overflow: 'hidden', borderRadius: 8 },
  toast: {
    position: 'absolute',
    top: '45%',
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  toastText: { color: COLORS.white, fontWeight: '800', fontSize: 16 },
  hint: { color: '#A5D6A7', textAlign: 'center', paddingBottom: 8, fontSize: 12 },
});
