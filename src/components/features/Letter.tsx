"use client";

import { RefObject, useState } from "react";
import Image from "next/image";
import letter_flap from "@/images/letter_flap.png";
import letter_back from "@/images/letter_back.png";
import letter_front from "@/images/letter_front.png";
import TiltCard from "./TiltCard";

interface LetterProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  audioRef: RefObject<HTMLAudioElement | null>;
}
export default function Letter({ onClick, audioRef }: LetterProps) {
  const [open, setOpen] = useState(false);
  const [flapOpen, setFlapOpen] = useState(false);
  const handleopen = (e: React.MouseEvent<HTMLDivElement>) => {
    audioRef.current?.play();
    const state = !open;
    setOpen(state);
    setTimeout(() => setFlapOpen(state), 400);
  };

  return (
    <div className="flex flex-col items-center justify-center select-none w-fit h-fit z-10">
      <TiltCard>
        <div
          className={`group relative w-80 h-56 cursor-pointer transition-transform outline-none duration-700 ${
            open ? "translate-y-60" : "translate-y-0"
          }`}
          role="button"
          aria-label="편지를 열기"
          tabIndex={0}
          onClick={handleopen}
        >
          {/* Flap */}
          <div
            className={`absolute top-0 left-0 right-0 h-1/2 origin-top transition-transform duration-700 ${
              open ? "rotate-x-180" : "delay-300"
            } ${flapOpen ? "z-0" : "z-3"}`}
          >
            <Image src={letter_flap} alt="flap" />
          </div>

          {/* Pocket */}
          <Image src={letter_back} alt="back" />
          <Image
            src={letter_front}
            alt="front"
            className="absolute top-0 z-2"
          />
          <div
            className={`absolute top-0 w-[320px] h-[210px] transform transition duration-500  group-hover:shadow-2xl ${
              open ? "shadow-2xl" : "shadow-lg"
            }`}
          />

          {/* Letter */}
          <div
            className={`z-1 absolute left-1/2 bottom-6 w-[90%] bg-white rounded-md shadow-lg 
                      transform -translate-x-1/2 transition-all duration-700 ease-in-out overflow-hidden
                      ${
                        open
                          ? "-translate-y-48 opacity-100 delay-300 h-[190%]"
                          : "translate-y-0 opacity-95 h-[70%]"
                      }`}
          >
            <div className="flex items-center gap-2 px-4 py-2 border-b border-amber-100 bg-amber-50">
              <div className="w-5 h-5 rounded-full bg-red-400 shadow-sm" />
              <strong className="text-black">To: ゆんなんさん 🎂</strong>
            </div>
            <div className="p-4 text-sm text-gray-700 leading-relaxed flex flex-col gap-4">
              <span>
                お誕生日おめでとう！🎉
                <br />
                2022年よぼに会えたのが、昨日のように感じるね。
                たくさんの愛をくれてありがとう。これからもずっとよぼを愛する男、すんちゃんです。
                来年は必ず就職決めて、よぼと一緒に二人暮らしできるように頑張るね。
                <br />
                たりないけど、これは今年の私からのプレセントです。
                これからもすっとすっと愛してる、ゆんなんさん。会いたいよ。
                <br />
                写真にマウスを乗せると回転します。
              </span>
              <span className="w-full flex justify-end">🍰すんちゃんが</span>
              <button
                onClick={onClick}
                className="p-2 flex itmes-center justify-center rounded-[8px] text-white text-[18px] font-bold bg-[#ed5717ff] cursor-pointer hover:bg-[#ee7a48ff]"
              >
                アルバム
              </button>
            </div>
          </div>
        </div>
      </TiltCard>

      <p className="mt-4 text-sm text-gray-500">
        クリックして封筒を開けることができます。
      </p>
    </div>
  );
}
