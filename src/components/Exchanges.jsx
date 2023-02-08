import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Container,
  Heading,
  HStack,
  Img,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponents from "./ErrorComponents";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        console.log(data);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  if (error) return <ErrorComponents message={"Error while fetching data"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"center"}>
            {exchanges.map((e) => (
              <ExchangeCard
                key={e.id}
                name={e.name}
                img={e.image}
                rank={e.trust_score_rank}
                url={e.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
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
        {rank}{" "}
      </Heading>
      <Text noOfLines={1}>{name} </Text>
    </VStack>
  </a>
);

export default Exchanges;
