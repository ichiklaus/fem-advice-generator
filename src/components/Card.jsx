import { Container } from "@mui/material";
import {
  Card,
  CardContent,
  Button,
  CardActions,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Component } from "react";

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
    // window.location.reload(false);
  };

  render() {
    return (
      <Container
        className=" animated fadeIn"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div className="card-wrapper">
          <Card
            className="card-layout card-bg--gb "
            sx={{
              borderRadius: 4,
            }}
          >
              <CardContent
                className="  "
                sx={{
                  height: "40%",
                }}
              >
                <Typography
                  className="card-tc-font card-tc--c card-tc--ng animated fadeIn"
                  sx={{
                    mt: 4,
                    mb: 1,
                  }}
                >
                  {`Advice #${this.state.adviceNumber}`}
                </Typography>
                <Typography
                  className="card-tc-font advice card-tc--lc card-tc--c animated fadeIn"
                  sx={{
                    mt: 1,
                    px: 4,
                  }}
                >
                  {`"${this.state.advice}"`}
                </Typography>
              </CardContent>
            <div className="divider-wrapper">
              <i className="card-divider desktop mobile"></i>
            </div>
            <div className="action-wrapper">
              <CardActions>
                <Button
                  sx={{
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
            </div>
          </Card>
        </div>
      </Container>
    );
  }
}
