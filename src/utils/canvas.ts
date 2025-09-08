import { RefObject } from "react";

export const generateImage = ({
  imageUrl,
  canvasRef,
  data
}: {
  imageUrl: string;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  data: {
    distance: string;
    time: string;
    rhythm?: string;
  };
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

      const centerX = base.width / 2;
      const centerY = base.height / 2;

      ctx.fillStyle = "white";
      ctx.textAlign = "center";

      const titleSize = 24;
      const valueSize = 48;
      const titleToValueSpacing = 45;

      const items = [
        { label: "Distância", value: data.distance },
        { label: "Tempo", value: data.time },
      ];

      if (data.rhythm) {
        items.push({ label: "Ritmo", value: data.rhythm });
      }

      const spacing = 100;
      const totalHeight = (items.length - 1) * spacing;

      items.forEach((item, index) => {
        const offsetY = -totalHeight / 2 + index * spacing;

        ctx.font = `400 ${titleSize}px Roboto, sans-serif`;
        ctx.fillText(item.label, centerX, centerY + offsetY - titleToValueSpacing);

        ctx.font = `700 ${valueSize}px Roboto, sans-serif`;
        ctx.fillText(item.value, centerX, centerY + offsetY);
      });

      // desenhar logo SVG
      const logo = `<svg stroke="currentColor" fill="#FFFFFF" stroke-width="0" viewBox="0 0 24 24" class="text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="19.003" cy="6.002" r="2.002"></circle><path d="M18.875 13.219c-.567.453-.978.781-1.878.781-.899 0-1.288-.311-1.876-.781-.68-.543-1.525-1.219-3.127-1.219-1.601 0-2.445.676-3.124 1.219-.588.47-.975.781-1.875.781-.898 0-1.286-.311-1.873-.78C4.443 12.676 3.6 12 2 12v2c.897 0 1.285.311 1.872.78.679.544 1.523 1.22 3.123 1.22s2.446-.676 3.125-1.22c.587-.47.976-.78 1.874-.78.9 0 1.311.328 1.878.781.679.543 1.524 1.219 3.125 1.219 1.602 0 2.447-.676 3.127-1.219.588-.47.977-.781 1.876-.781v-2c-1.601 0-2.446.676-3.125 1.219zM16.997 19c-.899 0-1.288-.311-1.876-.781-.68-.543-1.525-1.219-3.127-1.219-1.601 0-2.445.676-3.124 1.219-.588.47-.975.781-1.875.781-.898 0-1.286-.311-1.873-.78C4.443 17.676 3.6 17 2 17v2c.897 0 1.285.311 1.872.78.679.544 1.523 1.22 3.123 1.22s2.446-.676 3.125-1.22c.587-.47.976-.78 1.874-.78.9 0 1.311.328 1.878.781.679.543 1.524 1.219 3.125 1.219 1.602 0 2.447-.676 3.127-1.219.588-.47.977-.781 1.876-.781v-2c-1.601 0-2.446.676-3.125 1.219-.567.453-.978.781-1.878.781zM11 5.419l2.104 2.104-2.057 2.57c.286-.056.596-.093.947-.093 1.602 0 2.447.676 3.127 1.219.588.47.977.781 1.876.781.9 0 1.311-.328 1.878-.781.132-.105.274-.217.423-.326l-2.096-2.09.005-.005-5.5-5.5a.999.999 0 0 0-1.414 0l-4 4 1.414 1.414L11 5.419z"></path></svg>`
      const svgBlob = new Blob([logo], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      const logoImg = new Image();
      logoImg.src = url;

      logoImg.onload = () => {
        const logoWidth = 120;
        const logoHeight = 120;

        const lastItemOffsetY = -totalHeight / 2 + (items.length - 1) * spacing;
        const lastItemY = centerY + lastItemOffsetY;
        const logoY = lastItemY + 10;

        ctx.drawImage(logoImg, centerX - logoWidth / 2, logoY, logoWidth, logoHeight);

        URL.revokeObjectURL(url);

        resolve(canvas.toDataURL("image/png")); // agora retorna a imagem final
      };

      logoImg.onerror = reject;
    };

    base.onerror = reject;
  });
};
