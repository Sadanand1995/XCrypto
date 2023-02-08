import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Button,
  Container,
  HStack,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponents from "./ErrorComponents";
import CoinCard from "./CoinsCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const btn = new Array(619).fill(1);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}&per_page=20`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [currency, page]);

  if (error) return <ErrorComponents message={"Error while fetching data"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup onChange={setCurrency} value={currency} p={"8"}>
            <Stack direction="row" spacing={"10"}>
              <Radio value="inr">₹ (INR)</Radio>
              <Radio value="eur">€ (eur)</Radio>
              <Radio value="usd">$ (USD)</Radio>
            </Stack>
          </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"center"}>
            {coins.map((e) => (
              <CoinCard
                key={e.id}
                id={e.id}
                name={e.name}
                img={e.image}
                symbol={e.symbol}
                price={e.current_price}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {btn.map((item, index) => {
              return (
                <Button
                  key={index}
                  bgColor={"blackAlpha.900"}
                  color="white"
                  alignSelf={"center"}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </Button>
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
