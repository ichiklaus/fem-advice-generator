import { Container } from "@mui/material";
import {
  Card,
  CardContent,
  Button,
  CardActions,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Component } from "react";

const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0, // small phone
      xs: 375, // phone
      sm: 600, // tablets
      smd: 800,
      md: 900, // small laptop
      slg: 1024,
      lg: 1200, // desktop
      xl: 1400, // large screens
    },
  },
});

export default class Card extends Component {
  state = {
    advice: "",
    adviceNumber: "",
    isLoaded: false,
    error: null,
    reload: false,
  };

  adviceGenerator = async (reqURL) => {
    try {
      const response = await axios.get(reqURL);
      const fetchedData = await response.data;
      this.setState({
        isLoaded: true,
        advice: fetchedData.slip.advice,
        adviceNumber: fetchedData.slip.id,
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        error,
      });
      console.log(error.message);
    }
  };

  componentDidMount() {
    if (!this.state.reload) {
      this.adviceGenerator("https://api.adviceslip.com/advice");
    }
  }

  refreshAdvice = () => {
    this.adviceGenerator("https://api.adviceslip.com/advice");
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Card
            className=" card-layout card-bg--gb "
            sx={{
              width: "30rem",
              height: "35vh",
              // position: "relative",
              borderRadius: 4,
            }}
          >
            <CardContent>
              <Typography
                className="card-tc-font card-tc--c card-tc--ng"
                sx={{
                  mt: 4,
                  mb: 1,
                }}
              >
                {`Advice #${this.state.adviceNumber}`}
              </Typography>
              <Typography
                className="card-tc-font advice card-tc--lc card-tc--c"
                sx={{
                  mt: 1,
                  px: 4,
                }}
              >
                {`"${this.state.advice}"`}
              </Typography>
            </CardContent>
            <div
            className="divider-wrapper">
              <i className="card-divider desktop mobile"></i>
            </div>
            <CardActions
              sx={{
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translate(-50%,50%)",
              }}
            >
              <Button
                sx={{
                  position: "relative",
                  // bottom: "260px",
                  // xxs: 0, // small phone
                  // xs: 375, // phone
                  // sm: 600, // tablets
                  // md: 900, // small laptop
                  // lg: 1200, // desktop
                  // xl: 1536, // large screens
                  bottom: {
                    xxs: "80px",
                    xs: "185px",
                    sm: "340px",
                    smd: "355px",
                    md: "280px",
                    slg: "250px",
                    lg: "205px",
                    xl: "240px",
                  },
                  borderRadius: "50%",
                  width: "auto",
                  height: "60px",
                }}
                className="card-button--ng"
                variant="contained"
                color="primary"
                size="small"
                onClickCapture={this.refreshAdvice}
              >
                <i className="icon-dice"></i>
              </Button>
            </CardActions>
          </Card>
        </Container>
      </ThemeProvider>
    );
  }
}
