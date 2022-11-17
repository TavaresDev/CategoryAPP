import React, { useState } from "react"
import styled from "@emotion/styled"
import { useFetch } from "../hooks/useFetch"
import { Container, Grid, Stack } from "@mantine/core"

const MainHeaderContainer = styled.div`
  margin: 1.6rem;
`
const Section = styled.section`
  background-color: #ccc;
  background-image: url(${(prop) => prop.img});
  background-size: "cover";
  min-height: 20rem;
  border-radius: 4px;
`
const StyledGrid = styled(Grid)`
  height: 100%;
  & > div {
    button {
      background: black;
      border-radius: 5px;
      max-width: 12rem;
      margin: 4rem 1rem;
      color: #fff;
    }
    //stack
    & > div {
      height: 100%;
      select {
        border-radius: 5px;
        margin: 2rem;
        padding: 0.3rem 0.2rem;
        background: #bbb;
      }
    }
  }
`

export const MainHeader = () => {
  const URL = "https://mockyard.herokuapp.com/products"
  //custom hook to fetch and cache data
  const { status, data } = useFetch(URL)
  const [category, setCategory] = useState("")
  const [selection, setSelection] = useState({})
  const [selectedProduct, setSelectedProduct] = useState(null)

  if (status !== "fetched") return

  let group = data.reduce((r, a) => {
    r[a.category] = [...(r[a.category] || []), a]
    return r
  }, {})
  console.log("group", group)

  function extractData() {
    setSelectedProduct(data[selection - 1])
  }

  return (
    <MainHeaderContainer>
      <Section img={selectedProduct?.image ? selectedProduct?.image : "#333"}>
        <StyledGrid>
          <Grid.Col xs={4}>
            <Stack justify='space-around'>
              <h3>Choose from option below</h3>
              <select onChange={(e) => setCategory(e.currentTarget.value)}>
                {Object.entries(group).map((p, i) => (
                  <option key={p[0]} value={p[0]}>
                    {p[0]}
                  </option>
                ))}
              </select>
              {category && (
                <select onChange={(e) => setSelection(e.currentTarget.value)}>
                  {group[category]?.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              )}
            </Stack>
          </Grid.Col>
          <Grid.Col xs={4}>
            <Stack justify='flex-end'>
              <button onClick={extractData}> Extract</button>
            </Stack>
          </Grid.Col>
          <Grid.Col xs={4}></Grid.Col>
        </StyledGrid>
      </Section>
      {selectedProduct && (
        <Container ta='left'>
          <h4>Description</h4>
          <h4>{selectedProduct.description}</h4>
          <h4>Price: {selectedProduct.price}</h4>
        </Container>
      )}
    </MainHeaderContainer>
  )
}
