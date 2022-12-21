import styled from 'styled-components'

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
    background: linear-gradient(45deg, rgba(144,241,188,1) 9%, rgba(137,227,245,1) 51%, rgba(203,203,238,1) 77%);
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;

  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`
export default Wrapper