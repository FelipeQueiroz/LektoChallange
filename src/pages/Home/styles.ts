import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: block;
  text-align: left;

  h1 {
    font-weight: 700;
    font-size: 1.875rem;
  }
`

export const StyledLink = styled(Link)`
  ${({ theme }) => css`
    color: ${theme.colors.blue};
  `}
  text-decoration: underline;
`
