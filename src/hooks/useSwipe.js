import { useRef } from 'react';
import { PanResponder } from 'react-native';
import { SWIPE_MIN_DISTANCE } from '../constants/gameConfig';

export default function useSwipe(onSwipe) {
  const onSwipeRef = useRef(onSwipe);
  onSwipeRef.current = onSwipe;

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: function () { return true; },
      onMoveShouldSetPanResponder: function () { return true; },
      onPanResponderTerminationRequest: function () { return false; },
      onPanResponderRelease: function (event, gesture) {
        const dx = gesture.dx;
        const dy = gesture.dy;

        if (Math.abs(dx) < SWIPE_MIN_DISTANCE && Math.abs(dy) < SWIPE_MIN_DISTANCE) {
          return;
        }
        if (Math.abs(dx) > Math.abs(dy)) {
          onSwipeRef.current(dx > 0 ? 'right' : 'left');
        } else {
          onSwipeRef.current(dy > 0 ? 'down' : 'up');
        }
      },
    })
  ).current;

  return responder.panHandlers;
}
