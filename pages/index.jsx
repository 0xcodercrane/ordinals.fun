import { useRef, useState, useEffect, useContext } from "react";
import Head from "next/head";
import React from "react";
import { FaPlay, FaPause, FaBackward, FaForward } from "react-icons/fa";
import { SiBitcoinsv } from "react-icons/si";
import MenuBar from "@/components/Menu";
import Wave from "@/components/Wave";
import { onValue, ref, query, orderByChild, equalTo } from "firebase/database";
import { db } from "@/services/firebase";
import "@/styles/Home.module.css";
import { AudioContext } from "@/context/audio";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function Home() {
  const audioContext = useContext(AudioContext);
  const [inscription, setInscription] = useState();
  const [latestBlock, setLatestBlock] = useState(0);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [state, setState] = useState({
    loading: false,
    playing: false,
    currentTime: 0,
    duration: 0,
    repeat: false,
  });
  const audioPlayer = useRef(null);
  const [typingTimer, setTypingTimer] = useState(0);

  const handlePlay = () => {
    audioPlayer.current?.play();
    setState({ ...state, playing: true });
  };

  const handlePause = () => {
    audioPlayer.current?.pause();
    setState({ ...state, playing: false });
  };

  const prevBlock = () => {
    audioPlayer.current?.pause();
    getAudio(Number(currentBlock) - 1);
    setCurrentBlock(Number(currentBlock) - 1);
    setState({ ...state, playing: false });
  };

  const nextBlock = () => {
    audioPlayer.current?.pause();
    getAudio(Number(currentBlock) + 1);
    setCurrentBlock(Number(currentBlock) + 1);
    setState({ ...state, playing: false });
  };

  const changeBlock = (e) => {
    if (
      Number(e.target.value) < 0 ||
      e.target.value === "" ||
      e.target.value > latestBlock
    )
      return false;
    setCurrentBlock(e.target.value);
    setTimer(e.target.value);
  };

  const handleTimeUpdate = () => {
    if (audioPlayer.current?.ended) {
      setState({
        ...state,
        currentTime: 0,
        playing: false,
      });
    } else if (audioPlayer.current)
      setState({
        ...state,
        currentTime: audioPlayer.current?.currentTime,
        duration: audioPlayer.current?.duration,
      });
  };

  const getLatestBlockInfo = async () => {
    try {
      const response = await fetch(`/blocks/latestblock`);
      const result = await response.json();
      if (result) setLatestBlock(result.height);
    } catch (error) {
      console.log("Backend API error");
    }
  };

  const getAudio = async (currentBlock) => {
    setState({
      ...state,
      loading: true,
    });
    audioContext.setState({ ...state, isPlay: false });

    const dbQuery = query(
      ref(db, "inscriptions"),
      orderByChild("block_no"),
      equalTo(Number(currentBlock))
    );

    await onValue(dbQuery, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists() && data) {
        setInscription(Object.values(data)[0]);
        audioContext.setState({ ...data, isPlay: true });
      } else {
        setInscription(null);
      }
    });
    setState({
      ...state,
      loading: false,
    });
  };

  const clearTimer = () => {
    clearTimeout(typingTimer);
  };

  const setTimer = (currentBlock) => {
    setState({
      ...state,
      loading: true,
    });
    clearTimeout(typingTimer);
    const timer = setTimeout(() => {
      getAudio(currentBlock);
    }, 1000);
    setTypingTimer(timer);
  };

  const handleAudio = () => {
    if (state.playing) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  useEffect(() => {
    getLatestBlockInfo();
    if (audioContext.currentBlock) {
      setCurrentBlock(Number(audioContext.currentBlock));
      getAudio(Number(audioContext.currentBlock));
    }
  }, []);

  return (
    <Layout>
      <div className="my-auto flex flex-col justify-center items-center">
        <h1 className="text-5xl text-white font-bold mb-8 animate-pulse">
          Coming Soon
        </h1>
        <p className="text-white text-lg mb-8 text-center">
          We are working hard to give you something cool. <br /> Please wait a
          little bit.
        </p>
      </div>
    </Layout>
  );
}
