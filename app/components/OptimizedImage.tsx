import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  sizes,
  placeholder,
  blurDataURL,
}: OptimizedImageProps) {
  const imageProps: any = {
    src,
    alt,
    className,
    priority,
    placeholder,
    blurDataURL,
  };

  if (fill) {
    imageProps.fill = true;
    imageProps.sizes = sizes || "100vw";
  } else if (width && height) {
    imageProps.width = width;
    imageProps.height = height;
  }

  return <Image {...imageProps} />;
}