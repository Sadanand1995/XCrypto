import {
  Avatar,
  Box,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import AvatarImgSrc from "../assets/myImg.jpg";

const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.900"}
      color={"whiteAlpha.700"}
      minH={"48"}
      px={"16"}
      py={["16", "8"]}
    >
      <Stack
        flexDirection={["column", "row"]}
        h={"full"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
            Best Crypto Trading App Providing Guidance at Reasonable Price
          </Text>
        </VStack>
        <VStack>
          <Wrap>
            <WrapItem>
              <Avatar boxSize={"28"} mt={["4", "0"]} src={AvatarImgSrc} />
            </WrapItem>
          </Wrap>
          <Text>Our Founder</Text>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;
