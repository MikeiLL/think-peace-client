export const Toggle = (props: any) => {
  // Accept "label" prop for displaying what is being considered "on" or "off"
  // Accept "set" prop for the callback function to set the state
  // Accept "current" prop for the the thing that is being toggled

  const controlsHiddenClass = "opacity-60";
  const controlsDisplayedClass = "opacity-100";
  return (
    <button
      className={"p-2 " + (props.current ? controlsDisplayedClass : controlsHiddenClass)}
      onClick={() => props.set(!props.current)}>
      <svg width="20px" height="20px" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg"
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinejoin: "round",
          strokeMiterlimit: "2",
          fill: "currentColor",
          display: "inline-block",
        }}>
        <g id="Shopicon">
          <path d="M400,633.333C600,633.333 733.333,400 733.333,400C733.333,400 600,166.667 400,166.667C200,166.667 66.667,400 66.667,400C66.667,400 200,633.333 400,633.333ZM400,233.333C517.867,233.333 612.35,343.067 653.35,399.867C612.133,456.6 517.067,566.667 400,566.667C282.133,566.667 187.65,456.933 146.65,400.133C187.867,343.4 282.933,233.333 400,233.333Z"
            style={{fillRule: "nonzero"}} />
          <path d="M400,533.333C473.633,533.333 533.333,473.633 533.333,400C533.333,326.367 473.633,266.667 400,266.667C326.367,266.667 266.667,326.367 266.667,400C266.667,473.633 326.367,533.333 400,533.333ZM400,333.333C436.767,333.333 466.667,363.233 466.667,400C466.667,436.767 436.767,466.667 400,466.667C363.233,466.667 333.333,436.767 333.333,400C333.333,363.233 363.233,333.333 400,333.333Z"
            style={{fillRule: "nonzero"}} />
        </g>
        {props.current && (
          <g transform="matrix(0.989115,-0.63622,0.540974,0.841039,9.18706,546.643)">
            <rect x="51.303" y="54.19" width="591.147" height="66.408" />
          </g>
        )}
      </svg> {props.label}</button>
  )
};
