"use client";
import { ReactNode, useEffect, useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import TiltCard from "./TiltCard";
const ic_left = "/icons/left_arrow.svg";
const ic_right = "/icons/right_arrow.svg";

interface AlbumProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Album({ onClick }: AlbumProps) {
  const [page, setPage] = useState(0);

  const handlePage = (d: number) => {
    setPage(
      (prev) => (prev + d + albumlist.length + 1) % (albumlist.length + 1)
    );
  };

  return (
    <div className="fixed flex flex-col items-center justify-center w-[100vw] h-[100vh] bg-[#00000080] select-none z-20">
      <div className="flex flex-col itmes-center justify-center w-fit h-fit">
        {page < albumlist.length && (
          <div className="flex gap-[20px] w-fit h-fit items-center">
            <ul className="w-[600px] flex justify-center">
              {albumlist.map((photo, idx) => (
                <li
                  key={idx}
                  className={
                    idx === page
                      ? "absolute top-1/2 left-1/2 -translate-x-[calc(50%+300px)] -translate-y-1/2 opacity-100"
                      : "absolute top-1/2 left-1/2 -translate-x-[calc(50%+300px)]-y-1/2 opacity-0"
                  }
                >
                  <Photo img={photo.img} width={photo.width || 350} />
                </li>
              ))}
            </ul>
            <div className="flex flex-col justify-between h-fit gap-[20px] z-10">
              <div className="p-[20px] rounded-[16px] bg-[#00000070] w-[500px] h-fit text-[20px] flex flex-col gap-[8px]">
                <div className="flex gap-[8px] w-fll h-fit border-b border-[#808080] py-[8px]">
                  <span className="font-[500] text-gray-100">日付:</span>
                  <span className="text-gray-200 ">{albumlist[page].date}</span>
                </div>
                <div className="flex gap-[8px] w-fll h-fit py-[8px]">
                  <span className="font-[500] text-gray-100 shrink-0">
                    コメント:
                  </span>
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
        )}
        {page === albumlist.length && (
          <div className="flex flex-col justify-between h-fit gap-[20px] z-10">
            <div className="p-[20px] rounded-[16px] bg-[#ffffff] w-[500px] h-fit text-[20px] flex flex-col gap-[8px]">
              <div className="flex gap-[8px] justify-center w-fll h-fit border-b border-[#808080] py-[8px]">
                <span className="font-[500] text-gray-500 w-fit">Feat.</span>
              </div>
              <div className="flex gap-[8px] w-fll h-fit py-[8px] justify-center ">
                <span className="text-gray-500 text-center">
                  このサイトはこれからも写真を追加できます。
                  <br />
                  新たな機能の追加も考えてます。
                </span>
              </div>
              <div className="w-full flex justify-center items-center h-[60px]">
                <button
                  onClick={onClick}
                  className="p-2 flex items-center w-[100px] justify-center rounded-[8px] text-white text-[18px] font-bold bg-[#ed5717ff] cursor-pointer hover:bg-[#ee7a48ff]"
                >
                  メインへ
                </button>
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
        )}
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
      <div className="p-[20px_20px_60px_20px] bg-white shadow-lg shrink-0 cursor-pointer">
        <div className="shadow-inner-xl w-fit h-fit overflow-hidden rounded-[10px] shrink-0">
          {}
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

interface AlbumListProps {
  width: number;
  img: string;
  date: string;
  description: ReactNode;
}

const albumlist: AlbumListProps[] = [
  {
    width: 350,
    img: "/photos/wedding.png",
    date: "2022-04-16",
    description: (
      <span>
        祝福記念日、よぼは語学院、私は大学にいたごろの2022年の春。よぼは私に会うために韓国に来てくれたね。
        <br />
        色んな事が起きて、
        <br />
        この日から物語は始まりました。ずっとずっとよぼに感謝です。
        <br />
        この写真が一番。
      </span>
    ),
  },
  {
    width: 350,
    img: "/photos/wedding_2.png",
    date: "2022-04-16",
    description: (
      <span>
        春の桜の下で二人。
        <br />
        昨夜からお嫁さん、お婿さん準備で寝ることもなく夜が過ぎたのにとてもきれいに笑ってます。一番きれいな春でした。こんなに美人のよぼに会えたのが夢のようです。
        <br />
        いつも恋しいです。いつもありがとう。
        生まれ変わったらよぼとまた結婚したいです。
      </span>
    ),
  },
  {
    width: 350,
    img: "/photos/sulak_cafe.png",
    date: "2022-04-23",
    description: (
      <span>
        ソラクでよぼとあった日です。
        <br />
        祝福後何回かよぼと会うためにソウルの道を覚えたことを思い出します。
        <br />
        向こうに見える庭の椅子で座っていたこと覚えてますか？
        帰るときはよぼをバス停の前で迷子にさせてしまった日です。
        この日のことはいつも申し訳ないです。
        <br />
        <br />
        この誕生日サイトのモチベーションはこのソラクカフェのコーヒーとチーズケーキです。
      </span>
    ),
  },
  {
    width: 250,
    img: "/photos/kamakura_cafe.png",
    date: "2023-05-27",
    description: (
      <span>
        軍隊にいる間も3回日本に行くことができました。
        <br />
        よぼはカフェがとても大好きです。そういうよぼと過ごしながら私もカフェが好きになりました。
        <br />
        鎌倉のカフェは韓国の人が店長だよね。お花の販売もあってそこの前で写真を撮りました。
        鎌倉カフェでずっとこの写真が撮りたかったんだと昔の会話でつい気づきました。
        私を連れてきてくれてありがとう。これからもずっと行きたいです。
      </span>
    ),
  },
  {
    width: 350,
    img: "/photos/flower_garden.png",
    date: "2023-06-01",
    description: (
      <span>
        短い軍の休みの中、よぼが用意してくれた大切な思い出です。
        <br />
        イングリッシュガーデンでお花の森で緩やかに遊びました。
        よぼはお花も大好きです。
        <br />
        この日によぼのきれいなラインの写真も取れました。
        よぼは私の大切なアリエッティです。
      </span>
    ),
  },
  {
    width: 250,
    img: "/photos/flower_garden_2.png",
    date: "2023-06-01",
    description: (
      <span>
        イングリッシュガーデンその２。
        <br />
        目がまぶしいのかな。よぼの笑顔を見習いたいです。
        <br />
        表情はこうだけどとても幸せな探検でした。お花がたくさんで森の中のようでした。
        次の時はゆんじょんお姉さんも一緒にいったね。
        春の終わりを向っていたのにお花が元気でありがとう。
      </span>
    ),
  },
  {
    width: 500,
    img: "/photos/sankeien_2.png",
    date: "2025-03-24",
    description: (
      <span>
        三渓園という偉い人の作った庭です。
        <br />
        知り合いのお兄さんに連れられてよぼも来たけど、
        お兄さんが写真を丁寧にとってくれてました。
        <br />
        よぼの後ろ姿もとてもかわいくて綺麗です。外の風景とカモたちもとてもよかったです。
      </span>
    ),
  },
  {
    width: 400,
    img: "/photos/sankeien.png",
    date: "2025-03-24",
    description: (
      <span>
        三渓園の中の建物の入り口です。
        <br />
        二人の身長差がかわいい。よぼがとってもかわいく笑ってます。
        天気も良くて古びた昔の建物も大好きです。
        <br />
        よぼはいつも優しいです。
        またいつ日本に行けるかな、次はもっともっといい写真が撮れるはずです。
        これからもずっとこうそばに立っていてください。 よぼ、会いたいです。
      </span>
    ),
  },
];
