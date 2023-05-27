import axios, { AxiosError } from "axios";
import { Quote, TransferInterface, UserDataInterface, UserInterface } from "./Interfaces";
import Swal from "sweetalert2";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const authenticate = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${apiUrl}/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    const token = response.data;
    return token;
  } catch (error) {
    console.error("error ", error);
    return null;
  }
};
const ApiRegister = async (user: UserInterface) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, user, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.status === 201) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: "Registration failed" };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      console.error(axiosError);
      if (axiosError.response && axiosError.response.data) {
        const validationError = axiosError.response.data;
        return { success: false, error: validationError };
      }
    }
    throw error;
  }
};

const logout = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.post(`${apiUrl}/logout`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    // Remove access_token from localStorage
    localStorage.removeItem("access_token");
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    } else {
      console.error(error);
    }
    return { success: false, error: "error" };
  }
};

const refreshToken = async () => {
  try {
    const refreshResponse = await axios.post(`${apiUrl}/token/refresh/`, {
      refresh: localStorage.getItem("refresh_token"),
    });
    const newAccessToken = refreshResponse.data.access;
    localStorage.setItem("access_token", newAccessToken);
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Your session has expired. Please log in again.",
      }).then(() => {
        window.location.href = "/login";
      });
    } else {
      console.error(error);
    }
  }
};


const ApiGetUserDetail = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.get(`${apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      SessionExpire();
    } else {
      console.error(error);
    }
    return { success: false, error: "error" };
  }
};


const ApiGetBankAccounts = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.get(`${apiUrl}/bank-accounts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // SessionExpire();
    } else {
      console.error(error);
    }
    return { success: false, error: "error" };
  }
};

const ApiGetDepositHistory = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.get(`${apiUrl}/deposits`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // SessionExpire();
    } else {
      console.error(error);
    }
    return { success: false, error: "error" };
  }
};
const ApiGetTransferHistory = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.get(`${apiUrl}/transfers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      SessionExpire();
    } else {
      console.error(error);
    }
    return { success: false, error: "error" };
  }
};
const ApiGetTransactionHistory = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.get(`${apiUrl}/transactions`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // SessionExpire();
    } else {
      console.error(error);
    }
    return { success: false, error: "error" };
  }
};

const ApiPostDeposit = async (amount: number) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.post(
      `${apiUrl}/deposit`,
      { amount: amount },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 201) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: "Update failed" };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      if (axiosError.response && axiosError.response.data) {
        const validationError = axiosError.response.data;
        return { success: false, error: validationError };
      }
    }
    throw error;
  }
};
const ApiPostTransfer = async (transferData: TransferInterface) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.post(`${apiUrl}/transfer`, transferData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 201) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: "Update failed" };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      if (axiosError.response && axiosError.response.data) {
        const validationError = axiosError.response.data;
        return { success: false, error: validationError };
      }
    }
    throw error;
  }
};

const SessionExpire = () => {
  Swal.fire({
    icon: "warning",
    title: "Session Expired",
    text: "Your session has expired. Please log in again.",
  }).then(() => {
    window.location.href = "/login";
  });
};

const fetchRandomQuote = async () => {
  try {
    const response = await axios.get<Quote>(`${apiUrl}/random-quote/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const APIDeleteDefault = async (ids: any, urls: string) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.delete(`${apiUrl}/${urls}/`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: JSON.stringify({ ids: ids }),
    });

    if (response.status === 204) {
      return [true, null];
    } else {
      return [false, response.data];
    }
  } catch (error) {
    console.error(error);
    return [false, null];
  }
};


export {
  authenticate,
  ApiRegister,
  logout,
  refreshToken,
  ApiGetUserDetail,
  ApiGetDepositHistory,
  ApiGetTransferHistory,
  ApiGetTransactionHistory,
  ApiPostTransfer,
  ApiPostDeposit,
  fetchRandomQuote,
  ApiGetBankAccounts
};
