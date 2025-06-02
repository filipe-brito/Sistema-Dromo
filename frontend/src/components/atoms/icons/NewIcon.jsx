export function NewIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={48}
      viewBox="0 0 48 48"
      {...props}
    >
      <defs>
        <mask id="ipSAdd0">
          <g fill="none" strokeLinejoin="round" strokeWidth={4}>
            <rect
              width={36}
              height={36}
              x={6}
              y={6}
              fill="#fff"
              stroke="#fff"
              rx={3}
            ></rect>
            <path
              stroke="#000"
              strokeLinecap="round"
              d="M24 16v16m-8-8h16"
            ></path>
          </g>
        </mask>
      </defs>
      <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSAdd0)"></path>
    </svg>
  );
}
