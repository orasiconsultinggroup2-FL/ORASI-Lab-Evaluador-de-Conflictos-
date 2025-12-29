import orasiIcon from "/branding/orasi-icon.png";

export default function OrasiBrand({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={orasiIcon}
        alt="ORASI Lab"
        style={{ width: size, height: size }}
      />
      <span className="text-lg font-semibold">ORASI Lab</span>
    </div>
  );
}
