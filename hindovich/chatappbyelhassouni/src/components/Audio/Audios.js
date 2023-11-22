import React, { useEffect, useRef, useState, useCallback } from "react";
import useRecorder from "./useRecorder";

const TimerController = (props) => {
  const [renderedStreamDuration, setRenderedStreamDuration] = useState(
      "00:00:00"
    ),
    streamDuration = useRef(0),
    previousTime = useRef(0),
    requestAnimationFrameId = useRef(null),
    [isStartTimer, setIsStartTimer] = useState(false),
    [isStopTimer, setIsStopTimer] = useState(false),
    [isPauseTimer, setIsPauseTimer] = useState(false),
    [isResumeTimer, setIsResumeTimer] = useState(false),
    isStartBtnDisabled = isPauseTimer || isResumeTimer || isStartTimer,
    isStopBtnDisabled = !(isPauseTimer || isResumeTimer || isStartTimer);

  const updateTimer = useCallback(() => {
    let now = performance.now();
    let dt = now - previousTime.current;

    if (dt >= 1000) {
      streamDuration.current = streamDuration.current + Math.round(dt / 1000);
      const formattedStreamDuration = new Date(streamDuration.current * 1000)
        .toISOString()
        .substr(11, 8);
      setRenderedStreamDuration(formattedStreamDuration);
      previousTime.current = now;
    }
    requestAnimationFrameId.current = requestAnimationFrame(updateTimer);
  }, []);

  const startTimer = useCallback(() => {
    previousTime.current = performance.now();
    requestAnimationFrameId.current = requestAnimationFrame(updateTimer);
  }, [updateTimer]);

  useEffect(() => {
    if (props.record === true) {
      startHandler();
    } else {
      stopHandler();
    }
    if (isStartTimer && !isStopTimer) {
      startTimer();
    }
    if (isStopTimer && !isStartTimer) {
      streamDuration.current = 0;
      cancelAnimationFrame(requestAnimationFrameId.current);
      setRenderedStreamDuration("00:00:00");
    }
  }, [isStartTimer, isStopTimer, startTimer, props.record]);

  const startHandler = () => {
    setIsStartTimer(true);
    setIsStopTimer(false);
  };

  const stopHandler = () => {
    setIsStopTimer(true);
    setIsStartTimer(false);
    setIsPauseTimer(false);
    setIsResumeTimer(false);
  };

  return (
    <div className="timer-controller-wrapper">{renderedStreamDuration}s</div>
  );
};

function App() {
  const [state, setState] = useState("");
  const [audios, setAudios] = useState([]);
  const [record, setRecord] = useState(false);
  const [play, setPlay] = useState(false);
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  useEffect(() => {
    if (audios.length <= 0) {
      setAudios([audioURL]);

    } else {
        console.log(audioURL)
      setAudios([...audios, audioURL]);
    }
  }, [audioURL]);

  function Buttonstart() {
    setState("red");
    setRecord(true);
    startRecording();
  }
  async function Buttonstop() {
    if (isRecording === true) {
      await stopRecording();
      setState("#4695da");
      setRecord(false);
    } else {
      alert("Give permission audio to record");
    }
  }
  function Deletedata(id) {
    const data = audios.filter((e, index) => {
      return index !== id;
    });
    setAudios(data);
  }
  function stateaudio(e, index) {
    if (e.target.classList.contains("fa-play")) {
      e.target.classList.remove("fa-play");
      e.target.classList.add("fa-pause");
    } else if (e.target.classList.contains("fa-pause")) {
      e.target.classList.remove("fa-pause");
      e.target.classList.add("fa-play");
    }

    var myAudio = document.getElementById(`audioId${index}`);
    return myAudio.paused ? myAudio.play() : myAudio.pause();
  }
  return (
    <div className="App">
      {audios.map((res, index) =>
        index !== 0
          ? res && (
              <div
                style={{
                  width: "100%",
                  height: 70,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  flexDirection: "row"
                }}
              >
                <div>
                  <div hidden>
                    <audio
                      id={`audioId${index}`}
                      onEnded={() => {
                        if (
                          document
                            .getElementById(`playAudio${index}`)
                            .classList.contains("fa-pause")
                        ) {
                          document
                            .getElementById(`playAudio${index}`)
                            .classList.add("fa-play");
                          document
                            .getElementById(`playAudio${index}`)
                            .classList.remove("fa-pause");
                        }
                      }}
                      src={res.data}
                      controls
                      type="audio/mp3"
                    />
                  </div>
                  <div>
                    <button className={"btn btn-warning"}>
                      <i
                        style={{ color: "white" }}
                        id={`playAudio${index}`}
                        onClick={(e) => stateaudio(e, index)}
                        className={"fa fa-play"}
                      />
                    </button>
                  </div>
                </div>

                <i
                  className={"btn btn-outline-primary"}
                  onClick={() => Deletedata(index)}
                  style={{ color: "black" }}
                >
                  Voice Delete
                </i>
              </div>
            )
          : null
      )}
      <div style={{ display: "flex", margin: 20, flexDirection: "column" }}>
        <span style={{ fontSize: 14 }}>Attach Voice Note</span>
        <span style={{ fontSize: 14 }}>Instant shop what you want</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <button
          className={"btn btn-primary button"}
          style={{
            background: state === "" ? "#4695da" : state,
            color: "white",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            margin: 10
          }}
          onClick={() => {
            Buttonstart();
            setTimeout(() => Buttonstop(), 500);
          }}
          // onTouchStart={() => setTimeout(() => Buttonstart(), 500)}
          // onMouseDown={() => setTimeout(() => Buttonstart(), 500)}
          // onBlur={() => setTimeout(() => Buttonstop(), 500)}
          // onMouseUp={() => setTimeout(() => Buttonstop(), 500)}
        >
          {record === true ? (
            <>
              <span style={{ marginLeft: "20px" }}>
                <TimerController record={record} />
              </span>
            </>
          ) : (
            <i class="fas fa-microphone"></i>
          )}
        </button>
        <div
          style={{ marginRight: 10, display: "flex", flexDirection: "column" }}
        >
          <span style={{ fontSize: 14, color: "green" }}>
            Tab hold to Start
          </span>
          <span style={{ fontSize: 10 }}>Please record within 1min</span>
        </div>
      </div>
    </div>
  );
}
export default App;
