import axios from "axios";
import DefaultURL from "./DefaultURL";
import { useState, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";

export default function CurrentUserInfos() {
  const auth = useAuthUser();

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth()?.email) {
      const getUserByEmail = async () => {
        try {
          const response = await axios.get(
            `${DefaultURL}/user/email/${auth().email}`
          );

          setUser(response.data);
        } catch (err) {
          console.log(err);
        }
      };

      getUserByEmail();
    }
  }, [auth()?.email]);

  return user&&user;
}