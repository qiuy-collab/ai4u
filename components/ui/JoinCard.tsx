import { SITE } from "@/content/site";

// 组件层引用 public/ 静态资源要自己拼 basePath 前缀（本地构建为空串）。
const ASSET_PREFIX = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? "";

/**
 * 加入卡 — 全站视觉权重最高的一块。
 * 微信群没有群号，加入方式就是扫码：右侧固定渲染二维码图（原「群号 + 复制按钮」范式已随微信群移除）。
 * 二维码源图在 public/wechat-group-qr.png，换群时只替换这张图。
 */
export default function JoinCard() {
  return (
    <div className="join-card">
      <div className="join-card__info">
        <p className="eyebrow">{SITE.join.groupLabel}</p>
        <p className="join-card__hint">{SITE.join.hint}</p>
      </div>
      <div className="join-card__qr">
        <img
          src={`${ASSET_PREFIX}${SITE.join.qr}`}
          alt={SITE.join.qrAlt}
          width={148}
          height={148}
        />
      </div>
    </div>
  );
}