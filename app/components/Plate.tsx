import Image from 'next/image';

export type PlateProps = {
  src: string;
  alt: string;
  caption?: string;
  code?: string;
  priority?: boolean;
  sizes?: string;
  compact?: boolean;
};

export default function Plate({
  src,
  alt,
  caption,
  code,
  priority = false,
  sizes = '(max-width: 900px) 100vw, 840px',
  compact = false,
}: PlateProps) {
  return (
    <figure className={compact ? 'plate plate-compact' : 'plate'}>
      <div className="plate-frame">
        <Image
          src={src}
          alt={alt}
          width={1168}
          height={784}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          sizes={sizes}
          quality={82}
          className="plate-img"
        />
      </div>
      {(caption || code) && (
        <figcaption className="plate-cap">
          {code && <span className="plate-code">{code}</span>}
          {caption && <span>{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}
