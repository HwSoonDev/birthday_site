"use client";

import Letter from "@/components/features/Letter";
import Image from "next/image";
import cheeseCake from "@/images/cheeseCake .png";
import icedAmericano from "@/images/icedAmericano.png";
import fork from "@/images/fork.png";
import candle from "@/images/candle.png";
import Album from "@/components/features/Album";
import { useState } from "react";

export default function Home() {
  const [isOpenAlbum, setIsOpenAlbum] = useState(false);
  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden bg-gradient-to-br from-orange-50 to-amber-100">
      <div className="w-full h-full flex items-center justify-center">
        <Image
          src={cheeseCake}
          alt="cheeseCake"
          className="min-w-120 min-h-120 w-120 h-120 absolute top-1/2 left-1/2 -translate-x-[calc(50%)] -translate-y-[calc(50%+360px)]"
        />
        <Image
          src={icedAmericano}
          alt="icedAmericano"
          className="min-w-80 min-h-80 w-80 h-80 absolute top-1/2 left-1/2 -translate-x-[calc(50%+150px)] -translate-y-[calc(50%-280px)]"
        />
        <Image
          src={fork}
          alt="fork"
          className="min-w-60 min-h-100 w-60 h-80 absolute top-1/2 left-1/2 -translate-x-[calc(50%-150px)] -translate-y-[calc(50%-280px)] rotate-100"
        />
        <Image
          src={candle}
          alt="candle"
          className="min-w-100 min-h-100 w-100 h-100 absolute top-1/2 left-1/2 -translate-x-[calc(50%+330px)] -translate-y-[calc(50%+200px)] rotate-20"
        />
        <Letter onClick={() => setIsOpenAlbum(true)} />
        {isOpenAlbum && <Album />}
      </div>
    </div>
  );
}
