import ReactDOMServer from "react-dom/server";
export function PersonIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={512}
      height={512}
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill={"currentColor"}
        d="M256 256a112 112 0 1 0-112-112a112 112 0 0 0 112 112m0 32c-69.42 0-208 42.88-208 128v64h416v-64c0-85.12-138.58-128-208-128"
      ></path>
    </svg>
  );
}

// Componente para ser estilizado com CSS
export function PersonIcon2(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <path
        fill={props.fill}
        d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 6v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18"
      ></path>
    </svg>
  );
}
