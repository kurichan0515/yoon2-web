import React from 'react';
import './PhotoCopy.css';

interface Props {
  image: string;
  /** 縦書きで表示する行（1要素=1行） */
  lines: string[];
  align?: 'left' | 'right';
}

// 暗い写真面に縦書きコピーを重ねる区切り帯
function PhotoCopy({ image, lines, align = 'right' }: Props) {
  return (
    <section className={`photo-copy photo-copy--${align}`}>
      <img
        src={image}
        alt=""
        className="photo-copy-img"
        width={1600}
        height={1067}
        loading="lazy"
        decoding="async"
      />
      <div className="photo-copy-overlay" aria-hidden="true" />
      <p className="photo-copy-text">
        {lines.map((line, i) => (
          <span key={i} className="photo-copy-line">{line}</span>
        ))}
      </p>
    </section>
  );
}

export default PhotoCopy;
