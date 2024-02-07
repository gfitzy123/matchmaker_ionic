import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  console.log("LinearProgressWithLabel", props);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          style={{ height: "10px" }}
          color="primary"
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="white">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel(value) {
  console.log("LinearWithValueLabel", value);
  const [progress, setProgress] = React.useState(10);

  //   React.useEffect(() => {
  //     const timer = setInterval(() => {
  //       setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
  //     }, 800);
  //     return () => {
  //       clearInterval(timer);
  //     };
  //   }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel color="primary" value={value.value} />
    </Box>
  );
}
