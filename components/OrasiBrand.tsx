const OrasiBrand = ({ size = 48 }: { size?: number }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <img
        src="/branding/orasi-icon.png"
        alt="ORASI Lab"
        style={{ width: size, height: size }}
      />
      <span style={{ fontSize: size * 0.6, fontWeight: 600 }}>
        ORASI Lab
      </span>
    </div>
  );
};

export default OrasiBrand;

