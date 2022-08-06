import { getSession } from "next-auth/react"
import AuthWrapper from "../../../components/auth/authWrapper"
import HeaderAuth from "../../../components/HeaderAuth"
const Author = () => {
  return (
    <AuthWrapper>
      <HeaderAuth/>
      <h1>Author </h1>
    </AuthWrapper>
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
