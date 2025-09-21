import { RefObject } from "react";

type Placement =
  | "top-left"
  | "top-right"
  | "center"
  | "bottom-left"
  | "bottom-right";

export const generateImage = ({
  imageUrl,
  canvasRef,
  data,
  placement = "center",
}: {
  imageUrl: string;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  data: {
    distance: string;
    time: string;
    rhythm?: string;
  };
  placement?: Placement;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = canvasRef.current;
    if (!canvas) return reject("Canvas não encontrado");

    const ctx = canvas.getContext("2d");
    if (!ctx) return reject("Contexto 2D não encontrado");

    const base = new Image();
    base.crossOrigin = "anonymous";
    base.src = imageUrl;

    base.onload = () => {
      canvas.width = base.width;
      canvas.height = base.height;

      ctx.drawImage(base, 0, 0);
      ctx.fillStyle = "white";

      const scale = base.width / 1000;
      const titleSize = 30 * scale;
      const valueSize = 58 * scale;
      const titleToValueSpacing = 50 * scale;
      const spacing = 120 * scale;
      const logoWidth = 120 * scale;
      const logoHeight = 120 * scale;

      const items = [
        { label: "Distância", value: data.distance },
        { label: "Tempo", value: data.time },
      ];

      if (data.rhythm) {
        items.push({ label: "Ritmo", value: data.rhythm });
      }

      // calcular altura total do bloco
      const blockHeight =
        items.length * (valueSize + titleToValueSpacing) +
        (items.length - 1) * (spacing - valueSize - titleToValueSpacing) +
        logoHeight +
        20 * scale;

      // largura máxima aproximada (texto centralizado em X)
      const blockWidth = Math.max(300 * scale, logoWidth);

      // posição inicial do bloco
      let blockX = 0;
      let blockY = 0;

      switch (placement) {
        case "top-left":
          ctx.textAlign = "center"; // sempre centralizado
          blockX = 50 * scale + blockWidth / 2;
          blockY = 50 * scale;
          break;
        case "top-right":
          ctx.textAlign = "center";
          blockX = base.width - 50 * scale - blockWidth / 2;
          blockY = 50 * scale;
          break;
        case "bottom-left":
          ctx.textAlign = "center";
          blockX = 50 * scale + blockWidth / 2;
          blockY = base.height - blockHeight - 50 * scale;
          break;
        case "bottom-right":
          ctx.textAlign = "center";
          blockX = base.width - 50 * scale - blockWidth / 2;
          blockY = base.height - blockHeight - 50 * scale;
          break;
        case "center":
        default:
          ctx.textAlign = "center";
          blockX = base.width / 2;
          blockY = base.height / 2 - blockHeight / 2;
      }

      // desenhar textos
      let currentY = blockY;
      items.forEach((item) => {
        ctx.font = `400 ${titleSize}px Roboto, sans-serif`;
        ctx.fillText(item.label, blockX, currentY + titleSize);

        ctx.font = `700 ${valueSize}px Roboto, sans-serif`;
        ctx.fillText(item.value, blockX, currentY + titleSize + valueSize);

        currentY += spacing;
      });

      // desenhar logo
      const logo = `<svg stroke="currentColor" fill="#FFFFFF" stroke-width="0" viewBox="0 0 24 24" class="text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="19.003" cy="6.002" r="2.002"></circle><path d="M18.875 13.219c-.567.453-.978.781-1.878.781-.899 0-1.288-.311-1.876-.781-.68-.543-1.525-1.219-3.127-1.219-1.601 0-2.445.676-3.124 1.219-.588.47-.975.781-1.875.781-.898 0-1.286-.311-1.873-.78C4.443 12.676 3.6 12 2 12v2c.897 0 1.285.311 1.872.78.679.544 1.523 1.22 3.123 1.22s2.446-.676 3.125-1.22c.587-.47.976-.78 1.874-.78.9 0 1.311.328 1.878.781.679.543 1.524 1.219 3.125 1.219 1.602 0 2.447-.676 3.127-1.219.588-.47.977-.781 1.876-.781v-2c-1.601 0-2.446.676-3.125 1.219zM16.997 19c-.899 0-1.288-.311-1.876-.781-.68-.543-1.525-1.219-3.127-1.219-1.601 0-2.445.676-3.124 1.219-.588.47-.975.781-1.875.781-.898 0-1.286-.311-1.873-.78C4.443 17.676 3.6 17 2 17v2c.897 0 1.285.311 1.872.78.679.544 1.523 1.22 3.123 1.22s2.446-.676 3.125-1.22c.587-.47.976-.78 1.874-.78.9 0 1.311.328 1.878.781.679.543 1.524 1.219 3.125 1.219 1.602 0 2.447-.676 3.127-1.219.588-.47.977-.781 1.876-.781v-2c-1.601 0-2.446.676-3.125 1.219-.567.453-.978.781-1.878.781zM11 5.419l2.104 2.104-2.057 2.57c.286-.056.596-.093.947-.093 1.602 0 2.447.676 3.127 1.219.588.47.977.781 1.876.781.9 0 1.311-.328 1.878-.781.132-.105.274-.217.423-.326l-2.096-2.09.005-.005-5.5-5.5a.999.999 0 0 0-1.414 0l-4 4 1.414 1.414L11 5.419z"></path></svg>`;
      const svgBlob = new Blob([logo], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      const logoImg = new Image();
      logoImg.src = url;

      logoImg.onload = () => {
        const logoY = currentY;
        ctx.drawImage(
          logoImg,
          blockX -
            (ctx.textAlign === "center"
              ? logoWidth / 2
              : ctx.textAlign === "right"
              ? logoWidth
              : 0),
          logoY,
          logoWidth,
          logoHeight
        );

        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL("image/png"));
      };

      logoImg.onerror = reject;
    };

    base.onerror = reject;
  });
};
