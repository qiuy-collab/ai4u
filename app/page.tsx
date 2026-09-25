import Hero from "@/components/sections/Hero";
import ActWhat from "@/components/sections/ActWhat";
import ActJoin from "@/components/sections/ActJoin";

/** 首页 — Acts 宏结构：Hero → 是什么 → 怎么加入 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ActWhat />
      <ActJoin />
    </>
  );
}
