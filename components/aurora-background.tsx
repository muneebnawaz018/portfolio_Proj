// Ambient aurora layer: two slow-drifting color blooms behind everything.
// Sits at z-0 (same plane as the particle field); content sections are z-10.
const AuroraBackground = () => (
  <div
    aria-hidden
    className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
  >
    <div className="aurora-blob aurora-blob-1" />
    <div className="aurora-blob aurora-blob-2" />
  </div>
);

export default AuroraBackground;
