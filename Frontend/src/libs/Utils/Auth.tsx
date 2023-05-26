import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

interface TokenResponse {
  access: string;
}
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const isAuthenticated = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return false;
  }

  try {
    const response = await axios.post(
      `${apiUrl}/token/verify/`,
      {
        token: token,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const withAuth = (Page: NextPage, isPublic = false) => {
  const AuthenticatedPage: NextPage = (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const authenticated = await isAuthenticated();
        if (!authenticated && !isPublic) {
            router.push("/login");
        }
      };
      checkAuth();  
    }, []);

    return <Page {...props} />;
  };

  return AuthenticatedPage;
};
