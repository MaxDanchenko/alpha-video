import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import SceneBg from './assets/bg.jpg';
import Dinosaur from './assets/dinosaur.webm';
import Button from '@mui/material/Button';

type Props = {
  className?: string;
};

const App = ({ className }: Props) => {
  const leftDinoRef = useRef<HTMLVideoElement>(null);
  const rightDinoRef = useRef<HTMLVideoElement>(null);
  const [isLooping, setIsLooping] = useState(false);

  const handleAttack = (ref: React.RefObject<HTMLVideoElement>) => {
    if (ref.current) {
      ref.current.currentTime = 0; // Start from the beginning
      ref.current.play();

      // Pause the video after 4 seconds and reset it to 0:00
      setTimeout(() => {
        if (ref.current) {
          ref.current.pause();
          ref.current.currentTime = 0; // Reset to the beginning
        }
      }, 4000); // 4000ms = 4 seconds
    }
  };

  const toggleLoop = () => {
    setIsLooping((prev) => !prev);

    if (!isLooping) {
      // Start looping both videos
      if (leftDinoRef.current) {
        leftDinoRef.current.loop = true;
        leftDinoRef.current.play();
      }
      if (rightDinoRef.current) {
        rightDinoRef.current.loop = true;
        rightDinoRef.current.play();
      }
    } else {
      // Stop looping and reset both videos
      if (leftDinoRef.current) {
        leftDinoRef.current.loop = false;
        leftDinoRef.current.pause();
        leftDinoRef.current.currentTime = 0;
      }
      if (rightDinoRef.current) {
        rightDinoRef.current.loop = false;
        rightDinoRef.current.pause();
        rightDinoRef.current.currentTime = 0;
      }
    }
  };

  return (
    <Wrapper className={className}>
      {/* Left Dinosaur */}
      <TransparentVideo
        ref={leftDinoRef}
        muted
        playsInline
        src={Dinosaur}
        style={{ left: '0px',  bottom: '20%'  }}
      />
      <AttackButton
        variant="contained"
        color="primary"
        onClick={() => handleAttack(leftDinoRef)}
        style={{ left: '10px', top: '10%' }}
      >
        Left Dino Attack
      </AttackButton>

      {/* Right Dinosaur */}
      <TransparentVideo
        ref={rightDinoRef}
        muted
        playsInline
        src={Dinosaur}
        style={{ right: '0px', bottom: '20%' }}
      />
      <AttackButton
        variant="contained"
        color="secondary"
        onClick={() => handleAttack(rightDinoRef)}
        style={{ right: '10px', top: '10%' }}
      >
        Right Dino Attack
      </AttackButton>

      {/* Toggler for Looping */}
      <ToggleButton
        variant="contained"
        color="success"
        onClick={toggleLoop}
        style={{ top: '10%', position: 'absolute' }}
      >
        {isLooping ? 'Stop Looping' : 'Start Looping'}
      </ToggleButton>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: url(${SceneBg}) no-repeat center center;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
`;

const TransparentVideo = styled.video`
    width: 40%; /* Adjust size as needed */
    height: auto;
    position: absolute;
    bottom: 0;
    z-index: 100;
`;

const AttackButton = styled(Button)`
    position: absolute;
    z-index: 200;
`;

const ToggleButton = styled(Button)`
  position: absolute;
  z-index: 300;
  left: 50%;
  transform: translateX(-50%);
`;
