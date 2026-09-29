/*
 * PhotoHub architecture, drawn in SVG (no images):
 *   React → Node.js API Gateway → Microservices (Spring Boot + .NET) → MySQL
 *   Security branch:  Gateway ─ ─ Spring Security · JWT · RBAC
 *   Payment branch:   .NET → .NET Payment Service → Razorpay
 *   DevOps band:      Docker · Jenkins · Kubernetes · Cloud deployment
 */

const W = 760;
const H = 610;

const NODES = [
  { id: 'client', x: 280, y: 20, w: 200, h: 56, title: 'React', sub: 'Client · frontend' },
  { id: 'gateway', x: 280, y: 128, w: 200, h: 56, title: 'Node.js', sub: 'API gateway' },
  { id: 'security', x: 536, y: 128, w: 204, h: 56, title: 'Spring Security · JWT', sub: 'Role-based access', kind: 'security' },
  { id: 'spring', x: 80, y: 282, w: 260, h: 56, title: 'Java Spring Boot', sub: 'Services' },
  { id: 'dotnet', x: 420, y: 282, w: 260, h: 56, title: '.NET', sub: 'Services' },
  { id: 'payment', x: 420, y: 356, w: 260, h: 52, title: '.NET Payment Service', sub: 'My contribution area', kind: 'mine' },
  { id: 'mysql', x: 80, y: 472, w: 260, h: 56, title: 'MySQL', sub: 'Database' },
  { id: 'razorpay', x: 420, y: 472, w: 260, h: 56, title: 'Razorpay', sub: 'Payment gateway · external', kind: 'external' },
];

const EDGES = [
  { d: 'M380 76 V128', kind: 'flow' },
  { d: 'M380 184 V232 H210 V282', kind: 'flow' },
  { d: 'M380 184 V232 H550 V282', kind: 'flow' },
  { d: 'M210 338 V472', kind: 'flow' },
  { d: 'M420 310 H380 V500 H340', kind: 'flow' },
  { d: 'M480 156 H536', kind: 'security' },
  { d: 'M550 338 V356', kind: 'payment' },
  { d: 'M550 408 V472', kind: 'payment' },
];

const nodeStyle = {
  mine: { box: 'fill-accent/10 stroke-accent', title: 'fill-accent' },
  security: { box: 'fill-surface stroke-muted/70', title: 'fill-ink', dashed: true },
  external: { box: 'fill-bg stroke-muted/70', title: 'fill-ink', dashed: true },
  default: { box: 'fill-surface stroke-line', title: 'fill-ink' },
};

export default function ArchitectureDiagram() {
  return (
    <figure className="rounded-md border border-line bg-bg/60 p-4 sm:p-6">
      <figcaption className="mb-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        <span>fig. 02 — photohub / architecture</span>
        <span className="flex flex-wrap gap-4 normal-case tracking-normal">
          <Legend className="bg-ink/70" label="Request flow" />
          <Legend className="border-t border-dashed border-muted bg-transparent" label="Security" />
          <Legend className="bg-accent" label="Payments" />
        </span>
      </figcaption>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full min-w-[620px]"
          role="img"
          aria-labelledby="arch-title arch-desc"
        >
          <title id="arch-title">PhotoHub system architecture</title>
          <desc id="arch-desc">
            A React frontend calls a Node.js API gateway. The gateway routes to microservices built with Java Spring Boot
            and .NET, which store data in MySQL. Security is handled with Spring Security, JWT and role-based access
            control. Payments go from the .NET Payment Service to Razorpay. The system is delivered with Docker, Jenkins,
            Kubernetes and cloud deployment.
          </desc>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
            </marker>
            <marker id="arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" className="fill-accent" />
            </marker>
          </defs>

          {/* microservices boundary */}
          <rect x="40" y="244" width="680" height="186" rx="8" fill="none" className="stroke-line" strokeDasharray="6 6" />
          <text x="56" y="266" className="fill-muted font-mono" fontSize="11" letterSpacing="2">
            MICROSERVICES
          </text>

          {/* edges */}
          {EDGES.map(({ d, kind }) => (
            <g key={d}>
              <path
                d={d}
                fill="none"
                strokeWidth={kind === 'payment' ? 1.8 : 1.3}
                strokeDasharray={kind === 'security' ? '5 5' : undefined}
                className={kind === 'payment' ? 'stroke-accent' : 'stroke-muted/70'}
                markerEnd={kind === 'payment' ? 'url(#arrow-accent)' : 'url(#arrow)'}
              />
              {kind !== 'security' && (
                <path d={d} fill="none" strokeWidth="1.8" className={`flow-dash ${kind === 'payment' ? 'stroke-ink/80' : 'stroke-accent/70'}`} />
              )}
            </g>
          ))}

          {/* nodes */}
          {NODES.map((n) => {
            const s = nodeStyle[n.kind] ?? nodeStyle.default;
            return (
              <g key={n.id}>
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx="6"
                  strokeWidth="1.3"
                  strokeDasharray={s.dashed ? '5 4' : undefined}
                  className={s.box}
                />
                <text x={n.x + 16} y={n.y + n.h / 2 - 3} className={`${s.title} font-display`} fontSize="15" fontWeight="600">
                  {n.title}
                </text>
                <text
                  x={n.x + 16}
                  y={n.y + n.h / 2 + 15}
                  className={`${n.kind === 'mine' ? 'fill-accent/90' : 'fill-muted'} font-mono`}
                  fontSize="10"
                  letterSpacing="1.2"
                >
                  {n.sub.toUpperCase()}
                </text>
                {n.kind === 'mine' && <circle cx={n.x + n.w - 18} cy={n.y + n.h / 2} r="4" className="fill-accent" />}
              </g>
            );
          })}

          {/* DevOps band */}
          <rect x="40" y="552" width="680" height="40" rx="6" className="fill-surface stroke-line" strokeWidth="1.2" />
          <text x="56" y="577" className="fill-muted font-mono" fontSize="10" letterSpacing="2">
            DEVOPS
          </text>
          <text x="400" y="577" textAnchor="middle" className="fill-ink font-mono" fontSize="12" letterSpacing="1.5">
            DOCKER · JENKINS · KUBERNETES · CLOUD DEPLOYMENT
          </text>
        </svg>
      </div>
      <p className="mt-3 font-mono text-[11px] text-muted sm:hidden">← scroll to see the full diagram →</p>
    </figure>
  );
}

function Legend({ className, label }) {
  return (
    <span className="inline-flex items-center gap-2 text-muted">
      <span aria-hidden="true" className={`inline-block h-px w-5 ${className}`} />
      {label}
    </span>
  );
}
