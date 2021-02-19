import { gql, useQuery } from '@apollo/client'
const GET_USERS = gql`
  query {
    user {
      name
      nickName
      email
      age
    }
  }
`

const index = () => {
  const { error, data } = useQuery(GET_USERS)
  let token
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token')
  }
  if (!token) return <div>you need to register or login</div>
  if (error) return <div>error</div>
  if (!data) return <div>loading</div>

  return (
    <div>
      {data.user?.map((u, i) => (
        <div key={i}>
          <span>{u.name}</span>
          <br />
          <span>{u.nickName}</span>
          <br />
          <span>{u.email}</span>
          <br />
          <span>{u.age}</span>
          <br />
          <br />
        </div>
      ))}
    </div>
  )
}

export default index
