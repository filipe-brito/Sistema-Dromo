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
        fill="currentColor"
        d="M256 256a112 112 0 1 0-112-112a112 112 0 0 0 112 112m0 32c-69.42 0-208 42.88-208 128v64h416v-64c0-85.12-138.58-128-208-128"
      ></path>
    </svg>
  );
}

// Passo 3: Use ReactDOMServer para renderizar o componente como uma string
const personIconString = ReactDOMServer.renderToStaticMarkup(<PersonIcon />);

// Passo 4: Codifique a string para uma Data URL
// Usamos encodeURIComponent para garantir que a string seja segura para URLs
const encodedPersonIcon = encodeURIComponent(personIconString);

// Passo 5: Exporte a URL final
export const personIconUrl = `data:image/svg+xml,${encodedPersonIcon}`;
