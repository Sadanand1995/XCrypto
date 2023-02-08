import { Heading, Img, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => (
  <Link to={`/coins/${id}`}>
    <VStack
      w={"52"}
      shadow={"lg"}
      borderRadius={"lg"}
      p={"8"}
      transition={"all .3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Img src={img} w={"10"} h={"10"} objectFit={"contain"} alt={name} />
      <Heading size={"md"} noOfLines={1}>
        {symbol}
      </Heading>
      <Text noOfLines={1}>{name} </Text>
      <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"} </Text>
    </VStack>
  </Link>
);

export default CoinCard;
