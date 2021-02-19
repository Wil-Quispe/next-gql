import { gql, useMutation } from "@apollo/client"

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      user {
        _id
        name
        nickName
      }
      token
    }
  }
`

const login = () => {
  const [login] = useMutation(LOGIN)

  const loginMutation = async e => {
    e.preventDefault()
    const trg = e.target
    const result = await login({
      variables: {
        email: trg.email.value,
        password: trg.password.value,
      },
    })
    localStorage.setItem("token", result.data.login.token)
    if (typeof window !== "undefined") {
      window.location = "/"
    }
  }
  return (
    <div>
      <form onSubmit={loginMutation}>
        <input id="email" name="email" placeholder="email" />
        <input id="password" name="password" placeholder="password" />
        <button>Login</button>
      </form>
    </div>
  )
}

export default login
