"use client";
import { useEffect, useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import TiltCard from "./TiltCard";
const ic_left = "/icons/left_arrow.svg";
const ic_right = "/icons/right_arrow.svg";

export default function Album() {
  const [page, setPage] = useState(0);
  const photo = albumlist[page].img;

  const handlePage = (d: number) => {
    setPage((prev) => (prev + d + albumlist.length) % albumlist.length);
  };

  return (
    <div className="fixed flex flex-col items-center justify-center w-[100vw] h-[100vh] bg-[#00000080] select-none">
      <div className="flex flex-col itmes-center justify-center w-fit h-fit">
        <div className="flex gap-[20px] w-fit h-fit items-center">
          <div className="w-[600px] flex justify-center">
            <Photo img={photo} width={albumlist[page].width || 350} />
          </div>
          <div className="flex flex-col justify-between h-fit gap-[20px] z-10">
            <div className="p-[20px] rounded-[16px] bg-[#00000070] w-[500px] h-fit text-[20px] flex flex-col gap-[8px]">
              <div className="flex gap-[8px] w-fll h-fit">
                <span className="font-[500] text-gray-100">日付:</span>
                <span className="text-gray-200 ">{albumlist[page].date}</span>
              </div>
              <div className="flex gap-[8px] w-fll h-fit">
                <span className="font-[500] text-gray-100">コメント:</span>
                <span className="text-gray-200 ">
                  {albumlist[page].description}
                </span>
              </div>
            </div>
            <div className="flex gap-[30px] justify-center">
              <button
                onClick={() => handlePage(-1)}
                className="rounded-[60px] w-[60px] h-[60px] bg-[#00000080] flex itmes-center justify-center cursor-pointer hover:bg-[#ee7a48ff]"
              >
                <Image src={ic_left} alt="ic_left" width={30} height={30} />
              </button>
              <button
                onClick={() => handlePage(1)}
                className="rounded-[60px] w-[60px] h-[60px] bg-[#00000080] flex itmes-center justify-center cursor-pointer hover:bg-[#ee7a48ff]"
              >
                <Image src={ic_right} alt="ic_right" width={30} height={30} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PhotoProps {
  img: string;
  width: number;
}

function Photo({ img, width }: PhotoProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [img]);

  const style = {
    width,
    minWidth: width,
  };

  return (
    <TiltCard useOverlay={true} trigger={isLoaded}>
      <div className="p-[20px_20px_60px_20px] bg-white shadow-lg shrink-0">
        <div className="shadow-inner-xl w-fit h-fit overflow-hidden rounded-[8px] shrink-0">
          <Image
            src={img}
            alt="photo"
            width={1000}
            height={1000}
            style={style}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </div>
    </TiltCard>
  );
}

interface AlbumProps {
  width: number;
  img: string;
  date: string;
  description: string;
}

const albumlist: AlbumProps[] = [
  {
    width: 350,
    img: "/photos/wedding.png",
    date: "2023-04-16",
    description: "",
  },
  {
    width: 350,
    img: "/photos/wedding_2.png",
    date: "2023-04-16",
    description: "",
  },
  {
    width: 350,
    img: "/photos/sulak_cafe.png",
    date: "2023-04-16",
    description: "",
  },
  {
    width: 250,
    img: "/photos/kamakura_cafe.png",
    date: "2023-04-16",
    description: "",
  },
  {
    width: 350,
    img: "/photos/flower_garden.png",
    date: "2023-04-16",
    description: "",
  },
  {
    width: 250,
    img: "/photos/flower_garden_2.png",
    date: "2023-04-16",
    description: "",
  },
  {
    width: 500,
    img: "/photos/sankeien_2.png",
    date: "2023-04-16",
    description: "",
  },
  {
    width: 400,
    img: "/photos/sankeien.png",
    date: "2023-04-16",
    description: "",
  },
];
