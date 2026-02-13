interface ColorPaletteProps {
  colors: string[];
  className?: string;
}

export function ColorPalette({ colors, className = '' }: ColorPaletteProps) {
  if (!colors.length) return null;

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="text-xs opacity-50 mr-1">Palette</span>
      {colors.map((color, i) => (
        <div
          key={`${color}-${i}`}
          className="w-5 h-5 rounded-full border border-base-300 shadow-sm
                     transition-transform hover:scale-125 cursor-default"
          style={{ backgroundColor: color }}
          title={color}
          aria-label={`Color swatch ${color}`}
        />
      ))}
    </div>
  );
}
