import Head from "next/head";
import Image from "next/image";
// import fundament from "../public/monolit-fundament1.jpg";
import fundament from "../public/фон.jpg";
import Link from "next/link";
import black from "../public/Rectangle 420.svg";
import elipse from "../public/Ellipse 85.svg";

export default function Index() {
  return (
    <>
      <Head>
        <title>Quiz</title>
        <meta name="description" content=""></meta>
      </Head>

      <div className="relative min-h-screen flex flex-col">
        <div className="full-v" style="width: 100%;height: 100%;position: absolute;background: #2b0a0a63;z-index: -1;"></div>
        <Image
          src={black}
          className=" z-[-1] absolute sm:min-h-[570px] object-cover top-0 left-0 w-full z-10"
          alt=""
        />
        <Image
          src={fundament}
          className=" z-[-2] absolute min-h-full object-cover w-full"
          alt=""
        />
        <Image
          src={black}
          className="  z-[-1] absolute bottom-0 sm:min-h-[570px] object-cover rotate-180 left-0 w-full  z-10"
          alt=""
        />
        <header>
          <nav className="">
            <div className="nav-left ">
              <Link href="#" className="mr-5">Фундаментвспб.рф</Link>
              <div className="line"></div>
              <p className="sm:hidden">
                Строительство фундаментов <br />в Санкт-Петербурге и
                Ленинградской области!
              </p>
            </div>
            <div className="nav-center sm:hidden">
              г. Санкт-Петербург, Проезд Шокальского, д. 5
            </div>
            <div className="nav-right">+7 (499) 350-10-79</div>
          </nav>
        </header>

        <div className="text-white flex items-center justify-center  my-[7rem] sm:my-[3rem] px-10 ">
          <Image src={elipse} className="absolute object-cover z-[-1]" alt="" />
          <div className="flex flex-col items-center  justify-center space-y-5">
            <h1 className=" text-[34px] sm:text-[25px] uppercase !m-0 text-center">
              Нужен надежный фундамент ?
            </h1>
            <div className="text-center">
              Пройдите простой тест из 7 вопросов за 1 минуту <br/>
              Получив расчёт стоимости фундамента под ключ!
            </div>
            <Link href="/quiz" >
              <button className="bg-white text-green uppercase py-5 px-6 rounded-full">Рассчитать стоимость</button>
            </Link>
          </div>
        </div>
        <footer className="mt-auto text-white flex max-w-[1300px] gap-3 mx-auto p-2">
          <div className="nav-left">
            <Link href="#" className="sm:hidden mr-5">Фундаментвспб.рф</Link>
            <div className="line"></div>
            <p className="sm:hidden">
              2009-2023 © Все права защищены. <br />
              ООО &apos;Про-бригадир строй&apos; ОГРН 1125030003489
            </p>
          </div>
          <div className="">
            г. Санкт-Петербург, Проезд Шокальского, д. 5
          </div>
          <div className="nav-right ml-auto sm:hidden">+7 (499) 350-10-79</div>
        </footer>
      </div>
    </>
  );
}

