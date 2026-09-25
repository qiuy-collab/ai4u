import Hero from "@/components/sections/Hero";
import ActWhat from "@/components/sections/ActWhat";
import ActDoing from "@/components/sections/ActDoing";
import ActStart from "@/components/sections/ActStart";
import ActJoin from "@/components/sections/ActJoin";

/** 首页 — Acts 宏结构：Hero → 是什么 → 在忙什么(墨幕) → 新手入口 → 怎么加入 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ActWhat />
      <ActDoing />
      <ActStart />
      <ActJoin />
    </>
  );
}
