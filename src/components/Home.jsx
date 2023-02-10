import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";

import BtcImgSrc from "../assets/btc.png";

const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
      <motion.div
        style={{
          height: "80vh",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image w={"full"} h={"full"} objectFit={"contain"} src={BtcImgSrc} />
      </motion.div>
      <Text
        fontSize={"6xl"}
        color={"whiteAlpha.700"}
        textAlign={"center"}
        fontWeight={"thin"}
        mt={"-10"}
      >
        XCrypto
      </Text>
    </Box>
  );
};

export default Home;
