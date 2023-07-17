/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Tab, Tabs, Container } from "@mui/material";
import { useAsync, useFetch } from "../../hooks";

const TabOne = () => {
  const [data, setData] = useState([]);
  const { isLoading, error, callEndpoint } = useFetch();

  const getApiData = async () =>
    await callEndpoint("https://rickandmortyapi.com/api/character/1");

  const success = (data: any) => setData(data.name);
  const failure = (error: any) => console.log(error);

  useAsync({
    asyncFunction: getApiData,
    onSuccess: success,
    onReject: failure,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error!</p>;

  return <p>{data}</p>;
};

const TabTwo = () => {
  const [data, setData] = useState([]);
  const { isLoading, error, callEndpoint } = useFetch();

  const getApiData = async () =>
    await callEndpoint("https://rickandmortyapi.com/api/character/2");

  const success = (data: any) => setData(data.name);
  const failure = (error: any) => console.log(error);

  useAsync({
    asyncFunction: getApiData,
    onSuccess: success,
    onReject: failure,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error!</p>;

  return <p>{data}</p>;
};

const tabProps = (index: any) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const TestUseFetch = () => {
  const [index, setIndex] = useState(0);

  const handleChange = (_event: any, newValue: any) => {
    setIndex(newValue);
  };

  return (
    <Container maxWidth="xs">
      <Tabs value={index} onChange={handleChange}>
        <Tab label="Item One" {...tabProps(0)} />
        <Tab label="Item Two" {...tabProps(1)} />
      </Tabs>
      <div role="tabpanel">{index === 0 ? <TabOne /> : <TabTwo />}</div>
    </Container>
  );
};

export default TestUseFetch;
