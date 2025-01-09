import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import SceneBg from './assets/bg.jpg';
import Chicken from './assets/Chicken.webm';
import ChickenQT from './assets/Chicken.mov';
import Medusa from './assets/Medusa.webm';
import MedusaQT from './assets/Medusa.mov';
import Button from '@mui/material/Button';

type Props = {
  className?: string;
};

const App = ({ className }: Props) => {
  const leftDinoRef = useRef<HTMLVideoElement>(null);
  const rightDinoRef = useRef<HTMLVideoElement>(null);
  const [isLooping, setIsLooping] = useState(false);

  const handleAttack = (ref: React.RefObject<HTMLVideoElement>, rate?: number) => {
    if (ref.current) {
      ref.current.playbackRate = rate || 1;
      ref.current.currentTime = 0; // Start from the beginning
      ref.current.play();

      // Pause the video after 1.5 seconds and reset it to 0:00
      setTimeout(() => {
        if (ref.current) {
          ref.current.pause();
          ref.current.currentTime = 0; // Reset to the beginning
        }
      }, 1500); // 1500ms = 1.5 seconds
    }
  };

  const startLooping = (ref: React.RefObject<HTMLVideoElement>) => {
    if (ref.current) {
      ref.current.loop = true;
      ref.current.play();
    }
  };
  const stopLooping = (ref: React.RefObject<HTMLVideoElement>) => {
    if (ref.current) {
      ref.current.loop = false;
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  };

  const toggleLoop = () => {
    setIsLooping((prev) => !prev);

    if (!isLooping) {
      // Start looping both videos
      startLooping(leftDinoRef);
      startLooping(rightDinoRef);
    } else {
      // Stop looping and reset both videos
      stopLooping(leftDinoRef);
      stopLooping(rightDinoRef);
    }
  };

  return (
    <Wrapper className={className}>
      <TransparentVideo ref={leftDinoRef} muted playsInline style={{ left: '0px', bottom: '20%' }}>
        <source src={MedusaQT} type="video/quicktime" />
        <source src={Medusa} type="video/webm" />
        Non
      </TransparentVideo>
      <AttackButton
        variant="contained"
        color="primary"
        onClick={() => handleAttack(leftDinoRef)}
        style={{ left: '10px', top: '10%' }}
      >
        Left Dino Attack
      </AttackButton>

      <TransparentVideo ref={rightDinoRef} muted playsInline style={{ right: '0px', bottom: '20%' }}>
        <source src={ChickenQT} type="video/quicktime" />
        <source src={Chicken} type="video/webm" />
      </TransparentVideo>
      <AttackButton
        variant="contained"
        color="secondary"
        onClick={() => handleAttack(rightDinoRef, 3.5)}
        style={{ right: '10px', top: '10%' }}
      >
        Right Dino Attack
      </AttackButton>

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
    width: 40%; 
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
