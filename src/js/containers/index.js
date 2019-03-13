import React from "react";

import { Box, Heading, Button, Flex, Text } from "rebass";

import ReportList from "../components/Report";
import ReportForm from "../components/Form";
import { observer, inject } from "mobx-react";
const uuidv1 = require("uuid/v1");
import { H1, text } from "../components/styles";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submited: true,
      toEdit: null
    };
  }
  handelEdit = value => {
    this.setState({ toEdit: value });
  };

  clearEdit = () => this.setState({ toEdit: null });

  render() {
    const { store } = this.props;

    return (
      <Box mx={400} width={789}>
        <Text my={4} style={H1}>
          Tidrapportering
        </Text>
        <Text my={3} style={text}>
          Mauris sit tincidunt, lectus cursus, integer adipiscing tempor, montes
          in rhoncus odio auctor urna sit arcu sagittis? A, scelerisque
          porttitor mauris urna montes vut, magnis dolor.
        </Text>
        <Text my={2} style={text}>
          Etelementum, nunc parturient aliquam pulvinar elit vel ridiculus et
          cursus nec? Porta diam, ut. Augue, turpis mus, nunc sit ac, nascetur
          elementum habitasse risus etiam, in! Hac ut? Magnis, penatibus enim
          odio enim hac!
        </Text>

        <Box
          style={{ border: "solid 1px #afafaf", backgroundColor: "#f1f1f1" }}
          padding={20}
          px={20}
        >
          <ReportForm
            store={store}
            toEdit={this.state.toEdit}
            clearEdit={this.clearEdit}
          />
        </Box>

        <Box>
          <ReportList
            store={store}
            handelEdit={value => this.handelEdit(value)}
          />
        </Box>
      </Box>
    );
  }
}

export default inject("store")(observer(HomePage));
