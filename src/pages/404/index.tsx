import { Container } from "components/partials/Container";
// @ts-ignore
import ReactCurvedText from "react-curved-text";

export const NotFound = () => {
  return (
    <Container overflow={false}>
      <div
        className="h-full py-4 px-6 flex flex-col items-center justify-center"
      >
        <div className="flex-grow text-white font-black text-center mt-40">
          <ReactCurvedText
            width={350}
            height={300}
            cx={190}
            cy={140}
            rx={100}
            ry={100}
            startOffset="90"
            reversed={true}
            text="Think"
            textProps={{
              style: {
                fontSize: "45",
                fontWeight: "bold",
              },
            }}
            textPathProps={{ fill: "#fff" }}
            tspanProps={null}
            ellipseProps={null}
            svgProps={null}
          />
          <h1 className="text-8xl -mt-48">404</h1>
        </div>

        <h2 className="text-2xl  text-white">Hmmm. Looking for something that's not here?</h2>
        {/* © All rights reserved */}
        <p className="text-white text-sm mt-48">{`Think Peace © All rights reserved ${new Date().getFullYear()}`}</p>
      </div>
    </Container>
  );
};
