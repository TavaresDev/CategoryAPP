import React from "react"
import styled from "@emotion/styled"

const NavBarContainer = styled.div`
  box-sizing: border-box;
  margin: 1rem;

  nav {
    background: #f38f22;
    text-align: center;
    border-radius: 3px;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      span {
        font-size: 1.4rem;
        font-weight: 600;
      }
      span.nu {
        border-left: 2px solid white;
        border-right: 2px solid white;
        padding: 0 3px;
        margin: 3px;
        color: white;
      }
      span.text {
        padding-left: 1rem;
        font-size: 1.1rem;
      }
    }
  }
`

export const NavBar = () => {
  return (
    <NavBarContainer>
      <nav>
        <p>
          <span className='nu'>nu</span>
          <span>Port</span>
          <span className='text'>Sample webapp</span>
        </p>
      </nav>
    </NavBarContainer>
  )
}
