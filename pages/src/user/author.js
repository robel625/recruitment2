import { getSession } from "next-auth/react"
import Wrapper from "../../../components/auth/wrapper"
import HeaderAuth from "../../../components/HeaderAuth"
const Author = () => {
  return (
    <Wrapper>
      <HeaderAuth/>
      <h1>Author </h1>
    </Wrapper>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}

export default Author
