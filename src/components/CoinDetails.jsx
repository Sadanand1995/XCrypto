import {
  Badge,
  Box,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "..";
import Chart from "./Chart";

import ErrorComponents from "./ErrorComponents";
import Loader from "./Loader";

const CoinDetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chatData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setChartArray(chatData.prices);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);

  if (error) return <ErrorComponents message={"Error while fetching data"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup onChange={setCurrency} value={currency} p={"8"}>
            <Stack direction="row" spacing={"8"}>
              <Radio value="inr">₹ (INR)</Radio>
              <Radio value="eur">€ (eur)</Radio>
              <Radio value="usd">$ (USD)</Radio>
            </Stack>
          </RadioGroup>

          <Box w={"full"} borderWidth={"1"}>
            <Chart
              currencySymbol={currencySymbol}
              currency={currency}
              arr={chartArray}
              days={days}
            />
          </Box>

          <RadioGroup
            onChange={setDays}
            value={days}
            p={"8"}
            overflowX={"auto"}
          >
            <Stack direction="row" spacing={"8"}>
              {btns.map((timeStamp) => (
                <Radio value={timeStamp === "365d" ? "1yr" : timeStamp}>
                  {timeStamp}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>

          <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
            <Image src={coin.image.large} w="16" h="16" objectFit={"contain"} />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h_in_currency[
                      currency
                    ] < 0
                      ? "decrease"
                      : "increase"
                  }
                />
                {
                  coin.market_data.price_change_percentage_24h_in_currency[
                    currency
                  ]
                }
                %
              </StatHelpText>
            </Stat>
            <Badge
              fontSize={"2xl"}
              bgColor={"blackAlpha.600"}
              color={"white"}
            >{`#${coin.market_cap_rank}`}</Badge>
            <CustomBar
              high={coin.market_data.high_24h[currency]}
              low={coin.market_data.low_24h[currency]}
              current={coin.market_data.current_price[currency]}
              currencySymbol={currencySymbol}
            />
            <Box w={"full"} p="4">
              <Item value={coin.market_data.max_supply} title={"Max Supply"} />
              <Item
                value={coin.market_data.circulating_supply}
                title={"Circulating Supply"}
              />
              <Item
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
                title={"Market Cap"}
              />
              <Item
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
                title={"All Time Low"}
              />
              <Item
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
                title={"All Time High"}
              />
            </Box>
            <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>
              Last update on {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
          </VStack>
        </>
      )}
    </Container>
  );
};

export default CoinDetails;

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} my="4" w={"full"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low, current, currencySymbol }) => {
  return (
    <VStack w={"full"}>
      <Progress
        value={(current / (high + low)) * 100}
        w={"full"}
        colorScheme={"teal"}
      />
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={`${currencySymbol}${low}`} colorScheme={"red"} />
        <Text fontSize={"sm"}>24hr range</Text>
        <Badge children={`${currencySymbol}${high}`} colorScheme={"green"} />
      </HStack>
    </VStack>
  );
};
