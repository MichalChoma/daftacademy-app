import React, { useState, useEffect } from "react";
import usePlayer from "~/hooks/usePlayer.hook";
import styles from "./ProgressBar.module.css";

const ProgressBar = () => {
  const { state, actions } = usePlayer();
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setPosition(state.progress);
  }, [state.progress]);

  const getParsedTime = (totalSec: number) => {
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    return (
      <span>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </span>
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div
          className={styles.progressBar}
          style={{ width: `${position * 100}%` }}
        ></div>
        <div
          className={styles.thumb}
          style={{ left: `${position * 100}%`}}
        ></div>
        <input
          type="range"
          step={0.01}
          max={state.duration}
          className={styles.range}
          onChange={(e) => actions.seek(+e.target.value)}
          onMouseDown={() => actions.pause()}
          onTouchStart={() => actions.pause()}
          onMouseUp={() => actions.play()}
          onTouchEnd={() => actions.play()}
        />
      </div>
      <div className={styles.timer}>
        {getParsedTime(state.currentTime)} / {getParsedTime(state.duration)}
      </div>
    </div>
  );
};

export default ProgressBar;
