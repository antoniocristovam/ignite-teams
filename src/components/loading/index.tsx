// Import
import React from "react";

// Styles
import { Container, LoadIndicator } from "./styles";

export function Loading() {
  return (
    <Container>
      <LoadIndicator color="red" />
    </Container>
  );
}
