import React from "react";
import { Avatar, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";

const greeting = "Hello, I am Babar!";
const bio1 = "A frontend developer";
const bio2 = "specialised in React";

// Implement the UI for the LandingSection component according to the instructions.
// Use a combination of Avatar, Heading and VStack components.
const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  >
    <VStack spacing={6} alignItems="center">
      <Avatar src="https://i.pravatar.cc/150?img=7" name="Avatar" size="2xl" />
      <Heading as="h1">{greeting}</Heading>
      <VStack spacing={0}>
        <Heading as="h3" size="md">
          {bio1}
        </Heading>
        <Heading as="h3" size="md">
          {bio2}
        </Heading>
      </VStack>
    </VStack>
  </FullScreenSection>
);

export default LandingSection;
