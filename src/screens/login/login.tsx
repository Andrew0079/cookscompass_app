import { Text, Container, Box } from "native-base";
import React from "react";
import { Header } from "../../components";

function Login({ navigation }) {
  return (
    <Box flex={1}>
      <Header navigation={navigation} />
      <Container flex={1} padding={3}>
        <Box flex={1} bg="red.500">
          {/* Content for first row */}
          <Text>First Row</Text>
        </Box>

        <Box flex={1} bg="green.500">
          {/* Content for second row */}
          <Text>Second Row</Text>
        </Box>

        <Box flex={1} bg="blue.500">
          {/* Content for third row */}
          <Text>Third Row</Text>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
