import icons from "../icons.svg";

/** Symbol (i-<slug>) and name of each tool in the scrolling strip. */
const tools = [
  ["elixir", "Elixir"],
  ["phoenixframework", "Phoenix"],
  ["react", "React Native"],
  ["typescript", "TypeScript"],
  ["nextdotjs", "Next.js"],
  ["bun", "Bun"],
  ["nestjs", "NestJS"],
  ["rust", "Rust"],
  ["openjdk", "Java"],
  ["amazonwebservices", "AWS"],
  ["graphql", "GraphQL"],
  ["python", "Python"],
  ["django", "Django"],
  ["stripe", "Stripe"],
  ["go", "Go"],
  ["pulumi", "Pulumi"],
  ["swift", "Swift"],
  ["amazondynamodb", "DynamoDB"],
] as const;

/** The list twice, so the loop is seamless; screen readers hear it once. */
export function Ticker() {
  return (
    <div className="ticker" role="marquee" aria-label="Tools and languages">
      <div className="track">
        {[false, true].map((copy) =>
          tools.map(([slug, name]) => (
            <span key={`${copy}-${slug}`} aria-hidden={copy || undefined}>
              <svg className="ic" aria-hidden="true">
                <use href={`${icons.src}#i-${slug}`} />
              </svg>
              {name}
            </span>
          )),
        )}
      </div>
    </div>
  );
}
