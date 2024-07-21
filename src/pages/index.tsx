import { Vazirmatn } from "next/font/google";

const vazirmatn = Vazirmatn({ subsets: ["arabic"] });

export default function Home() {
  return <main className={` ${vazirmatn.className}`}></main>;
}
