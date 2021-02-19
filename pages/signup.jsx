import { gql, useMutation } from "@apollo/client"
const SIGN_UP = gql`
  mutation SignUp(
    $name: String!
    $nickName: String!
    $age: Int!
    $email: String!
    $password: String!
  ) {
    signUp(
      data: {
        name: $name
        nickName: $nickName
        age: $age
        email: $email
        password: $password
      }
    ) {
      user {
        name
        nickName
        age
      }
      token
    }
  }
`
const signup = () => {
  const [signUp] = useMutation(SIGN_UP)

  const singupMutation = async e => {
    e.preventDefault()
    const trg = e.target
    const result = await signUp({
      variables: {
        name: trg.name.value,
        nickName: trg.nickName.value,
        age: Number(trg.age.value),
        email: trg.email.value,
        password: trg.password.value,
      },
    })
    localStorage.setItem("token", result.data.signUp.token)
    if (typeof window !== "undefined") {
      window.location = "/"
    }
  }

  return (
    <div>
      <form onSubmit={singupMutation}>
        <input id="name" name="name" placeholder="name" />
        <input id="nickName" name="nickName" placeholder="nickName" />
        <input type="number" id="age" name="age" placeholder="age" />
        <input id="email" name="email" placeholder="email" />
        <input id="password" name="password" placeholder="passwords" />
        <button>sign up</button>
      </form>
    </div>
  )
}

export default signup
