import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  return (
    <HStack
      spacing={4}
      alignItems="center"
      padding={4}
      backgroundColor="rgba(255,255,255,0.04)"
      borderRadius="md"
    >
      <Image src={imageSrc} boxSize="120px" objectFit="cover" borderRadius="md" />
      <VStack alignItems="flex-start" spacing={1} flex={1}>
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Text noOfLines={3}>{description}</Text>
      </VStack>
      <FontAwesomeIcon icon={faArrowRight} size="1x" />
    </HStack>
  );
};

export default Card;
