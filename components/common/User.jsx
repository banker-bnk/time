import Image from "next/image";

const User = ({ useUser }) => {
  const user = useUser();
  console.log(user);
  const session = user.user?.sub ? true : false;
  return (
    <div className="w-full block">
      {!session ? (
        <a href="/api/auth/login">Login</a>
      ) : (
        <div className="flex items-center">
          <Image
            src={user.user.picture}
            width={50}
            height={50}
            className="inline-block rounded-full"
          />
          <div className="inline-block ml-2">
            Hola {user.user.name}
            <br />
            <small className="border border-white py-1 px-2 my-2 rounded-md">Eres un chupapija</small><br/>
            <a href="/api/auth//logout" className="underline mt-1 block">Logout</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
